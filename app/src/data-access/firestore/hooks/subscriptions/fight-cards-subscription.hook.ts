import { useEffect } from 'react';

import { FightCard } from '@fight-picks/models';

import { appFirestore } from '../../app-firestore';
import { mapFightCardFromFirebase } from '../../mappers';

type FightCardsUpdate = { upserts: FightCard[]; removedIds: string[] };
export type OnFightCardsUpdate = (snapshot: FightCardsUpdate) => void;

export const useFightCardsSubscription = (onSnapshot: OnFightCardsUpdate) => {
  useEffect(() => {
    const unsubscribe = appFirestore.fightCardsCollection
      .orderBy('mainCardDate')
      .onSnapshot(
        snapshot => {
          const updates = snapshot.docChanges().reduce<FightCardsUpdate>(
            (acc, change) => {
              if (change.type === 'removed') {
                acc.removedIds.push(change.doc.id);
              } else {
                acc.upserts.push(mapFightCardFromFirebase(change.doc.data()));
              }
              return acc;
            },
            { upserts: [], removedIds: [] },
          );
          onSnapshot(updates);
        },
        // TODO replace with onError param
        error => console.error('useFightCardsSubscriptionError', error),
      );
    return unsubscribe;
  }, [onSnapshot]);
};
