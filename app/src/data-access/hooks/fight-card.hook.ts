import { useEffect, useState } from 'react';

import { FightCard } from '@fight-picks/models';

import { appFirestore, mapFightCardFromFirebase } from '../firestore';

export const useFightCard = (fightCardId: string | undefined) => {
  const [fightCard, setFightCard] = useState<FightCard | null | undefined>(
    undefined,
  );

  useEffect(() => {
    if (fightCardId === undefined) return;
    const unsubscribe = appFirestore.fightCardsCollection
      .doc(fightCardId)
      .onSnapshot(
        snapshot => {
          const fightCard = snapshot.data();
          if (fightCard !== undefined) {
            setFightCard(mapFightCardFromFirebase(fightCard));
          } else {
            setFightCard(null);
          }
        },
        error => console.error(error),
      );
    return unsubscribe;
  }, [fightCardId]);
  return {
    fightCard: fightCard ?? null,
    loading: fightCardId !== undefined && fightCard === undefined,
  };
};
