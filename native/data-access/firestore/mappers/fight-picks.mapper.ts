import {
  FightPick,
  isConfidence,
  isMethodWithWinner,
  isRound,
} from '@fight-picks/models';
import { WithOptional } from '@fight-picks/utilities';
import {
  FirebaseFightPick,
  getFighterRef,
  getFightRef,
  getUserRef,
} from '../db';

import { FirebaseFightPickUpsertInput } from '../crud';

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
      fightId: firebaseFightPick.fightRef.id,
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
      fightId: firebaseFightPick.fightRef.id,
      userUid: firebaseFightPick.userRef.id,
      winningFighterId: firebaseFightPick.winningFighterRef.id,
      method,
      round,
      confidence,
    };
  }
};

export const mapFightPickToFirebaseUpsertInput = (
  fightPick: WithOptional<FightPick, 'id'>,
  updatedByUserUid?: string | null,
): FirebaseFightPickUpsertInput => {
  const userRef = getUserRef(fightPick.userUid);
  const id = !fightPick?.id ? undefined : fightPick.id;
  return {
    id,
    fightRef: getFightRef(fightPick.fightId),
    userRef,
    winningFighterRef: getFighterRef(fightPick.winningFighterId),
    method: fightPick.method,
    round: fightPick.round,
    confidence: fightPick.confidence,
    updatedBy: updatedByUserUid ? getUserRef(updatedByUserUid) : userRef,
  };
};
