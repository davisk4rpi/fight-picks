import React, { useMemo } from 'react';
import { StyleSheet, TextStyle, View } from 'react-native';
import { Text } from 'react-native-paper';

import {
  appleAuth,
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';

import { ThemeSpacing, useTheme } from '../../app-context';
import { Screen } from '../../components';
import {
  useAppleSignIn,
  useGoogleSignIn,
} from '../../libs/react-native-firebase';

export const LoginScreen = () => {
  const { colors } = useTheme();
  const { active: googleSignInActive, signInWithGoogle } = useGoogleSignIn();
  const { active: appleSignInActive, signInWithApple } = useAppleSignIn();
  const textStyle: TextStyle = useMemo(
    () => ({ color: colors.onBackground }),
    [colors],
  );
  return (
    <Screen style={styles.screen}>
      <View style={styles.titleContainer}>
        <Text variant="displayLarge" style={textStyle}>
          Fight Picks
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <GoogleSigninButton
          // style={{ width: 312, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={signInWithGoogle}
          disabled={googleSignInActive || appleSignInActive}
        />
        {appleAuth.isSupported && (
          <AppleButton
            cornerRadius={5}
            style={styles.appleButton}
            buttonStyle={AppleButton.Style.WHITE}
            buttonType={AppleButton.Type.SIGN_IN}
            onPress={signInWithApple}
          />
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  inputContainer: { flexGrow: 1 },
  appleButton: {
    width: 304,
    height: 44,
    marginHorizontal: 4,
    marginTop: ThemeSpacing.base * 4,
  },
});
