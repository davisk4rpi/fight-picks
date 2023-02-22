import { useEffect } from 'react';

import { FightPick } from '@fight-picks/models';

import { appFirestore } from '../../app-firestore';
import { mapFightPickFromFirebase } from '../../mappers';

type FightPicksUpdate = { upserts: FightPick[]; removedIds: string[] };
export type OnUserFightPicksUpdate = (snapshot: FightPicksUpdate) => void;

export const useUserFightPicksSubscription = (
  uid: string | null,
  onSnapshot: OnUserFightPicksUpdate,
) => {
  useEffect(() => {
    if (!uid) {
      return;
    }
    const fightPicksCollection =
      appFirestore.repository.users.getFightPicksCollection(uid);
    const unsubscribe = fightPicksCollection.onSnapshot(
      snapshot => {
        const updates = snapshot.docChanges().reduce<FightPicksUpdate>(
          (acc, change) => {
            if (change.type === 'removed') {
              acc.removedIds.push(change.doc.id);
            } else {
              acc.upserts.push(mapFightPickFromFirebase(change.doc.data()));
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
  }, [uid, onSnapshot]);
};
