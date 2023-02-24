export type Sex = 'male' | 'female';
export type WeightClassName =
  | 'strawweight'
  | 'flyweight'
  | 'bantamweight'
  | 'featherweight'
  | 'lightweight'
  | 'welterweight'
  | 'middleweight'
  | 'light_heavyweight'
  | 'heavyweight';

export type Fighter = {
  id: string;
  name: string;
};

export const MethodMap = {
  submission: 'submission',
  knockout: 'knockout',
  draw: 'draw',
  decision: 'decision',
  disqualification: 'disqualification',
  no_contest: 'no_contest',
} as const;

export type MethodWithNoWinner =
  | typeof MethodMap.no_contest
  | typeof MethodMap.draw;

export const isMethodWithNoWinner = (
  method?: string | null,
): method is MethodWithNoWinner => {
  return method === MethodMap.no_contest || method === MethodMap.draw;
};

export type MethodWithFinish =
  | typeof MethodMap.knockout
  | typeof MethodMap.submission
  | typeof MethodMap.disqualification;

export type Decision = typeof MethodMap.decision;
export type MethodWithWinner = Decision | MethodWithFinish;

export const isMethodWithWinner = (
  method?: string | null,
): method is MethodWithWinner => {
  return method === typeof MethodMap.decision || isMethodWithFinish(method);
};
export const isMethodWithFinish = (
  method?: string | null,
): method is MethodWithFinish => {
  return [
    MethodMap.knockout as string,
    MethodMap.submission as string,
    MethodMap.disqualification as string,
  ].includes(method ?? '');
};

export type Method = MethodWithNoWinner | MethodWithWinner;

export const RoundMap = { '1': 1, '2': 2, '3': 3, '4': 4, '5': 5 } as const;
export type RoundMapKey = keyof typeof RoundMap;
export type Round = (typeof RoundMap)[RoundMapKey];

export const isRound = (round?: number | null): round is Round => {
  return [1, 2, 3, 4, 5].includes(round ?? 0);
};
export const isConfidence = (
  confidence?: number | null,
): confidence is Confidence => {
  return [1, 2, 3, 4, 5].includes(confidence ?? 0);
};

export const ConfidenceMap = {
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
} as const;
export type ConfidenceMapKey = keyof typeof ConfidenceMap;
export type Confidence = (typeof ConfidenceMap)[ConfidenceMapKey];

export type FightResultWithFinish = {
  winningFighterId: string;
  method: MethodWithFinish;
  round: Round;
};
export type FightResultWithDecision = {
  winningFighterId: string;
  method: Decision;
  round: null;
};

export type FightResultWithWinner =
  | FightResultWithFinish
  | FightResultWithDecision;

export type FightResultWithNoWinner = {
  winningFighterId: null;
  method: MethodWithNoWinner;
  round: null;
};

export type FightResult = FightResultWithWinner | FightResultWithNoWinner;

export type Fight = {
  id: string;
  fightCardId: string;
  rounds: 3 | 5;
  weight: number;
  sex: Sex;
  fighter1Id: string;
  fighter2Id: string;
  result?: FightResult;
};

export type FightPick = FightResultWithWinner & {
  id: string;
  fightId: string;
  confidence: Confidence;
  userUid: string;
};
export type FightPickWithScore = FightPick & {
  score?: number;
  confidenceScore?: number;
};

export type FightCard = {
  id: string;
  mainCardDate: string;
  name: string;
  fightIds: string[];
};

export type User = {
  uid: string;
  displayName: string | null;
  isAdmin?: boolean;
};

export const UserRoles = {
  admin: 'admin',
} as const;
