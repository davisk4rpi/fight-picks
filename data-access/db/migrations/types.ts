import {
  FirebaseFight,
  FirebaseFightCard,
  FirebaseFighter,
  FirebaseFightResult,
  FirebaseUser,
} from '../firebaseTypes';

export type FirebaseSDKFighter = Omit<FirebaseFighter, 'createdAt'> & {
  createdAt: FirebaseFirestore.Timestamp;
};

export type FirebaseSDKFightResult = Omit<
  FirebaseFightResult,
  'winningFighterRef'
> & {
  winningFighterRef: FirebaseFirestore.DocumentReference<FirebaseSDKFighter> | null;
};

export type FirebaseSDKFight = Omit<
  FirebaseFight,
  'fightCardRef' | 'fighter1Ref' | 'fighter2Ref' | 'result' | 'createdAt'
> & {
  fightCardRef: FirebaseFirestore.DocumentReference<FirebaseSDKFightCard>;
  fighter1Ref: FirebaseFirestore.DocumentReference<FirebaseSDKFighter>;
  fighter2Ref: FirebaseFirestore.DocumentReference<FirebaseSDKFighter>;
  result?: FirebaseSDKFightResult;
  createdAt: FirebaseFirestore.Timestamp;
};

export type FirebaseSDKFightPick = Omit<
  FirebaseSDKFightResult,
  'winningFighterRef'
> & {
  id: string;
  userRef: FirebaseFirestore.DocumentReference<FirebaseSDKUser>;
  winningFighterRef: FirebaseFirestore.DocumentReference<FirebaseSDKFighter>;
  fightRef: FirebaseFirestore.DocumentReference<FirebaseSDKFight>;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
};

export type FirebaseSDKFightCard = Omit<
  FirebaseFightCard,
  'mainCardDate' | 'createdAt' | 'fightRefs'
> & {
  mainCardDate: FirebaseFirestore.Timestamp;
  createdAt: FirebaseFirestore.Timestamp;
  fightRefs: FirebaseFirestore.DocumentReference<FirebaseSDKFight>[];
};

export type FirebaseSDKUser = Omit<FirebaseUser, 'createdAt' | 'fightPicks'> & {
  createdAt: FirebaseFirestore.Timestamp;
  fightPicks?: FirebaseFirestore.CollectionReference<FirebaseSDKFightPick>;
};

export type FirebaseSDKFighterRef =
  FirebaseFirestore.DocumentReference<FirebaseSDKFighter>;
export type FirebaseSDKFightCardRef =
  FirebaseFirestore.DocumentReference<FirebaseSDKFightCard>;
export type FirebaseSDKFightRef =
  FirebaseFirestore.DocumentReference<FirebaseSDKFight>;
export type FirebaseSDKUserRef =
  FirebaseFirestore.DocumentReference<FirebaseSDKUser>;
export type FirebaseSDKFightPickRef =
  FirebaseFirestore.DocumentReference<FirebaseSDKFightPick>;

export type FirebaseSDKAppState = {
  currentFightCardRef: FirebaseSDKFightCardRef;
};

// Admin
export type FirebaseSDKMigration = {
  name: string;
  status: string;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
};
export type FirebaseSDKMigrationRef =
  FirebaseFirestore.DocumentReference<FirebaseSDKMigration>;

export type MigrationFirestoreModule = {
  usersCollection: FirebaseFirestore.CollectionReference<FirebaseSDKUser>;
  fightCardsCollection: FirebaseFirestore.CollectionReference<FirebaseSDKFightCard>;
  fightersCollection: FirebaseFirestore.CollectionReference<FirebaseSDKFighter>;
  fightsCollection: FirebaseFirestore.CollectionReference<FirebaseSDKFight>;
  migrationsCollection: FirebaseFirestore.CollectionReference<FirebaseSDKMigration>;
  fightPicksQuery: FirebaseFirestore.CollectionGroup<FirebaseSDKFightPick>;
};
