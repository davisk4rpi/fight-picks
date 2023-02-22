import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, SurfaceProps, Text } from 'react-native-paper';

import { Fight, Fighter, FightPick } from '@fight-picks/models';

import { ThemeSpacing } from '../../../app-context';
import { FighterTwoLineName } from './FighterTwoLineName';

interface TaleOfTheTapePickProps extends Pick<Fight, 'rounds' | 'weight'> {
  fighter1: Pick<Fighter, 'name' | 'id'>;
  fighter2: Pick<Fighter, 'name' | 'id'>;
  pick?: FightPick;
  elevation?: SurfaceProps['elevation'];
}

export const TaleOfTheTapePick = ({
  rounds,
  weight,
  fighter1,
  fighter2,
  pick,
  elevation,
}: TaleOfTheTapePickProps) => {
  const winningFighterId = pick?.winningFighterId ?? '';
  return (
    <Surface elevation={elevation} style={styles.fightRowContainer}>
      <Text variant="titleMedium">
        {rounds} rounds at {weight}lbs
      </Text>
      <View style={styles.fightRow}>
        <View style={styles.fighterContainer}>
          <FighterTwoLineName
            name={fighter1.name}
            active={winningFighterId === fighter1.id}
          />
        </View>
        <View style={styles.vsContainer}>
          <Text variant="headlineSmall">vs</Text>
        </View>
        <View style={styles.fighterContainer}>
          <FighterTwoLineName
            name={fighter2.name}
            active={winningFighterId === fighter2.id}
          />
        </View>
      </View>
      {pick && <PickView {...pick} fighter1={fighter1} fighter2={fighter2} />}
    </Surface>
  );
};

type PickViewProps = FightPick & {
  fighter1: Pick<Fighter, 'name' | 'id'>;
  fighter2: Pick<Fighter, 'name' | 'id'>;
};

const PickView = ({
  fighter1,
  fighter2,
  winningFighterId,
  method,
}: // round,
// confidence,
PickViewProps) => {
  const winningFighter = fighter1.id === winningFighterId ? fighter1 : fighter2;
  // const methodRound = method === 'decision' ? 'Decision' : ''

  return (
    <View style={styles.fightRow}>
      <Text>
        {winningFighter.name} by {method}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  fightRowContainer: {
    alignItems: 'center',
    marginTop: ThemeSpacing.base * 2,
    paddingHorizontal: ThemeSpacing.base,
    paddingVertical: ThemeSpacing.base * 2,
  },
  fightRow: {
    marginTop: ThemeSpacing.base,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vsContainer: {
    marginHorizontal: ThemeSpacing.base * 2,
  },
  fighterContainer: {
    flexBasis: 150,
    flexGrow: 1,
    alignItems: 'center',
  },
});
