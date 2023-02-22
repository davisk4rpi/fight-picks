import { useSelector } from 'react-redux';

import { selectPastFightCards } from '../store';

export const usePastFightCards = () => {
  const fightCards = useSelector(selectPastFightCards);
  return {
    fightCards,
    loading: false,
  };
};
