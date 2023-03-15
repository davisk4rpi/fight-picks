import { useAppSelector } from '../../store';
import { selectCurrentUserFightPicksStatus } from '../../user';

export const useSelectCurrentUserFightPicksStatus = () =>
  useAppSelector(selectCurrentUserFightPicksStatus);
