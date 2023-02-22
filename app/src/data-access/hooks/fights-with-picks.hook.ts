import { useEffect, useState } from 'react';

import { Fight, FightPickWithScore } from '@fight-picks/models';

import { calculatePickScores } from '../../libs/scoring';
import { appFirestore, mapFightPickFromFirebase } from '../firestore';

export type FightWithPicks = Fight & {
  pick?: FightPickWithScore;
};

export const useFightsWithPicks = (fights: Fight[]) => {
  const [fightsWithPicks, setFightsWithPicks] = useState<FightWithPicks[]>([]);

  useEffect(() => {
    if (fights.length === 0) return;
    setFightsWithPicks(fights);
    const fightRefs = fights.map(({ id }) =>
      appFirestore.repository.fights.getDocRef(id),
    );
    const unsubscribe = appFirestore.repository.users
      .getFightPicksCollection()
      .where('fightRef', 'in', fightRefs)
      .onSnapshot(snapshot => {
        const fightPicks: Record<string, FightPickWithScore> = {};
        snapshot?.docs?.forEach(doc => {
          const data = doc.data();
          fightPicks[data.fightRef.id] = mapFightPickFromFirebase(data);
        });
        setFightsWithPicks(prevFights => {
          const newFights = prevFights.map(fight => {
            const pick = fightPicks[fight.id];
            if (pick === undefined) return fight;
            const { score, confidenceScore } = calculatePickScores(
              pick,
              fight.result,
            );
            pick.score = score;
            pick.confidenceScore = confidenceScore;
            fight.pick = pick;

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
