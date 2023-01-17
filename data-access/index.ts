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
  sex: Sex;
};

export type MethodWithNoWinner = 'no_contest/draw';

export const isMethodWithNoWinner = (
  method?: string | null,
): method is MethodWithNoWinner => {
  return method === 'no_contest/draw';
};

export type MethodWithFinish = 'knockout' | 'submission' | 'disqualification';

export type Decision = 'decision';
export type MethodWithWinner = Decision | MethodWithFinish;

export const isMethodWithWinner = (
  method?: string | null,
): method is MethodWithWinner => {
  return ['decision', 'knockout', 'submission', 'disqualification'].includes(
    method ?? '',
  );
};

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

export type FightResultsWithFinish = {
  id: string;
  winningFighterId: string;
  method: MethodWithFinish;
  round: Round;
};
export type FightResultsWithDecision = {
  id: string;
  winningFighterId: string;
  method: Decision;
  round: null;
};

export type FightResultsWithWinner =
  | FightResultsWithFinish
  | FightResultsWithDecision;

export type FightResultsWithNoWinner = {
  winningFighterId: null;
  method: MethodWithNoWinner;
  round: null;
};

export type FightResults = FightResultsWithWinner | FightResultsWithNoWinner;

export type Fight = {
  id: string;
  rounds: 3 | 5;
  weight: number;
  sex: Sex;
  fighter1: Fighter;
  fighter2: Fighter;
  results?: FightResults;
};
export type Event = {
  id: string;
  mainCardDate: Date;
  name: string;
  fights: Fight[];
};

export type FightPick = FightResultsWithWinner & {
  confidence: Confidence;
};

export const DummyEvent: Event = {
  id: '1',
  mainCardDate: new Date('2023-01-15T00:00:00.000Z'),
  name: 'Strickland vs Imavov',
  fights: [
    {
      id: '1',
      rounds: 5,
      weight: 185,
      sex: 'male',
      fighter1: {
        id: '1',
        name: 'Sean Strickland',
        sex: 'male',
      },
      fighter2: {
        id: '2',
        name: 'Nassourdine Imavov',
        sex: 'male',
      },
      results: undefined,
    },
    {
      id: '2',
      rounds: 3,
      weight: 145,
      sex: 'male',
      fighter1: {
        id: '3',
        name: 'Dan Ige',
        sex: 'male',
      },
      fighter2: {
        id: '4',
        name: 'Damon Jackson',
        sex: 'male',
      },
      results: undefined,
    },
    {
      id: '3',
      rounds: 3,
      weight: 185,
      sex: 'male',
      fighter1: {
        id: '5',
        name: 'Punahele Soriano',
        sex: 'male',
      },
      fighter2: {
        id: '6',
        name: 'Roman Kopylov',
        sex: 'male',
      },
      results: undefined,
    },
    {
      id: '4',
      rounds: 3,
      weight: 135,
      sex: 'female',
      fighter1: {
        id: '7',
        name: 'Ketlen Vieira',
        sex: 'female',
      },
      fighter2: {
        id: '8',
        name: 'Raquel Pennington',
        sex: 'female',
      },
      results: undefined,
    },
    {
      id: '5',
      rounds: 3,
      weight: 135,
      sex: 'male',
      fighter1: {
        id: '9',
        name: 'Umar Nurmagomedov',
        sex: 'male',
      },
      fighter2: {
        id: '10',
        name: 'Raoni Barcelos',
        sex: 'male',
      },
      results: undefined,
    },
  ],
};

export const DummyFightPick: FightPick = {
  id: '1',
  winningFighterId: '1',
  method: 'knockout',
  round: 1,
  confidence: 3,
};
