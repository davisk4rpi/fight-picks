import React, { useCallback } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { ThemeSpacing } from '../../app-context';
import { LoadingScreen, Screen } from '../../components';
import { FightCardHeadline, TaleOfTheTape } from '../../components/feature';
import { FightWithPicks } from '../../data-access';
import { useCurrentFightCardScreen } from './current-fight-card-screen.hook';

export const CurrentFightCardScreen = () => {
  const { loading, fightCard, fightsWithPicks, navigateToFightPickScreen } =
    useCurrentFightCardScreen();

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
            result={item.pick}
            confidence={item.pick?.confidence}
            elevation={2}
          />
        </Pressable>
      );
    },
    [navigateToFightPickScreen],
  );
  if (loading) return <LoadingScreen testID="CurrentFightCardScreen" />;
  if (fightCard === null)
    return (
      <Screen testID="CurrentFightCardScreen">
        <Text variant="displayMedium" adjustsFontSizeToFit numberOfLines={1}>
          No Fights Loaded
        </Text>
      </Screen>
    );

  return (
    <Screen testID="CurrentFightCardScreen" style={styles.screen}>
      <View style={styles.column}>
        <FightCardHeadline
          name={fightCard.name}
          mainCardDate={fightCard.mainCardDate}
        />
        <FlatList
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
  fightsFlatListContent: {
    paddingBottom: ThemeSpacing.verticalScreen,
  },
});
