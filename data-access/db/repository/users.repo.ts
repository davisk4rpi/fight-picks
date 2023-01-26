import { nanoid } from 'nanoid';

import { firebase } from '@react-native-firebase/auth';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import { NotFoundError } from '../../../libs/utililities';
import { FirebaseFightPick, FirebaseUser } from '../firebaseTypes';
import { FightPick, User } from '../types';

export const usersRepository = (
  collection: FirebaseFirestoreTypes.CollectionReference<FirebaseUser>,
) => {
  const currentAuthUser = () => firebase.auth().currentUser;

  const getDocRef = (uid: string) => {
    return collection.doc(uid);
  };

  const get = async (uid: string) => {
    const user = await getDocRef(uid).get();
    const data = user.data();
    return data !== undefined ? convertToUser(data) : null;
  };
  const set = async ({
    uid,
    displayName,
  }: {
    uid: string;
    displayName: string | null;
  }) => {
    const existingUserRef = await getDocRef(uid).get();
    if (existingUserRef.exists) {
      return;
    }
    return collection.doc(uid).set({
      uid,
      authDisplayName: displayName,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
  };

  const setFightPick = async (
    fightId: string,
    { id, winningFighterId, round, method, confidence }: FightPick,
  ) => {
    const currentUser = currentAuthUser();
    if (currentUser === null) {
      // Throw Error?
      // TODO log
      return;
    }
    const fightPicksCollection = getFightPicksCollection(currentUser.uid);
    const docId = id === '' ? nanoid() : id;
    const setOptions: FirebaseFirestoreTypes.SetOptions = {
      mergeFields: [
        'fightId',
        'winningFighterId',
        'round',
        'method',
        'confidence',
        'updatedAt',
      ],
    };
    return fightPicksCollection.doc(docId).set(
      {
        id: docId,
        fightId,
        winningFighterId,
        round,
        method,
        confidence,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      },
      id === '' ? undefined : setOptions,
    );
  };

  const getFightPicksCollection = (uid?: string) => {
    const docId = uid ?? currentAuthUser()?.uid;
    if (docId === undefined) {
      throw new NotFoundError('Could not find fight picks');
    }
    return collection
      .doc(docId)
      .collection(
        'fightPicks',
      ) as FirebaseFirestoreTypes.CollectionReference<FirebaseFightPick>;
  };

  return {
    get,
    set,
    currentAuthUser,
    setFightPick,
    collection,
    fightPicks: {
      getCollection: getFightPicksCollection,
    },
  };
};

const convertToUser = (user: FirebaseUser | undefined): User | null => {
  if (user === undefined) return null;
  if (
    typeof user.uid === 'string' &&
    (user.authDisplayName === null || typeof user.authDisplayName === 'string')
  ) {
    return {
      uid: user.uid,
      displayName: user.authDisplayName,
    };
  }
  return null;
};
