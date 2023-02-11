import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Surface, Text } from 'react-native-paper';

import functions from '@react-native-firebase/functions';

import { LoadingScreen, Screen } from '../../../components';
import { User } from '../../../data-access/db';
import { useAuthenticatedUser } from '../../../libs/react-native-firebase';
import { useAdminHomeScreen } from './admin-home-screen.hook';

export interface AdminHomeScreenProps {}

const TEST_ID = 'AdminHomeScreen';

export const AdminHomeScreen = ({}: AdminHomeScreenProps) => {
  const { loading, users, addAdminRoleToUser, removeAdminRoleFromUser } =
    useAdminHomeScreen();
  if (loading) {
    return <LoadingScreen testID={TEST_ID} />;
  }

  return (
    <Screen testID={TEST_ID}>
      <View style={styles.view}>
        {users.map(({ uid, displayName, isAdmin }) => {
          const handlePress = () => {
            isAdmin ? removeAdminRoleFromUser(uid) : addAdminRoleToUser(uid);
          };
          return (
            <UserRow
              uid={uid}
              displayName={displayName}
              key={uid}
              isAdmin={isAdmin}
              onPress={handlePress}
            />
          );
        })}
      </View>
    </Screen>
  );
};

interface UserRowProps extends User {
  onPress: () => void;
}

const UserRow = ({ uid, displayName, isAdmin, onPress }: UserRowProps) => {
  return (
    <Surface>
      <Text>{displayName + uid}</Text>
      <Button onPress={onPress}>{isAdmin ? 'removeAdmin' : 'makeAdmin'}</Button>
    </Surface>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});
