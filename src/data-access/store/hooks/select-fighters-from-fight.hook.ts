import { Fight } from '../../../../models.types';
import { selectFighterById } from '../fighters/fightersSlice';
import { useAppSelector } from '../store';

export const useSelectFightersFromFight = (fight: Fight) => {
  const fighter1 = useAppSelector(state =>
    selectFighterById(state, fight.fighter1Id),
  );
  const fighter2 = useAppSelector(state =>
    selectFighterById(state, fight.fighter2Id),
  );
  return { fighter1, fighter2 };
};
