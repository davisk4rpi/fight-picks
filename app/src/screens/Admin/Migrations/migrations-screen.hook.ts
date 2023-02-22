import { useMemo } from 'react';

import { Migration } from '@fight-picks/models';

import {
  makePendingMigrationsMap,
  MigrationsMap,
} from '../../../data-access/firestore';
import { useMigrations } from '../../../data-access/hooks';

export const useMigrationsScreen = () => {
  const { migrations, loading } = useMigrations();

  const {
    pendingMigrationsMap,
    initializedMigrations,
    failedMigrations,
    completeMigrations,
  } = useMemo(() => separateMigrationsByStatus(migrations), [migrations]);
  return {
    pendingMigrationsMap,
    initializedMigrations,
    failedMigrations,
    completeMigrations,
    loading,
  };
};

type MigrationsByStatus = {
  pendingMigrations: Migration[];
  initializedMigrations: Migration[];
  failedMigrations: Migration[];
  completeMigrations: Migration[];
};

const separateMigrationsByStatus = (
  migrations: Migration[],
): MigrationsByStatus & { pendingMigrationsMap: MigrationsMap } => {
  const migrationsByStatus = migrations.reduce<MigrationsByStatus>(
    (response, migration) => {
      switch (migration.status) {
        case 'pending':
          response.pendingMigrations.push(migration);
          break;
        case 'initialized':
          response.initializedMigrations.push(migration);
          break;
        case 'failed':
          response.failedMigrations.push(migration);
          break;
        case 'complete':
          response.completeMigrations.push(migration);
          break;
        default:
          // should never reach here
          // TODO Add logging
          break;
      }
      return response;
    },
    {
      pendingMigrations: [],
      initializedMigrations: [],
      failedMigrations: [],
      completeMigrations: [],
    },
  );
  return {
    ...migrationsByStatus,
    pendingMigrationsMap: makePendingMigrationsMap(migrations),
  };
};
