import { FightPick, User } from '@fight-picks/models';
import {
  createEntityAdapter,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const USER_SLICE_NAME = 'user';

type UserState = {
  user: User | null;
  fightPicks: EntityState<FightPick>;
};

const fightPicksAdapter = createEntityAdapter<FightPick>();

const initialFightPickState = fightPicksAdapter.getInitialState();

const initialState: UserState = {
  fightPicks: initialFightPickState,
  user: null,
};

const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {
    userFightPicksChanged: {
      reducer: (
        state,
        action: PayloadAction<{
          fightPickIdsToRemove: string[];
          fightPicksToUpsert: FightPick[];
        }>,
      ) => {
        fightPicksAdapter.removeMany(
          state.fightPicks,
          action.payload.fightPickIdsToRemove,
        );
        fightPicksAdapter.upsertMany(
          state.fightPicks,
          action.payload.fightPicksToUpsert,
        );
      },
      prepare: (
        fightPicksToUpsert: FightPick[],
        fightPickIdsToRemove: string[],
      ) => {
        return {
          payload: { fightPicksToUpsert, fightPickIdsToRemove },
        };
      },
    },
    userChanged: {
      reducer: (
        state,
        action: PayloadAction<{
          user: User | null;
        }>,
      ) => {
        state.user = action.payload.user;
        if (action.payload.user === null) {
          state.fightPicks = initialFightPickState;
        }
      },
      prepare: (user: User | null) => {
        if (user === null) {
          return {
            payload: { user: null },
          };
        }
        const { uid, displayName, isAdmin } = user;
        return {
          payload: { user: { uid, displayName, isAdmin } },
        };
      },
    },
  },
});

export const userReducer = userSlice.reducer;
export const { userFightPicksChanged, userChanged } = userSlice.actions;

export const {
  selectAll: selectAuthUserFightPicks,
  selectEntities: selectAuthUserFightPickEntities,
  selectById: selectAuthUserFightPickById,
} = fightPicksAdapter.getSelectors<{ user: UserState }>(
  ({ user }) => user.fightPicks,
);

export const selectCurrentUser = (state: { user: UserState }) =>
  state.user.user;
