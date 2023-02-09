import { InputError } from './InputError';

const DEFAULT_MESSAGE = 'MIGRATION alreaduy exists!';

export class MigrationAlreadyExistsError extends InputError {
  constructor(migrationName?: string, data?: any) {
    const message = migrationName
      ? `MIGRATION ${migrationName} already exists! ${data}`
      : `${DEFAULT_MESSAGE} ${data}`;
    super(message);
    this.name = 'MigrationAlreadyExistsError';
  }
}
