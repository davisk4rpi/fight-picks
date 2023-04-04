export type ScoreObject = {
  score?: number;
  confidence: number;
};

export type UserScore = {
  userUid: string;
  score: number;
  confidence: number;
};

export type UserScoreUidMap = Map<string, UserScore>;
