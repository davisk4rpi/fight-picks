import firestore from '@react-native-firebase/firestore';

export const enableFirestoreEmulator = (host: string, port: number) => {
  firestore().useEmulator(host, port);
};
