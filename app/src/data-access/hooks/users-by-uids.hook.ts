import { useEffect, useRef, useState } from 'react';

import { User } from '@fight-picks/models';

import { appFirestore, mapUserFromFirebase } from '../firestore';

type UsersMap = Map<string, User>;

const emptyUserMap: UsersMap = new Map();
export const useUsersByUids = (uids: string[]) => {
  const [userMapByUid, setUserMapByUid] = useState<UsersMap | undefined>(
    undefined,
  );

  const userMapByUidRef = useRef<UsersMap>(userMapByUid ?? emptyUserMap);
  userMapByUidRef.current = userMapByUid ?? emptyUserMap;

  useEffect(() => {
    if (uids.length === 0) {
      setUserMapByUid(undefined);
      return;
    }
    if (uids.every(id => userMapByUidRef.current.has(id))) {
      return;
    }

    const unsubscribe = appFirestore.usersCollection
      .where('uid', 'in', uids)
      .onSnapshot(snapshot => {
        const newMap = snapshot.docs.reduce<UsersMap>((map, user) => {
          const userData = user.data();
          map.set(userData.uid, mapUserFromFirebase(userData));
          return map;
        }, new Map());
        setUserMapByUid(newMap);
      });

    return unsubscribe;
  }, [uids]);

  return {
    userMapByUid: userMapByUid ?? emptyUserMap,
    loading: uids.length > 0 && userMapByUid === undefined,
  };
};

export const PLACEHOLDER_USER: User = {
  uid: 'n/a',
  displayName: 'TBA',
};
