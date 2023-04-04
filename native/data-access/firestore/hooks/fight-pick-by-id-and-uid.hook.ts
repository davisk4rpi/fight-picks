import { useEffect, useState } from 'react';

import { Fight, FightPick } from '@fight-picks/models';

import { getFighterRef, getFightPickRef } from '../db';
import { mapFightPickFromFirebase } from '../mappers';

export const useFightPickByIdAndUid = (
  fightPickId: string,
  uid: string,
  fighter1Id: Fight['fighter1Id'],
) => {
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
        const fightPicksRef = getFightPickRef(uid, fightPickId);
        const fightPickDoc = await fightPicksRef.get();
        if (isCanceled) return;

        const firebaseFightPick = fightPickDoc?.data() ?? null;
        const fightPick =
          firebaseFightPick === null
            ? null
            : mapFightPickFromFirebase(
                firebaseFightPick,
                getFighterRef(fighter1Id),
              );

        setFightPick(fightPick);
      } catch (e) {
        console.error('useFightPickByIdAndUid', e);
      }
    };
    updateFightPick();
    return () => {
      isCanceled = true;
    };
  }, [uid, fightPickId, fighter1Id]);

  return {
    fightPick: fightPick ?? null,
    loading: fightPick === undefined,
  };
};
