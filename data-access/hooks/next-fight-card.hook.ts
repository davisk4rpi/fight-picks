import { useEffect, useState } from 'react';

import { db } from '../db';
import { FightCard } from '../db/types';

export const useNextFightCard = () => {
  const [nextFightCard, setNextFightCard] = useState<
    FightCard | null | undefined
  >(undefined);

  useEffect(() => {
    const unsubscribe = db.fightCards
      .where('mainCardDate', '>', new Date())
      .orderBy('mainCardDate')
      .onSnapshot(
        snapshot => {
          if (snapshot.docs.length > 0) {
            const fightCard = snapshot.docs[0].data();
            setNextFightCard({
              id: fightCard.id,
              mainCardDate: fightCard.mainCardDate.toDate(),
              name: fightCard.name,
            });
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
