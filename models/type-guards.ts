import {
  Confidence,
  FightResult,
  FightResultWithDecision,
  FightResultWithFinish,
  FightResultWithNoWinner,
  MethodMap,
  MethodWithFinish,
  MethodWithNoRound,
  MethodWithNoWinner,
  MethodWithWinner,
  RawFightResult,
  Round,
} from './types';

export const isMethodWithWinner = (
  method?: string | null,
): method is MethodWithWinner => {
  return method === typeof MethodMap.decision || isMethodWithFinish(method);
};

export const isMethodWithNoWinner = (
  method?: string | null,
): method is MethodWithNoWinner => {
  return method === MethodMap.no_contest || method === MethodMap.draw;
};

export const isMethodWithNoRound = (
  method?: string | null,
): method is MethodWithNoRound => {
  return method === MethodMap.decision || isMethodWithNoWinner(method);
};

export const isMethodWithFinish = (
  method?: string | null,
): method is MethodWithFinish => {
  return [
    MethodMap.knockout as string,
    MethodMap.submission as string,
    MethodMap.disqualification as string,
  ].includes(method ?? '');
};

export const isFightResultWithFinish = (
  fightResult: RawFightResult,
): fightResult is FightResultWithFinish => {
  if (
    isMethodWithFinish(fightResult.method) &&
    fightResult.winningFighterId !== null &&
    typeof fightResult.winningFighterId === 'string' &&
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
    fightResult.winningFighterId !== null &&
    typeof fightResult.winningFighterId === 'string' &&
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
    fightResult.winningFighterId === null &&
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
