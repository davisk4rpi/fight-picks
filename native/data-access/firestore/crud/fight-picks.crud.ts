import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import {
  fightPicksQuery,
  FirebaseFightPick,
  FirebaseFightRef,
  FirestoreFieldValue,
  getFightPickRef,
  getFightRef,
} from '../db';

export type FirebaseFightPickUpsertInput = Pick<
  FirebaseFightPick,
  'userRef' | 'confidence' | 'fightRef' | 'updatedBy'
> & {
  id?: string;
  resultCode: string;
};

const UPSERT_FIGHT_PICK_SET_OPTIONS: FirebaseFirestoreTypes.SetOptions = {
  mergeFields: [
    'userRef',
    'fightRef',
    'confidence',
    'resultCode',
    'updatedAt',
    'updatedBy',
  ],
};

export const upsertFightPick = async ({
  id,
  userRef,
  fightRef,
  confidence,
  updatedBy,
  resultCode,
}: FirebaseFightPickUpsertInput) => {
  const fightPickRef = getFightPickRef(userRef, id);
  return fightPickRef.set(
    {
      id: fightPickRef.id,
      userRef,
      fightRef,
      confidence,
      resultCode,
      createdAt: FirestoreFieldValue.serverTimestamp(),
      updatedAt: FirestoreFieldValue.serverTimestamp(),
      updatedBy,
    },
    id === '' || id === undefined ? undefined : UPSERT_FIGHT_PICK_SET_OPTIONS,
  );
};

/**
 * Retrieves all user FightPicks assiociated with the provied fightId or FirebaseFightRef
 * @param ref A fightId, existing FirebaseFightRef
 * @returns A FirebaseFirestoreTypes.Query<FirebaseFightPick>
 */
export const getFightPicksQueryByFight = (ref: string | FirebaseFightRef) => {
  const fightRef = getFightRef(ref);
  return fightPicksQuery().where('fightRef', '==', fightRef);
};

/**
 * Retrieves all user FightPicks assiociated with the provied fightId or FirebaseFightRef
 * @param refs An array of fightIds, existing FirebaseFightRefs
 * @returns A FirebaseFirestoreTypes.Query<FirebaseFightPick>
 */
export const getFightPicksQueryByFights = (
  refs: (string | FirebaseFightRef)[],
) => {
  if (refs.length > 10) {
    throw new Error('Firebase only supports up to 10 refs for "in" queries!');
  }
  const fightRefs = refs.map(ref => getFightRef(ref));

  return fightPicksQuery().where('fightRef', 'in', fightRefs);
};
