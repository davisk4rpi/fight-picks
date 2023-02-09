import '@react-native-firebase/app';

import { Platform } from 'react-native';

import firestore from '@react-native-firebase/firestore';

import { devEnv } from '../../environments';
import { initAppFirestore } from './init-app-firestore';

// import { seed } from './seed';

// set the host and the port property to connect to the emulator
// set these before any read/write operations occur to ensure it doesn't affect your Cloud Firestore data!
if (__DEV__) {
  firestore().useEmulator(
    Platform.OS === 'android' ? devEnv.androidLocalhost : 'localhost',
    devEnv.firebase.firestoreEmulatorPort,
  );
}

export const firestoreInstance = firestore();

export const appFirestore = initAppFirestore(firestoreInstance);

// seed(appFirestore);
