import React, { useCallback } from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import { FightCard } from '../../../models.types';
import { ThemeSpacing } from '../../app-context';
import { Screen } from '../../components';
import { FightCardHeadline } from '../../components/feature';
import { usePastFightCardsScreen } from './past-fight-cards-screen.hook';

export const PastFightCardsScreen = () => {
  const { fightCards, navigateToFightCardScreen } = usePastFightCardsScreen();
  const FightCardRowItem = useCallback(
    ({ item }: { item: FightCard }) => {
      const handlePress = () => navigateToFightCardScreen(item.id);
      return (
        <Pressable onPress={handlePress} style={styles.fightCardPressable}>
          <FightCardHeadline
            compact
            elevation={2}
            mainCardDate={item.mainCardDate}
            name={item.name}
            // LeftAdornment={PickScore}
          />
        </Pressable>
      );
    },
    [navigateToFightCardScreen],
  );
  if (fightCards.length === 0)
    return (
      <Screen testID="EventScreen">
        <Text variant="displayMedium" adjustsFontSizeToFit numberOfLines={1}>
          No Fights Loaded
        </Text>
      </Screen>
    );

  return (
    <Screen testID="EventsScreen">
      <FlatList
        style={styles.fightCardsFlatList}
        data={fightCards}
        renderItem={FightCardRowItem}
        keyExtractor={({ id }) => id}
        scrollEnabled={fightCards.length > 3}
        horizontal={false}
        contentContainerStyle={styles.fightCardsFlatListContent}
        indicatorStyle="white"
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingBottom: 0,
  },
  fightCardsFlatList: {
    marginTop: ThemeSpacing.base * 2,
  },
  fightCardsFlatListContent: {
    paddingBottom: ThemeSpacing.verticalScreen,
    alignItems: 'stretch',
  },
  fightCardPressable: {
    marginVertical: ThemeSpacing.base * 2,
  },
});

// const PickScore = () => (
//   <ColorText color="primary" variant="displayMedium">
//     +3
//   </ColorText>
// );
