import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { LoadingScreen, Screen } from '../../components';
import { RootStackParamList } from '../../types';
import { useSettingsScreen } from './settings-screen.hook';

type SettingsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Settings'
>;

const TEST_ID = 'SettingsScreen';

const SignOutButton = () => {
  const handlePress = useCallback(() => {
    auth().signOut();
    GoogleSignin.signOut();
  }, []);
  return <Button onPress={handlePress}>Sign Out</Button>;
};

export const SettingsScreen = ({ route }: SettingsScreenProps) => {
  const isAdmin = route?.params?.isAdmin ?? false;

  const { loading } = useSettingsScreen();

  if (loading) {
    return <LoadingScreen testID={TEST_ID} />;
  }
  return (
    <Screen testID={TEST_ID}>
      <View style={styles.view}>
        <SignOutButton />
        <Text>isAdmin: {isAdmin.toString()}</Text>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});
