import React, { useCallback } from 'react';
import { IconButton } from 'react-native-paper';

import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

import {
  CurrentFightCardScreen,
  PastFightCardsScreen,
  ScoreScreen,
} from '../screens';
import { RootTabParamList } from '../types';

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

const SettingsButton = () => {
  const { navigate } = useNavigation();
  const handlePress = useCallback(() => {
    navigate('Settings');
  }, [navigate]);
  return <IconButton icon="cog" onPress={handlePress} />;
};

export function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="CurrentFightCard"
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme].tint,
        headerRight: SettingsButton,
      }}>
      <BottomTab.Screen
        name="PastFightCards"
        component={PastFightCardsScreen}
        options={{
          title: 'Past',
          headerTitle: 'Past Cards',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="clock-o" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="CurrentFightCard"
        component={CurrentFightCardScreen}
        // options={({ navigation }: RootTabScreenProps<'CurrentFightCardScreen'>) => ({
        options={() => ({
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
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
        name="Score"
        component={ScoreScreen}
        // options={({ navigation }: RootTabScreenProps<'CurrentFightCardScreen'>) => ({
        options={() => ({
          title: 'Score',
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
