import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

import { RootTabParamList } from '../../types';
import { FightCardScreen, PastFightCardsScreen, ScoreScreen } from '../screens';

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
        headerRight: SettingsButton,
      }}>
      <BottomTab.Screen
        name="PastFightCards"
        component={PastFightCardsScreen}
        options={{
          title: 'Past',
          headerTitle: 'Past Cards',
          tabBarIcon: PastCardsTabBarIcon,
        }}
      />
      <BottomTab.Screen
        name="CurrentFightCard"
        component={FightCardScreen}
        options={() => ({
          title: 'Home',
          tabBarIcon: CurrentCardTabBarIcon,
        })}
      />
      <BottomTab.Screen
        name="Score"
        component={ScoreScreen}
        options={() => ({
          title: 'Score',
          tabBarIcon: ScoreTabBarIcon,
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
const TabBarIcon = (props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) => {
  return <FontAwesome size={30} style={styles.icon} {...props} />;
};

const PastCardsTabBarIcon = ({ color }: { color: string }) => (
  <TabBarIcon color={color} name="clock-o" />
);

const CurrentCardTabBarIcon = ({ color }: { color: string }) => (
  <TabBarIcon color={color} name="home" />
);

const ScoreTabBarIcon = ({ color }: { color: string }) => (
  <TabBarIcon color={color} name="code" />
);

const styles = StyleSheet.create({
  icon: { marginBottom: -3 },
});
