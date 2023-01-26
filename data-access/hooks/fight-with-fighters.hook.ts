import { useEffect, useMemo, useState } from 'react';

import { db, mapFightFromFirebase } from '../db';
import { FirebaseFight } from '../db/firebaseTypes';
import { Fight, Fighter } from '../db/types';
import { useFightersByIds } from './fighters-by-ids';

export const useFightWithFighters = (fightId: string) => {
  const [firebaseFight, setFirebaseFight] = useState<
    FirebaseFight | undefined | null
  >(undefined);

  useEffect(() => {
    const unsubscribe = db.fights.doc(fightId).onSnapshot(snapshot => {
      setFirebaseFight(snapshot.data());
    });
    return unsubscribe;
  }, [fightId]);

  const fighterIds = useMemo(
    () =>
      firebaseFight ? [firebaseFight.fighter1Id, firebaseFight.fighter2Id] : [],
    [firebaseFight],
  );

  const { fighterMapById, loading: fightersLoading } =
    useFightersByIds(fighterIds);

  const fight: Fight | null = useMemo(
    () =>
      firebaseFight
        ? mapFightFromFirebase(firebaseFight, fighterMapById)
        : null,
    [firebaseFight, fighterMapById],
  );

  return {
    fight,
    loading: fight === undefined || fightersLoading,
  };
};

export const PLACEHOLDER_FIGHTER: Fighter = {
  id: 'n/a',
  name: 'Fighter TBA',
};
