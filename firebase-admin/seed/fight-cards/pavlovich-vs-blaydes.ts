import { AdminFirestoreModule } from '../../types';
import {
  CreateFightInput,
  FightCardInitialData,
  FirestoreFightCardSeedHelper,
} from '../helpers';

const FIGHT_CARD_STATIC_DATA: FightCardInitialData = {
  mainCardDate: new Date('2023-04-22T23:00:00.000Z'),
  name: 'Pavlovich vs Blaydes',
  org: 'ufc',
};

const fights: CreateFightInput[] = [
  {
    rounds: 5,
    weight: 265,
    sex: 'male',
    fighter1Name: 'Sergei Pavlovich',
    fighter2Name: 'Curtis Blaydes',
  },
  {
    rounds: 3,
    weight: 185,
    sex: 'male',
    fighter1Name: 'Brad Tavares',
    fighter2Name: 'Bruno Silva',
  },
  {
    rounds: 3,
    weight: 155,
    sex: 'male',
    fighter1Name: 'Bobby Green',
    fighter2Name: 'Jared Gordon',
  },
  {
    rounds: 3,
    weight: 125,
    sex: 'female',
    fighter1Name: 'Iasmin Lucindo',
    fighter2Name: 'Brogan Walker',
  },
  {
    rounds: 3,
    weight: 170,
    sex: 'male',
    fighter1Name: 'Jeremiah Wells',
    fighter2Name: 'Matthew Semelsberger',
  },
];

export const seedPavlovichVsBlaydes = async (
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
