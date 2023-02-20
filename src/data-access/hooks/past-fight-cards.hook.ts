import { useEffect, useState } from 'react';

import { FightCard } from '../../../models.types';
import { appFirestore, mapFightCardFromFirebase } from '../db';

export const usePastFightCards = () => {
  const [fightCards, setFightCards] = useState<FightCard[] | undefined>(
    undefined,
  );

  useEffect(() => {
    const unsubscribe = appFirestore.fightCardsCollection
      .where('mainCardDate', '<', new Date()) // new Date here is limiting, need to poll or update his periodically
      .orderBy('mainCardDate')
      .onSnapshot(
        snapshot => {
          const fightCards = snapshot.docs.map(doc => {
            return mapFightCardFromFirebase(doc.data());
          });
          setFightCards(fightCards);
        },
        error => console.error(error),
      );
    return unsubscribe;
  }, []);
  return {
    fightCards: fightCards ?? [],
    loading: fightCards === undefined,
  };
};
