import {
  CollectionGroup,
  CollectionReference,
  DocumentReference,
  Timestamp,
} from 'firebase-admin/firestore';

export type FirestoreFighter = {
  id: string;
  name: string;
  createdAt: Timestamp;
};

export type FirestoreFightResult = {
  winningFighterRef: DocumentReference<FirestoreFighter> | null;
  method: string;
  round: number | null;
};

export type FirestoreFight = {
  id: string;
  fightCardRef: DocumentReference<FirestoreFightCard>;
  sex: string;
  rounds: number;
  weight: number;
  fighter1Ref: DocumentReference<FirestoreFighter>;
  fighter2Ref: DocumentReference<FirestoreFighter>;
  result?: FirestoreFightResult;
  createdAt: Timestamp;
};

export type FirestoreFightPick = Omit<
  FirestoreFightResult,
  'winningFighterRef'
> & {
  id: string;
  confidence: number;
  userRef: DocumentReference<FirestoreUser>;
  winningFighterRef: DocumentReference<FirestoreFighter>;
  fightRef: DocumentReference<FirestoreFight>;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type FirestoreFightCard = {
  id: string;
  mainCardDate: Timestamp;
  name: string;
  createdAt: Timestamp;
  fightRefs: DocumentReference<FirestoreFight>[];
};

export type FightCardOrg = 'ufc';

export type FirestoreUser = {
  uid: string;
  authDisplayName: string | null;
  createdAt: Timestamp;
  fightPicks?: CollectionReference<FirestoreFightPick>;
  roles: string[];
};

export type FirestoreFighterRef = DocumentReference<FirestoreFighter>;
export type FirestoreFightCardRef = DocumentReference<FirestoreFightCard>;
export type FirestoreFightRef = DocumentReference<FirestoreFight>;
export type FirestoreUserRef = DocumentReference<FirestoreUser>;
export type FirestoreFightPickRef = DocumentReference<FirestoreFightPick>;

// Admin
export type FirestoreMigration = {
  name: string;
  status: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  initializedAt: Timestamp | null;
  endedAt: Timestamp | null;
};

export type FirestoreMigrationRef = DocumentReference<FirestoreMigration>;

export type FirestoreUsersCollectionReference =
  CollectionReference<FirestoreUser>;
export type FirestoreFightCardsCollectionReference =
  CollectionReference<FirestoreFightCard>;
export type FirestoreFightersCollectionReference =
  CollectionReference<FirestoreFighter>;
export type FirestoreFightsCollectionReference =
  CollectionReference<FirestoreFight>;
export type FirestoreMigrationsCollectionReference =
  CollectionReference<FirestoreMigration>;
export type FirestoreFightPicksCollectionGroup =
  CollectionGroup<FirestoreFightPick>;
export type FirestoreFightPicksCollectionReference =
  CollectionReference<FirestoreFightPick>;

export type AdminFirestoreModule = {
  usersCollection: FirestoreUsersCollectionReference;
  fightCardsCollection: FirestoreFightCardsCollectionReference;
  fightersCollection: FirestoreFightersCollectionReference;
  fightsCollection: FirestoreFightsCollectionReference;
  migrationsCollection: FirestoreMigrationsCollectionReference;
  fightPicksQuery: FirestoreFightPicksCollectionGroup;
  userFightPicksCollection: (
    userRef: FirestoreUserRef,
  ) => FirestoreFightPicksCollectionReference;
};
