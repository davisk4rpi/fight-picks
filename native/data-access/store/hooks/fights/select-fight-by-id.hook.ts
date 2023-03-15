import { selectFightById } from '../../fights';
import { useAppSelector } from '../../store';

export const useSelectFightById = (fightId: string) =>
  useAppSelector(state => selectFightById(state, fightId));
