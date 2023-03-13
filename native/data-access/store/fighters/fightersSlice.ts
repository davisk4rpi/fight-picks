import { Fighter } from '@fight-picks/models';
import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { AsyncStatus } from '../types';

export const FIGHTERS_SLICE_NAME = 'fighters';

const fightersAdapter = createEntityAdapter<Fighter>();

const initialState = fightersAdapter.getInitialState<{
  fightersStatus: AsyncStatus;
}>({ fightersStatus: 'pending' });

type FightersState = typeof initialState;

const fightersSlice = createSlice({
  name: FIGHTERS_SLICE_NAME,
  initialState,
  reducers: {
    fightersChanged: {
      reducer: (
        state,
        action: PayloadAction<{
          fighterIdsToRemove: string[];
          fightersToUpsert: Fighter[];
        }>,
      ) => {
        fightersAdapter.removeMany(state, action.payload.fighterIdsToRemove);
        fightersAdapter.upsertMany(state, action.payload.fightersToUpsert);
        state.fightersStatus = 'pending';
      },
      prepare: (fightersToUpsert: Fighter[], fighterIdsToRemove: string[]) => {
        return {
          payload: { fightersToUpsert, fighterIdsToRemove },
        };
      },
    },
  },
});

export const fightersReducer = fightersSlice.reducer;
export const { fightersChanged } = fightersSlice.actions;

export const {
  selectAll: selectFighters,
  selectEntities: selectFighterEntities,
  selectById: selectFighterById,
} = fightersAdapter.getSelectors<{ fighters: FightersState }>(
  ({ fighters }) => fighters,
);

export const PLACEHOLDER_FIGHTER: Fighter = {
  id: 'n/a',
  name: 'Fighter TBA',
};

export const selectFightersStatus = (state: { fighters: FightersState }) =>
  state.fighters.fightersStatus;
