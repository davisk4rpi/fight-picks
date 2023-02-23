import { MethodMap } from '@fight-picks/models';

import { AdminFirestoreModule } from '../../types';
import { FightCardInitialData, FirestoreFightCardSeedHelper } from '../helpers';

const FIGHT_CARD_STATIC_DATA: FightCardInitialData = {
  mainCardDate: new Date('2023-02-19T00:00:00.000Z'),
  name: 'Andrade vs Blanchfield',
  org: 'ufc',
};

export const seedAndradeVsBlanchfield = async (
  adminFirestore: AdminFirestoreModule,
) => {
  const seedHelper = new FirestoreFightCardSeedHelper(
    adminFirestore,
    FIGHT_CARD_STATIC_DATA,
  );
  await seedHelper.initializeFightCardSeed();

  seedHelper.createFight({
    rounds: 5,
    weight: 125,
    sex: 'female',
    fighter1Name: 'Jessica Andrade',
    fighter2Name: 'Erin Blanchfield',
    result: {
      winningFighter: 2,
      method: MethodMap.submission,
      round: 2,
    },
  });

  seedHelper.createFight({
    rounds: 3,
    weight: 205,
    sex: 'male',
    fighter1Name: 'Jordan Wright',
    fighter2Name: 'Zac Pauga',
    result: { winningFighter: 2, method: MethodMap.decision, round: null },
  });

  seedHelper.createFight({
    rounds: 3,
    weight: 265,
    sex: 'male',
    fighter1Name: 'Josh Parisian',
    fighter2Name: 'Jamal Pogues',
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
    fighter1Name: 'William Knight',
    fighter2Name: 'Marcin Prachnio',
    result: {
      winningFighter: 2,
      method: MethodMap.decision,
      round: null,
    },
  });

  seedHelper.createFight({
    rounds: 3,
    weight: 155,
    sex: 'male',
    fighter1Name: 'Jim Miller',
    fighter2Name: 'Alexander Hernandez',
    result: {
      winningFighter: 2,
      method: MethodMap.decision,
      round: null,
    },
  });

  await seedHelper.setFightCard();
  return;
};
