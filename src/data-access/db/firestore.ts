import firestore from '@react-native-firebase/firestore';

import { initAppFirestore } from './init-app-firestore';

export const firestoreInstance = firestore();
firestoreInstance.settings({ serverTimestampBehavior: 'estimate' });

export const appFirestore = initAppFirestore(firestoreInstance);
