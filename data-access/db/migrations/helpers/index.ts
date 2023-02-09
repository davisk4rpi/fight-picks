import { DocumentReference, FieldValue } from 'firebase-admin/firestore';

import { MigrationAlreadyExistsError } from '../../../../libs/utililities';
import {
  FirebaseSDKFight,
  FirebaseSDKFightCard,
  FirebaseSDKFightCardRef,
  FirebaseSDKFighterRef,
  FirebaseSDKMigration,
  MigrationFirestoreModule,
} from '../types';

export type FighterNameMap = Map<string, FirebaseSDKFighterRef>;

enum FirebaseMigrationStatus {
  initialized = 'initialized',
  failed = 'failed',
  complete = 'complete',
}

export class FirebaseMigrationHelper {
  private migrationActive = false;
  private migrationRef: DocumentReference<FirebaseSDKMigration>;

  constructor(
    private migrationFirestore: MigrationFirestoreModule,
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
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
    this.migrationActive = true;
  };

  public validateActiveIsMigration = () => {
    if (this.migrationActive) return;
    throw Error('Migration is not active!');
  };

  public failMigration = async () => {
    this.migrationRef.update({
      status: FirebaseMigrationStatus.failed,
      updatedAt: FieldValue.serverTimestamp(),
    });
    this.migrationActive = false;
  };
  public markMigrationComplete = async () => {
    this.migrationRef.update({
      status: FirebaseMigrationStatus.complete,
      updatedAt: FieldValue.serverTimestamp(),
    });
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
      createdAt: FieldValue.serverTimestamp(),
    });
    return ref;
  };

  public createFight = (fight: Omit<FirebaseSDKFight, 'createdAt'>) => {
    this.validateActiveIsMigration();
    const ref = this.migrationFirestore.fightsCollection.doc(fight.id);
    ref.set({
      ...fight,
      createdAt: FieldValue.serverTimestamp(),
    });
    return ref;
  };

  public setFightCard = (
    ref: FirebaseSDKFightCardRef,
    fightCard: Omit<
      FirebaseFirestore.WithFieldValue<FirebaseSDKFightCard>,
      'createdAt'
    >,
  ) => {
    this.validateActiveIsMigration();
    ref.set({
      ...fightCard,
      createdAt: FieldValue.serverTimestamp(),
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
