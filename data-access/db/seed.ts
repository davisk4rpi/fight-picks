// import { faker, SexType } from '@faker-js/faker';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import {
  AppFirestoreModule,
  FirebaseFight,
  FirebaseFighter,
} from './firebaseTypes';

// import { isMethodWithFinish, MethodWithWinner } from './types';

export function seed(appFirestore: AppFirestoreModule) {
  console.log('seeding db');
  // return;
  seedLewisVsSpivak(appFirestore);
  // seedTeixeiraVsHill(appFirestore);
  // const user0Ref = appFirestore.usersCollection.doc(
  //   'jb6B7s9JUZek0gDbCdfAf4LsYzx2',
  // );
  // user0Ref.set({
  //   uid: 'jb6B7s9JUZek0gDbCdfAf4LsYzx2',
  //   authDisplayName: 'Kieran',
  //   createdAt: firestore.FieldValue.serverTimestamp(),
  // });
  // const user1Ref = seedFakerUser(appFirestore, '2');
  // const user2Ref = seedFakerUser(appFirestore, '3');

  // seedFakerFightCard(
  //   appFirestore,
  //   new Date('2023-01-01T08:00:00.000Z'),
  //   'UFC 111',
  //   [user0Ref, user1Ref, user2Ref],
  // );
  // seedFakerFightCard(
  //   appFirestore,
  //   new Date('2023-01-08T06:00:00.000Z'),
  //   'UFC 112',
  //   [user0Ref, user1Ref, user2Ref],
  // );
  // seedFakerFightCard(
  //   appFirestore,
  //   new Date('2023-01-15T06:00:00.000Z'),
  //   'UFC 113',
  //   [user0Ref, user1Ref, user2Ref],
  // );
  // seedFakerFightCard(
  //   appFirestore,
  //   new Date('2023-01-23T01:00:00.000Z'),
  //   'UFC 114',
  //   [user0Ref, user1Ref, user2Ref],
  // );
  // seedFakerFightCard(
  //   appFirestore,
  //   new Date('2023-01-29T03:00:00.000Z'),
  //   'UFC 115',
  //   [user0Ref, user1Ref, user2Ref],
  // );
  // seedFakerFightCard(
  //   appFirestore,
  //   new Date('2023-02-01T06:00:00.000Z'),
  //   'UFC 116',
  //   [user0Ref, user1Ref, user2Ref],
  // );
}

// const seedFakerFightCard = (
//   appFirestore: AppFirestoreModule,
//   mainCardDate: Date,
//   name: string,
//   userRefs: FirebaseUserRef[],
// ) => {
//   const fightCardRef = appFirestore.fightCardsCollection.doc(name);
//   const fightRef1 = seedFakerFight(
//     appFirestore,
//     fightCardRef,
//     true,
//     userRefs,
//     1,
//   );
//   const fightRef2 = seedFakerFight(
//     appFirestore,
//     fightCardRef,
//     false,
//     userRefs,
//     2,
//   );
//   const fightRef3 = seedFakerFight(
//     appFirestore,
//     fightCardRef,
//     false,
//     userRefs,
//     3,
//   );
//   const fightRef4 = seedFakerFight(
//     appFirestore,
//     fightCardRef,
//     false,
//     userRefs,
//     4,
//   );
//   const fightRef5 = seedFakerFight(
//     appFirestore,
//     fightCardRef,
//     false,
//     userRefs,
//     5,
//   );
//   fightCardRef.set({
//     id: fightCardRef.id,
//     mainCardDate,
//     createdAt: firestore.FieldValue.serverTimestamp(),
//     name,
//     fightRefs: [fightRef1, fightRef2, fightRef3, fightRef4, fightRef5],
//   });
//   return {
//     fightCardRef,
//     fightRefs: [fightRef1, fightRef2, fightRef3, fightRef4, fightRef5],
//   };
// };
// const seedFakerFight = (
//   appFirestore: AppFirestoreModule,
//   fightCardRef: FirebaseFightCardRef,
//   main = false,
//   userRefs: FirebaseUserRef[],
//   idSuffix: number,
// ) => {
//   const fightRef = appFirestore.fightsCollection.doc(
//     `${fightCardRef.id}-${idSuffix}`,
//   );
//   const sex = faker.name.sexType();
//   const fighter1Ref = seedFakerFighter(appFirestore, sex, `${fightRef.id}-1`);
//   const fighter2Ref = seedFakerFighter(appFirestore, sex, `${fightRef.id}-2`);

//   fightRef.set({
//     id: fightRef.id,
//     fighter1Ref,
//     fighter2Ref,
//     weight: seedFakerWeight(sex),
//     rounds: main ? 5 : 3,
//     sex,
//     fightCardRef,
//     result: generateFakerFightResult(main, fighter1Ref, fighter2Ref),
//     createdAt: firestore.FieldValue.serverTimestamp(),
//   });
//   userRefs.forEach(userRef => {
//     seedFakerFightPick(
//       appFirestore,
//       userRef,
//       fightRef,
//       main,
//       fighter1Ref,
//       fighter2Ref,
//     );
//   });
//   return fightRef;
// };
// const seedFakerFighter = (
//   appFirestore: AppFirestoreModule,
//   sex: SexType,
//   id: string,
// ) => {
//   const fighterRef = appFirestore.fightersCollection.doc(id);
//   fighterRef.set({
//     id: fighterRef.id,
//     name: faker.name.firstName(sex) + ' ' + faker.name.lastName(),
//     createdAt: firestore.FieldValue.serverTimestamp(),
//   });
//   return fighterRef;
// };
// const seedFakerWeight = (sex: SexType) => {
//   const weights =
//     sex === 'female'
//       ? [115, 125, 135, 145]
//       : [125, 135, 145, 155, 170, 185, 205, 265];
//   return faker.helpers.arrayElement(weights);
// };

// const seedFakerFightPick = (
//   appFirestore: AppFirestoreModule,
//   userRef: FirebaseUserRef,
//   fightRef: FirebaseFightRef,
//   main: boolean,
//   fighter1Ref: FirebaseFighterRef,
//   fighter2Ref: FirebaseFighterRef,
// ) => {
//   const fightPickRef = appFirestore.repository.users
//     .getFightPicksCollection(userRef.id)
//     .doc(userRef.id + fightRef.id);

//   const result = generateFakerFightResult(main, fighter1Ref, fighter2Ref);
//   fightPickRef.set({
//     id: fightPickRef.id,
//     userRef: userRef,
//     method: result.method,
//     round: result.round,
//     winningFighterRef: result.winningFighterRef ?? fighter1Ref,
//     confidence: seedFakerConfidence(),
//     fightRef,
//     createdAt: firestore.FieldValue.serverTimestamp(),
//     updatedAt: firestore.FieldValue.serverTimestamp(),
//   });
// };
// const generateFakerFightResult = (
//   main: boolean,
//   fighter1Ref: FirebaseFighterRef,
//   fighter2Ref: FirebaseFighterRef,
// ): FirebaseFightResult => {
//   const method = seedFakerFightPickMethod();
//   if (isMethodWithFinish(method)) {
//     return {
//       winningFighterRef: Math.random() > 0.5 ? fighter1Ref : fighter2Ref,
//       method,
//       round: seedFakerRound(main),
//     };
//   } else {
//     return {
//       winningFighterRef: Math.random() > 0.5 ? fighter1Ref : fighter2Ref,
//       method: 'decision',
//       round: null,
//     };
//   }
// };
// const seedFakerFightPickMethod = () =>
//   faker.helpers.arrayElement<MethodWithWinner>([
//     'decision',
//     'knockout',
//     'submission',
//   ]);
// const seedFakerConfidence = () => faker.helpers.arrayElement([1, 2, 3, 4, 5]);
// const seedFakerRound = (main: boolean) => {
//   const weights = main ? [1, 2, 3, 4, 5] : [1, 2, 3];
//   return faker.helpers.arrayElement(weights);
// };

// const seedFakerUser = (appFirestore: AppFirestoreModule, uid: string) => {
//   const userRef = appFirestore.usersCollection.doc(uid);
//   userRef.set({
//     uid,
//     authDisplayName: faker.name.firstName(),
//     createdAt: firestore.FieldValue.serverTimestamp(),
//   });
//   return userRef;
// };

//
//
//
//
//
//
//

const createFighter = (
  fightersCollection: FirebaseFirestoreTypes.CollectionReference<FirebaseFighter>,
  fighter: Omit<FirebaseFighter, 'createdAt'>,
) => {
  const ref = fightersCollection.doc(fighter.id);
  ref.set({
    ...fighter,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
  return ref;
};

const createFight = (
  fightsCollection: FirebaseFirestoreTypes.CollectionReference<FirebaseFight>,
  fight: Omit<FirebaseFight, 'createdAt'>,
) => {
  const ref = fightsCollection.doc(fight.id);
  ref.set({
    ...fight,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
  return ref;
};

const seedLewisVsSpivak = (appFirestore: AppFirestoreModule) => {
  const fighter1Ref = createFighter(appFirestore.fightersCollection, {
    id: '1',
    name: 'Derrick Lewis',
  });
  const fighter2Ref = createFighter(appFirestore.fightersCollection, {
    id: '2',
    name: 'Serghei Spivac',
  });
  const fighter3Ref = createFighter(appFirestore.fightersCollection, {
    id: '3',
    name: 'Jung Da-un',
  });
  const fighter4Ref = createFighter(appFirestore.fightersCollection, {
    id: '4',
    name: 'Devin Clark',
  });
  const fighter5Ref = createFighter(appFirestore.fightersCollection, {
    id: '5',
    name: 'Marcin Tybura',
  });
  const fighter6Ref = createFighter(appFirestore.fightersCollection, {
    id: '6',
    name: 'Blagoy Ivanov',
  });
  const fighter7Ref = createFighter(appFirestore.fightersCollection, {
    id: '7',
    name: 'Choi Doo-ho',
  });
  const fighter8Ref = createFighter(appFirestore.fightersCollection, {
    id: '8',
    name: 'Kyle Nelson',
  });
  const fighter9Ref = createFighter(appFirestore.fightersCollection, {
    id: '9',
    name: 'Yusaku Kinoshita',
  });
  const fighter10Ref = createFighter(appFirestore.fightersCollection, {
    id: '10',
    name: 'Adam Fugitt',
  });

  const fightCardRef = appFirestore.fightCardsCollection.doc('1');

  const fight1Ref = createFight(appFirestore.fightsCollection, {
    id: '1',
    fightCardRef: fightCardRef,
    rounds: 5,
    weight: 265,
    sex: 'male',
    fighter1Ref: fighter1Ref,
    fighter2Ref: fighter2Ref,
  });

  const fight2Ref = createFight(appFirestore.fightsCollection, {
    id: '2',
    fightCardRef: fightCardRef,
    rounds: 3,
    weight: 205,
    sex: 'male',
    fighter1Ref: fighter3Ref,
    fighter2Ref: fighter4Ref,
  });

  const fight3Ref = createFight(appFirestore.fightsCollection, {
    id: '3',
    fightCardRef: fightCardRef,
    rounds: 3,
    weight: 265,
    sex: 'male',
    fighter1Ref: fighter5Ref,
    fighter2Ref: fighter6Ref,
  });

  const fight4Ref = createFight(appFirestore.fightsCollection, {
    id: '4',
    fightCardRef: fightCardRef,
    rounds: 3,
    weight: 145,
    sex: 'male',
    fighter1Ref: fighter7Ref,
    fighter2Ref: fighter8Ref,
  });

  const fight5Ref = createFight(appFirestore.fightsCollection, {
    id: '5',
    fightCardRef: fightCardRef,
    rounds: 3,
    weight: 170,
    sex: 'male',
    fighter1Ref: fighter9Ref,
    fighter2Ref: fighter10Ref,
  });

  fightCardRef.set({
    mainCardDate: new Date('2023-02-05T06:00:00.000Z'),
    name: 'Lewis vs Spivak',
    id: '1',
    createdAt: firestore.FieldValue.serverTimestamp(),
    fightRefs: [fight1Ref, fight2Ref, fight3Ref, fight4Ref, fight5Ref],
  });
};

export const seedTeixeiraVsHill = (appFirestore: AppFirestoreModule) => {
  const fighter11Ref = createFighter(appFirestore.fightersCollection, {
    id: '11',
    name: 'Glover Teixeira',
  });
  const fighter12Ref = createFighter(appFirestore.fightersCollection, {
    id: '12',
    name: 'Jamahal Hill',
  });
  const fighter13Ref = createFighter(appFirestore.fightersCollection, {
    id: '13',
    name: 'Deiveson Figueiredo',
  });
  const fighter14Ref = createFighter(appFirestore.fightersCollection, {
    id: '14',
    name: 'Brandon Moreno',
  });
  const fighter15Ref = createFighter(appFirestore.fightersCollection, {
    id: '15',
    name: 'Gilbert Burns',
  });
  const fighter16Ref = createFighter(appFirestore.fightersCollection, {
    id: '16',
    name: 'Neil Magny',
  });
  const fighter17Ref = createFighter(appFirestore.fightersCollection, {
    id: '17',
    name: 'Lauren Murphy',
  });
  const fighter18Ref = createFighter(appFirestore.fightersCollection, {
    id: '18',
    name: 'Jessica Andrade',
  });
  const fighter19Ref = createFighter(appFirestore.fightersCollection, {
    id: '19',
    name: 'Paul Craig',
  });
  const fighter20Ref = createFighter(appFirestore.fightersCollection, {
    id: '20',
    name: 'Johnny Walker',
  });

  const fightCardRef = appFirestore.fightCardsCollection.doc('2');

  const fight1Ref = createFight(appFirestore.fightsCollection, {
    id: '6',
    fightCardRef: fightCardRef,
    rounds: 5,
    weight: 205,
    sex: 'male',
    fighter1Ref: fighter11Ref,
    fighter2Ref: fighter12Ref,
    // result: {
    //   winningFighterRef: null,
    //   method: 'no_contest',
    //   round: null,
    // },
    result: {
      winningFighterRef: fighter12Ref,
      method: 'decision',
      round: null,
    },
  });

  const fight2Ref = createFight(appFirestore.fightsCollection, {
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

  const fight3Ref = createFight(appFirestore.fightsCollection, {
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

  const fight4Ref = createFight(appFirestore.fightsCollection, {
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

  const fight5Ref = createFight(appFirestore.fightsCollection, {
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

  fightCardRef.set({
    mainCardDate: new Date('2023-01-22T03:00:00.000Z'),
    name: 'Teixeira vs Hill',
    id: '2',
    createdAt: firestore.FieldValue.serverTimestamp(),
    fightRefs: [fight1Ref, fight2Ref, fight3Ref, fight4Ref, fight5Ref],
  });
};
