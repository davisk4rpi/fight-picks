require('dotenv').config();

import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

import { initAdminFirestore } from '../init-admin-firestore';
import { seedUserData } from '../seed/dev/seed-users';
import { seed0, seed1, seed2 } from './history';

const app = initializeApp({
  credential: applicationDefault(),
  projectId: 'fight-picks',
});
const firestore = getFirestore(app);
firestore.settings({
  ignoreUndefinedProperties: true,
});

const runInitDevDb = async () => {
  const adminFirestore = initAdminFirestore(firestore);
  await seed0(adminFirestore);
  await seed1(adminFirestore);
  await seed2(adminFirestore);

  await seedUserData(adminFirestore);
};

runInitDevDb();
