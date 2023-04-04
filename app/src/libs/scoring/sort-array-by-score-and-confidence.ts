import { scoreBinaryComparisonFunction } from './score-binary-comparison-function';
import { ScoreObject } from './types';

/**
 *  Warning, sorts array in place!
 * @param scoreObjectArr
 * @returns scoreObjectArr sorted by score and confidence
 */
export const sortArrayByScoreAndConfidence = <T extends ScoreObject>(
  scoreObjectArr: T[],
): T[] => {
  scoreObjectArr.sort(scoreBinaryComparisonFunction);
  return scoreObjectArr;
};
