require('dotenv').config();

import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getFirestore, initializeFirestore } from 'firebase-admin/firestore';

import { initAdminFirestore } from '../init-admin-firestore';
import {
  seedAndradeVsBlanchfield,
  seedKrylovVsSpann,
  seedLewisVsSpivak,
  seedMakhachevVsVolkanovski,
  seedTeixeiraVsHill,
} from '../seed';

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
  await seedTeixeiraVsHill(adminFirestore);
  await seedLewisVsSpivak(adminFirestore);
  await seedMakhachevVsVolkanovski(adminFirestore);
  await seedAndradeVsBlanchfield(adminFirestore);
  await seedKrylovVsSpann(adminFirestore);
};

runSeed();
