import { FightPickWithScore } from '@fight-picks/models';

import { UserScoreUidMap } from './types';

/**
 *
 * @param fightPicks An Array of FightPicksWithScore, all of a user's scores will be summed
 * @returns userScoreUidMap A Map of userUid => UserScore containing the aggregate scores for each user from the provided fightPicksWithScore array
 */
export const mapTotalScoreToUserUid = (fightPicks: FightPickWithScore[]) =>
  fightPicks.reduce<UserScoreUidMap>((map, { userUid, score, confidence }) => {
    if (score === undefined) return map;
    const existing = map.get(userUid);
    if (existing === undefined) {
      map.set(userUid, {
        userUid,
        score,
        confidence,
      });
    } else {
      map.set(userUid, {
        userUid,
        score: existing.score + score,
        confidence: existing.confidence + confidence,
      });
    }
    return map;
  }, new Map());
