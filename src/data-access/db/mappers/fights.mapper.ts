import {
  Fight,
  Fighter,
  FightResult,
  FightResultWithFinish,
  isMethodWithFinish,
  isMethodWithNoWinner,
  isRound,
} from '../../../../models.types';
import { FirebaseFight, FirebaseFightResult } from '../types';

export const mapFightFromFirebase = (
  firebaseFight: FirebaseFight,
  fighterMapById: Map<string, Fighter>,
): Fight => {
  return {
    id: firebaseFight.id,
    fightCardId: firebaseFight.fightCardRef.id,
    weight: firebaseFight.weight,
    rounds: firebaseFight.rounds === 3 ? 3 : 5,
    sex: firebaseFight.sex === 'male' ? 'male' : 'female',
    fighter1:
      fighterMapById.get(firebaseFight.fighter1Ref.id) ?? PLACEHOLDER_FIGHTER,
    fighter2:
      fighterMapById.get(firebaseFight.fighter2Ref.id) ?? PLACEHOLDER_FIGHTER,
    result: mapFightResultFromFirebase(firebaseFight.result),
  };
};

const mapFightResultFromFirebase = (
  firebaseFightResult?: FirebaseFightResult,
): FightResult | undefined => {
  if (firebaseFightResult === undefined) return undefined;

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

const PLACEHOLDER_FIGHTER: Fighter = {
  id: 'n/a',
  name: 'Fighter TBA',
};
