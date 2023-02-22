import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import { ThemeSpacing } from '../../app-context';
import { LoadingScreen, Screen } from '../../components';
import { FightCardHeadline } from '../../components/feature';
import { useCurrentFightCardScreen } from './current-fight-card-screen.hook';
import { FightRowItem } from './FightRowItem';

export const CurrentFightCardScreen = () => {
  const { loading, fightCard, fightsWithPicks } = useCurrentFightCardScreen();

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
      <FightCardHeadline
        name={fightCard.name}
        mainCardDate={fightCard.mainCardDate}
      />
      <FlatList
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
  fightsFlatListContent: {
    paddingBottom: ThemeSpacing.verticalScreen,
  },
});
