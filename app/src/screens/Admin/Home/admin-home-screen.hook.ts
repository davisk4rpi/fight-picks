import { useCallback, useMemo } from 'react';

import {
  addUserRole,
  removeUserRole,
  useUsers,
} from '@fight-picks/native-data-access';

export const useAdminHomeScreen = () => {
  const { users, loading } = useUsers();

  const addAdminRoleToUser = useCallback((uid: string) => {
    addUserRole({ uid, role: 'admin' });
  }, []);

  const removeAdminRoleFromUser = useCallback((uid: string) => {
    // TODO handle Firebase permission error
    // Error: [firestore/permission-denied] The caller does not have permission to execute the specified operation.
    removeUserRole({ uid, role: 'admin' });
  }, []);

  // TODO this will not scale
  const sortedUsers = useMemo(
    () => users.sort((a, b) => (!a.isAdmin && b.isAdmin ? 1 : -1)),
    [users],
  );

  return {
    users: sortedUsers,
    loading,
    addAdminRoleToUser,
    removeAdminRoleFromUser,
  };
};
