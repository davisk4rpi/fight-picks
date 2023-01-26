import '@react-native-firebase/app';

import { Platform } from 'react-native';

import firestore from '@react-native-firebase/firestore';

import { devEnv } from '../../environments';
import {
  FirebaseFight,
  FirebaseFightCard,
  FirebaseFighter,
  FirebaseUser,
} from './firebaseTypes';
import { usersRepository } from './repository/users.repo';
import { seed } from './seed';

// set the host and the port property to connect to the emulator
// set these before any read/write operations occur to ensure it doesn't affect your Cloud Firestore data!
if (__DEV__) {
  firestore().useEmulator(
    Platform.OS === 'android' ? devEnv.androidLocalhost : 'localhost',
    devEnv.firebase.firestoreEmulatorPort,
  );
}

export const firestoreInstance = firestore();
export const db = {
  users: usersRepository(firestoreInstance.collection<FirebaseUser>('users')),
  fightCards: firestoreInstance.collection<FirebaseFightCard>('fightCards'),
  fighters: firestoreInstance.collection<FirebaseFighter>('fighters'),
  fights: firestoreInstance.collection<FirebaseFight>('fights'),
  // fights: firestoreInstance.collection<FirebaseFight>('fights'),
};

seed(db);
