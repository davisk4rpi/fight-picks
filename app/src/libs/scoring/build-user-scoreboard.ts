import { FightPick } from '@fight-picks/models';
import { NormalizedFights } from '@fight-picks/native-data-access';

import { addScoresToFightPicks } from './add-score-to-fight-pick';
import { convertUserScoreMapToOrderedArray } from './convert-user-score-map-to-ordered-array';
import { mapTotalScoreToUserUid } from './map-total-score-to-user-uid';
import { UserScore } from './types';

/**
 *
 * @param fightPicks An array of all fightPicks you would like to contribute to this scoreboard
 * @param normalizedFights An object containing all Fights you would like to score for the provided fightPicks
 * @returns userScoreboard An array of UserScores ordered DESC by score, confidence score
 */
export const buildUserScoreboard = (
  fightPicks: FightPick[],
  normalizedFights: NormalizedFights,
): UserScore[] => {
  const fightPicksWithScores = addScoresToFightPicks(
    fightPicks,
    normalizedFights,
  );
  const userScoresMap = mapTotalScoreToUserUid(fightPicksWithScores);
  return convertUserScoreMapToOrderedArray(userScoresMap);
};
