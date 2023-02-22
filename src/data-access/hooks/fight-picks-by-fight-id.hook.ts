import { useEffect, useState } from 'react';

import { FightPick } from '../../../models.types';
import { appFirestore, mapFightPickFromFirebase } from '../firestore';

export const useFightPicksByFightId = (fightId: string) => {
  const [fightPicks, setFightPicks] = useState<FightPick[] | undefined>(
    undefined,
  );

  useEffect(() => {
    const unsubscribe = appFirestore.fightPicksQuery
      .where(
        'fightRef',
        '==',
        appFirestore.repository.fights.getDocRef(fightId),
      )
      .onSnapshot(async snapshot => {
        if (snapshot === null || snapshot.docs.length < 1)
          return setFightPicks([]);
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
