import { FightCard } from '@fight-picks/models';

import { FirebaseFightCard } from '../db';

export const mapFightCardFromFirebase = (
  firebaseFightCard: FirebaseFightCard,
): FightCard => {
  return {
    id: firebaseFightCard.id,
    mainCardDate: firebaseFightCard.mainCardDate.toDate().toISOString(),
    name: firebaseFightCard.name,
    fightIds: firebaseFightCard.fightRefs.map(ref => ref.id),
  };
};
