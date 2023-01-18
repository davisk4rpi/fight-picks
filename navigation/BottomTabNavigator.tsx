import React from 'react';
import { Button } from 'react-native-paper';

import { FontAwesome } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NextEventScreen } from '../screens';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootTabParamList } from '../types';

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

const SignOutButton = () => {
  const handlePress = () => {
    auth().signOut();
    GoogleSignin.signOut();
  };
  return <Button onPress={handlePress}>Sign Out</Button>;
};

export function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="NextEvent"
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme].tint,
        headerRight: SignOutButton,
      }}>
      <BottomTab.Screen
        name="NextEvent"
        component={NextEventScreen}
        // options={({ navigation }: RootTabScreenProps<'NextEventScreen'>) => ({
        options={() => ({
          title: 'Upcoming',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          // headerRight: () => (
          //   <Pressable
          //     onPress={() => navigation.navigate('Modal')}
          //     style={({ pressed }) => ({
          //       opacity: pressed ? 0.5 : 1,
          //     })}>
          //     <FontAwesome
          //       name="info-circle"
          //       size={25}
          //       // color={Colors[colorScheme].text}
          //       style={{ marginRight: 15 }}
          //     />
          //   </Pressable>
          // ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
