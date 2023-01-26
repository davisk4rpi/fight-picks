import { useEffect, useRef, useState } from 'react';

import { db } from '../db';
import { Fighter } from '../db/types';

type FightersMap = Map<string, Fighter>;
export const useFightersByIds = (fighterIds: string[]) => {
  const [fighterMapById, setFighterMapById] = useState<FightersMap>(new Map());
  const [loading, setLoading] = useState(true);

  const fighterMapByIdRef = useRef<FightersMap>(fighterMapById);
  fighterMapByIdRef.current = fighterMapById;

  useEffect(() => {
    if (fighterIds.length === 0) {
      setFighterMapById(prev =>
        prev === undefined || prev.size === 0 ? prev : new Map(),
      );
      return;
    }
    if (fighterIds.every(id => fighterMapByIdRef.current.has(id))) {
      return;
    }
    let cancel = false;

    const fetchFighters = async () => {
      const fightersQuerySnapshot = await db.fighters
        .where('id', 'in', fighterIds)
        .get();
      const newMap = fightersQuerySnapshot.docs.reduce<FightersMap>(
        (map, fighter) => {
          const { id, name } = fighter.data();
          map.set(fighter.id, {
            id,
            name,
          });
          return map;
        },
        new Map(),
      );
      if (cancel) return;
      setFighterMapById(newMap);
      setLoading(false);
    };
    fetchFighters();
    return () => {
      cancel = true;
    };
  }, [fighterIds]);

  return {
    fighterMapById,
    loading,
  };
};

export const PLACEHOLDER_FIGHTER: Fighter = {
  id: 'n/a',
  name: 'Fighter TBA',
};
