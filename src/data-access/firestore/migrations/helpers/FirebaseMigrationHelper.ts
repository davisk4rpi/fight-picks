import firestore from '@react-native-firebase/firestore';

import { MigrationAlreadyExistsError } from '../../../../libs/utililities';
import {
  AppFirestoreModule,
  FirebaseFight,
  FirebaseFightCard,
  FirebaseFightCardRef,
  FirebaseFighterRef,
  FirebaseMigrationRef,
} from '../../types';

export type FighterNameMap = Map<string, FirebaseFighterRef>;

enum FirebaseMigrationStatus {
  pending = 'pending',
  initialized = 'initialized',
  failed = 'failed',
  complete = 'complete',
}

export class FirebaseMigrationHelper {
  private migrationActive = false;
  private migrationRef: FirebaseMigrationRef;

  constructor(
    private migrationFirestore: AppFirestoreModule,
    private migrationName: string,
  ) {
    this.migrationRef = this.migrationFirestore.migrationsCollection.doc(
      this.migrationName,
    );
  }

  public initializeMigration = async () => {
    const migrationSnapshot = await this.migrationRef.get();
    if (migrationSnapshot.exists) {
      throw new MigrationAlreadyExistsError(
        this.migrationName,
        migrationSnapshot.data(),
      );
    }

    this.migrationRef.set({
      name: this.migrationName,
      status: FirebaseMigrationStatus.initialized,
      createdAt: firestore.FieldValue.serverTimestamp(),
      updatedAt: firestore.FieldValue.serverTimestamp(),
      initializedAt: firestore.FieldValue.serverTimestamp(),
      endedAt: null,
    });
    this.migrationActive = true;
  };

  public validateActiveIsMigration = () => {
    if (this.migrationActive) return;
    throw Error('Migration is not active!');
  };

  public failMigration = async () => {
    await this.migrationRef.update({
      status: FirebaseMigrationStatus.failed,
      updatedAt: new Date(),
    });
    this.migrationActive = false;
    return;
  };
  public markMigrationComplete = async () => {
    await this.migrationRef.update({
      status: FirebaseMigrationStatus.complete,
      updatedAt: firestore.FieldValue.serverTimestamp(),
      endedAt: firestore.FieldValue.serverTimestamp(),
    });
    return;
  };

  public createFightersIfNotExist = async (
    fighterNames: string[],
    fighterMap: FighterNameMap,
  ) => {
    return fighterNames.map(
      fighterName =>
        fighterMap.get(fighterName) ?? this.createFighter(fighterName),
    );
  };

  public createFighter = (fighterName: string) => {
    this.validateActiveIsMigration();
    const ref = this.migrationFirestore.fightersCollection.doc();
    ref.set({
      id: ref.id,
      name: fighterName,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
    return ref;
  };

  public createFight = (fight: Omit<FirebaseFight, 'createdAt' | 'id'>) => {
    this.validateActiveIsMigration();
    const ref = this.migrationFirestore.fightsCollection.doc();
    ref.set({
      ...fight,
      id: ref.id,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
    return ref;
  };

  public setFightCard = (
    ref: FirebaseFightCardRef,
    fightCard: Omit<FirebaseFightCard, 'createdAt'>,
  ) => {
    this.validateActiveIsMigration();
    ref.set({
      ...fightCard,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
    return ref;
  };

  public getFighterNameMap = async () => {
    this.validateActiveIsMigration();
    const fighters = await this.migrationFirestore.fightersCollection.get();
    const fighterMap: FighterNameMap = new Map();
    fighters.docs.forEach(fighter =>
      fighterMap.set(fighter.data().name, fighter.ref),
    );
    return fighterMap;
  };
}
