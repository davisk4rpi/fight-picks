import {
  CollectionGroup,
  CollectionReference,
  Firestore,
  Query,
} from 'firebase-admin/firestore';

import {
  AdminFirestoreModule,
  FirestoreFightCardsCollectionReference,
  FirestoreFightersCollectionReference,
  FirestoreFightPicksCollectionGroup,
  FirestoreFightPicksCollectionReference,
  FirestoreFightsCollectionReference,
  FirestoreMigrationsCollectionReference,
  FirestoreUserRef,
  FirestoreUsersCollectionReference,
} from './types';

export const initAdminFirestore = (
  firestoreInstance: Firestore,
): AdminFirestoreModule => {
  // firestoreInstance.clearPersistence();

  const usersCollection = firestoreInstance.collection(
    'users',
  ) as FirestoreUsersCollectionReference;
  const fightCardsCollection = firestoreInstance.collection(
    'fightCards',
  ) as FirestoreFightCardsCollectionReference;
  const fightersCollection = firestoreInstance.collection(
    'fighters',
  ) as FirestoreFightersCollectionReference;
  const fightsCollection = firestoreInstance.collection(
    'fights',
  ) as FirestoreFightsCollectionReference;
  const migrationsCollection = firestoreInstance.collection(
    'migrations',
  ) as FirestoreMigrationsCollectionReference;

  const fightPicksQuery = firestoreInstance.collectionGroup(
    'fightPicks',
  ) as FirestoreFightPicksCollectionGroup;

  const userFightPicksCollection = (userRef: FirestoreUserRef) =>
    userRef.collection('fightPicks') as FirestoreFightPicksCollectionReference;

  return {
    usersCollection,
    fightCardsCollection,
    fightersCollection,
    fightsCollection,
    fightPicksQuery,
    migrationsCollection,
    userFightPicksCollection,
  };
};
