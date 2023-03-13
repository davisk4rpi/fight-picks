import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import {
  fightCardsChanged,
  fightersChanged,
  fightsChanged,
  OnCurrentUserUpdate,
  OnFightCardsUpdate,
  OnFightersUpdate,
  OnFightsUpdate,
  OnUserFightPicksUpdate,
  selectAuthStatus,
  selectAuthUserUid,
  selectCurrentUser,
  useAppSelector,
  useCurrentUserSubscription,
  useFightCardsSubscription,
  useFightersSubscription,
  useFightsSubscription,
  userChanged,
  userFightPicksChanged,
  useUserFightPicksSubscription,
} from '@fight-picks/native-data-access';

export const useApp = () => {
  const user = useAppSelector(selectCurrentUser);
  const authStatus = useAppSelector(selectAuthStatus);
  const authUserUid = useAppSelector(selectAuthUserUid);

  const dispatch = useDispatch();

  const onCurrentUserUpdate = useCallback<OnCurrentUserUpdate>(
    user => {
      dispatch(userChanged(user));
    },
    [dispatch],
  );
  const onCurrentUserFightPicksUpdate = useCallback<OnUserFightPicksUpdate>(
    ({ upserts, removedIds }) => {
      dispatch(userFightPicksChanged(upserts, removedIds));
    },
    [dispatch],
  );

  const onFightCardsUpdate = useCallback<OnFightCardsUpdate>(
    ({ upserts, removedIds }) => {
      dispatch(fightCardsChanged(upserts, removedIds));
    },
    [dispatch],
  );
  const onFightsUpdate = useCallback<OnFightsUpdate>(
    ({ upserts, removedIds }) => {
      dispatch(fightsChanged(upserts, removedIds));
    },
    [dispatch],
  );
  const onFightersUpdate = useCallback<OnFightersUpdate>(
    ({ upserts, removedIds }) => {
      dispatch(fightersChanged(upserts, removedIds));
    },
    [dispatch],
  );

  useCurrentUserSubscription(authUserUid, onCurrentUserUpdate);
  useUserFightPicksSubscription(
    user?.uid ?? null,
    onCurrentUserFightPicksUpdate,
  );
  useFightCardsSubscription(onFightCardsUpdate);
  useFightsSubscription(onFightsUpdate);
  useFightersSubscription(onFightersUpdate);

  return {
    user,
    authLoading: authStatus === 'pending',
  };
};
