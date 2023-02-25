import {
  FightPick,
  FightResult,
  isFightResultWithFinish,
} from '@fight-picks/models';

// TODO Need JEST
export const calculatePickScores = (pick: FightPick, result?: FightResult) => {
  if (result === undefined) {
    return {
      score: undefined,
      confidenceScore: undefined,
    };
  }
  if (pick.winningFighterId === result.winningFighterId) {
    let score = 1;
    if (isFightResultWithFinish(result)) {
      score += pick.round === result.round ? result.round : 0;
      score += pick.method === result.method ? 1 : 0;
      score +=
        pick.method === result.method && pick.round === result.round ? 1 : 0;
    } else if (pick.method === result.method) {
      score = 3;
    }
    return {
      score,
      confidenceScore: pick.confidence,
    };
  }

  return {
    score: 0,
    confidenceScore: -1 * pick.confidence,
  };
};
