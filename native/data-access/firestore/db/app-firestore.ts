import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

let firestoreInstance: FirebaseFirestoreTypes.Module | undefined;
export const appFirestore = () => {
  if (firestoreInstance === undefined) {
    throw new Error('Need to set your firestore instance first!');
  }
  return firestoreInstance;
};

export const setFirestoreInstance = (
  firestore: FirebaseFirestoreTypes.Module,
) => {
  firestoreInstance = firestore;
};

export const FirestoreFieldValue = firestore.FieldValue;
