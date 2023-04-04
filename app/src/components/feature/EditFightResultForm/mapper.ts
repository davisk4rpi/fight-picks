import {
  decodeFightResult,
  encodeFightResult,
  isMethodWithNoRound,
  isMethodWithNoWinner,
} from '@fight-picks/models';

import { FightResultFormValues } from './types';

export const mapEditFormValuesToFightResultCode = ({
  winningFighter,
  method,
  round,
}: FightResultFormValues): string | null => {
  const validMethod = method ?? 'decision';
  const validWinningFighter = winningFighter ?? 1;
  const validRound = round ?? 1;

  if (isMethodWithNoWinner(validMethod))
    return encodeFightResult({
      method: validMethod,
      winningFighter: null,
      round: null,
    });

  if (isMethodWithNoRound(validMethod))
    return encodeFightResult({
      method: validMethod,
      winningFighter: validWinningFighter,
      round: null,
    });

  return encodeFightResult({
    method: validMethod,
    winningFighter: validWinningFighter,
    round: validRound,
  });
};

export const mapFightResultCodeToEditFormValues = (
  code?: string | null,
): FightResultFormValues => {
  if (code) {
    return decodeFightResult(code);
  }
  return {
    method: null,
    winningFighter: null,
    round: null,
  };
};
