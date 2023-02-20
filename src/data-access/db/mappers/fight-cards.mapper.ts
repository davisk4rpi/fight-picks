import { FightCard } from '../../../../models.types';
import { FirebaseFightCard } from '../firebaseTypes';

export const mapFightCardFromFirebase = (
  firebaseFightCard: FirebaseFightCard,
): FightCard => {
  return {
    id: firebaseFightCard.id,
    mainCardDate: firebaseFightCard.mainCardDate.toDate(),
    name: firebaseFightCard.name,
    fightIds: firebaseFightCard.fightRefs.map(ref => ref.id),
  };
};
