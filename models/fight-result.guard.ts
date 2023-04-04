import { isMethodWithFinish, isMethodWithNoWinner } from './method.guard';
import {
  Confidence,
  FightResult,
  FightResultWithDecision,
  FightResultWithFinish,
  FightResultWithNoWinner,
  MethodMap,
  RawFightResult,
  Round,
} from './types';

export const isFightResultWithFinish = (
  fightResult: RawFightResult,
): fightResult is FightResultWithFinish => {
  if (
    isMethodWithFinish(fightResult.method) &&
    fightResult.winningFighter !== null &&
    fightResult.round !== null
  )
    return true;
  return false;
};
export const isFightResultWithDecision = (
  fightResult: RawFightResult,
): fightResult is FightResultWithDecision => {
  if (
    fightResult.method === MethodMap.decision &&
    fightResult.winningFighter !== null &&
    fightResult.round === null
  )
    return true;
  return false;
};
export const isFightResultWithNoWinner = (
  fightResult: RawFightResult,
): fightResult is FightResultWithNoWinner => {
  if (
    isMethodWithNoWinner(fightResult.method) &&
    fightResult.winningFighter === null &&
    fightResult.round === null
  )
    return true;
  return false;
};

export const isFightResult = (
  fightResult: RawFightResult,
): fightResult is FightResult => {
  if (
    isFightResultWithDecision(fightResult) ||
    isFightResultWithFinish(fightResult) ||
    isFightResultWithNoWinner(fightResult)
  )
    return true;
  return false;
};

export const isRound = (round?: number | null): round is Round => {
  return [1, 2, 3, 4, 5].includes(round ?? 0);
};
export const isConfidence = (
  confidence?: number | null,
): confidence is Confidence => {
  return [1, 2, 3, 4, 5].includes(confidence ?? 0);
};
