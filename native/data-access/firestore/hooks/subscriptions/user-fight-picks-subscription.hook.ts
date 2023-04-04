import { useEffect } from 'react';

import { Fight, FightPick } from '@fight-picks/models';

import { getFighterRef, getFightPicksCollectionByUser } from '../../db';
import { mapFightPickFromFirebase } from '../../mappers';

type FightPicksUpdate = { upserts: FightPick[]; removedIds: string[] };
export type OnUserFightPicksUpdate = (snapshot: FightPicksUpdate) => void;

export const useUserFightPicksSubscription = (
  uid: string | null,
  onSnapshot: OnUserFightPicksUpdate,
  fightEntities?: Record<string, Fight | undefined>,
) => {
  useEffect(() => {
    if (!uid || fightEntities === undefined) {
      return;
    }
    const fightPicksCollection = getFightPicksCollectionByUser(uid);
    const unsubscribe = fightPicksCollection.onSnapshot(
      snapshot => {
        const updates = snapshot.docChanges().reduce<FightPicksUpdate>(
          (acc, change) => {
            if (change.type === 'removed') {
              acc.removedIds.push(change.doc.id);
            } else {
              const fightPick = change.doc.data();
              const fight = fightEntities[fightPick.fightRef.id];
              if (fight === undefined) return acc;

              const fighter1Ref = getFighterRef(fight.fighter1Id);
              acc.upserts.push(
                mapFightPickFromFirebase(fightPick, fighter1Ref),
              );
            }
            return acc;
          },
          { upserts: [], removedIds: [] },
        );
        onSnapshot(updates);
      },
      error => console.error('useUserFightPicksSubscription', error),
    );
    return unsubscribe;
  }, [uid, onSnapshot, fightEntities]);
};
