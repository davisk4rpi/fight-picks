import { selectPastFightCards } from '../../fightCards';
import { useAppSelector } from '../../store';

export const useSelectPastFightCards = () =>
  useAppSelector(selectPastFightCards);
