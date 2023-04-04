import {
  Method,
  MethodMap,
  MethodWithFinish,
  MethodWithNoRound,
  MethodWithNoWinner,
  MethodWithWinner,
} from './types';

export const isMethodWithWinner = (
  method?: string | null,
): method is MethodWithWinner => {
  return method === MethodMap.decision || isMethodWithFinish(method);
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

export const isMethod = (method: string): method is Method =>
  isMethodWithNoWinner(method) || isMethodWithWinner(method);
