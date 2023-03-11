import { nanoid } from 'nanoid';

import { FightPick } from '@fight-picks/models';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import { NotFoundError, WithOptional } from '../../../libs/utilities';
import {
  FirebaseFight,
  FirebaseFighter,
  FirebaseFightPick,
  FirebaseUser,
} from '../types';
import { Repository } from './repository.abstract';

export type SetFightPickInput = WithOptional<
  Pick<
    FightPick,
    'id' | 'winningFighterId' | 'round' | 'method' | 'confidence'
  >,
  'id'
>;

export class UsersRepository extends Repository<FirebaseUser> {
  constructor(
    collection: FirebaseFirestoreTypes.CollectionReference<FirebaseUser>,
    protected fightersCollection: FirebaseFirestoreTypes.CollectionReference<FirebaseFighter>,
    protected fightsCollection: FirebaseFirestoreTypes.CollectionReference<FirebaseFight>,
  ) {
    super(collection);
  }

  set = async ({
    uid,
    displayName,
    roles,
  }: {
    uid: string;
    displayName: string | null;
    roles?: string[];
  }) => {
    const userRef = this.getDocRef(uid);
    const existingUserSnapshot = await userRef.get();
    if (existingUserSnapshot.exists) {
      return;
    }
    return userRef.set({
      uid,
      authDisplayName: displayName,
      createdAt: firestore.FieldValue.serverTimestamp(),
      roles: roles ?? [],
    });
  };

  addRole = async ({ uid, role }: { uid: string; role: 'admin' }) => {
    const userRef = this.getDocRef(uid);
    const existingUserSnapshot = await userRef.get();
    if (!existingUserSnapshot.exists) {
      return;
    }
    return userRef.update({
      roles: firestore.FieldValue.arrayUnion(role),
    });
  };

  removeRole = async ({ uid, role }: { uid: string; role: 'admin' }) => {
    const userRef = this.getDocRef(uid);
    const existingUserSnapshot = await userRef.get();
    if (!existingUserSnapshot.exists) {
      return;
    }
    return userRef.update({
      roles: firestore.FieldValue.arrayRemove(role),
    });
  };

  setFightPick = async (
    fightId: string,
    { id, winningFighterId, round, method, confidence }: SetFightPickInput,
    uid?: string,
  ) => {
    const currentUid = uid ?? this.currentAuthUser()?.uid;
    if (currentUid === undefined) {
      // Throw Error?
      // TODO log
      return;
    }
    const fightPicksCollection = this.getFightPicksCollection(currentUid);
    const docId = id === undefined || id === '' ? nanoid() : id;
    const setOptions: FirebaseFirestoreTypes.SetOptions = {
      mergeFields: [
        'userRef',
        'fightRef',
        'winningFighterRef',
        'round',
        'method',
        'confidence',
        'updatedAt',
      ],
    };
    console.log('newFightPickId', docId);
    return fightPicksCollection.doc(docId).set(
      {
        id: docId,
        userRef: this.getDocRef(currentUid),
        fightRef: this.fightsCollection.doc(fightId),
        winningFighterRef: this.fightersCollection.doc(winningFighterId),
        round,
        method,
        confidence,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      },
      id === undefined || id === '' ? undefined : setOptions,
    );
  };

  getFightPicksCollection = (uid?: string) => {
    const docId = uid ?? this.currentAuthUser()?.uid;
    if (docId === undefined) {
      throw new NotFoundError('Could not find fight picks');
    }
    return this.getDocRef(docId).collection(
      'fightPicks',
    ) as FirebaseFirestoreTypes.CollectionReference<FirebaseFightPick>;
  };
}
