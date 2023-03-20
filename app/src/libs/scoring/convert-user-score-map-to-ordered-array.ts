import { insertValueInOrderedArray } from '@fight-picks/utilities';

import { UserScore, UserScoreUidMap } from './types';

export const convertUserScoreMapToOrderedArray = (map: UserScoreUidMap) => {
  const arr: UserScore[] = [];
  for (let entry of map) {
    const [, uidScore] = entry;
    // TODO abstract comparisonFunc into a utility for ordering pick scores
    insertValueInOrderedArray(uidScore, arr, (target, existing) => {
      if (target.score > existing.score) {
        return -1;
      } else if (target.score < existing.score) {
        return 1;
      } else {
        if (target.confidence > existing.confidence) {
          return target.score === 0 ? 1 : -1;
        } else if (target.confidence < existing.confidence) {
          return target.score === 0 ? -1 : 1;
        } else {
          return 0;
        }
      }
    });
  }
  return arr;
};
