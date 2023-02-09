import { useEffect, useState } from 'react';

import { appFirestore, mapFightPickFromFirebase } from '../db';
import { FirebaseFightPick } from '../db/firebaseTypes';
import { FightPick } from '../db/types';

export const useFightPicksByFightId = (fightId: string) => {
  const [fightPicks, setFightPicks] = useState<FightPick[] | undefined>(
    undefined,
  );

  useEffect(() => {
    const unsubscribe = appFirestore.raw
      .collectionGroup<FirebaseFightPick>('fightPicks')
      .where(
        'fightRef',
        '==',
        appFirestore.repository.fights.getDocRef(fightId),
      )
      .onSnapshot(async snapshot => {
        if (snapshot.docs.length < 1) return setFightPicks([]);
        const fightPicks = snapshot.docs.map(doc =>
          mapFightPickFromFirebase(doc.data()),
        );
        setFightPicks(fightPicks);
      });
    return unsubscribe;
  }, [fightId]);

  return {
    fightPicks: fightPicks ?? [],
    loading: fightPicks === undefined,
  };
};
