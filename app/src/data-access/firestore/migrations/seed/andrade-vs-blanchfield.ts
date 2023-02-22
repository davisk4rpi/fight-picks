import { MethodMap } from '@fight-picks/models';
import firestore from '@react-native-firebase/firestore';

import { AppFirestoreModule } from '../../init-app-firestore';
import { FirebaseMigrationHelper } from '../helpers';

export const seedAndradeVsBlanchfield = async (
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
      'Jessica Andrade',
      'Erin Blanchfield',
      'Jordan Wright',
      'Zac Pauga',
      'Josh Parisian',
      'Jamal Pogues',
      'William Knight',
      'Marcin Prachnio',
      'Jim Miller',
      'Alexander Hernandez',
    ],
    fighterMap,
  );

  const fightCardRef = appFirestore.fightCardsCollection.doc();

  const fight1Ref = migrationHelper.createFight({
    fightCardRef: fightCardRef,
    rounds: 5,
    weight: 125,
    sex: 'female',
    fighter1Ref: fighter1Ref,
    fighter2Ref: fighter2Ref,
    result: {
      winningFighterRef: fighter2Ref,
      method: MethodMap.submission,
      round: 2,
    },
  });

  const fight2Ref = migrationHelper.createFight({
    fightCardRef: fightCardRef,
    rounds: 3,
    weight: 205,
    sex: 'male',
    fighter1Ref: fighter3Ref,
    fighter2Ref: fighter4Ref,
    result: undefined,
  });

  const fight3Ref = migrationHelper.createFight({
    fightCardRef: fightCardRef,
    rounds: 3,
    weight: 265,
    sex: 'male',
    fighter1Ref: fighter5Ref,
    fighter2Ref: fighter6Ref,
    result: undefined,
  });

  const fight4Ref = migrationHelper.createFight({
    fightCardRef: fightCardRef,
    rounds: 3,
    weight: 205,
    sex: 'male',
    fighter1Ref: fighter7Ref,
    fighter2Ref: fighter8Ref,
    result: undefined,
  });

  const fight5Ref = migrationHelper.createFight({
    fightCardRef: fightCardRef,
    rounds: 3,
    weight: 155,
    sex: 'male',
    fighter1Ref: fighter9Ref,
    fighter2Ref: fighter10Ref,
    result: undefined,
  });

  migrationHelper.setFightCard(fightCardRef, {
    mainCardDate: firestore.Timestamp.fromDate(
      new Date('2023-02-19T00:00:00.000Z'),
    ),
    name: 'Andrade vs Blanchfield',
    id: fightCardRef.id,
    fightRefs: [fight1Ref, fight2Ref, fight3Ref, fight4Ref, fight5Ref],
  });
};
