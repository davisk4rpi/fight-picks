import { useEffect, useState } from 'react';

import { appFirestore } from '../firestore';
import { FirebaseFight } from '../firestore/types';

export const useFirebaseFightsByFightCardId = (
  fightCardId: string | undefined,
) => {
  const [firebaseFights, setFirebaseFights] = useState<
    FirebaseFight[] | undefined
  >(undefined);

  useEffect(() => {
    if (fightCardId === undefined) {
      setFirebaseFights(undefined);
      return;
    }
    const unsubscribe = appFirestore()
      .fightsCollection.where(
        'fightCardRef',
        '==',
        appFirestore().fightCardsCollection.doc(fightCardId),
      )
      .onSnapshot(
        snapshot => {
          const fights = snapshot.docs.map(ref => ref.data());
          setFirebaseFights(fights);
        },
        error => console.error(error),
      );
    return unsubscribe;
  }, [fightCardId]);

  return {
    firebaseFights: firebaseFights ?? [],
    loading: fightCardId !== undefined && firebaseFights === undefined,
  };
};
