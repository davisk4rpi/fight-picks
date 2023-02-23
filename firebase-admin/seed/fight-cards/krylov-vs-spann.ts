import { AdminFirestoreModule } from '../../types';
import { FightCardInitialData, FirestoreFightCardSeedHelper } from '../helpers';

const FIGHT_CARD_STATIC_DATA: FightCardInitialData = {
  mainCardDate: new Date('2023-02-26T00:00:00.000Z'),
  name: 'Krylov vs Spann',
  org: 'ufc',
};

export const seedKrylovVsSpann = async (
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
    fighter1Name: 'Nikita Krylov',
    fighter2Name: 'Ryan Spann',
  });

  seedHelper.createFight({
    rounds: 3,
    weight: 185,
    sex: 'male',
    fighter1Name: 'Andre Muniz',
    fighter2Name: 'Brendan Allen',
  });

  seedHelper.createFight({
    rounds: 3,
    weight: 265,
    sex: 'male',
    fighter1Name: 'Augusto Sakai',
    fighter2Name: "Don'Tale Mayes",
  });

  seedHelper.createFight({
    rounds: 3,
    weight: 125,
    sex: 'female',
    fighter1Name: 'Tatiana Suarez',
    fighter2Name: 'Montana De La Rosa',
  });

  seedHelper.createFight({
    rounds: 3,
    weight: 170,
    sex: 'male',
    fighter1Name: 'Mike Malott',
    fighter2Name: 'Yohan Lainesse',
  });

  await seedHelper.setFightCard();
  return;
};
