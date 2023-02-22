import {
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { FightCard } from '../../../../models.types';

export const FIGHT_CARDS_SLICE_NAME = 'fightCards';

const fightCardsAdapter = createEntityAdapter<FightCard>({
  sortComparer: (a, b) => b.mainCardDate.localeCompare(a.mainCardDate),
});

const initialState = fightCardsAdapter.getInitialState();

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
} = fightCardsAdapter.getSelectors<{ fightCards: typeof initialState }>(
  ({ fightCards }) => fightCards,
);

export const selectPastFightCards = createSelector(
  [selectFightCards],
  fightCards => {
    const now = new Date().toISOString();
    return fightCards.filter(fightCard => fightCard.mainCardDate <= now);
  },
);

export const selectCurrentFightCard = createSelector(
  [selectFightCards],
  fightCards => {
    const cuttoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const lastFightCardIdx = fightCards.findIndex(
      fightCard => fightCard.mainCardDate <= cuttoff,
    );
    if (lastFightCardIdx === -1) return null;
    return fightCards[lastFightCardIdx - 1] ?? fightCards[lastFightCardIdx];
  },
);
