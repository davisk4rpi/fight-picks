import React, { useCallback } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../../types';
import { ThemeSpacing } from '../../app-context';
import { LoadingScreen, Screen } from '../../components';
import { FightCardHeadline, TaleOfTheTape } from '../../components/feature';
import { FightWithPicks } from '../../data-access';
import { useFightCardScreen } from './fight-card-screen.hook';

type FightCardScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FightCard'
>;

export const FightCardScreen = ({ route }: FightCardScreenProps) => {
  const { fightCardId } = route.params;

  const { loading, fightCard, fightsWithPicks, navigateToFightPickScreen } =
    useFightCardScreen(fightCardId);

  const FightRowItem = useCallback(
    ({ item }: { item: FightWithPicks }) => {
      const handlePress = () => navigateToFightPickScreen(item.id);
      return (
        <Pressable onPress={handlePress}>
          <TaleOfTheTape
            key={item.id}
            rounds={item.rounds}
            weight={item.weight}
            fighter1={item.fighter1}
            fighter2={item.fighter2}
            result={item.result}
          />
        </Pressable>
      );
    },
    [navigateToFightPickScreen],
  );
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
      <View style={styles.column}>
        <FightCardHeadline
          name={fightCard.name}
          mainCardDate={fightCard.mainCardDate}
        />
        <FlatList
          style={styles.fightsFlatList}
          data={fightsWithPicks}
          renderItem={FightRowItem}
          keyExtractor={({ id }) => id}
          scrollEnabled={fightsWithPicks.length > 3}
          horizontal={false}
          contentContainerStyle={styles.fightsFlatListContent}
          indicatorStyle="white"
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  column: {
    flex: 1,
    alignItems: 'center',
  },
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
