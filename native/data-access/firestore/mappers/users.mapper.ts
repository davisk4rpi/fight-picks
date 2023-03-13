import { User, UserRoles } from '@fight-picks/models';

import { FirebaseUser } from '../types';

export const mapUserFromFirebase = (firebaseUser: FirebaseUser): User => {
  return {
    uid: firebaseUser.uid,
    displayName: firebaseUser.authDisplayName,
    isAdmin: firebaseUser.roles.includes(UserRoles.admin),
  };
};
