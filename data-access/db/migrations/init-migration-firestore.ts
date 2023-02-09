import {
  FirebaseSDKFight,
  FirebaseSDKFightCard,
  FirebaseSDKFighter,
  FirebaseSDKFightPick,
  FirebaseSDKMigration,
  FirebaseSDKUser,
  MigrationFirestoreModule,
} from './types';

export const initMigrationFirestore = (
  firestoreInstance: FirebaseFirestore.Firestore,
): MigrationFirestoreModule => {
  const usersCollection = firestoreInstance.collection(
    'users',
  ) as FirebaseFirestore.CollectionReference<FirebaseSDKUser>;
  const fightCardsCollection = firestoreInstance.collection(
    'fightCards',
  ) as FirebaseFirestore.CollectionReference<FirebaseSDKFightCard>;
  const fightersCollection = firestoreInstance.collection(
    'fighters',
  ) as FirebaseFirestore.CollectionReference<FirebaseSDKFighter>;
  const fightsCollection = firestoreInstance.collection(
    'fights',
  ) as FirebaseFirestore.CollectionReference<FirebaseSDKFight>;
  const migrationsCollection = firestoreInstance.collection(
    'migrations',
  ) as FirebaseFirestore.CollectionReference<FirebaseSDKMigration>;
  const fightPicksQuery = firestoreInstance.collectionGroup(
    'fightPicks',
  ) as FirebaseFirestore.CollectionGroup<FirebaseSDKFightPick>;

  return {
    usersCollection,
    fightCardsCollection,
    fightersCollection,
    fightsCollection,
    fightPicksQuery,
    migrationsCollection,
  };
};
