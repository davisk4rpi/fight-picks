import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import { AppFirestoreModule, initAppFirestore } from './init-app-firestore';

let appFirestoreInstance: AppFirestoreModule | undefined;
export const appFirestore = () => {
  if (appFirestoreInstance === undefined) {
    throw new Error('Need to set your firestore instance first!');
  }
  return appFirestoreInstance;
};

export const setFirestoreInstance = (
  firestore: FirebaseFirestoreTypes.Module,
) => {
  appFirestoreInstance = initAppFirestore(firestore);
};
