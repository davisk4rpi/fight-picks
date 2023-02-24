import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type FirebaseFighter = {
  id: string;
  name: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
};

export type FirebaseFightResult = {
  winningFighterRef: FirebaseFirestoreTypes.DocumentReference<FirebaseFighter> | null;
  method: string;
  round: number | null;
};

export type FirebaseFight = {
  id: string;
  fightCardRef: FirebaseFirestoreTypes.DocumentReference<FirebaseFightCard>;
  sex: string;
  rounds: number;
  weight: number;
  fighter1Ref: FirebaseFirestoreTypes.DocumentReference<FirebaseFighter>;
  fighter2Ref: FirebaseFirestoreTypes.DocumentReference<FirebaseFighter>;
  result?: FirebaseFightResult;
  createdAt: FirebaseFirestoreTypes.Timestamp;
};

export type FirebaseFightPick = Omit<
  FirebaseFightResult,
  'winningFighterRef'
> & {
  id: string;
  confidence: number;
  userRef: FirebaseFirestoreTypes.DocumentReference<FirebaseUser>;
  winningFighterRef: FirebaseFirestoreTypes.DocumentReference<FirebaseFighter>;
  fightRef: FirebaseFirestoreTypes.DocumentReference<FirebaseFight>;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};

export type FirebaseFightCard = {
  id: string;
  mainCardDate: FirebaseFirestoreTypes.Timestamp;
  name: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  fightRefs: FirebaseFirestoreTypes.DocumentReference<FirebaseFight>[];
};

export type FirebaseUser = {
  uid: string;
  authDisplayName: string | null;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  fightPicks?: FirebaseFirestoreTypes.CollectionReference<FirebaseFightPick>;
  roles: string[];
};

export type FirebaseFighterRef =
  FirebaseFirestoreTypes.DocumentReference<FirebaseFighter>;
export type FirebaseFightCardRef =
  FirebaseFirestoreTypes.DocumentReference<FirebaseFightCard>;
export type FirebaseFightRef =
  FirebaseFirestoreTypes.DocumentReference<FirebaseFight>;
export type FirebaseUserRef =
  FirebaseFirestoreTypes.DocumentReference<FirebaseUser>;
export type FirebaseFightPickRef =
  FirebaseFirestoreTypes.DocumentReference<FirebaseFightPick>;

export type FirebaseAppState = {
  currentFightCardRef: FirebaseFightCardRef;
};
