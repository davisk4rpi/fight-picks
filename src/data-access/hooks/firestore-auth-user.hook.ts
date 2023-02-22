import { useEffect, useState } from 'react';

import { User } from '../../../models.types';
import { useAuthenticatedUser } from '../../libs/react-native-firebase';
import { appFirestore, mapUserFromFirebase } from '../firestore';

export const useFirestoreAuthUser = () => {
  const { user: authUser, initializing } = useAuthenticatedUser();

  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    if (authUser === null || initializing) {
      setUser(prev => (prev === undefined || initializing ? undefined : null));
      return;
    }

    const unsubscribe = appFirestore.usersCollection
      .doc(authUser.uid)
      .onSnapshot(
        snapshot => {
          const data = snapshot.data();
          if (data) {
            setUser(mapUserFromFirebase(data));
          } else {
            appFirestore.repository.users.set(authUser);
            setUser(null);
          }
        },
        error => console.error(error),
      );
    return unsubscribe;
  }, [authUser, initializing]);
  return {
    user: user ?? null,
    loading: user === undefined,
  };
};
