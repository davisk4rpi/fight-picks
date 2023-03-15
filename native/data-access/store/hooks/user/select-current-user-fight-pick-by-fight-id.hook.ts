import { useAppSelector } from '../../store';
import { selectCurrentUserFightPickByFightId } from '../../user';

export const useSelectCurrentUserFightPickByFightId = (fightId: string) =>
  useAppSelector(state => selectCurrentUserFightPickByFightId(state, fightId));
