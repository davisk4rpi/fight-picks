import { MethodMap } from '@fight-picks/models';

import { AdminFirestoreModule } from '../../types';
import { FightCardInitialData, FirestoreFightCardSeedHelper } from '../helpers';

const FIGHT_CARD_STATIC_DATA: FightCardInitialData = {
  mainCardDate: new Date('2023-03-05T03:00:00.000Z'),
  name: 'Jones vs Gane',
  org: 'ufc',
};

export const seedJonesVsGane = async (adminFirestore: AdminFirestoreModule) => {
  const seedHelper = new FirestoreFightCardSeedHelper(
    adminFirestore,
    FIGHT_CARD_STATIC_DATA,
  );
  await seedHelper.initializeFightCardSeed();

  seedHelper.createFight({
    rounds: 5,
    weight: 265,
    sex: 'male',
    fighter1Name: 'Jon Jones',
    fighter2Name: 'Ciryl Gane',
    result: {
      winningFighter: 1,
      method: MethodMap.submission,
      round: 1,
    },
  });

  seedHelper.createFight({
    rounds: 5,
    weight: 125,
    sex: 'female',
    fighter1Name: 'Valentina Shevchenko',
    fighter2Name: 'Alexa Grasso',
    result: {
      winningFighter: 2,
      method: MethodMap.submission,
      round: 4,
    },
  });

  seedHelper.createFight({
    rounds: 3,
    weight: 170,
    sex: 'male',
    fighter1Name: 'Geoff Neal',
    fighter2Name: 'Shavkat Rakhmonov',
    result: {
      winningFighter: 2,
      method: MethodMap.submission,
      round: 3,
    },
  });

  seedHelper.createFight({
    rounds: 3,
    weight: 155,
    sex: 'male',
    fighter1Name: 'Mateusz Gamrot',
    fighter2Name: 'Jalin Turner',
    result: {
      winningFighter: 1,
      method: MethodMap.decision,
      round: null,
    },
  });

  seedHelper.createFight({
    rounds: 3,
    weight: 185,
    sex: 'male',
    fighter1Name: 'Bo Nickal',
    fighter2Name: 'Jamie Pickett',
    result: {
      winningFighter: 1,
      method: MethodMap.submission,
      round: 1,
    },
  });

  await seedHelper.setFightCard();
  return;
};
