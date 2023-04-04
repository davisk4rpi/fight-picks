import { BinaryInsertComparisonFunction } from '@fight-picks/utilities';
import { ScoreObject } from './types';

/**
 *
 * @param targetValue
 * @param existingValue
 * @returns
 */
export const scoreBinaryComparisonFunction = (
  targetValue: ScoreObject,
  existingValue: ScoreObject,
): ReturnType<BinaryInsertComparisonFunction<ScoreObject>> => {
  if (
    targetValue.score === undefined ||
    existingValue.score === undefined ||
    targetValue.score === existingValue.score
  ) {
    if (targetValue.confidence > existingValue.confidence) {
      return targetValue.score === 0 ? 1 : -1;
    } else if (targetValue.confidence < existingValue.confidence) {
      return targetValue.score === 0 ? -1 : 1;
    } else {
      return 0;
    }
  } else if (targetValue.score > existingValue.score) {
    return -1;
  } else if (targetValue.score < existingValue.score) {
    return 1;
  } else {
    return 0;
  }
};
