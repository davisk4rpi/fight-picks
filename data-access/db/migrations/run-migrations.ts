import { initializeApp } from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

// runMigrations();
// import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { initMigrationFirestore } from './init-migration-firestore';
import { initialMigration } from './initial';

initializeApp();
const firestoreInstance = getFirestore();

export const runMigrations = () => {
  const appFirestore = initMigrationFirestore(firestoreInstance);

  initialMigration(appFirestore);
};
