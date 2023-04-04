import { FightResult } from '../../types';

export class InvalidFightResultCodeError extends Error {
  constructor(message: string, code: string | number, result?: FightResult) {
    super(`${message} - [${code}] ${result === undefined ? '' : result}`);
    this.name = 'InvalidFightResultCodeError';
  }
}
