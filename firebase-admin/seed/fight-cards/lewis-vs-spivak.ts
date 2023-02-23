import { MethodMap } from '@fight-picks/models';

import { AdminFirestoreModule } from '../../types';
import { FightCardInitialData, FirestoreFightCardSeedHelper } from '../helpers';

const FIGHT_CARD_STATIC_DATA: FightCardInitialData = {
  mainCardDate: new Date('2023-02-05T06:00:00.000Z'),
  name: 'Lewis vs Spivak',
  org: 'ufc',
};

export const seedLewisVsSpivak = async (
  adminFirestore: AdminFirestoreModule,
) => {
  const seedHelper = new FirestoreFightCardSeedHelper(
    adminFirestore,
    FIGHT_CARD_STATIC_DATA,
  );
  await seedHelper.initializeFightCardSeed();

  seedHelper.createFight({
    rounds: 5,
    weight: 265,
    sex: 'male',
    fighter1Name: 'Derrick Lewis',
    fighter2Name: 'Serghei Spivac',
    result: {
      winningFighter: 2,
      method: MethodMap.submission,
      round: 1,
    },
  });

  seedHelper.createFight({
    rounds: 3,
    weight: 205,
    sex: 'male',
    fighter1Name: 'Jung Da-un',
    fighter2Name: 'Devin Clark',
    result: {
      winningFighter: 2,
      method: MethodMap.decision,
      round: null,
    },
  });

  seedHelper.createFight({
    rounds: 3,
    weight: 265,
    sex: 'male',
    fighter1Name: 'Marcin Tybura',
    fighter2Name: 'Blagoy Ivanov',
    result: {
      winningFighter: 1,
      method: MethodMap.decision,
      round: null,
    },
  });

  seedHelper.createFight({
    rounds: 3,
    weight: 145,
    sex: 'male',
    fighter1Name: 'Choi Doo-ho',
    fighter2Name: 'Kyle Nelson',
    result: {
      winningFighter: null,
      method: MethodMap.draw,
      round: null,
    },
  });

  seedHelper.createFight({
    rounds: 3,
    weight: 170,
    sex: 'male',
    fighter1Name: 'Yusaku Kinoshita',
    fighter2Name: 'Adam Fugitt',
    result: {
      winningFighter: 2,
      method: MethodMap.knockout,
      round: 1,
    },
  });

  await seedHelper.setFightCard();
  return;
};
