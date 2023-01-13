import { InputError } from './InputError';

export class DuplicateError extends InputError {
  constructor(message?: string) {
    super(message);
    this.name = 'DuplicateError';
  }
}
