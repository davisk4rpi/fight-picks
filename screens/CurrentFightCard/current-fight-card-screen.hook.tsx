import { useCallback, useMemo } from 'react';

import { useNavigation } from '@react-navigation/native';

import {
  useFightsWithFightersByFightCardId,
  useFightsWithPicks,
  useNextFightCard,
} from '../../data-access';
import { isNotUndefined } from '../../libs/utililities';

export const useCurrentFightCardScreen = () => {
  const { navigate } = useNavigation();

  const { nextFightCard, loading: nextFightCardLoading } = useNextFightCard();
  const { fights, loading: fightsLoading } = useFightsWithFightersByFightCardId(
    nextFightCard?.id,
  );

  const { fightsWithPicks } = useFightsWithPicks(fights);
  const orderFightsWithPicks = useMemo(
    () =>
      nextFightCard?.fightIds
        ?.map(fightId => fightsWithPicks.find(({ id }) => fightId === id))
        ?.filter(isNotUndefined) ?? fightsWithPicks,
    [nextFightCard?.fightIds, fightsWithPicks],
  );

  const fightCardTimestamp = nextFightCard?.mainCardDate?.getTime() ?? Infinity;

  const navigateToFightPickScreen = useCallback(
    (fightId: string) => {
      if (fightCardTimestamp <= Date.now()) {
        navigate('LockedFightPicks', { fightId });
      } else {
        navigate('FightPick', { fightId });
      }
    },
    [navigate, fightCardTimestamp],
  );

  return {
    loading: nextFightCardLoading || fightsLoading,
    fightCard: nextFightCard,
    fightsWithPicks: orderFightsWithPicks,
    navigateToFightPickScreen,
  };
};
