import { useEffect } from 'react';

import { User } from '@fight-picks/models';

import { appFirestore } from '../../app-firestore';
import { mapUserFromFirebase } from '../../mappers';

export type OnCurrentUserUpdate = (snapshot: User | null) => void;

export const useCurrentUserSubscription = (
  uid: string | null,
  onSnapshot: OnCurrentUserUpdate,
) => {
  useEffect(() => {
    if (!uid) {
      onSnapshot(null);
      return;
    }
    const unsubscribe = appFirestore.usersCollection.doc(uid).onSnapshot(
      snapshot => {
        const data = snapshot.data();
        if (data) {
          onSnapshot(mapUserFromFirebase(data));
        } else {
          onSnapshot(null);
        }
      },
      error => console.error('useCurrentUserSubscription', error),
    );
    return unsubscribe;
  }, [uid, onSnapshot]);
};
