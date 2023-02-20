import { useEffect, useMemo, useState } from 'react';

import { Fight, Fighter } from '../../../models.types';
import { appFirestore, mapFightFromFirebase } from '../db';
import { FirebaseFight } from '../db/types';
import { useFightersByIds } from './fighters-by-ids.hook';

export const useFightWithFighters = (fightId: string) => {
  const [firebaseFight, setFirebaseFight] = useState<
    FirebaseFight | undefined | null
  >(undefined);

  useEffect(() => {
    const unsubscribe = appFirestore.fightsCollection
      .doc(fightId)
      .onSnapshot(snapshot => {
        setFirebaseFight(snapshot.data());
      });
    return unsubscribe;
  }, [fightId]);

  const fighterIds = useMemo(
    () =>
      firebaseFight
        ? [firebaseFight.fighter1Ref.id, firebaseFight.fighter2Ref.id]
        : [],
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
