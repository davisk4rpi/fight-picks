import {
  FightPick,
  isConfidence,
  isMethodWithWinner,
  isRound,
} from '../../../../models.types';
import { FirebaseFightPick } from '../firebaseTypes';

export const mapFightPickFromFirebase = (
  firebaseFightPick: FirebaseFightPick,
): FightPick => {
  const confidence = isConfidence(firebaseFightPick.confidence)
    ? firebaseFightPick.confidence
    : 1;

  const method = isMethodWithWinner(firebaseFightPick.method)
    ? firebaseFightPick.method
    : 'decision';

  if (method === 'decision') {
    return {
      id: firebaseFightPick.id,
      fightId: firebaseFightPick.winningFighterRef.id,
      userUid: firebaseFightPick.userRef.id,
      winningFighterId: firebaseFightPick.winningFighterRef.id,
      method,
      round: null,
      confidence,
    };
  } else {
    const round = isRound(firebaseFightPick.round)
      ? firebaseFightPick.round
      : 1;

    return {
      id: firebaseFightPick.id,
      fightId: firebaseFightPick.winningFighterRef.id,
      userUid: firebaseFightPick.userRef.id,
      winningFighterId: firebaseFightPick.winningFighterRef.id,
      method,
      round,
      confidence,
    };
  }
};
