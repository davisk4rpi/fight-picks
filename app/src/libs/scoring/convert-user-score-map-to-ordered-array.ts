import { insertValueInOrderedArray } from '@fight-picks/utilities';

import { scoreBinaryComparisonFunction } from './score-binary-comparison-function';
import { UserScore, UserScoreUidMap } from './types';

export const convertUserScoreMapToOrderedArray = (map: UserScoreUidMap) => {
  const arr: UserScore[] = [];
  for (let entry of map) {
    const [, uidScore] = entry;
    insertValueInOrderedArray(uidScore, arr, scoreBinaryComparisonFunction);
  }
  return arr;
};
