import { useEffect, useRef, useState } from 'react';

import { appFirestore, mapUserFromFirebase } from '../db';
import { User } from '../db/types';

export const useUsers = () => {
  const [users, setUsers] = useState<User[] | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = appFirestore.usersCollection.onSnapshot(
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
