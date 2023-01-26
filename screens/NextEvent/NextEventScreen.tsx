import intlFormat from 'date-fns/intlFormat';
import React, { useCallback } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { ThemeSpacing } from '../../app-context';
import { LoadingScreen, Screen } from '../../components';
import { TaleOfTheTape } from '../../components/feature';
import { FightWithPicks } from '../../data-access';
import { useNextEventScreen } from './next-event-screen.hook';

export const NextEventScreen = () => {
  const { loading, fightCard, fightsWithPicks, navigateToFightPickScreen } =
    useNextEventScreen();

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
            pick={item.pick}
            // results={item.results}
          />
        </Pressable>
      );
    },
    [navigateToFightPickScreen],
  );
  if (loading) return <LoadingScreen testID="EventScreen" />;
  if (fightCard === null)
    return (
      <Screen testID="EventScreen">
        <Text variant="displayMedium" adjustsFontSizeToFit numberOfLines={1}>
          No Fights Loaded
        </Text>
      </Screen>
    );

  return (
    <Screen testID="EventScreen" style={styles.screen}>
      <View style={styles.column}>
        <Text
          style={styles.fightCardName}
          variant="displayMedium"
          adjustsFontSizeToFit
          numberOfLines={1}>
          {fightCard.name}
        </Text>
        <Text variant="headlineSmall" adjustsFontSizeToFit numberOfLines={1}>
          {intlFormat(fightCard.mainCardDate, {
            month: 'long',
            day: 'numeric',
            hour12: true,
            hour: 'numeric',
            minute: '2-digit',
          })}
        </Text>
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
  fightCardName: {
    marginTop: ThemeSpacing.base * 2,
    marginBottom: ThemeSpacing.base * 2,
  },
  fightsFlatList: {
    marginHorizontal: -1 * ThemeSpacing.horizontalScreen,
    marginTop: ThemeSpacing.base * 2,
    paddingHorizontal: ThemeSpacing.horizontalScreen,
  },
  fightsFlatListContent: {
    paddingBottom: ThemeSpacing.verticalScreen,
  },
});
