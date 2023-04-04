import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, SurfaceProps, Text } from 'react-native-paper';

import { Confidence, Fight, Fighter, FightResult } from '@fight-picks/models';

import { ThemeSpacing, Translation } from '../../../app-context';
import { ColorText } from '../../color-text';
import { FighterTwoLineName } from './FighterTwoLineName';

export interface TaleOfTheTapeProps
  extends Pick<Fight, 'rounds' | 'weight' | 'isCanceled'> {
  fighter1: Pick<Fighter, 'name' | 'id'>;
  fighter2: Pick<Fighter, 'name' | 'id'>;
  elevation?: SurfaceProps['elevation'];
  result?: FightResult;
  confidence?: Confidence;
}

export const TaleOfTheTape = ({
  rounds,
  weight,
  fighter1,
  fighter2,
  result,
  confidence,
  isCanceled,
  elevation,
}: TaleOfTheTapeProps) => {
  return (
    <Surface elevation={elevation} style={styles.fightRowContainer}>
      <ColorText variant="titleMedium">
        {Translation.xRoundsAtYWeight(rounds, weight)}
      </ColorText>
      <View style={styles.fightRow}>
        <FighterCell
          name={fighter1.name}
          active={result?.winningFighter === 1}
        />
        <CenterContainer
          isCanceled={isCanceled}
          result={result}
          confidence={confidence}
        />
        <FighterCell
          name={fighter2.name}
          active={result?.winningFighter === 2}
        />
      </View>
    </Surface>
  );
};

interface CenterContainerProps
  extends Pick<TaleOfTheTapeProps, 'isCanceled' | 'result' | 'confidence'> {}

const CenterContainer = ({
  isCanceled,
  result,
  confidence,
}: CenterContainerProps) => {
  if (isCanceled) {
    return (
      <View style={styles.vsContainer}>
        <ColorText color={'error'} variant="titleMedium">
          {Translation.canceled}
        </ColorText>
      </View>
    );
  }
  return (
    <View style={styles.vsContainer}>
      {result ? (
        <ColorText color={'primary'} variant="titleMedium" numberOfLines={2}>
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
    flexBasis: 60,
  },
  fighterContainer: {
    flexBasis: 40,
    flexGrow: 1,
    alignItems: 'center',
  },
});
