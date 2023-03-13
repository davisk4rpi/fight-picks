import { useEffect, useState } from 'react';

import { FightPick } from '@fight-picks/models';

import { appFirestore, mapFightPickFromFirebase } from '../firestore';

export const useFightPicksByFightId = (fightId: string) => {
  const [fightPicks, setFightPicks] = useState<FightPick[] | undefined>(
    undefined,
  );

  useEffect(() => {
    const fightRef = appFirestore().repository.fights.getDocRef(fightId);
    const unsubscribe = appFirestore()
      .fightPicksQuery.where('fightRef', '==', fightRef)
      .onSnapshot(
        async snapshot => {
          if (snapshot === null || snapshot.docs.length < 1)
            return setFightPicks([]);
          const fightPicks = snapshot.docs.map(doc =>
            mapFightPickFromFirebase(doc.data()),
          );

          setFightPicks(fightPicks);
        },
        error => {
          console.error('useFightPicksByFightId', error);
        },
      );
    return unsubscribe;
  }, [fightId]);

  return {
    fightPicks: fightPicks ?? [],
    loading: fightPicks === undefined,
  };
};
