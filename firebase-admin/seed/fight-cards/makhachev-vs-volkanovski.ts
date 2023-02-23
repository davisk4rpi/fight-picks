import { MethodMap } from '@fight-picks/models';

import { AdminFirestoreModule } from '../../types';
import { FightCardInitialData, FirestoreFightCardSeedHelper } from '../helpers';

const FIGHT_CARD_STATIC_DATA: FightCardInitialData = {
  mainCardDate: new Date('2023-02-12T03:00:00.000Z'),
  name: 'Makhachev vs Volkanovski',
  org: 'ufc',
};

export const seedMakhachevVsVolkanovski = async (
  adminFirestore: AdminFirestoreModule,
) => {
  const seedHelper = new FirestoreFightCardSeedHelper(
    adminFirestore,
    FIGHT_CARD_STATIC_DATA,
  );
  await seedHelper.initializeFightCardSeed();

  seedHelper.createFight({
    rounds: 5,
    weight: 155,
    sex: 'male',
    fighter1Name: 'Islam Makhachev',
    fighter2Name: 'Alexander Volkanovski',
    result: {
      winningFighter: 1,
      method: MethodMap.decision,
      round: null,
    },
  });

  seedHelper.createFight({
    rounds: 5,
    weight: 145,
    sex: 'male',
    fighter1Name: 'Yair Rodriguez',
    fighter2Name: 'Josh Emmitt',
    result: {
      winningFighter: 1,
      method: MethodMap.submission,
      round: 2,
    },
  });

  seedHelper.createFight({
    rounds: 3,
    weight: 170,
    sex: 'male',
    fighter1Name: 'Jack Della Maddalena',
    fighter2Name: 'Randy Brown',
    result: {
      winningFighter: 1,
      method: MethodMap.submission,
      round: 1,
    },
  });

  seedHelper.createFight({
    rounds: 3,
    weight: 265,
    sex: 'male',
    fighter1Name: 'Justin Tafa',
    fighter2Name: 'Parker Porter',
    result: {
      winningFighter: 1,
      method: MethodMap.knockout,
      round: 1,
    },
  });

  seedHelper.createFight({
    rounds: 3,
    weight: 205,
    sex: 'male',
    fighter1Name: 'Jimmy Crute',
    fighter2Name: 'Alonzo Menifield',
    result: {
      winningFighter: null,
      method: MethodMap.draw,
      round: null,
    },
  });

  await seedHelper.setFightCard();
  return;
};
