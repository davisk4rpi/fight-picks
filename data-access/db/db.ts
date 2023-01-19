import '@react-native-firebase/app';

import firestore from '@react-native-firebase/firestore';

import { devEnv } from '../../environments';

// set the host and the port property to connect to the emulator
// set these before any read/write operations occur to ensure it doesn't affect your Cloud Firestore data!
if (__DEV__) {
  firestore().useEmulator('localhost', devEnv.firebase.firestoreEmulatorPort);
}

export const db = firestore();
