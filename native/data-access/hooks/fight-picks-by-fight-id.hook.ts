import { useEffect, useState } from 'react';

import { FightPick } from '@fight-picks/models';

import {
  getFighterRef,
  getFightPicksQueryByFight,
  mapFightPickFromFirebase,
} from '../firestore';
import { selectFightById, store, useSelectFightsStatus } from '../store';

// TODO refactor this since it wont scale well with users
// Plan on either scoping this to a "league" or use cloud functions to make this query unnecessary
export const useFightPicksByFightId = (fightId: string) => {
  const [fightPicks, setFightPicks] = useState<FightPick[] | undefined>(
    undefined,
  );
  const fightsStatus = useSelectFightsStatus();

  useEffect(() => {
    if (fightsStatus === 'pending') return;
    const fightPicksQuery = getFightPicksQueryByFight(fightId);
    const unsubscribe = fightPicksQuery.onSnapshot(
      async snapshot => {
        if (snapshot === null || snapshot.docs.length < 1)
          return setFightPicks([]);
        const state = store.getState();
        const fight = selectFightById(state, fightId);
        if (fight === undefined) return setFightPicks([]);
        const fightPicks = snapshot.docs.map(doc =>
          mapFightPickFromFirebase(doc.data(), getFighterRef(fight.fighter1Id)),
        );

        setFightPicks(fightPicks);
      },
      error => {
        console.error('useFightPicksByFightId', error);
      },
    );
    return unsubscribe;
  }, [fightId, fightsStatus]);

  return {
    fightPicks: fightPicks ?? [],
    loading: fightPicks === undefined,
  };
};
