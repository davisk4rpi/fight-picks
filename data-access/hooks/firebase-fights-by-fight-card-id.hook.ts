import { useEffect, useState } from 'react';

import { db } from '../db';
import { FirebaseFight } from '../db/firebaseTypes';

export const useFirebaseFightsByFightCardId = (
  fightCardId: string | undefined,
) => {
  const [firebaseFights, setFirebaseFights] = useState<FirebaseFight[]>([]);

  useEffect(() => {
    if (fightCardId === undefined) {
      setFirebaseFights(prev =>
        prev === undefined || prev.length === 0 ? prev : [],
      );
      return;
    }
    const unsubscribe = db.fights
      .where('fightCardId', '==', fightCardId)
      .onSnapshot(
        snapshot => {
          const fights = snapshot.docs.map(ref => ref.data());
          setFirebaseFights(fights);
        },
        error => console.error(error),
      );
    return unsubscribe;
  }, [fightCardId]);

  return {
    firebaseFights: firebaseFights ?? [],
    loading: firebaseFights === undefined,
  };
};
