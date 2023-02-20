import firestore from '@react-native-firebase/firestore';

import { MethodMap } from '../../../../../models.types';
import { AppFirestoreModule } from '../../types';
import { FirebaseMigrationHelper } from '../helpers';

export const seedLewisVsSpivak = async (
  appFirestore: AppFirestoreModule,
  migrationHelper: FirebaseMigrationHelper,
) => {
  const fighterMap = await migrationHelper.getFighterNameMap();
  const [
    fighter1Ref,
    fighter2Ref,
    fighter3Ref,
    fighter4Ref,
    fighter5Ref,
    fighter6Ref,
    fighter7Ref,
    fighter8Ref,
    fighter9Ref,
    fighter10Ref,
  ] = await migrationHelper.createFightersIfNotExist(
    [
      'Derrick Lewis',
      'Serghei Spivac',
      'Jung Da-un',
      'Devin Clark',
      'Marcin Tybura',
      'Blagoy Ivanov',
      'Choi Doo-ho',
      'Kyle Nelson',
      'Yusaku Kinoshita',
      'Adam Fugitt',
    ],
    fighterMap,
  );

  const fightCardRef = appFirestore.fightCardsCollection.doc();

  const fight1Ref = migrationHelper.createFight({
    fightCardRef: fightCardRef,
    rounds: 5,
    weight: 265,
    sex: 'male',
    fighter1Ref: fighter1Ref,
    fighter2Ref: fighter2Ref,
    result: {
      winningFighterRef: fighter2Ref,
      method: MethodMap.submission,
      round: 1,
    },
  });

  const fight2Ref = migrationHelper.createFight({
    fightCardRef: fightCardRef,
    rounds: 3,
    weight: 205,
    sex: 'male',
    fighter1Ref: fighter3Ref,
    fighter2Ref: fighter4Ref,
    result: {
      winningFighterRef: fighter4Ref,
      method: MethodMap.decision,
      round: null,
    },
  });

  const fight3Ref = migrationHelper.createFight({
    fightCardRef: fightCardRef,
    rounds: 3,
    weight: 265,
    sex: 'male',
    fighter1Ref: fighter5Ref,
    fighter2Ref: fighter6Ref,
    result: {
      winningFighterRef: fighter5Ref,
      method: MethodMap.decision,
      round: null,
    },
  });

  const fight4Ref = migrationHelper.createFight({
    fightCardRef: fightCardRef,
    rounds: 3,
    weight: 145,
    sex: 'male',
    fighter1Ref: fighter7Ref,
    fighter2Ref: fighter8Ref,
    result: {
      winningFighterRef: null,
      method: MethodMap.draw,
      round: null,
    },
  });

  const fight5Ref = migrationHelper.createFight({
    fightCardRef: fightCardRef,
    rounds: 3,
    weight: 170,
    sex: 'male',
    fighter1Ref: fighter9Ref,
    fighter2Ref: fighter10Ref,
    result: {
      winningFighterRef: fighter10Ref,
      method: MethodMap.knockout,
      round: 1,
    },
  });

  migrationHelper.setFightCard(fightCardRef, {
    mainCardDate: firestore.Timestamp.fromDate(
      new Date('2023-02-05T06:00:00.000Z'),
    ),
    name: 'Lewis vs Spivak',
    id: fightCardRef.id,
    fightRefs: [fight1Ref, fight2Ref, fight3Ref, fight4Ref, fight5Ref],
  });
};
