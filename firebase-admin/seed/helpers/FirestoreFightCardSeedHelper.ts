import { FieldValue, Timestamp } from 'firebase-admin/firestore';

import {
  AdminFirestoreModule,
  FirestoreFight,
  FirestoreFightCard,
  FirestoreFightCardRef,
  FirestoreFighterRef,
  FirestoreFightRef,
} from '../../types';

export type FightCardInitialData = {
  mainCardDate: Date;
  name: string;
  org: 'ufc';
};
type FighterNameMap = Map<string, FirestoreFighterRef>;

type CreateFightInputResultsField = Omit<
  Exclude<FirestoreFight['result'], undefined>,
  'winningFighterRef'
> & { winningFighter: 1 | 2 | null };

type CreateFightInput = Omit<
  FirestoreFight,
  'createdAt' | 'id' | 'fightCardRef' | 'fighter1Ref' | 'fighter2Ref' | 'result'
> & {
  fighter1Name: string;
  fighter2Name: string;
  result?: CreateFightInputResultsField;
};

export class FirestoreFightCardSeedHelper {
  private seedActive = false;
  private fightCardRef: FirestoreFightCardRef;
  private fighterMap: FighterNameMap = new Map();
  private fightRefs = new Array<FirestoreFightRef>();

  constructor(
    private adminFirestore: AdminFirestoreModule,
    private fightCardInitalData: FightCardInitialData,
  ) {
    this.fightCardRef = this.adminFirestore.fightCardsCollection.doc(
      this.fightCardId,
    );
  }

  get fightCardId() {
    return `${
      this.fightCardInitalData.org
    }-${this.fightCardInitalData.mainCardDate.toISOString()}`;
  }

  public initializeFightCardSeed = async () => {
    await this.setFighterNameMap();
    const fightCardSnapshot = await this.fightCardRef.get();
    if (fightCardSnapshot.exists) {
      throw new Error(`FightCard: ${this.fightCardRef.id} already exists!`);
    }

    this.seedActive = true;
  };

  private validateActiveSeed = () => {
    if (this.seedActive) return;
    throw Error('Seed is not active!');
  };

  public createFightersIfNotExist = (fighterNames: string[]) => {
    return fighterNames.map(
      fighterName =>
        this.fighterMap.get(fighterName) ?? this.createFighter(fighterName),
    );
  };

  private createFighter = (fighterName: string) => {
    this.validateActiveSeed();
    const ref = this.adminFirestore.fightersCollection.doc();
    ref.set({
      id: ref.id,
      name: fighterName,
      createdAt: FieldValue.serverTimestamp(),
    });
    return ref;
  };

  public createFight = (fightInput: CreateFightInput) => {
    this.validateActiveSeed();
    const fighterRefs = this.createFightersIfNotExist([
      fightInput.fighter1Name,
      fightInput.fighter2Name,
    ]);

    const ref = this.adminFirestore.fightsCollection.doc();
    ref.set({
      ...fightInput,
      id: ref.id,
      fightCardRef: this.fightCardRef,
      fighter1Ref: fighterRefs[0],
      fighter2Ref: fighterRefs[1],
      result: this.getResultFromCreateFightInput(fightInput, fighterRefs),
      createdAt: FieldValue.serverTimestamp(),
    });
    this.fightRefs.push(ref);
    return ref;
  };

  private getResultFromCreateFightInput = (
    { result }: CreateFightInput,
    fighterRefs: FirestoreFighterRef[],
  ): FirestoreFight['result'] => {
    if (result === undefined) return undefined;
    const { winningFighter, method, round } = result;
    return {
      winningFighterRef:
        winningFighter === null ? null : fighterRefs[winningFighter - 1],
      method,
      round,
    };
  };

  public setFightCard = async () => {
    this.validateActiveSeed();
    await this.fightCardRef.set({
      id: this.fightCardRef.id,
      mainCardDate: Timestamp.fromDate(this.fightCardInitalData.mainCardDate),
      name: this.fightCardInitalData.name,
      fightRefs: this.fightRefs,
      createdAt: FieldValue.serverTimestamp(),
    });
    return this.fightCardRef;
  };

  private setFighterNameMap = async () => {
    const fightersSnapshot = await this.adminFirestore.fightersCollection.get();
    fightersSnapshot.docs.forEach(fighter =>
      this.fighterMap.set(fighter.data().name, fighter.ref),
    );
    return;
  };
}
