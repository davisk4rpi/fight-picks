require('dotenv').config();
import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { stdin, stdout } from 'node:process';
import readline from 'node:readline/promises';

import { initAdminFirestore } from '../init-admin-firestore';
import { seed2 } from './history';

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
});

const app = initializeApp({
  credential: applicationDefault(),
  projectId: 'fight-picks',
});
const firestore = getFirestore(app);
firestore.settings({
  ignoreUndefinedProperties: true,
});

const runSeed = async () => {
  const res = await rl.question(
    'Are you sure you want to seed production? (enter "y" to continue)',
  );
  rl.close();
  if (res !== 'y') {
    console.log('aborting...');
    return;
  }
  console.log('seeding prod...');
  const adminFirestore = initAdminFirestore(firestore);
  await seed2(adminFirestore);
  console.log('complete');
};

runSeed();
