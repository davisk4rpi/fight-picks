import {
  Fight,
  FightResult,
  FightResultWithFinish,
  isMethodWithFinish,
  isMethodWithNoWinner,
  isRound,
} from '@fight-picks/models';

import { FirebaseFight, FirebaseFightResult } from '../types';

export const mapFightFromFirebase = (firebaseFight: FirebaseFight): Fight => {
  return {
    id: firebaseFight.id,
    fightCardId: firebaseFight.fightCardRef.id,
    weight: firebaseFight.weight,
    rounds: firebaseFight.rounds === 3 ? 3 : 5,
    sex: firebaseFight.sex === 'male' ? 'male' : 'female',
    fighter1Id: firebaseFight.fighter1Ref.id,
    fighter2Id: firebaseFight.fighter2Ref.id,
    result: mapFightResultFromFirebase(firebaseFight.result),
    isCanceled: firebaseFight.isCanceled ?? false,
  };
};

const mapFightResultFromFirebase = (
  firebaseFightResult?: FirebaseFightResult | null,
): FightResult | undefined => {
  if (firebaseFightResult === undefined || firebaseFightResult === null)
    return undefined;

  const { winningFighterRef, method, round } = firebaseFightResult;

  if (isMethodWithNoWinner(method)) {
    return {
      winningFighterId: null,
      method: method,
      round: null,
    };
  }

  if (winningFighterRef !== null && method === 'decision') {
    return {
      winningFighterId: winningFighterRef.id,
      method: 'decision',
      round: null,
    };
  }
  if (
    winningFighterRef !== null &&
    isMethodWithFinish(method) &&
    isRound(round)
  ) {
    const result: FightResultWithFinish = {
      winningFighterId: winningFighterRef.id ?? '',
      method: method,
      round: round,
    };
    return result;
  }

  // TODO Log abnormality
  return undefined;
};
