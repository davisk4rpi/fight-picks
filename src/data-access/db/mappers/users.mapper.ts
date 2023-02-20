import { User, UserRoles } from '../../../../models.types';
import { FirebaseUser } from '../firebaseTypes';

export const mapUserFromFirebase = (firebaseUser: FirebaseUser): User => {
  return {
    uid: firebaseUser.uid,
    displayName: firebaseUser.authDisplayName,
    isAdmin: firebaseUser.roles.includes(UserRoles.admin),
  };
};
