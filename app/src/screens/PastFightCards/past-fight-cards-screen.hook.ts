import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useNavigation } from '@react-navigation/native';

import { selectPastFightCards } from '../../data-access/store';

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
