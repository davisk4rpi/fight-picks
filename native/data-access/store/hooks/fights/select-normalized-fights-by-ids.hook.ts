import { selectNormalizedFightsByIds } from '../../fights';
import { useAppSelector } from '../../store';

export const useSelectNormalizedFightsByIds = (fightIds: string[]) =>
  useAppSelector(state => selectNormalizedFightsByIds(state, fightIds));
