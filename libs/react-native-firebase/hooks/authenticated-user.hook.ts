import { useEffect, useState } from 'react';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

type useAuthenticatedUserParams = {
  onUserAuthenticated: (user: FirebaseAuthTypes.User) => void | Promise<void>;
};

export const useAuthenticatedUser = ({
  onUserAuthenticated,
}: useAuthenticatedUserParams) => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    if (user !== null) onUserAuthenticated(user);
  }, [user, onUserAuthenticated]);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setUser(user);
      setInitializing(false);
    });
    return () => {
      unsubscribe();
    }; // unsubscribe on unmount
  }, []);

  return {
    user,
    initializing,
  };
};
