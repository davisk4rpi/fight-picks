import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, SurfaceProps, Text } from 'react-native-paper';

import { Fight, Fighter, FightPick } from '@fight-picks/models';

import { ThemeSpacing, Translation } from '../../../app-context';
import { ColorText } from '../../color-text';
import { FighterTwoLineName } from './FighterTwoLineName';

type TaleOfTheTapeResult =
  | FightPick
  | (Fight['result'] & {
      confidence?: undefined;
    });

export interface TaleOfTheTapeProps extends Pick<Fight, 'rounds' | 'weight'> {
  fighter1: Pick<Fighter, 'name' | 'id'>;
  fighter2: Pick<Fighter, 'name' | 'id'>;
  elevation?: SurfaceProps['elevation'];
  result?: TaleOfTheTapeResult;
}

export const TaleOfTheTape = ({
  rounds,
  weight,
  fighter1,
  fighter2,
  result,
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
            <ColorText
              color={'primary'}
              variant="titleMedium"
              numberOfLines={2}>
              {Translation.roundMethod(
                result.round,
                Translation.shorthandMethodOfVictory(result.method),
              )}
            </ColorText>
          ) : (
            <Text variant="headlineSmall">{Translation.vs}</Text>
          )}
          {result?.confidence && (
            <ColorText color={'secondary'} variant="labelLarge">
              {Translation.confidenceMeter(result.confidence)}
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
    paddingHorizontal: ThemeSpacing.base * 2,
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
    flexGrow: 0,
  },
  fighterContainer: {
    flexBasis: 40,
    flexGrow: 1,
    alignItems: 'center',
  },
});
