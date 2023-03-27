import { useEffect } from 'react';

import { Fighter } from '@fight-picks/models';

import { fightersCollection } from '../../db';
import { mapFighterFromFirebase } from '../../mappers';

type FightersUpdate = { upserts: Fighter[]; removedIds: string[] };
export type OnFightersUpdate = (snapshot: FightersUpdate) => void;

export const useFightersSubscription = (onSnapshot: OnFightersUpdate) => {
  useEffect(() => {
    const unsubscribe = fightersCollection().onSnapshot(
      snapshot => {
        const updates = snapshot.docChanges().reduce<FightersUpdate>(
          (acc, change) => {
            if (change.type === 'removed') {
              acc.removedIds.push(change.doc.id);
            } else {
              acc.upserts.push(mapFighterFromFirebase(change.doc.data()));
            }
            return acc;
          },
          { upserts: [], removedIds: [] },
        );
        onSnapshot(updates);
      },
      // TODO replace with onError param
      error => console.error('useFightersSubscriptionError', error),
    );
    return unsubscribe;
  }, [onSnapshot]);
};
