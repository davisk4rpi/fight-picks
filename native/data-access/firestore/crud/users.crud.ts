import { NotFoundError } from '@fight-picks/utilities';
import { FirestoreFieldValue, getUserRef } from '../db';

export const createAuthUserIfNotExists = async ({
  uid,
  displayName,
  roles,
}: {
  uid: string;
  displayName: string | null;
  roles?: string[];
}) => {
  const userRef = getUserRef(uid);
  const existingUserSnapshot = await userRef.get();
  if (existingUserSnapshot.exists) {
    return;
  }
  return userRef.set({
    uid,
    authDisplayName: displayName,
    createdAt: FirestoreFieldValue.serverTimestamp(),
    roles: roles ?? [],
  });
};

export const addUserRole = async ({
  uid,
  role,
}: {
  uid: string;
  role: 'admin';
}) => {
  const userRef = getUserRef(uid);
  const existingUserSnapshot = await userRef.get();
  if (!existingUserSnapshot.exists) {
    throw new NotFoundError(`User: ${uid} does not exist!`);
  }
  return userRef.update({
    roles: FirestoreFieldValue.arrayUnion(role),
  });
};

export const removeUserRole = async ({
  uid,
  role,
}: {
  uid: string;
  role: 'admin';
}) => {
  const userRef = getUserRef(uid);
  const existingUserSnapshot = await userRef.get();
  if (!existingUserSnapshot.exists) {
    throw new NotFoundError(`User: ${uid} does not exist!`);
  }
  return userRef.update({
    roles: FirestoreFieldValue.arrayRemove(role),
  });
};
