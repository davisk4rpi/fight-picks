import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type FirebaseFighter = {
  id: string;
  name: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
};

export type FirebaseFightResults = {
  winningFighterId: string | null;
  method: string;
  round: number | null;
};

export type FirebaseFight = {
  id: string;
  fightCardId: string;
  sex: string;
  rounds: number;
  weight: number;
  fighter1Id: string;
  fighter2Id: string;
  results?: FirebaseFightResults;
  createdAt: FirebaseFirestoreTypes.Timestamp;
};

export type FirebaseFightPick = Omit<
  FirebaseFightResults,
  'winningFighterId'
> & {
  id: string;
  confidence: number;
  winningFighterId: string;
  fightId: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};

export type FirebaseFightCard = {
  id: string;
  mainCardDate: FirebaseFirestoreTypes.Timestamp;
  name: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
};

export type FirebaseUser = {
  uid: string;
  authDisplayName: string | null;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  fightPicks?: FirebaseFirestoreTypes.CollectionReference<FirebaseFightPick>;
};
