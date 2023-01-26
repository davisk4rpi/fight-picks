import { useEffect, useState } from 'react';

import { db, mapFightPickFromFirebase } from '../db';
import { FightPick } from '../db/types';

export const useFightPickByFightId = (fightId: string) => {
  const [fightPick, setFightPick] = useState<FightPick | undefined | null>(
    undefined,
  );

  useEffect(() => {
    const fightPicksRef = db.users.fightPicks.getCollection();
    const unsubscribe = fightPicksRef
      .where('fightId', '==', fightId)
      .limit(1)
      .onSnapshot(snapshot => {
        const doc = snapshot.docs.pop();
        if (doc === undefined) return setFightPick(null);
        const data = doc.data();
        setFightPick(mapFightPickFromFirebase(data));
      });
    return unsubscribe;
  }, [fightId]);

  return {
    fightPick: fightPick ?? null,
    fightPickLoading: fightPick === undefined,
  };
};