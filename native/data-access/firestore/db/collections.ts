import { isStringOrUndefined } from '@fight-picks/utilities';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { appFirestore } from './app-firestore';
import {
  FirebaseFight,
  FirebaseFightCard,
  FirebaseFightCardRef,
  FirebaseFighter,
  FirebaseFighterRef,
  FirebaseFightPick,
  FirebaseFightPickRef,
  FirebaseFightRef,
  FirebaseUser,
  FirebaseUserRef,
} from './firebase.types';

export const usersCollection = () =>
  appFirestore().collection<FirebaseUser>('users');

/**
 * Always resolves to a FirebaseUserRef;
 * @param ref A userUid, existing FirebaseUserRef, or undefined in the case of a new user
 * @returns A FirebaseUserRef object
 */
export const getUserRef = (ref?: string | FirebaseUserRef): FirebaseUserRef =>
  isStringOrUndefined(ref) ? usersCollection().doc(ref) : ref;

export const fightCardsCollection = () =>
  appFirestore().collection<FirebaseFightCard>('fightCards');

/**
 * Always resolves to a FirebaseFightCardRef;
 * @param ref A fightCardId, existing FirebaseFightCardRef, or undefined in the case of a new fightCard
 * @returns A FirebaseFightCardRef object
 */
export const getFightCardRef = (
  ref?: string | FirebaseFightCardRef,
): FirebaseFightCardRef =>
  isStringOrUndefined(ref) ? fightCardsCollection().doc(ref) : ref;

export const fightersCollection = () =>
  appFirestore().collection<FirebaseFighter>('fighters');

/**
 * Always resolves to a FirebaseFighterRef;
 * @param ref A fighterId, existing FirebaseFighterRef, or undefined in the case of a new fighter
 * @returns A FirebaseFighterRef object
 */
export const getFighterRef = (
  ref?: string | FirebaseFighterRef,
): FirebaseFighterRef =>
  isStringOrUndefined(ref) ? fightersCollection().doc(ref) : ref;

export const fightsCollection = () =>
  appFirestore().collection<FirebaseFight>('fights');

/**
 * Always resolves to a FirebaseFightRef;
 * @param ref A fightId, existing FirebaseFightRef, or undefined in the case of a new fight
 * @returns A FirebaseFightRef object
 */
export const getFightRef = (
  ref?: string | FirebaseFightRef,
): FirebaseFightRef =>
  isStringOrUndefined(ref) ? fightsCollection().doc(ref) : ref;

export const fightPicksQuery = () =>
  appFirestore().collectionGroup<FirebaseFightPick>('fightPicks');

/**
 * Always resolves to a FirebaseFightPickCollectionReference;
 * @param user A userUid or FirebaseUserRef of the owner of this collection
 * @returns A FirebaseFightPickCollectionReference
 */
export const getFightPicksCollectionByUser = (
  user: string | FirebaseUserRef,
) => {
  const userRef = getUserRef(user);
  const collection = userRef.collection('fightPicks');
  return collection as FirebaseFirestoreTypes.CollectionReference<FirebaseFightPick>;
};

/**
 *
 * @param user A userUid or FirebaseUserRef of the owner of the this fightPick
 * @param fightPickId
 * @returns
 */
export const getFightPickRef = (
  user: string | FirebaseUserRef,
  fightPickId?: string,
): FirebaseFightPickRef => {
  const collection = getFightPicksCollectionByUser(user);
  return collection.doc(fightPickId);
};
