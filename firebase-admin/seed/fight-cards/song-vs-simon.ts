import { AdminFirestoreModule } from '../../types';
import {
  CreateFightInput,
  FightCardInitialData,
  FirestoreFightCardSeedHelper,
} from '../helpers';

const FIGHT_CARD_STATIC_DATA: FightCardInitialData = {
  mainCardDate: new Date('2023-04-29T23:00:00.000Z'),
  name: 'Song vs Simon',
  org: 'ufc',
};

const fights: CreateFightInput[] = [
  {
    rounds: 5,
    weight: 135,
    sex: 'male',
    fighter1Name: 'Song Yadong',
    fighter2Name: 'Ricky Simon',
  },
  {
    rounds: 3,
    weight: 185,
    sex: 'male',
    fighter1Name: 'Caio Borralho',
    fighter2Name: 'Michal Oleksiejczuk',
  },
  {
    rounds: 3,
    weight: 185,
    sex: 'male',
    fighter1Name: 'Rodolfo Vieira',
    fighter2Name: 'Cody Brundage',
  },
  {
    rounds: 3,
    weight: 145,
    sex: 'male',
    fighter1Name: 'Julian Erosa',
    fighter2Name: 'Fernando Padilla',
  },
  {
    rounds: 3,
    weight: 265,
    sex: 'male',
    fighter1Name: 'Marcos Rogerio de Lima',
    fighter2Name: 'Waldo Cortes-Acosta',
  },
  {
    rounds: 3,
    weight: 170,
    sex: 'male',
    fighter1Name: 'Josh Quinlan',
    fighter2Name: 'Trey Waters',
  },
];

export const seedSongVsSimon = async (adminFirestore: AdminFirestoreModule) => {
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
