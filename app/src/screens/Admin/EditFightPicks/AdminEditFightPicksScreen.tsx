import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../../../types';
import { ThemeSpacing, Translation } from '../../../app-context';
import { NotFoundScreen, Screen } from '../../../components';
import { TaleOfTheTape } from '../../../components/feature';
import { useAdminEditFightPicksScreen } from './admin-edit-fight-picks-screen.hook';
import { FightPickRowItem } from './FightPickRowItem';

type AdminEditFightPicksScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'AdminEditFightPicks'
>;

const TEST_ID = 'AdminEditFightPicksScreen';
export const AdminEditFightPicksScreen = ({
  route,
}: AdminEditFightPicksScreenProps) => {
  const { fightId } = route.params;
  const { fightPicks, fight, fightPicksLoading, fighter1, fighter2 } =
    useAdminEditFightPicksScreen(fightId);
  if (fight === undefined) {
    return <NotFoundScreen testID={TEST_ID} thing={Translation.fight} />;
  }

  return (
    <Screen testID={TEST_ID}>
      <TaleOfTheTape
        key={fight.id}
        rounds={fight.rounds}
        weight={fight.weight}
        fighter1={fighter1}
        fighter2={fighter2}
        result={fight.result}
        isCanceled={fight.isCanceled}
        elevation={0}
      />
      {fightPicksLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          style={styles.fightsFlatList}
          data={fightPicks}
          renderItem={obj => <FightPickRowItem fightPick={obj.item} />}
          keyExtractor={({ id }) => id}
          scrollEnabled={fightPicks.length > 3}
          horizontal={false}
          contentContainerStyle={styles.fightsFlatListContent}
          indicatorStyle="white"
          extraData={fight?.result}
        />
      )}
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
});
