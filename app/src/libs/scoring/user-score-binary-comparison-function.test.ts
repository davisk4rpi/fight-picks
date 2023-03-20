import { UserScore } from './types';
import { userScoreBinaryComparisonFunction } from './user-score-binary-comparison-function';

describe('userScoreBinaryComparisonFunction', () => {
  test('higher score should return -1', () => {
    const targetValue: UserScore = {
      userUid: '1',
      score: 4,
      confidence: 2,
    };
    const existingValue: UserScore = {
      userUid: '2',
      score: 3,
      confidence: 5,
    };
    const act = userScoreBinaryComparisonFunction(targetValue, existingValue);
    expect(act).toBe(-1);
  });
  test('lower score should return 1', () => {
    const targetValue: UserScore = {
      userUid: '1',
      score: 2,
      confidence: 5,
    };
    const existingValue: UserScore = {
      userUid: '2',
      score: 3,
      confidence: 2,
    };
    const act = userScoreBinaryComparisonFunction(targetValue, existingValue);
    expect(act).toBe(1);
  });
  test('equal score but higher confidence should return -1', () => {
    const targetValue: UserScore = {
      userUid: '1',
      score: 2,
      confidence: 3,
    };
    const existingValue: UserScore = {
      userUid: '2',
      score: 2,
      confidence: 1,
    };
    const act = userScoreBinaryComparisonFunction(targetValue, existingValue);
    expect(act).toBe(-1);
  });
  test('equal score but lower confidence should return 1', () => {
    const targetValue: UserScore = {
      userUid: '1',
      score: 2,
      confidence: 1,
    };
    const existingValue: UserScore = {
      userUid: '2',
      score: 2,
      confidence: 5,
    };
    const act = userScoreBinaryComparisonFunction(targetValue, existingValue);
    expect(act).toBe(1);
  });
  test('equal score and equal confidence should return 0', () => {
    const targetValue: UserScore = {
      userUid: '1',
      score: 2,
      confidence: 1,
    };
    const existingValue: UserScore = {
      userUid: '2',
      score: 2,
      confidence: 1,
    };
    const act = userScoreBinaryComparisonFunction(targetValue, existingValue);
    expect(act).toBe(0);
  });
});
