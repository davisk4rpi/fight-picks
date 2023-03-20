import { BinaryInsertComparisonFunction } from '@fight-picks/utilities';

import { UserScore } from './types';

/**
 *
 * @param targetValue
 * @param existingValue
 * @returns
 */
export const userScoreBinaryComparisonFunction = (
  targetValue: UserScore,
  existingValue: UserScore,
): ReturnType<BinaryInsertComparisonFunction<UserScore>> => {
  if (targetValue.score > existingValue.score) {
    return -1;
  } else if (targetValue.score < existingValue.score) {
    return 1;
  } else {
    if (targetValue.confidence > existingValue.confidence) {
      return targetValue.score === 0 ? 1 : -1;
    } else if (targetValue.confidence < existingValue.confidence) {
      return targetValue.score === 0 ? -1 : 1;
    } else {
      return 0;
    }
  }
};
