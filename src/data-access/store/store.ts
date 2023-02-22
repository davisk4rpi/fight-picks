import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth';
import { coreReducer } from './core';
import { fightCardsReducer } from './fightCards';
import { fightersReducer } from './fighters';
import { fightsReducer } from './fights';
import { userReducer } from './user';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    core: coreReducer,
    fightCards: fightCardsReducer,
    fighters: fightersReducer,
    fights: fightsReducer,
    user: userReducer,
    // users: usersReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
