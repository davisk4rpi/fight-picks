import { FightCard } from '@fight-picks/models';
import { findBinaryPositionInOrderedArray } from '@fight-picks/utilities';
import {
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { AsyncStatus } from '../types';

export const FIGHT_CARDS_SLICE_NAME = 'fightCards';

const fightCardsAdapter = createEntityAdapter<FightCard>({
  sortComparer: (a, b) => b.mainCardDate.localeCompare(a.mainCardDate),
});

const initialState = fightCardsAdapter.getInitialState<{
  fightCardsStatus: AsyncStatus;
}>({ fightCardsStatus: 'pending' });

type FightCardsState = typeof initialState;

const fightCardsSlice = createSlice({
  name: FIGHT_CARDS_SLICE_NAME,
  initialState,
  reducers: {
    fightCardsChanged: {
      reducer: (
        state,
        action: PayloadAction<{
          fightCardIdsToRemove: string[];
          fightCardsToUpsert: FightCard[];
        }>,
      ) => {
        fightCardsAdapter.removeMany(
          state,
          action.payload.fightCardIdsToRemove,
        );
        fightCardsAdapter.upsertMany(state, action.payload.fightCardsToUpsert);
        state.fightCardsStatus = 'complete';
      },
      prepare: (
        fightCardsToUpsert: FightCard[],
        fightCardIdsToRemove: string[],
      ) => {
        return {
          payload: { fightCardsToUpsert, fightCardIdsToRemove },
        };
      },
    },
  },
});

export const fightCardsReducer = fightCardsSlice.reducer;
export const { fightCardsChanged } = fightCardsSlice.actions;

export const {
  selectAll: selectFightCards,
  selectEntities: selectFightCardEntities,
  selectById: selectFightCardById,
} = fightCardsAdapter.getSelectors<{ fightCards: FightCardsState }>(
  ({ fightCards }) => fightCards,
);

export const selectFightCardByIdOptimistic = (
  state: { fightCards: FightCardsState },
  fightCardId?: string,
) => (fightCardId ? selectFightCardById(state, fightCardId) : undefined);

export const selectPastFightCards = createSelector(
  [selectFightCards],
  fightCards => {
    const now = new Date().toISOString();
    return fightCards.filter(fightCard => fightCard.mainCardDate <= now);
  },
);

const findCurrentFightCard = (fightCards: FightCard[]) => {
  const cuttoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const idx = findBinaryPositionInOrderedArray(fightCards, fightCard => {
    if (fightCard.mainCardDate < cuttoff) {
      return -1;
    } else if (fightCard.mainCardDate > cuttoff) {
      return 1;
    } else {
      return 0;
    }
  });

  const fightCard = fightCards.at(Math.max(0, idx - 1));
  if (fightCard === undefined) return fightCards.at(idx) ?? undefined;
  return fightCard;
};

export const selectCurrentFightCard = createSelector(
  [selectFightCards],
  findCurrentFightCard,
);

export const selectFightCardByIdOrCurrent = createSelector(
  [selectFightCardByIdOptimistic, selectCurrentFightCard],
  (fightCard, currentFightCard) => {
    if (fightCard) return fightCard;
    return currentFightCard;
  },
);

export const selectFightCardsStatus = (state: {
  fightCards: FightCardsState;
}) => state.fightCards.fightCardsStatus;
