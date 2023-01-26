import { FirebaseFightPick } from '../firebaseTypes';
import { FightPick, isConfidence, isMethodWithWinner, isRound } from '../types';

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
      winningFighterId: firebaseFightPick.winningFighterId,
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
      winningFighterId: firebaseFightPick.winningFighterId,
      method,
      round,
      confidence,
    };
  }
};
