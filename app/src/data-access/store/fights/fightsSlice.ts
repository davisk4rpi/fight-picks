import { Fight } from '@fight-picks/models';
import {
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

export const FIGHTS_SLICE_NAME = 'fights';

const fightsAdapter = createEntityAdapter<Fight>();

const initialState = fightsAdapter.getInitialState();

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
} = fightsAdapter.getSelectors<{ fights: typeof initialState }>(
  ({ fights }) => fights,
);

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
