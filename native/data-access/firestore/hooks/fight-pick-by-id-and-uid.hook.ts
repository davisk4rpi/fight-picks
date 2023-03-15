import { useEffect, useState } from 'react';

import { FightPick } from '@fight-picks/models';

import { appFirestore } from '../app-firestore';
import { mapFightPickFromFirebase } from '../mappers';

export const useFightPickByIdAndUid = (fightPickId: string, uid: string) => {
  const [fightPick, setFightPick] = useState<FightPick | undefined | null>(
    undefined,
  );
  useEffect(() => {
    if (fightPickId === '') {
      setFightPick(null);
      return;
    }
    let isCanceled = false;
    const updateFightPick = async () => {
      try {
        const fightPicksCollection =
          appFirestore().repository.users.getFightPicksCollection(uid);
        const fightPickDoc = await fightPicksCollection.doc(fightPickId).get();
        if (isCanceled) return;

        const firebaseFightPick = fightPickDoc?.data() ?? null;
        const fightPick =
          firebaseFightPick === null
            ? null
            : mapFightPickFromFirebase(firebaseFightPick);

        setFightPick(fightPick);
      } catch (e) {
        console.error('useFightPickByIdAndUid', e);
      }
    };
    updateFightPick();
    return () => {
      isCanceled = true;
    };
  }, [uid, fightPickId]);

  return {
    fightPick: fightPick ?? null,
    loading: fightPick === undefined,
  };
};
