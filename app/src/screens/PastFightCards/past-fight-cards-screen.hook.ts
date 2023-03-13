import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { selectPastFightCards } from '@fight-picks/native-data-access';
import { useNavigation } from '@react-navigation/native';

export const usePastFightCardsScreen = () => {
  const { navigate } = useNavigation();
  const fightCards = useSelector(selectPastFightCards);

  const navigateToFightCardScreen = useCallback(
    (fightCardId: string) => {
      navigate('FightCard', { fightCardId });
    },
    [navigate],
  );
  return { fightCards, navigateToFightCardScreen };
};
