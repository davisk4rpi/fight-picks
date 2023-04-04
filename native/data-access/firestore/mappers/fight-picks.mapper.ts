import {
  buildFightResultCode,
  FightPick,
  isConfidence,
} from '@fight-picks/models';
import { WithOptional } from '@fight-picks/utilities';
import {
  FirebaseFight,
  FirebaseFightPick,
  getFightRef,
  getUserRef,
} from '../db';

import { FirebaseFightPickUpsertInput } from '../crud';

export const mapFightPickFromFirebase = (
  firebaseFightPick: FirebaseFightPick,
  fighter1Ref: FirebaseFight['fighter1Ref'],
): FightPick => {
  const confidence = isConfidence(firebaseFightPick.confidence)
    ? firebaseFightPick.confidence
    : 1;

  if (firebaseFightPick.resultCode) {
    return {
      resultCode: firebaseFightPick.resultCode,
      id: firebaseFightPick.id,
      fightId: firebaseFightPick.fightRef.id,
      userUid: firebaseFightPick.userRef.id,
      confidence,
    };
  }
  const winningFighter = resolveWinningFighterFromFirebaseFightPick(
    firebaseFightPick,
    fighter1Ref,
  );

  const resultCode = buildFightResultCode(
    firebaseFightPick.method ?? '',
    winningFighter,
    firebaseFightPick.round ?? null,
  );

  return {
    id: firebaseFightPick.id,
    fightId: firebaseFightPick.fightRef.id,
    userUid: firebaseFightPick.userRef.id,
    resultCode,
    confidence,
  };
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
    resultCode: fightPick.resultCode,
    confidence: fightPick.confidence,
    updatedBy: updatedByUserUid ? getUserRef(updatedByUserUid) : userRef,
  };
};

const resolveWinningFighterFromFirebaseFightPick = (
  { winningFighterRef }: Pick<FirebaseFightPick, 'winningFighterRef'>,
  fighter1Ref: FirebaseFight['fighter1Ref'],
): 1 | 2 => {
  return winningFighterRef === undefined ||
    winningFighterRef?.id === fighter1Ref.id
    ? 1
    : 2;
};
