import React, { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Surface, Text } from 'react-native-paper';

import { User } from '@fight-picks/models';

import { ThemeSpacing, Translation } from '../../../app-context';
import { LoadingScreen, Screen } from '../../../components';
import { useAdminHomeScreen } from './admin-home-screen.hook';

export interface AdminHomeScreenProps {}

const TEST_ID = 'AdminHomeScreen';

export const AdminHomeScreen = ({}: AdminHomeScreenProps) => {
  const { loading, users, addAdminRoleToUser, removeAdminRoleFromUser } =
    useAdminHomeScreen();

  const UserItem = useCallback(
    ({ item }: { item: User }) => {
      return (
        <UserRow
          uid={item.uid}
          displayName={item.displayName}
          key={item.uid}
          isAdmin={item.isAdmin}
          addAdminRoleToUser={addAdminRoleToUser}
          removeAdminRoleFromUser={removeAdminRoleFromUser}
        />
      );
    },
    [addAdminRoleToUser, removeAdminRoleFromUser],
  );

  if (loading) {
    return <LoadingScreen testID={TEST_ID} />;
  }

  return (
    <Screen testID={TEST_ID}>
      <View style={styles.view}>
        <Text style={styles.usersTitle} variant="titleMedium">
          {Translation.users}
        </Text>
        <FlatList
          data={users}
          renderItem={UserItem}
          keyExtractor={({ uid }) => uid}
          horizontal={false}
          contentContainerStyle={styles.usersFlatListContent}
          indicatorStyle="white"
        />
      </View>
    </Screen>
  );
};

interface UserRowProps extends User {
  removeAdminRoleFromUser: (uid: string) => void;
  addAdminRoleToUser: (uid: string) => void;
}

const UserRow = ({
  uid,
  displayName,
  isAdmin,
  removeAdminRoleFromUser,
  addAdminRoleToUser,
}: UserRowProps) => {
  const handlePress = () => {
    isAdmin ? removeAdminRoleFromUser(uid) : addAdminRoleToUser(uid);
  };
  return (
    <Surface style={styles.userRow}>
      <Text>{`${displayName} - ${isAdmin ? 'admin' : 'user'}`}</Text>
      <Button onPress={handlePress}>
        {isAdmin ? 'removeAdmin' : 'makeAdmin'}
      </Button>
    </Surface>
  );
};

const styles = StyleSheet.create({
  migrationsButton: {
    marginVertical: ThemeSpacing.base,
  },
  view: {
    flex: 1,
    marginTop: ThemeSpacing.base * 2,
  },
  usersFlatListContent: {
    paddingBottom: ThemeSpacing.verticalScreen,
    alignItems: 'stretch',
  },
  userRow: {
    marginVertical: ThemeSpacing.base,
    paddingHorizontal: ThemeSpacing.base * 2,
    paddingBottom: ThemeSpacing.base,
    paddingTop: ThemeSpacing.base * 2,
  },
  usersTitle: {
    marginVertical: ThemeSpacing.base * 2,
  },
});
