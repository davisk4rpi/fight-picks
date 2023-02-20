import { isMigrationStatus, Migration } from '../../../../models.types';
import { FirebaseMigration } from '../firebaseTypes';

export const mapMigrationFromFirebase = (
  firebaseMigration: FirebaseMigration,
): Migration => {
  const status = isMigrationStatus(firebaseMigration.status)
    ? firebaseMigration.status
    : 'pending';

  return {
    name: firebaseMigration.name,
    status,
    createdAt: firebaseMigration.createdAt.toDate(),
    updatedAt: firebaseMigration.updatedAt.toDate(),
    initializedAt: firebaseMigration.initializedAt?.toDate() ?? null,
    endedAt: firebaseMigration.endedAt?.toDate() ?? null,
  };
};
