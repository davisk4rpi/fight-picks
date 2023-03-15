import { selectFightCardByIdOrCurrent } from '../../fightCards';
import { useAppSelector } from '../../store';

export const useSelectFightCardByIdOrCurrent = (fightCardId?: string) =>
  useAppSelector(state => selectFightCardByIdOrCurrent(state, fightCardId));
