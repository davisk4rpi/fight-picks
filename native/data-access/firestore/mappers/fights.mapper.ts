import {
  encodeFightResult,
  Fight,
  FightResult,
  FightResultWithFinish,
  isMethodWithFinish,
  isMethodWithNoWinner,
  isRound,
} from '@fight-picks/models';

import { FirebaseFight, FirebaseFightResult } from '../db';

export const mapFightFromFirebase = (firebaseFight: FirebaseFight): Fight => {
  const resultCode = resolveResultCodeFromFirebase(firebaseFight);
  return {
    id: firebaseFight.id,
    fightCardId: firebaseFight.fightCardRef.id,
    weight: firebaseFight.weight,
    rounds: firebaseFight.rounds === 3 ? 3 : 5,
    sex: firebaseFight.sex === 'male' ? 'male' : 'female',
    fighter1Id: firebaseFight.fighter1Ref.id,
    fighter2Id: firebaseFight.fighter2Ref.id,
    resultCode,
    isCanceled: firebaseFight.isCanceled ?? false,
  };
};

/**
 * @deprecated Will remove this after resultCode has fully replaced results in the db
 * @param firebaseFightResult
 * @param fighter1Ref
 * @returns
 */
const mapFightResultFromFirebase = (
  firebaseFightResult: FirebaseFightResult | null,
  fighter1Ref: FirebaseFight['fighter1Ref'],
): FightResult | null => {
  if (firebaseFightResult === null) return null;

  const { method, round } = firebaseFightResult;
  const winningFighter = resolveWinningFighterFromFirebaseFight(
    firebaseFightResult,
    fighter1Ref,
  );

  if (isMethodWithNoWinner(method)) {
    return {
      winningFighter: null,
      method: method,
      round: null,
    };
  }

  if (winningFighter !== null && method === 'decision') {
    return {
      winningFighter,
      method: 'decision',
      round: null,
    };
  }
  if (winningFighter !== null && isMethodWithFinish(method) && isRound(round)) {
    const result: FightResultWithFinish = {
      winningFighter,
      method: method,
      round: round,
    };
    return result;
  }

  // TODO Log abnormality
  console.error('Failed to map firebase fight result', firebaseFightResult);
  return null;
};

const resolveResultCodeFromFirebase = (firebaseFight: FirebaseFight) => {
  if (firebaseFight.resultCode !== undefined) return firebaseFight.resultCode;
  const result = mapFightResultFromFirebase(
    firebaseFight.result ?? null,
    firebaseFight.fighter1Ref,
  );

  return encodeFightResult(result);
};

const resolveWinningFighterFromFirebaseFight = (
  {
    winningFighter,
    winningFighterRef,
  }: Pick<FirebaseFightResult, 'winningFighter' | 'winningFighterRef'>,
  fighter1Ref: FirebaseFight['fighter1Ref'],
): 1 | 2 | null => {
  if (winningFighter === null) return null;
  if (winningFighter === undefined) {
    if (!winningFighterRef) {
      return null;
    }
    return winningFighterRef.id === fighter1Ref.id ? 1 : 2;
  }
  return winningFighter === 1 ? 1 : 2;
};
