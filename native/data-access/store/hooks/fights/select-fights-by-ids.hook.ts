import { selectFightsByIds } from '../../fights';
import { useAppSelector } from '../../store';

export const useSelectFightsByIds = (fightIds: string[]) =>
  useAppSelector(state => selectFightsByIds(state, fightIds));
