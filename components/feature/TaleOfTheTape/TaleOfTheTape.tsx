import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, SurfaceProps, Text } from 'react-native-paper';

import { ThemeSpacing, Translation } from '../../../app-context';
import { Confidence, Fight, Fighter } from '../../../data-access/db';
import { ColorText } from '../../color-text';
import { FighterTwoLineName } from './FighterTwoLineName';

interface TaleOfTheTapeProps
  extends Pick<Fight, 'rounds' | 'weight' | 'result'> {
  fighter1: Pick<Fighter, 'name' | 'id'>;
  fighter2: Pick<Fighter, 'name' | 'id'>;
  elevation?: SurfaceProps['elevation'];
  confidence?: Confidence;
}

export const TaleOfTheTape = ({
  rounds,
  weight,
  fighter1,
  fighter2,
  result,
  confidence,
  elevation,
}: TaleOfTheTapeProps) => {
  return (
    <Surface elevation={elevation} style={styles.fightRowContainer}>
      <Text variant="titleMedium">
        {Translation.xRoundsAtYWeight(rounds, weight)}
      </Text>
      <View style={styles.fightRow}>
        <FighterCell
          name={fighter1.name}
          active={result?.winningFighterId === fighter1.id}
        />
        <View style={styles.vsContainer}>
          {result ? (
            <ColorText color={'primary'} variant="titleMedium">
              {Translation.roundMethod(
                result.round,
                Translation.shorthandMethodOfVictory(result.method),
              )}
            </ColorText>
          ) : (
            <Text variant="headlineSmall">{Translation.vs}</Text>
          )}
          {confidence && (
            <ColorText color={'secondary'} variant="labelLarge">
              {Translation.confidenceMeter(confidence)}
            </ColorText>
          )}
        </View>
        <FighterCell
          name={fighter2.name}
          active={result?.winningFighterId === fighter2.id}
        />
      </View>
    </Surface>
  );
};

interface FighterCellProps {
  active: boolean;
  name: string;
}

const FighterCell = ({ name, active }: FighterCellProps) => {
  return (
    <View style={styles.fighterContainer}>
      <FighterTwoLineName name={name} active={active} />
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
    alignItems: 'center',
  },
  fighterContainer: {
    flexBasis: 150,
    flexGrow: 1,
    alignItems: 'center',
  },
});
