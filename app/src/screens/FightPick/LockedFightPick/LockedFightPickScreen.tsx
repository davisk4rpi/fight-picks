import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { Fight } from '@fight-picks/models';

import { Switch } from 'react-native-paper';
import { ThemeSpacing, Translation } from '../../../app-context';
import { ColorText, LoadingScreen, Screen } from '../../../components';
import { TaleOfTheTape } from '../../../components/feature';
import { useAdminFeatures } from './admin-features';
import { FightPickRowItem } from './FightPickRowItem';
import { useLockedFightPickScreen } from './locked-fight-pick-screen.hook';

interface LockedFightPicksScreenProps {
  fight: Fight;
  mainCardDate: string;
  noSpoilers?: boolean;
}
const TEST_ID = 'LockedFightPicksScreen';

export const LockedFightPickScreen = ({
  fight,
  noSpoilers = true,
}: LockedFightPicksScreenProps) => {
  const {
    fightPicks,
    loading,
    fighter1,
    fighter2,
    fightResult,
    onToggleSpoliers,
    noSpoilers: _noSpoilers,
  } = useLockedFightPickScreen(fight, noSpoilers);
  const { editFightResultButton, editFightPicksButton } = useAdminFeatures(
    fight.id,
  );

  if (loading) {
    return <LoadingScreen testID={TEST_ID} />;
  }

  return (
    <Screen testID={TEST_ID}>
      <View style={styles.spoiler}>
        <ColorText>{Translation.spoilers}</ColorText>
        <View style={styles.spoilerSwitch}>
          <Switch value={!_noSpoilers} onValueChange={onToggleSpoliers} />
        </View>
      </View>
      <TaleOfTheTape
        key={fight.id}
        rounds={fight.rounds}
        weight={fight.weight}
        fighter1={fighter1}
        fighter2={fighter2}
        result={fightResult}
        isCanceled={fight.isCanceled}
        elevation={0}
      />
      <FlatList
        style={styles.fightsFlatList}
        data={fightPicks}
        renderItem={obj => (
          <FightPickRowItem
            fightPick={obj.item}
            fighter1={fighter1}
            fighter2={fighter2}
          />
        )}
        keyExtractor={({ id }) => id}
        scrollEnabled={fightPicks.length > 3}
        horizontal={false}
        contentContainerStyle={styles.fightsFlatListContent}
        indicatorStyle="white"
        extraData={fight?.resultCode}
      />
      {editFightResultButton}
      {editFightPicksButton}
    </Screen>
  );
};

const styles = StyleSheet.create({
  fightsFlatList: {
    marginHorizontal: -1 * ThemeSpacing.horizontalScreen,
    paddingHorizontal: ThemeSpacing.horizontalScreen,
  },
  fightsFlatListContent: {
    paddingBottom: ThemeSpacing.verticalScreen,
  },
  spoiler: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: ThemeSpacing.base * 2,
  },
  spoilerSwitch: {
    marginLeft: ThemeSpacing.base,
  },
});
