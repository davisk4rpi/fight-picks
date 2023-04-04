import { useCallback } from 'react';

import {
  fightCardsChanged,
  fightersChanged,
  fightsChanged,
  OnCurrentUserUpdate,
  OnFightCardsUpdate,
  OnFightersUpdate,
  OnFightsUpdate,
  OnUserFightPicksUpdate,
  useAppDispatch,
  useCurrentUserSubscription,
  useFightCardsSubscription,
  useFightersSubscription,
  useFightsSubscription,
  userChanged,
  userFightPicksChanged,
  useSelectAuthStatus,
  useSelectAuthUserUid,
  useSelectCurrentUser,
  useSelectFightEntities,
  useSelectFightsStatus,
  useUserFightPicksSubscription,
} from '@fight-picks/native-data-access';

export const useApp = () => {
  const user = useSelectCurrentUser();
  const authStatus = useSelectAuthStatus();
  const authUserUid = useSelectAuthUserUid();
  const fightsStatus = useSelectFightsStatus();
  const fightEntities = useSelectFightEntities();
  const dispatch = useAppDispatch();

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
    fightsStatus === 'complete' ? fightEntities : undefined,
  );
  useFightCardsSubscription(onFightCardsUpdate);
  useFightsSubscription(onFightsUpdate);
  useFightersSubscription(onFightersUpdate);

  return {
    user,
    authLoading: authStatus === 'pending',
  };
};
