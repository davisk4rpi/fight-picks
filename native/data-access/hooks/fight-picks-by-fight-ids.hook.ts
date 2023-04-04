import { useEffect, useState } from 'react';

import { FightPick } from '@fight-picks/models';

import {
  getFighterRef,
  getFightPicksQueryByFights,
  mapFightPickFromFirebase,
} from '../firestore';

import { selectFightById, store, useSelectFightsStatus } from '../store';

// TODO refactor this since it wont scale well with users
// Plan on either scoping this to a "league" or use cloud functions to make this query unnecessary
export const useFightPicksByFightIds = (fightIds: string[]) => {
  const [fightPicks, setFightPicks] = useState<FightPick[] | undefined>(
    undefined,
  );
  const fightsStatus = useSelectFightsStatus();

  useEffect(() => {
    if (fightsStatus === 'pending') return;
    const fightPicksQuery = getFightPicksQueryByFights(fightIds);
    const unsubscribe = fightPicksQuery.onSnapshot(
      async snapshot => {
        if (snapshot === null || snapshot.docs.length < 1)
          return setFightPicks([]);

        const fightPicks: FightPick[] = [];
        const globalState = store.getState();

        snapshot.docs.forEach(doc => {
          const firebaseFightPick = doc.data();
          const { fightRef } = firebaseFightPick;
          const fight = selectFightById(globalState, fightRef.id);
          fightPicks.push(
            mapFightPickFromFirebase(
              firebaseFightPick,
              getFighterRef(fight?.fighter1Id),
            ),
          );
        });

        setFightPicks(fightPicks);
      },
      error => {
        console.error('useFightPicksByFightId', error);
      },
    );
    return unsubscribe;
  }, [fightIds, fightsStatus]);

  return {
    fightPicks: fightPicks ?? [],
    loading: fightPicks === undefined,
  };
};
