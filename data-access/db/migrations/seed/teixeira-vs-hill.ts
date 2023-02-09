import { Timestamp } from 'firebase-admin/firestore';

import { FirebaseMigrationHelper } from '../helpers';
import { MigrationFirestoreModule } from '../types';

export const seedTeixeiraVsHill = async (
  appFirestore: MigrationFirestoreModule,
  migrationHelper: FirebaseMigrationHelper,
) => {
  const fighterMap = await migrationHelper.getFighterNameMap();
  const [
    fighter11Ref,
    fighter12Ref,
    fighter13Ref,
    fighter14Ref,
    fighter15Ref,
    fighter16Ref,
    fighter17Ref,
    fighter18Ref,
    fighter19Ref,
    fighter20Ref,
  ] = await migrationHelper.createFightersIfNotExist(
    [
      'Glover Teixeira',
      'Jamahal Hill',
      'Deiveson Figueiredo',
      'Brandon Moreno',
      'Gilbert Burns',
      'Neil Magny',
      'Lauren Murphy',
      'Jessica Andrade',
      'Paul Craig',
      'Johnny Walker',
    ],
    fighterMap,
  );

  const fightCardRef = appFirestore.fightCardsCollection.doc('2');

  const fight1Ref = migrationHelper.createFight({
    id: '6',
    fightCardRef: fightCardRef,
    rounds: 5,
    weight: 205,
    sex: 'male',
    fighter1Ref: fighter11Ref,
    fighter2Ref: fighter12Ref,
    result: {
      winningFighterRef: fighter12Ref,
      method: 'decision',
      round: null,
    },
  });

  const fight2Ref = migrationHelper.createFight({
    id: '7',
    fightCardRef: fightCardRef,
    rounds: 5,
    weight: 125,
    sex: 'male',
    fighter1Ref: fighter13Ref,
    fighter2Ref: fighter14Ref,
    result: {
      winningFighterRef: fighter14Ref,
      method: 'knockout',
      round: 3,
    },
  });

  const fight3Ref = migrationHelper.createFight({
    id: '8',
    fightCardRef: fightCardRef,
    rounds: 3,
    weight: 170,
    sex: 'male',
    fighter1Ref: fighter15Ref,
    fighter2Ref: fighter16Ref,
    result: {
      winningFighterRef: fighter15Ref,
      method: 'submission',
      round: 1,
    },
  });

  const fight4Ref = migrationHelper.createFight({
    id: '9',
    fightCardRef: fightCardRef,
    rounds: 3,
    weight: 125,
    sex: 'female',
    fighter1Ref: fighter17Ref,
    fighter2Ref: fighter18Ref,
    result: {
      winningFighterRef: fighter18Ref,
      method: 'decision',
      round: null,
    },
  });

  const fight5Ref = migrationHelper.createFight({
    id: '10',
    fightCardRef: fightCardRef,
    rounds: 3,
    weight: 205,
    sex: 'male',
    fighter1Ref: fighter19Ref,
    fighter2Ref: fighter20Ref,
    result: {
      winningFighterRef: fighter20Ref,
      method: 'knockout',
      round: 1,
    },
  });

  migrationHelper.setFightCard(fightCardRef, {
    mainCardDate: Timestamp.fromDate(new Date('2023-01-22T03:00:00.000Z')),
    name: 'Teixeira vs Hill',
    id: '2',
    fightRefs: [fight1Ref, fight2Ref, fight3Ref, fight4Ref, fight5Ref],
  });
};
