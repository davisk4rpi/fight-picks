import { FirebaseMigrationHelper } from './helpers';
import { seedTeixeiraVsHill } from './seed';
import { MigrationFirestoreModule } from './types';

const MIGRATION_NAME = 'initial';

export const initialMigration = async (
  appFirestore: MigrationFirestoreModule,
) => {
  const migrationHelper = new FirebaseMigrationHelper(
    appFirestore,
    MIGRATION_NAME,
  );
  try {
    await migrationHelper.initializeMigration();
  } catch (e) {
    console.log(e);
    return;
  }

  seedTeixeiraVsHill(appFirestore, migrationHelper);
  await migrationHelper.markMigrationComplete();
  console.log('done');

  // seedLewisVsSpivak(appFirestore);
};
