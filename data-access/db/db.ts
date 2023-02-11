import '@react-native-firebase/app';

import { Platform } from 'react-native';

import firestore from '@react-native-firebase/firestore';

import { devEnv } from '../../environments';
import { initAppFirestore } from './init-app-firestore';

// import { seed } from './seed';

export const firestoreInstance = firestore();

export const appFirestore = initAppFirestore(firestoreInstance);

// seed(appFirestore);
