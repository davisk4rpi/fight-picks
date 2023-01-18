import { useEffect, useState } from 'react';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export const useAuthenticatedUser = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      console.log('state change');
      setUser(user);
      setInitializing(false);
    });
    return () => {
      console.log('unsubscribing');
      unsubscribe();
    }; // unsubscribe on unmount
  }, []);

  console.log('User', user);

  return {
    user,
    initializing,
  };
};
