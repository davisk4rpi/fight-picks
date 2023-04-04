import { Fighter } from '@fight-picks/models';

import { FirebaseFighter } from '../db';

export const mapFighterFromFirebase = (
  firebaseFighter: FirebaseFighter,
): Fighter => {
  return {
    id: firebaseFighter.id,
    name: firebaseFighter.name,
  };
};
