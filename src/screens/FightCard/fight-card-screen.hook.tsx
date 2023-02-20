import { useCallback, useMemo } from 'react';

import { useNavigation } from '@react-navigation/native';

import {
  useFightCard,
  useFightsWithFightersByFightCardId,
  useFightsWithPicks,
} from '../../data-access';
import { isNotUndefined } from '../../libs/utililities';

export const useFightCardScreen = (fightCardId: string) => {
  const { navigate } = useNavigation();

  const { fightCard, loading: fightCardLoading } = useFightCard(fightCardId);
  const { fights, loading: fightsLoading } = useFightsWithFightersByFightCardId(
    fightCard?.id,
  );

  const { fightsWithPicks } = useFightsWithPicks(fights);

  const orderFightsWithPicks = useMemo(
    () =>
      fightCard?.fightIds
        ?.map(fightId => fightsWithPicks.find(({ id }) => fightId === id))
        ?.filter(isNotUndefined) ?? fightsWithPicks,
    [fightCard?.fightIds, fightsWithPicks],
  );

  const navigateToFightPickScreen = useCallback(
    (fightId: string) => {
      if (fightCard === null) return;
      if (fightCard.mainCardDate <= new Date())
        return navigate('LockedFightPicks', { fightId });
      return navigate('FightPick', { fightId });
    },
    [navigate, fightCard],
  );

  return {
    loading: fightCardLoading || fightsLoading,
    fightCard,
    fightsWithPicks: orderFightsWithPicks,
    navigateToFightPickScreen,
  };
};
