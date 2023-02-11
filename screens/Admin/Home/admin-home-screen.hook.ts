import { useCallback } from 'react';

import { useUsers } from '../../../data-access';
import { appFirestore } from '../../../data-access/db';

export const useAdminHomeScreen = () => {
  const { users, loading } = useUsers();
  const addAdminRoleToUser = useCallback((uid: string) => {
    appFirestore.repository.users.addRole({ uid, role: 'admin' });
  }, []);
  const removeAdminRoleFromUser = useCallback((uid: string) => {
    // TODO handle Firebase permission error
    // Error: [firestore/permission-denied] The caller does not have permission to execute the specified operation.
    appFirestore.repository.users.removeRole({ uid, role: 'admin' });
  }, []);

  return {
    users,
    loading,
    addAdminRoleToUser,
    removeAdminRoleFromUser,
  };
};
