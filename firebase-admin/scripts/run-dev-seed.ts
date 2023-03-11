require('dotenv').config();

import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

import { initAdminFirestore } from '../init-admin-firestore';
import { seedUserData } from '../seed/dev/seed-users';
import { seed0, seed1 } from './history';

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
  await seed0(adminFirestore);
  await seed1(adminFirestore);

  await seedUserData(adminFirestore);
};

runSeed();
