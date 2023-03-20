import { convertUserScoreMapToOrderedArray } from './convert-user-score-map-to-ordered-array';
import { UserScoreUidMap } from './types';

describe('convertUserScoreMapToOrderedArray', () => {
  test('should orders UserScores by score and then confidence', () => {
    const userUid1 = '1';
    const userUid2 = '2';
    const userUid3 = '3';
    const userScore1 = { userUid: userUid1, score: 1, confidence: 5 };
    const userScore2 = { userUid: userUid2, score: 1, confidence: 6 };
    const userScore3 = { userUid: userUid2, score: 4, confidence: 4 };
    const userScoreMap: UserScoreUidMap = new Map([
      [userUid1, userScore1],
      [userUid2, userScore2],
      [userUid3, userScore3],
    ]);
    const scoreBoard = convertUserScoreMapToOrderedArray(userScoreMap);
    expect(scoreBoard.length).toEqual(3);
    expect(scoreBoard).toEqual([userScore3, userScore2, userScore1]);
  });
});
