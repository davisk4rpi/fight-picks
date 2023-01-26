import { FirebaseFight } from '../firebaseTypes';
import { Fight, Fighter } from '../types';

export const mapFightFromFirebase = (
  firebaseFight: FirebaseFight,
  fighterMapById: Map<string, Fighter>,
): Fight => {
  return {
    id: firebaseFight.id,
    weight: firebaseFight.weight,
    rounds: firebaseFight.rounds === 3 ? 3 : 5,
    sex: firebaseFight.sex === 'male' ? 'male' : 'female',
    fighter1:
      fighterMapById.get(firebaseFight.fighter1Id) ?? PLACEHOLDER_FIGHTER,
    fighter2:
      fighterMapById.get(firebaseFight.fighter2Id) ?? PLACEHOLDER_FIGHTER,
  };
};

const PLACEHOLDER_FIGHTER: Fighter = {
  id: 'n/a',
  name: 'Fighter TBA',
};
