import { selectFightEntities } from '../../fights';
import { useAppSelector } from '../../store';

export const useSelectFightEntities = () =>
  useAppSelector(state => selectFightEntities(state));
