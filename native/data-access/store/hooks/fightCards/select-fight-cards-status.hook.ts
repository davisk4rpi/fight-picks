import { selectFightCardsStatus } from '../../fightCards';
import { useAppSelector } from '../../store';

export const useSelectFightCardsStatus = () =>
  useAppSelector(selectFightCardsStatus);
