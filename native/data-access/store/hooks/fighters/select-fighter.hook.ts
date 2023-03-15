import { selectFighterById } from '../../fighters';
import { useAppSelector } from '../../store';

export const useSelectFighter = (fighterId?: string) => {
  return useAppSelector(state => selectFighterById(state, fighterId ?? ''));
};
