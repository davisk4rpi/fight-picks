import { AdminFirestoreModule } from '../../types';
import {
  CreateFightInput,
  FightCardInitialData,
  FirestoreFightCardSeedHelper,
} from '../helpers';

const FIGHT_CARD_STATIC_DATA: FightCardInitialData = {
  mainCardDate: new Date('2023-03-18T21:00:00.000Z'),
  name: 'Edwards vs Usman',
  org: 'ufc',
};

const fights: CreateFightInput[] = [
  {
    rounds: 5,
    weight: 170,
    sex: 'male',
    fighter1Name: 'Leon Edwards',
    fighter2Name: 'Kamaru Usman',
  },
  {
    rounds: 3,
    weight: 155,
    sex: 'male',
    fighter1Name: 'Justin Gaethje',
    fighter2Name: 'Rafael Fiziev',
  },
  {
    rounds: 3,
    weight: 170,
    sex: 'male',
    fighter1Name: 'Gunnar Nelson',
    fighter2Name: 'Bryan Barbarena',
  },
  {
    rounds: 3,
    weight: 125,
    sex: 'female',
    fighter1Name: 'Jennifer Maia',
    fighter2Name: "Casey O'Neill",
  },
  {
    rounds: 3,
    weight: 185,
    sex: 'male',
    fighter1Name: 'Marvin Vettori',
    fighter2Name: 'Roman Dolidze',
  },
];

export const seedEdwardsVsUsman3 = async (
  adminFirestore: AdminFirestoreModule,
) => {
  const seedHelper = new FirestoreFightCardSeedHelper(
    adminFirestore,
    FIGHT_CARD_STATIC_DATA,
  );
  await seedHelper.initializeFightCardSeed();

  fights.forEach(fight => {
    seedHelper.createFight(fight);
  });
  await seedHelper.setFightCard();
  return;
};
