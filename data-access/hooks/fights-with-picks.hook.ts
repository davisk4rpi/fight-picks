import { useEffect, useState } from 'react';

import { db, Fight, FightPick, mapFightPickFromFirebase } from '../db';

export type FightWithPicks = Fight & {
  pick?: FightPick;
};

export const useFightsWithPicks = (fights: Fight[]) => {
  const [fightsWithPicks, setFightsWithPicks] = useState<FightWithPicks[]>([]);

  useEffect(() => {
    if (fights.length === 0) return;
    setFightsWithPicks(fights);
    const fightIds = fights.map(({ id }) => id);
    const unsubscribe = db.users.fightPicks
      .getCollection()
      .where('fightId', 'in', fightIds)
      .onSnapshot(snapshot => {
        const fightPicks: Record<string, FightPick> = {};
        snapshot.docs.forEach(doc => {
          const data = doc.data();
          fightPicks[data.fightId] = mapFightPickFromFirebase(data);
        });
        setFightsWithPicks(prevFights => {
          const newFights = prevFights.map(fight => {
            fight.pick = fightPicks[fight.id];
            return fight;
          });
          return newFights;
        });
      });

    return unsubscribe;
  }, [fights]);

  return {
    fightsWithPicks,
  };
};
