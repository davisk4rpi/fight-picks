import { useEffect, useState } from 'react';

import { User } from '@fight-picks/models';

import { usersCollection } from '../db';
import { mapUserFromFirebase } from '../mappers';

export const useUsers = () => {
  const [users, setUsers] = useState<User[] | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = usersCollection().onSnapshot(
      snapshot => {
        const users = snapshot.docs.map(doc => {
          return mapUserFromFirebase(doc.data());
        });
        setUsers(users);
      },
      error => console.error(error),
    );
    return unsubscribe;
  }, []);
  return {
    users: users ?? [],
    loading: users === undefined,
  };
};
