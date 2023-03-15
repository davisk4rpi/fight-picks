import { selectFightCardById } from '../../fightCards';
import { useAppSelector } from '../../store';

export const useSelectFightCardById = (fightCardId: string) =>
  useAppSelector(state => selectFightCardById(state, fightCardId));
