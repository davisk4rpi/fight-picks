import { isMethodWithNoRound, isMethodWithNoWinner } from '../../method.guard';
import { FightResult } from '../../types';
import { deconstructFightResultCode } from './deconstruct-fight-result-code';
import { InvalidFightResultCodeError } from './InvalidFightResultCodeError';

export const buildFightResultCode = (
  method: string,
  winningFighter: number | null,
  round: number | null,
) => `${method}-${winningFighter}-${round}`;

export function encodeFightResult(fightResult: FightResult): string;
export function encodeFightResult(fightResult: null): null;
export function encodeFightResult(
  fightResult: FightResult | null,
): string | null;
export function encodeFightResult(
  fightResult: FightResult | null,
): string | null {
  if (fightResult === null) return null;
  const code = buildFightResultCode(
    fightResult.method,
    fightResult.winningFighter,
    fightResult.round,
  );

  try {
    decodeFightResult(code);
  } catch (e) {
    console.log(e);
    throw new InvalidFightResultCodeError(
      `Result generated an invalid code`,
      code,
      fightResult,
    );
  }
  return code;
}

export function decodeFightResult(code: string): FightResult;
export function decodeFightResult(code: null): null;
export function decodeFightResult(code: string | null): FightResult | null;
export function decodeFightResult(code: string | null): FightResult | null {
  if (code === null) return null;
  const [method, winningFighter, round] = deconstructFightResultCode(code);

  if (isMethodWithNoWinner(method)) {
    if (winningFighter !== null && round !== null) {
      throw new InvalidFightResultCodeError(
        `winningFighter & round must be null when method === ${method}`,
        code,
      );
    }
    return {
      method,
      round: null,
      winningFighter: null,
    };
  }

  if (winningFighter === null) {
    throw new InvalidFightResultCodeError(
      `winningFighter can't be null when method === ${method}`,
      code,
    );
  }

  if (isMethodWithNoRound(method)) {
    if (round !== null) {
      throw new InvalidFightResultCodeError(
        `round must be null when method === ${method}`,
        code,
      );
    }
    return {
      method,
      round: null,
      winningFighter,
    };
  }

  if (round === null) {
    throw new InvalidFightResultCodeError(
      `round can't be null when method === ${method}`,
      code,
    );
  }
  return {
    method,
    round,
    winningFighter,
  };
}
