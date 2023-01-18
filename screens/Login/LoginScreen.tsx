import React from 'react';
import { Text } from 'react-native-paper';

import { GoogleSigninButton } from '@react-native-google-signin/google-signin';

import { Screen } from '../../components';
import { useGoogleSignIn } from '../../libs/react-native-firebase';

export const LoginScreen = () => {
  const { active, signInWithGoogle } = useGoogleSignIn();
  return (
    <Screen>
      <Text>Login</Text>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signInWithGoogle}
        disabled={active}
      />
    </Screen>
  );
};
