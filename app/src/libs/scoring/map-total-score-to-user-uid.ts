import { FightPickWithScore } from '@fight-picks/models';

import { UserScoreUidMap } from './types';

export type PartialFightPickWithScore = Pick<
  FightPickWithScore,
  'userUid' | 'score' | 'confidence'
>;
/**
 *
 * @param fightPicks An Array of FightPicksWithScore, all of a user's scores will be summed
 * @returns userScoreUidMap A Map of userUid => UserScore containing the aggregate scores for each user from the provided fightPicksWithScore array
 */
export const mapTotalScoreToUserUid = (
  fightPicks: PartialFightPickWithScore[],
) =>
  fightPicks.reduce<UserScoreUidMap>((map, { userUid, score, confidence }) => {
    if (score === undefined) return map;
    const existing = map.get(userUid);
    const confidenceScore = score > 0 ? confidence : -1 * confidence;
    if (existing === undefined) {
      map.set(userUid, {
        userUid,
        score,
        confidence: confidenceScore,
      });
    } else {
      map.set(userUid, {
        userUid,
        score: existing.score + score,
        confidence: existing.confidence + confidenceScore,
      });
    }
    return map;
  }, new Map());
