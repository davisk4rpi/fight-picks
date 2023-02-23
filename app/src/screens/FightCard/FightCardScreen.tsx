import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList, RootTabParamList } from '../../../types';
import { ThemeSpacing } from '../../app-context';
import { LoadingScreen, Screen } from '../../components';
import { FightCardHeadline } from '../../components/feature';
import { useFightCardScreen } from './fight-card-screen.hook';
import { FightRowItem } from './FightRowItem';

type FightCardScreenProps =
  | NativeStackScreenProps<RootStackParamList, 'FightCard'>
  | BottomTabScreenProps<RootTabParamList, 'CurrentFightCard'>;

export const FightCardScreen = ({ route }: FightCardScreenProps) => {
  const fightCardId = route.params?.fightCardId;

  const { loading, fightCard } = useFightCardScreen(fightCardId);
  if (loading) return <LoadingScreen testID="FightCardScreen" />;
  if (fightCard === undefined)
    return (
      <Screen testID="FightCardScreen">
        <Text variant="displayMedium" adjustsFontSizeToFit numberOfLines={1}>
          No Fights Loaded
        </Text>
      </Screen>
    );

  return (
    <Screen testID="FightCardScreen" style={styles.screen}>
      <FightCardHeadline
        name={fightCard.name}
        mainCardDate={fightCard.mainCardDate}
      />
      <FlatList
        style={styles.fightsFlatList}
        data={fightCard.fightIds}
        renderItem={obj => (
          <FightRowItem
            key={obj.item}
            fightId={obj.item}
            elevation={fightCardId === undefined ? 2 : 1}
          />
        )}
        keyExtractor={id => id}
        scrollEnabled={fightCard.fightIds.length > 3}
        horizontal={false}
        contentContainerStyle={styles.fightsFlatListContent}
        indicatorStyle="white"
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingBottom: 0,
  },
  fightsFlatList: {
    marginHorizontal: -1 * ThemeSpacing.horizontalScreen,
    paddingHorizontal: ThemeSpacing.horizontalScreen,
  },
  fightsFlatListContent: {
    paddingBottom: ThemeSpacing.verticalScreen,
  },
});
