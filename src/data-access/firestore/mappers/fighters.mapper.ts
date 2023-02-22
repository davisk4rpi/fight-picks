import { Fighter } from '../../../../models.types';
import { FirebaseFighter } from '../types';

export const mapFighterFromFirebase = (
  firebaseFighter: FirebaseFighter,
): Fighter => {
  return {
    id: firebaseFighter.id,
    name: firebaseFighter.name,
  };
};
