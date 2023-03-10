import {
  FightPick,
  FightResult,
  isFightResultWithFinish,
} from '@fight-picks/models';

export type CalculatePickScoresFightPick = Omit<
  FightPick,
  'fightId' | 'id' | 'userUid' | 'confidence'
>;

/**
 * Calculates the score for a given FightPick based on a FightResult
 * If player picks the incorrect Winner
 * They score 0 points for the fight and lose the number of Confidence points they wagered
 *
 * If player picks the correct Winner
 * They score 1 point for picking the winner and win the number of Confidence points they wagered
 *
 * If the player also correctly picks Decision as the Method, they gain an additional 2 points.
 * If the player correctly picks any other Method, they gain an additional 1 point.
 * If the player correctly picks the Round, they will gain 1 point for each round (1-5 points) ** Decision picks do not include rounds
 * @param fightPick
 * @param fightResult
 * @returns fightPickScore
 */
export const calculatePickScore = (
  fightPick: CalculatePickScoresFightPick,
  fightResult?: FightResult,
): number | undefined => {
  if (fightResult === undefined) {
    return undefined;
  }
  if (fightPick.winningFighterId === fightResult.winningFighterId) {
    let score = 1;
    if (isFightResultWithFinish(fightResult)) {
      score += fightPick.round === fightResult.round ? fightResult.round : 0;
      score += fightPick.method === fightResult.method ? 1 : 0;
      score +=
        fightPick.method === fightResult.method &&
        fightPick.round === fightResult.round
          ? 1
          : 0;
    } else if (fightPick.method === fightResult.method) {
      score = 3;
    }
    return score;
  }

  return 0;
};
