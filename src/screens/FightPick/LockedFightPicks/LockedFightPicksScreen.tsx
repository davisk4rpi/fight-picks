import React, { useCallback, useMemo } from 'react';
import { FlatList, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';

import { Fight } from '../../../../models.types';
import { ThemeSpacing, Translation, useTheme } from '../../../app-context';
import { LoadingScreen, NotFoundScreen, Screen } from '../../../components';
import { TaleOfTheTape } from '../../../components/feature';
import {
  FightPickWithUserAndScore,
  useLockedFightPicksScreen,
} from './locked-fight-picks-screen.hook';

interface LockedFightPicksScreenProps {
  fight: Fight;
  mainCardDate: string;
}

export const LockedFightPicksScreen = ({
  fight,
}: LockedFightPicksScreenProps) => {
  const { fightPicks, loading, fighter1, fighter2 } =
    useLockedFightPicksScreen(fight);
  const FightPickRowItem = useCallback(
    ({ item }: { item: FightPickWithUserAndScore }) => {
      const shortendName = item.winningFighter?.name.split(' ').pop() ?? '';
      let winningFighterSuccess: boolean | undefined;
      let winningRoundSuccess: boolean | undefined;
      let winningMethodSuccess: boolean | undefined;
      if (fight?.result !== undefined) {
        winningFighterSuccess =
          item.winningFighterId === fight.result.winningFighterId;
        winningRoundSuccess =
          winningFighterSuccess && item.round === fight.result.round;
        winningMethodSuccess =
          winningFighterSuccess && item.method === fight.result.method;
      }

      return (
        <View style={styles.fightPickRow}>
          <TableCell scale={2} style={styles.userNameCell}>
            {item.user.displayName?.split(' ')[0]}
          </TableCell>
          {fight?.result !== undefined ? (
            <>
              <TableCell>{item.score}</TableCell>
              <TableCell>{item.confidenceScore}</TableCell>
            </>
          ) : (
            <TableCell>{item.confidence}</TableCell>
          )}
          <TableCell scale={3} success={winningFighterSuccess}>
            {shortendName}
          </TableCell>
          <TableCell success={winningRoundSuccess}>{item.round}</TableCell>
          <TableCell success={winningMethodSuccess}>
            {Translation.shorthandMethodOfVictory(item.method)}
          </TableCell>
        </View>
      );
    },
    [fight?.result],
  );

  if (loading) {
    return <LoadingScreen testID="LockedFightPicksScreen" />;
  }
  if (fight === null) {
    return <NotFoundScreen testID="LockedFightPicksScreen" thing={'Fight'} />;
  }

  return (
    <Screen testID="LockedFightPicksScreen">
      <TaleOfTheTape
        key={fight.id}
        rounds={fight.rounds}
        weight={fight.weight}
        fighter1={fighter1}
        fighter2={fighter2}
        result={fight.result}
        elevation={0}
      />
      <FlatList
        style={styles.fightsFlatList}
        data={fightPicks}
        renderItem={FightPickRowItem}
        keyExtractor={({ id }) => id}
        scrollEnabled={fightPicks.length > 3}
        horizontal={false}
        contentContainerStyle={styles.fightsFlatListContent}
        indicatorStyle="white"
        extraData={fight?.result}
      />
    </Screen>
  );
};

interface TableCellProps {
  success?: boolean;
  children?: string | number | null;
  scale?: number;
  align?: 'left' | 'center' | 'right';
  style?: ViewProps['style'];
}
const TableCell = ({ success, children, scale = 1, style }: TableCellProps) => {
  const { colors } = useTheme();

  const newStyle: ViewStyle = useMemo(() => {
    if (success === false) {
      return {
        backgroundColor: colors.errorContainer,
        flexGrow: scale,
        flexBasis: 20,
        alignItems: 'center',
        padding: 4,
        borderWidth: 1.5,
        borderColor: colors.inverseOnSurface,
      };
    } else if (success === true) {
      return {
        backgroundColor: colors.primaryContainer,
        flexGrow: scale,
        flexBasis: 20,
        alignItems: 'center',
        padding: 4,
        borderWidth: 1.5,
        borderColor: colors.inverseOnSurface,
      };
    }
    return {
      flexGrow: scale,
      flexBasis: 20,
      alignItems: 'center',
      paddingHorizontal: 4,
      paddingVertical: 8,
      borderWidth: 1.5,
      borderColor: colors.inverseOnSurface,
    };
  }, [colors, scale, success]);
  return (
    <View style={[newStyle, style]}>
      <Text numberOfLines={1}>{children}</Text>
    </View>
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
  fightPickRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  userNameCell: {
    alignItems: 'flex-start',
    borderWidth: 0,
  },
});
