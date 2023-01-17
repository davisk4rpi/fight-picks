import intlFormat from 'date-fns/intlFormat';
import React, { useCallback } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { ThemeSpacing } from '../../app-context';
import { Screen } from '../../components';
import { TaleOfTheTape } from '../../components/feature';
import { Fight } from '../../data-access';
import { useNextEventScreen } from './next-event-screen.hook';

export const NextEventScreen = () => {
  const { event, navigateToFightPickScreen } = useNextEventScreen();

  const FightRowItem = useCallback(
    ({ item }: { item: Fight }) => {
      const handlePress = () => navigateToFightPickScreen(item.id);
      return (
        <Pressable onPress={handlePress}>
          <TaleOfTheTape
            key={item.id}
            rounds={item.rounds}
            weight={item.weight}
            fighter1={item.fighter1}
            fighter2={item.fighter2}
            // results={item.results}
          />
        </Pressable>
      );
    },
    [navigateToFightPickScreen],
  );
  return (
    <Screen testID="EventScreen">
      <View style={styles.column}>
        <Text variant="displayMedium" adjustsFontSizeToFit numberOfLines={1}>
          {event.name}
        </Text>
        <Text variant="headlineSmall" adjustsFontSizeToFit numberOfLines={1}>
          {intlFormat(event.mainCardDate, {
            month: 'long',
            day: 'numeric',
            hour12: true,
            hour: 'numeric',
            minute: '2-digit',
          })}
        </Text>
        <FlatList
          style={styles.fightsFlatList}
          data={event.fights}
          renderItem={FightRowItem}
          keyExtractor={({ id }) => id}
          scrollEnabled={event.fights.length > 3}
          horizontal={false}
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
  fightsFlatList: {
    marginHorizontal: -1 * ThemeSpacing.horizontalScreen,
    paddingHorizontal: ThemeSpacing.horizontalScreen,
  },
});
