import { useEffect, useState } from 'react';

import { Migration } from '../../../models.types';
import { appFirestore, mapMigrationFromFirebase } from '../firestore';

export const useMigrations = () => {
  const [migrations, setMigrations] = useState<Migration[] | undefined>(
    undefined,
  );

  useEffect(() => {
    const unsubscribe = appFirestore.migrationsCollection
      .orderBy('createdAt')
      .onSnapshot(
        snapshot => {
          const migrations = snapshot.docs
            .map(doc => mapMigrationFromFirebase(doc.data()))
            .sort((a, b) =>
              a.initializedAt !== null && b.initializedAt == null ? -1 : 0,
            );
          setMigrations(migrations);
        },
        error => console.error(error),
      );
    return unsubscribe;
  }, []);

  return {
    migrations: migrations ?? [],
    loading: migrations === undefined,
  };
};
