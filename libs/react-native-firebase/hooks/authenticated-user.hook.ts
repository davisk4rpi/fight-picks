import { useEffect, useState } from 'react';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

type useAuthenticatedUserParams = {
  onUserAuthenticated?: (user: FirebaseAuthTypes.User) => void | Promise<void>;
};

// https://rnfirebase.io/auth/usage#listening-to-authentication-state
export const useAuthenticatedUser = ({
  onUserAuthenticated,
}: useAuthenticatedUserParams) => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user !== null && onUserAuthenticated) onUserAuthenticated(user);
  }, [user, onUserAuthenticated]);

  useEffect(() => {
    let cancel = false;
    const unsubscribe = auth().onAuthStateChanged(async user => {
      setUser(user);
      setInitializing(false);
      const result = await user?.getIdTokenResult();
      if (result && !cancel) {
        setIsAdmin(!!result.claims.admin);
      }
    });
    return () => {
      unsubscribe();
      cancel = true;
    }; // unsubscribe on unmount
  }, []);

  return {
    user,
    isAdmin,
    initializing,
  };
};
