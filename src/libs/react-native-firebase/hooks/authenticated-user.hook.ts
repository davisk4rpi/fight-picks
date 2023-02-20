import { useEffect, useState } from 'react';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

// https://rnfirebase.io/auth/usage#listening-to-authentication-state
export const useAuthenticatedUser = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    return auth().onAuthStateChanged(async user => {
      setUser(user);
      setInitializing(false);
    });
  }, []);

  return {
    user,
    initializing,
  };
};
