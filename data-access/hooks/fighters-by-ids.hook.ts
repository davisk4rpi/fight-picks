import { useEffect, useRef, useState } from 'react';

import { appFirestore } from '../db';
import { Fighter } from '../db/types';

type FightersMap = Map<string, Fighter>;

const emptyFighterMap: FightersMap = new Map();
export const useFightersByIds = (fighterIds: string[]) => {
  const [fighterMapById, setFighterMapById] = useState<FightersMap | undefined>(
    undefined,
  );

  const fighterMapByIdRef = useRef<FightersMap>(
    fighterMapById ?? emptyFighterMap,
  );
  fighterMapByIdRef.current = fighterMapById ?? emptyFighterMap;

  useEffect(() => {
    if (fighterIds.length === 0) {
      setFighterMapById(undefined);
      return;
    }
    if (fighterIds.every(id => fighterMapByIdRef.current.has(id))) {
      return;
    }

    const unsubscribe = appFirestore.fightersCollection
      .where('id', 'in', fighterIds)
      .onSnapshot(snapshot => {
        const newMap = snapshot.docs.reduce<FightersMap>((map, fighter) => {
          const { id, name } = fighter.data();
          map.set(fighter.id, {
            id,
            name,
          });
          return map;
        }, new Map());
        setFighterMapById(newMap);
      });

    return unsubscribe;
  }, [fighterIds]);

  return {
    fighterMapById: fighterMapById ?? emptyFighterMap,
    loading: fighterIds.length > 0 && fighterMapById === undefined,
  };
};

export const PLACEHOLDER_FIGHTER: Fighter = {
  id: 'n/a',
  name: 'Fighter TBA',
};
