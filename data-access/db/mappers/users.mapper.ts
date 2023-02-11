import { FirebaseUser } from '../firebaseTypes';
import { User, UserRoles } from '../types';

export const mapUserFromFirebase = (firebaseUser: FirebaseUser): User => {
  return {
    uid: firebaseUser.uid,
    displayName: firebaseUser.authDisplayName,
    isAdmin: firebaseUser.roles.includes(UserRoles.admin),
  };
};
