import { selectFightsStatus } from '../../fights';
import { useAppSelector } from '../../store';

export const useSelectFightsStatus = () => useAppSelector(selectFightsStatus);
