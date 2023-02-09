import { useEffect, useRef, useState } from 'react';

import { appFirestore } from '../db';
import { User } from '../db/types';

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
          const { uid, authDisplayName } = user.data();
          map.set(uid, {
            uid,
            displayName: authDisplayName,
          });
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
