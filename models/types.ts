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

export type MethodWithFinish =
  | typeof MethodMap.knockout
  | typeof MethodMap.submission
  | typeof MethodMap.disqualification;

export type Decision = typeof MethodMap.decision;

export type MethodWithNoRound = MethodWithNoWinner | Decision;
export type MethodWithWinner = Decision | MethodWithFinish;

export type Method = MethodWithNoWinner | MethodWithWinner;

export const RoundMap = { '1': 1, '2': 2, '3': 3, '4': 4, '5': 5 } as const;
export type RoundMapKey = keyof typeof RoundMap;
export type Round = (typeof RoundMap)[RoundMapKey];

export const ConfidenceMap = {
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
} as const;
export type ConfidenceMapKey = keyof typeof ConfidenceMap;
export type Confidence = (typeof ConfidenceMap)[ConfidenceMapKey];

export type FightResultWinningFighter = 1 | 2;
export type FightResultWithFinish = {
  winningFighter: FightResultWinningFighter;
  method: MethodWithFinish;
  round: Round;
};
export type FightResultWithDecision = {
  winningFighter: FightResultWinningFighter;
  method: Decision;
  round: null;
};

export type FightResultWithWinner =
  | FightResultWithFinish
  | FightResultWithDecision;

export type FightResultWithNoWinner = {
  winningFighter: null;
  method: MethodWithNoWinner;
  round: null;
};

export type FightResult = FightResultWithWinner | FightResultWithNoWinner;

export type RawFightResult = {
  method: string;
  round: number | null;
  winningFighter: number | null;
};

export type Fight = {
  id: string;
  fightCardId: string;
  rounds: 3 | 5;
  weight: number;
  sex: Sex;
  fighter1Id: string;
  fighter2Id: string;
  resultCode: string | null;
  isCanceled: boolean;
};

export type FightPick = {
  id: string;
  fightId: string;
  confidence: Confidence;
  userUid: string;
  resultCode: string;
};

export type FightPickWithScore = FightPick & {
  score?: number;
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

export type OrgSlug = 'ufc'; //| 'one';

export const UserRoles = {
  admin: 'admin',
} as const;

export const LeagueInviteStatusMap = {
  pending: 'pending',
  rejected: 'rejected',
  accepted: 'accepted',
} as const;
export type LeagueInviteStatusMapKey = keyof typeof LeagueInviteStatusMap;
export type LeagueInviteStatus =
  (typeof LeagueInviteStatusMap)[LeagueInviteStatusMapKey];
