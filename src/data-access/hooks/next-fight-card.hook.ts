import { useEffect, useState } from 'react';

import { FightCard } from '../../../models.types';
import { appFirestore, mapFightCardFromFirebase } from '../firestore';

export const useNextFightCard = () => {
  const [nextFightCard, setNextFightCard] = useState<
    FightCard | null | undefined
  >(undefined);

  useEffect(() => {
    // TODO add a 'currentFightCardDocReference' to firebaseAppState document to create more efficient call.
    const unsubscribe = appFirestore.fightCardsCollection
      .where('mainCardDate', '>', new Date(Date.now() - 24 * 60 * 60 * 1000))
      .orderBy('mainCardDate')
      .onSnapshot(
        snapshot => {
          if (snapshot.docs.length > 0) {
            const fightCard = snapshot.docs[0].data();
            setNextFightCard(mapFightCardFromFirebase(fightCard));
          } else {
            setNextFightCard(null);
          }
        },
        error => console.error(error),
      );
    return unsubscribe;
  }, []);
  return {
    nextFightCard: nextFightCard ?? null,
    loading: nextFightCard === undefined,
  };
};
