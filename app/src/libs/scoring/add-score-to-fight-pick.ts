import {
  FightPick,
  FightPickWithScore,
  FightResult,
} from '@fight-picks/models';

import { calculatePickScore } from './calculate-pick-score';

export const addScoreToFightPick = (
  fightPick: FightPick,
  fightResult?: FightResult,
): FightPickWithScore => {
  const score = calculatePickScore(fightPick, fightResult);
  return {
    ...fightPick,
    score,
  };
};
