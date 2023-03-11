import { useCallback, useState } from 'react';

import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export const useGoogleSignIn = () => {
  const [active, setActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const signInWithGoogle = useCallback(async () => {
    setActive(true);
    // Check if your device supports Google Play
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      if (error !== null && typeof error === 'object' && 'code' in error) {
        if (error?.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
          setErrorMessage(statusCodes.SIGN_IN_CANCELLED);
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
          return;
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
          setErrorMessage('Please update play services');
        }
      }
      console.error('error', error);
    }
    setActive(false);
  }, []);

  return { active, errorMessage, signInWithGoogle };
};
