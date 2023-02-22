import { isMigrationStatus, Migration } from '../../../../models.types';
import { FirebaseMigration } from '../types';

export const mapMigrationFromFirebase = (
  firebaseMigration: FirebaseMigration,
): Migration => {
  const status = isMigrationStatus(firebaseMigration.status)
    ? firebaseMigration.status
    : 'pending';

  return {
    name: firebaseMigration.name,
    status,
    createdAt: firebaseMigration.createdAt.toDate().toISOString(),
    updatedAt: firebaseMigration.updatedAt.toDate().toISOString(),
    initializedAt:
      firebaseMigration.initializedAt?.toDate()?.toISOString() ?? null,
    endedAt: firebaseMigration.endedAt?.toDate()?.toISOString() ?? null,
  };
};
