import { useEffect, useState } from 'react';

import { User } from '@fight-picks/models';

import { appFirestore } from '../../firestore/app-firestore';
import { mapUserFromFirebase } from '../../firestore/mappers';

export const useUserByUid = (uid: string) => {
  const [user, setUser] = useState<User | undefined | null>(undefined);

  useEffect(() => {
    let isCanceled = false;
    const updateUser = async () => {
      try {
        const userSnapshot = await appFirestore.usersCollection.doc(uid).get();
        if (isCanceled) return;

        const firebaseUser = userSnapshot?.data() ?? null;
        const user =
          firebaseUser === null ? null : mapUserFromFirebase(firebaseUser);

        setUser(user);
      } catch (e) {
        console.error(e);
      }
    };
    updateUser();
    return () => {
      isCanceled = true;
    };
  }, [uid]);

  return {
    user: user ?? null,
    loading: user === undefined,
  };
};
