import { Fight } from '@fight-picks/models';
import {
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { AsyncStatus, NormalizedFights } from '../types';

export const FIGHTS_SLICE_NAME = 'fights';

const fightsAdapter = createEntityAdapter<Fight>();

const initialState = fightsAdapter.getInitialState<{
  fightsStatus: AsyncStatus;
}>({ fightsStatus: 'pending' });

type FightsState = typeof initialState;

const fightsSlice = createSlice({
  name: FIGHTS_SLICE_NAME,
  initialState,
  reducers: {
    fightsChanged: {
      reducer: (
        state,
        action: PayloadAction<{
          fightIdsToRemove: string[];
          fightsToUpsert: Fight[];
        }>,
      ) => {
        fightsAdapter.removeMany(state, action.payload.fightIdsToRemove);
        fightsAdapter.upsertMany(state, action.payload.fightsToUpsert);
        state.fightsStatus = 'complete';
      },
      prepare: (fightsToUpsert: Fight[], fightIdsToRemove: string[]) => {
        return {
          payload: { fightsToUpsert, fightIdsToRemove },
        };
      },
    },
  },
});

export const fightsReducer = fightsSlice.reducer;
export const { fightsChanged } = fightsSlice.actions;

export const {
  selectAll: selectFights,
  selectEntities: selectFightEntities,
  selectById: selectFightById,
} = fightsAdapter.getSelectors<{ fights: FightsState }>(({ fights }) => fights);

export const selectFightsByIds = createSelector(
  [selectFightEntities, (_state: unknown, fightIds: string[]) => fightIds],
  (fightsMap, fightIds) => {
    return fightIds.reduce<Fight[]>((fights, fightId) => {
      const fight = fightsMap[fightId];
      if (fight) {
        fights.push(fight);
      }
      return fights;
    }, []);
  },
);

export const selectNormalizedFightsByIds = createSelector(
  [selectFightEntities, (_state: unknown, fightIds: string[]) => fightIds],
  (fightsMap, fightIds) => {
    return fightIds.reduce<NormalizedFights>((fights, fightId) => {
      const fight = fightsMap[fightId];
      if (fight) {
        fights.set(fightId, fight);
      }
      return fights;
    }, new Map());
  },
);

export const selectFightsStatus = (state: { fights: FightsState }) =>
  state.fights.fightsStatus;
