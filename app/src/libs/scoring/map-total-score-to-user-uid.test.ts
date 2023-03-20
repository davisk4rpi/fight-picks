import {
  mapTotalScoreToUserUid,
  PartialFightPickWithScore,
} from './map-total-score-to-user-uid';

describe('mapTotalScoreToUserUid', () => {
  test('creates an aggregate record containing the sum of all scores for each user', () => {
    const userUid1 = '1';
    const userUid2 = '2';
    const fightPicksWithScores: PartialFightPickWithScore[] = [
      { userUid: userUid1, score: 1, confidence: 5 },
      { userUid: userUid1, score: 0, confidence: 5 },
      { userUid: userUid1, score: 4, confidence: 5 },
      { userUid: userUid2, score: 1, confidence: 5 },
    ];
    const userScoreMap = mapTotalScoreToUserUid(fightPicksWithScores);
    expect(userScoreMap.size).toEqual(2);
    expect(userScoreMap.get(userUid1)).toEqual({
      userUid: userUid1,
      score: 5,
      confidence: 5,
    });
    expect(userScoreMap.get(userUid2)).toEqual({
      userUid: userUid2,
      score: 1,
      confidence: 5,
    });
  });

  test('can result in a negative confidence score', () => {
    const userUid = '1';
    const fightPicksWithScores: PartialFightPickWithScore[] = [
      { userUid: userUid, score: 1, confidence: 1 },
      { userUid: userUid, score: 0, confidence: 2 },
      { userUid: userUid, score: 0, confidence: 4 },
    ];
    const userScoreMap = mapTotalScoreToUserUid(fightPicksWithScores);
    expect(userScoreMap.size).toEqual(1);
    expect(userScoreMap.get(userUid)).toEqual({
      userUid,
      score: 1,
      confidence: -5,
    });
  });
});
