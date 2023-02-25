import {
  Confidence,
  FightResult,
  FightResultWithFinish,
  MethodMap,
  MethodWithFinish,
  MethodWithNoWinner,
  MethodWithWinner,
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
  fightResult: FightResult,
): fightResult is FightResultWithFinish => {
  if (
    isMethodWithFinish(fightResult.method) &&
    fightResult.winningFighterId !== null &&
    typeof fightResult.winningFighterId === 'string'
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
