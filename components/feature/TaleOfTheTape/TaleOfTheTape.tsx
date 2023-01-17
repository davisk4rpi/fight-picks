import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';

import { ThemeSpacing } from '../../../app-context';
import { Fight, Fighter } from '../../../data-access';
import { FighterTwoLineName } from './FighterTwoLineName';

interface TaleOfTheTapeProps
  extends Pick<Fight, 'rounds' | 'weight' | 'results'> {
  fighter1: Pick<Fighter, 'name'>;
  fighter2: Pick<Fighter, 'name'>;
}

export const TaleOfTheTape = ({
  rounds,
  weight,
  fighter1,
  fighter2,
}: TaleOfTheTapeProps) => {
  return (
    <Surface style={styles.fightRowContainer}>
      <Text variant="titleMedium">
        {rounds} rounds at {weight}lbs
      </Text>
      <View style={styles.fightRow}>
        <View style={styles.fighterContainer}>
          <FighterTwoLineName name={fighter1.name} />
        </View>
        <View style={styles.vsContainer}>
          <Text variant="headlineSmall">vs</Text>
        </View>
        <View style={styles.fighterContainer}>
          <FighterTwoLineName name={fighter2.name} />
        </View>
      </View>
    </Surface>
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
