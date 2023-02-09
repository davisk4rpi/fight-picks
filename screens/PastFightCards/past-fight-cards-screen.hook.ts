import { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';

import { usePastFightCards } from '../../data-access';

export const usePastFightCardsScreen = () => {
  const { navigate } = useNavigation();
  const { fightCards, loading } = usePastFightCards();
  // const { fightCardsWithFightsWithPicks } =
  //   useFightCardsWithFightsWithPicks(fightCards);
  // const { fightCardsWithPickScores } = useFightCardsWithPickScores(fightCards);

  const navigateToFightCardScreen = useCallback(
    (fightCardId: string) => {
      navigate('FightCard', { fightCardId });
    },
    [navigate],
  );
  return { fightCards, loading, navigateToFightCardScreen };
};
