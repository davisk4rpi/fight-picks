import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../../types';
import { ThemeSpacing } from '../../app-context';
import { LoadingScreen, Screen } from '../../components';
import { FightCardHeadline } from '../../components/feature';
import { useFightCardScreen } from './fight-card-screen.hook';
import { FightRowItem } from './FightRowItem';

type FightCardScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FightCard'
>;

export const FightCardScreen = ({ route }: FightCardScreenProps) => {
  const { fightCardId } = route.params;

  const { loading, fightCard, fightsWithPicks } =
    useFightCardScreen(fightCardId);
  if (loading) return <LoadingScreen testID="FightCardScreen" />;
  if (fightCard === null)
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
        data={fightsWithPicks}
        renderItem={obj => <FightRowItem item={obj.item} />}
        keyExtractor={({ id }) => id}
        scrollEnabled={fightsWithPicks.length > 3}
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
