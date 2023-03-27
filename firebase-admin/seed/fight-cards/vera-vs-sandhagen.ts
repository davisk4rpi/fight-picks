import { AdminFirestoreModule } from '../../types';
import {
  CreateFightInput,
  FightCardInitialData,
  FirestoreFightCardSeedHelper,
} from '../helpers';

const FIGHT_CARD_STATIC_DATA: FightCardInitialData = {
  mainCardDate: new Date('2023-03-25T23:00:00.000Z'),
  name: 'Vera vs Sandhagen',
  org: 'ufc',
};

const fights: CreateFightInput[] = [
  {
    rounds: 5,
    weight: 135,
    sex: 'male',
    fighter1Name: 'Marlon Vera',
    fighter2Name: 'Cory Sandhagen',
  },
  {
    rounds: 3,
    weight: 135,
    sex: 'female',
    fighter1Name: 'Holly Holm',
    fighter2Name: 'Yana Santos',
  },
  {
    rounds: 3,
    weight: 145,
    sex: 'male',
    fighter1Name: 'Nate Landwehr',
    fighter2Name: 'Austin Lingo',
  },
  {
    rounds: 3,
    weight: 125,
    sex: 'female',
    fighter1Name: 'Andrea Lee',
    fighter2Name: 'Maycee Barber',
  },
  {
    rounds: 3,
    weight: 125,
    sex: 'male',
    fighter1Name: 'Alex Perez',
    fighter2Name: 'Manel Kape',
  },
  {
    rounds: 3,
    weight: 185,
    sex: 'male',
    fighter1Name: 'Chidi Njokuani',
    fighter2Name: 'Albert Duraev',
  },
];

export const seedVeraVsSandhagen = async (
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
