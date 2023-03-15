import { useCallback } from 'react';

import { useSelectPastFightCards } from '@fight-picks/native-data-access';
import { useNavigation } from '@react-navigation/native';

export const usePastFightCardsScreen = () => {
  const { navigate } = useNavigation();
  const fightCards = useSelectPastFightCards();

  const navigateToFightCardScreen = useCallback(
    (fightCardId: string) => {
      navigate('FightCard', { fightCardId });
    },
    [navigate],
  );
  return { fightCards, navigateToFightCardScreen };
};
