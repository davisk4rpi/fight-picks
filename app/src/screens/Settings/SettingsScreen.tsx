import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../../types';
import { ThemeSpacing, Translation } from '../../app-context';
import { LoadingScreen, Screen } from '../../components';
import { useSettingsScreen } from './settings-screen.hook';

type SettingsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Settings'
>;

const TEST_ID = 'SettingsScreen';

const SignOutButton = () => {
  const { colors } = useTheme();

  const handlePress = useCallback(() => {
    auth().signOut();
    GoogleSignin.signOut();
  }, []);

  return (
    <Button onPress={handlePress} textColor={colors.error}>
      {Translation.logOut}
    </Button>
  );
};

const AdminDashboardButton = () => {
  const { navigate } = useNavigation();
  const handlePress = useCallback(() => {
    navigate('AdminHome');
  }, [navigate]);
  return (
    <Button onPress={handlePress} mode="contained-tonal">
      {Translation.adminDashboard}
    </Button>
  );
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
        {isAdmin && <AdminDashboardButton />}
        <SignOutButton />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    marginVertical: ThemeSpacing.base * 3,
    justifyContent: 'space-between',
  },
});
