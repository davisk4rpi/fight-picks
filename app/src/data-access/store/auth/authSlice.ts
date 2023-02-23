import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AsyncStatus } from '../types';

export const AUTH_SLICE_NAME = 'auth';

type AuthUser = {
  uid: string;
  displayName: string | null;
};
type AuthState = {
  user: AuthUser | null;
  authStatus: AsyncStatus;
};

const initialState: AuthState = {
  user: null,
  authStatus: 'pending',
};

const authSlice = createSlice({
  name: AUTH_SLICE_NAME,
  initialState,
  reducers: {
    authChanged: {
      reducer: (
        state,
        action: PayloadAction<{
          user: AuthUser | null;
        }>,
      ) => {
        state.user = action.payload.user;
        state.authStatus = 'complete';
      },
      prepare: (user: AuthUser | null) => {
        if (user === null) {
          return {
            payload: { user: null },
          };
        }
        const { uid, displayName } = user;
        return {
          payload: { user: { uid, displayName } },
        };
      },
    },
  },
});

export const authReducer = authSlice.reducer;
export const { authChanged } = authSlice.actions;

export const selectAuthUser = (state: { auth: AuthState }) => state.auth.user;
export const selectAuthUserUid = (state: { auth: AuthState }) =>
  state.auth.user?.uid ?? null;

export const selectAuthStatus = (state: { auth: AuthState }) =>
  state.auth.authStatus;
