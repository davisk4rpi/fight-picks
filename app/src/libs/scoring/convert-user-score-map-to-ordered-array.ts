import { insertValueInOrderedArray } from '@fight-picks/utilities';

import { UserScore, UserScoreUidMap } from './types';
import { userScoreBinaryComparisonFunction } from './user-score-binary-comparison-function';

export const convertUserScoreMapToOrderedArray = (map: UserScoreUidMap) => {
  const arr: UserScore[] = [];
  for (let entry of map) {
    const [, uidScore] = entry;
    // TODO abstract comparisonFunc into a utility for ordering pick scores
    insertValueInOrderedArray(uidScore, arr, userScoreBinaryComparisonFunction);
  }
  return arr;
};
