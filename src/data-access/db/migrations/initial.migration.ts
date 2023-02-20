import { AppFirestoreModule } from '../firebaseTypes';
import { FirebaseMigrationHelper } from './helpers';
import {
  seedAndradeVsBlanchfield,
  seedLewisVsSpivak,
  seedMakhachevVsVolkanovski,
  seedTeixeiraVsHill,
} from './seed';

export const INITIAL_MIGRATION_NAME = 'INIT';

export const makeInitialMigration = (appFirestore: AppFirestoreModule) => {
  return async () => {
    const migrationHelper = new FirebaseMigrationHelper(
      appFirestore,
      INITIAL_MIGRATION_NAME,
    );
    try {
      await migrationHelper.initializeMigration();
    } catch (e) {
      console.log(e);
      return;
    }

    try {
      await seedTeixeiraVsHill(appFirestore, migrationHelper);
      await seedLewisVsSpivak(appFirestore, migrationHelper);
      await seedMakhachevVsVolkanovski(appFirestore, migrationHelper);
      await seedAndradeVsBlanchfield(appFirestore, migrationHelper);
    } catch (e) {
      console.log('failed');
      console.log(e);
      await migrationHelper.failMigration();
      return;
    }

    await migrationHelper.markMigrationComplete();
    console.log('done');
  };
};
