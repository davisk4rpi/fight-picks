import { AdminFirestoreModule } from '../../types';
import { FightCardInitialData, FirestoreFightCardSeedHelper } from '../helpers';

const FIGHT_CARD_STATIC_DATA: FightCardInitialData = {
  mainCardDate: new Date('2023-03-11T23:00:00.000Z'),
  name: 'Yan vs Dvalishvili',
  org: 'ufc',
};

export const seedYanVsDvalishvili = async (
  adminFirestore: AdminFirestoreModule,
) => {
  const seedHelper = new FirestoreFightCardSeedHelper(
    adminFirestore,
    FIGHT_CARD_STATIC_DATA,
  );
  await seedHelper.initializeFightCardSeed();

  seedHelper.createFight({
    rounds: 5,
    weight: 135,
    sex: 'male',
    fighter1Name: 'Petr Yan',
    fighter2Name: 'Merab Dvalishvili',
  });

  seedHelper.createFight({
    rounds: 3,
    weight: 265,
    sex: 'male',
    fighter1Name: 'Alexander Volkov',
    fighter2Name: 'Alexander Romanov',
  });

  seedHelper.createFight({
    rounds: 3,
    weight: 213,
    sex: 'male',
    fighter1Name: 'Nikita Krylov',
    fighter2Name: 'Ryan Spann',
  });

  seedHelper.createFight({
    rounds: 3,
    weight: 135,
    sex: 'male',
    fighter1Name: 'Said Nurmagomedov',
    fighter2Name: 'Jonathan Martinez',
  });

  seedHelper.createFight({
    rounds: 3,
    weight: 135,
    sex: 'male',
    fighter1Name: 'Mario Bautista',
    fighter2Name: 'Guido Cannetti',
  });

  seedHelper.createFight({
    rounds: 3,
    weight: 205,
    sex: 'male',
    fighter1Name: 'Vitor Petrino',
    fighter2Name: 'Anton Turkalj',
  });

  await seedHelper.setFightCard();
  return;
};
