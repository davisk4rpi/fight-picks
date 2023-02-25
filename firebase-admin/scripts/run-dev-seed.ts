require('dotenv').config();

import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

import { initAdminFirestore } from '../init-admin-firestore';
import { seedUserData } from '../seed/dev/seed-users';

const app = initializeApp({
  credential: applicationDefault(),
  projectId: 'fight-picks',
});
const firestore = getFirestore(app);
firestore.settings({
  ignoreUndefinedProperties: true,
});

const runSeed = async () => {
  const adminFirestore = initAdminFirestore(firestore);
  await seedUserData(adminFirestore);
};

runSeed();
