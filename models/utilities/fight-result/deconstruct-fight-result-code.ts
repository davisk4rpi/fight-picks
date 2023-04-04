import { isRound } from '../../fight-result.guard';
import { isMethod } from '../../method.guard';
import { Method, Round } from '../../types';
import { InvalidFightResultCodeError } from './InvalidFightResultCodeError';

type RawFightResultCodes = [string, number | null, number | null];
type FightResultCodes = [Method, 1 | 2 | null, Round | null];

export const deconstructFightResultCode = (code: string): FightResultCodes => {
  const split = code.split('-');
  const method = split[0];
  const winningFighter = split[1] === 'null' ? null : Number(split[1]);
  const round = split[2] === 'null' ? null : Number(split[2]);
  const resultsCodes: RawFightResultCodes = [method, winningFighter, round];
  if (validateFightResultCodes(resultsCodes)) {
    return resultsCodes;
  }
  throw new InvalidFightResultCodeError(
    'Code could not be properly deconstructured',
    code,
  );
};

/**
 * This function weeds out incorrectly formatted codes
 * @param fightResultCode A potential fight result code
 * @returns
 */
export const validateFightResultCodes = (
  resultCodes: RawFightResultCodes,
): resultCodes is FightResultCodes => {
  if (resultCodes.length !== 3) {
    throw new InvalidFightResultCodeError(
      'Code must have 3 components',
      resultCodes.join('-'),
    );
  }
  const [method, winningFighter, round] = resultCodes;

  if (!isMethod(method)) {
    throw new InvalidFightResultCodeError(
      'Invalid method found in result code',
      resultCodes.join('-'),
    );
  }
  if (winningFighter !== null && winningFighter !== 1 && winningFighter !== 2) {
    throw new InvalidFightResultCodeError(
      'Invalid winningFighter found in result code',
      resultCodes.join('-'),
    );
  }
  const numRound = Number(round);
  if (!isRound(numRound) && round !== null) {
    throw new InvalidFightResultCodeError(
      'Invalid round found in result code',
      resultCodes.join('-'),
    );
  }

  return true;
};
