import { useMemo } from 'react';

import { mapFightFromFirebase } from '../db';
import { useFightersByIds } from './fighters-by-ids';
import { useFirebaseFightsByFightCardId } from './firebase-fights-by-fight-card-id.hook';

export const useFightsWithFightersByFightCardId = (
  fightCardId: string | undefined,
) => {
  const { firebaseFights, loading: fightsLoading } =
    useFirebaseFightsByFightCardId(fightCardId);

  const fighterIds = firebaseFights.reduce<string[]>((ids, fight) => {
    ids.push(fight.fighter1Id);
    ids.push(fight.fighter2Id);
    return ids;
  }, []);

  const { fighterMapById, loading: fightersLoading } =
    useFightersByIds(fighterIds);

  const fights = useMemo(
    () =>
      firebaseFights.map(firebaseFight =>
        mapFightFromFirebase(firebaseFight, fighterMapById),
      ),
    [fighterMapById, firebaseFights],
  );

  return {
    fights,
    loading: fightCardId !== undefined && (fightsLoading || fightersLoading),
  };
};
