import { FightPick } from './db/types';

export const DummyEvent = {
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
      },
      fighter2: {
        id: '2',
        name: 'Nassourdine Imavov',
      },
      result: undefined,
    },
    {
      id: '2',
      rounds: 3,
      weight: 145,
      sex: 'male',
      fighter1: {
        id: '3',
        name: 'Dan Ige',
      },
      fighter2: {
        id: '4',
        name: 'Damon Jackson',
      },
      result: undefined,
    },
    {
      id: '3',
      rounds: 3,
      weight: 185,
      sex: 'male',
      fighter1: {
        id: '5',
        name: 'Punahele Soriano',
      },
      fighter2: {
        id: '6',
        name: 'Roman Kopylov',
      },
      result: undefined,
    },
    {
      id: '4',
      rounds: 3,
      weight: 135,
      sex: 'female',
      fighter1: {
        id: '7',
        name: 'Ketlen Vieira',
      },
      fighter2: {
        id: '8',
        name: 'Raquel Pennington',
      },
      result: undefined,
    },
    {
      id: '5',
      rounds: 3,
      weight: 135,
      sex: 'male',
      fighter1: {
        id: '9',
        name: 'Umar Nurmagomedov',
      },
      fighter2: {
        id: '10',
        name: 'Raoni Barcelos',
      },
      result: undefined,
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

export * from './hooks';
