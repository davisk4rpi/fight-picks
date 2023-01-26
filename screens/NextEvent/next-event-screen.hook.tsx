import { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';

import {
  useFightsWithFightersByFightCardId,
  useFightsWithPicks,
  useNextFightCard,
} from '../../data-access';

export const useNextEventScreen = () => {
  const { navigate } = useNavigation();

  const { nextFightCard, loading: nextFightCardLoading } = useNextFightCard();
  const { fights, loading: fightsLoading } = useFightsWithFightersByFightCardId(
    nextFightCard?.id,
  );

  const { fightsWithPicks } = useFightsWithPicks(fights);

  const navigateToFightPickScreen = useCallback(
    (fightId: string) => {
      navigate('FightPick', { fightId });
    },
    [navigate],
  );

  return {
    loading: nextFightCardLoading || fightsLoading,
    fightCard: nextFightCard,
    fightsWithPicks,
    navigateToFightPickScreen,
  };
};
