import { MethodMap } from '@fight-picks/models';

import { AdminFirestoreModule } from '../../types';
import { FightCardInitialData, FirestoreFightCardSeedHelper } from '../helpers';

const FIGHT_CARD_STATIC_DATA: FightCardInitialData = {
  mainCardDate: new Date('2023-01-22T03:00:00.000Z'),
  name: 'Teixeira vs Hill',
  org: 'ufc',
};

export const seedTeixeiraVsHill = async (
  adminFirestore: AdminFirestoreModule,
) => {
  const seedHelper = new FirestoreFightCardSeedHelper(
    adminFirestore,
    FIGHT_CARD_STATIC_DATA,
  );
  await seedHelper.initializeFightCardSeed();

  seedHelper.createFight({
    rounds: 5,
    weight: 205,
    sex: 'male',
    fighter1Name: 'Glover Teixeira',
    fighter2Name: 'Jamahal Hill',
    result: {
      winningFighter: 2,
      method: MethodMap.decision,
      round: null,
    },
  });

  seedHelper.createFight({
    rounds: 5,
    weight: 125,
    sex: 'male',
    fighter1Name: 'Deiveson Figueiredo',
    fighter2Name: 'Brandon Moreno',
    result: {
      winningFighter: 2,
      method: MethodMap.knockout,
      round: 3,
    },
  });

  seedHelper.createFight({
    rounds: 3,
    weight: 170,
    sex: 'male',
    fighter1Name: 'Gilbert Burns',
    fighter2Name: 'Neil Magny',
    result: {
      winningFighter: 1,
      method: MethodMap.submission,
      round: 1,
    },
  });

  seedHelper.createFight({
    rounds: 3,
    weight: 125,
    sex: 'female',
    fighter1Name: 'Lauren Murphy',
    fighter2Name: 'Jessica Andrade',
    result: {
      winningFighter: 2,
      method: MethodMap.decision,
      round: null,
    },
  });

  seedHelper.createFight({
    rounds: 3,
    weight: 205,
    sex: 'male',
    fighter1Name: 'Paul Craig',
    fighter2Name: 'Johnny Walker',
    result: {
      winningFighter: 2,
      method: MethodMap.knockout,
      round: 1,
    },
  });

  await seedHelper.setFightCard();
  return;
};
