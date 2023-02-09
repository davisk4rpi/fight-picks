import { FightPick, FightResult } from '../../data-access/db';

export const calculatePickScores = (pick: FightPick, result?: FightResult) => {
  if (result === undefined) {
    return {
      score: undefined,
      confidenceScore: undefined,
    };
  }
  if (pick.winningFighterId === result.winningFighterId) {
    if (result.method === 'decision' && pick.method === 'decision') {
      return {
        score: 3,
        confidenceScore: pick.confidence,
      };
    }
    let score = 1;
    score += pick.round === result.round ? (result.round ?? 0) + 1 : 0;
    score += pick.method === result.method ? 1 : 0;

    return {
      score,
      confidenceScore: pick.confidence,
    };
  } else {
    return {
      score: 0,
      confidenceScore: -1 * pick.confidence,
    };
  }
};
