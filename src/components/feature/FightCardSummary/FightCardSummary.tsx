import { intlFormat } from 'date-fns';
import React, { useCallback } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { FightCard } from '../../../../models.types';
import { ThemeSpacing } from '../../../app-context';
import { FightWithPicks } from '../../../data-access';
import { TaleOfTheTape } from '../TaleOfTheTape';

let fightCard: FightCard | null = null;
const fightsWithPicks: FightWithPicks[] = [];
const navigateToFightPickScreen = (id: string) => id;

export const FightCardSummary = () => {
  const FightRowItem = useCallback(({ item }: { item: FightWithPicks }) => {
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
  }, []);
  if (fightCard === null) return null;
  return (
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
