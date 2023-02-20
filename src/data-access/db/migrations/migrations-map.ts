import { Migration, MigrationFunction } from '../../../../models.types';
import { appFirestore } from '../firestore';
import {
  INITIAL_MIGRATION_NAME,
  makeInitialMigration,
} from './initial.migration';

export type MigrationsMap = Map<string, MigrationFunction>;

export const makePendingMigrationsMap = (
  migrations: Migration[],
): MigrationsMap => {
  const map: MigrationsMap = new Map([
    [INITIAL_MIGRATION_NAME, makeInitialMigration(appFirestore)],
  ]);
  migrations.forEach(migration => {
    map.delete(migration.name);
  });

  return map;
};
