import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import {
  FightCardsRepository,
  FightersRepository,
  FightsRepository,
  UsersRepository,
} from './repository';
import {
  FirebaseFight,
  FirebaseFightCard,
  FirebaseFighter,
  FirebaseFightPick,
  FirebaseMigration,
  FirebaseUser,
} from './types';

export type AppFirestoreModule = {
  usersCollection: FirebaseFirestoreTypes.CollectionReference<FirebaseUser>;
  fightCardsCollection: FirebaseFirestoreTypes.CollectionReference<FirebaseFightCard>;
  fightersCollection: FirebaseFirestoreTypes.CollectionReference<FirebaseFighter>;
  fightsCollection: FirebaseFirestoreTypes.CollectionReference<FirebaseFight>;
  migrationsCollection: FirebaseFirestoreTypes.CollectionReference<FirebaseMigration>;
  fightPicksQuery: FirebaseFirestoreTypes.Query<FirebaseFightPick>;
  raw: FirebaseFirestoreTypes.Module;
  repository: {
    users: UsersRepository;
    fightCards: FightCardsRepository;
    fighters: FightersRepository;
    fights: FightsRepository;
  };
};

export const initAppFirestore = (
  firestoreInstance: FirebaseFirestoreTypes.Module,
): AppFirestoreModule => {
  // firestoreInstance.clearPersistence();

  const usersCollection = firestoreInstance.collection<FirebaseUser>('users');
  const fightCardsCollection =
    firestoreInstance.collection<FirebaseFightCard>('fightCards');
  const fightersCollection =
    firestoreInstance.collection<FirebaseFighter>('fighters');
  const fightsCollection =
    firestoreInstance.collection<FirebaseFight>('fights');
  const migrationsCollection =
    firestoreInstance.collection<FirebaseMigration>('migrations');

  const fightPicksQuery =
    firestoreInstance.collectionGroup<FirebaseFightPick>('fightPicks');

  return {
    usersCollection,
    fightCardsCollection,
    fightersCollection,
    fightsCollection,
    fightPicksQuery,
    migrationsCollection,
    repository: {
      users: new UsersRepository(
        usersCollection,
        fightersCollection,
        fightsCollection,
      ),
      fightCards: new FightCardsRepository(fightCardsCollection),
      fighters: new FightersRepository(fightersCollection),
      fights: new FightsRepository(fightsCollection),
    },
    raw: firestoreInstance,
  };
};
