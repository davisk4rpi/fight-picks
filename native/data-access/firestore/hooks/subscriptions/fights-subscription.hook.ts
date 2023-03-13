import { useEffect } from 'react';

import { Fight } from '@fight-picks/models';

import { appFirestore } from '../../app-firestore';
import { mapFightFromFirebase } from '../../mappers';

type FightsUpdate = { upserts: Fight[]; removedIds: string[] };
export type OnFightsUpdate = (snapshot: FightsUpdate) => void;

export const useFightsSubscription = (onSnapshot: OnFightsUpdate) => {
  useEffect(() => {
    const unsubscribe = appFirestore().fightsCollection.onSnapshot(
      snapshot => {
        const updates = snapshot.docChanges().reduce<FightsUpdate>(
          (acc, change) => {
            if (change.type === 'removed') {
              acc.removedIds.push(change.doc.id);
            } else {
              acc.upserts.push(mapFightFromFirebase(change.doc.data()));
            }
            return acc;
          },
          { upserts: [], removedIds: [] },
        );
        onSnapshot(updates);
      },
      // TODO replace with onError param
      error => console.error('useFightsSubscriptionError', error),
    );
    return unsubscribe;
  }, [onSnapshot]);
};
