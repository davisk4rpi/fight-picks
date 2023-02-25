import {
  FieldValue,
  QueryDocumentSnapshot,
  Timestamp,
} from 'firebase-admin/firestore';

import { faker } from '@faker-js/faker';
import { MethodMap } from '@fight-picks/models';

import {
  AdminFirestoreModule,
  FirestoreFight,
  FirestoreFightRef,
  FirestoreUserRef,
} from '../../types';

export const seedUserData = async (adminFirestore: AdminFirestoreModule) => {
  const userRefs = seedUsers(adminFirestore);
  const fightsSnapshot = await adminFirestore.fightsCollection.get();

  fightsSnapshot.docs.forEach(fightDoc => {
    userRefs.forEach(userRef =>
      seedFightPick(userRef, fightDoc, adminFirestore),
    );
  });
};
export const seedFightPick = (
  userRef: FirestoreUserRef,
  fightDoc: QueryDocumentSnapshot<FirestoreFight>,
  adminFirestore: AdminFirestoreModule,
) => {
  const fight = fightDoc.data();
  const fightPickRef = adminFirestore.userFightPicksCollection(userRef).doc();

  fightPickRef.set({
    id: fightPickRef.id,
    userRef,
    fightRef: fightDoc.ref,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    ...fakeFightPickResult(fight),
  });
  return fightPickRef;
};

export const fakeFightPickResult = (fight: FirestoreFight) => {
  const confidence = faker.helpers.arrayElement([1, 2, 3, 4, 5]);

  const winningFighterRef = faker.helpers.arrayElement([
    fight.fighter1Ref,
    fight.fighter2Ref,
  ]);
  const method = fakeMethodOfVictory();
  if (method === MethodMap.decision) {
    return {
      method,
      round: null,
      confidence,
      winningFighterRef,
    };
  }
  const round = fakeRound(fight.rounds === 5 ? 5 : 3);
  return {
    method,
    round,
    confidence,
    winningFighterRef,
  };
};

export const fakeMethodOfVictory = () => {
  const decisionOrFinish = faker.helpers.arrayElement([
    MethodMap.decision,
    'finish',
  ]);
  if (decisionOrFinish === MethodMap.decision) return MethodMap.decision;
  return faker.helpers.arrayElement([MethodMap.knockout, MethodMap.submission]);
};

export const fakeRound = (rounds: 3 | 5) => {
  const arr = rounds === 5 ? [1, 2, 3, 4, 5] : [1, 2, 3];
  return faker.helpers.arrayElement(arr);
};

export const seedUsers = (adminFirestore: AdminFirestoreModule, qty = 10) => {
  const users: FirestoreUserRef[] = [];
  for (let i = 0; i < qty; i++) {
    users.push(seedUser(adminFirestore));
  }
  return users;
};

const seedUser = (adminFirestore: AdminFirestoreModule) => {
  const userRef = adminFirestore.usersCollection.doc();
  userRef.set({
    uid: userRef.id,
    authDisplayName: faker.name.fullName(),
    createdAt: FieldValue.serverTimestamp(),
    roles: [],
  });
  return userRef;
};
