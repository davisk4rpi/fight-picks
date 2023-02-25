import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';

import { Fighter, FightPick } from '@fight-picks/models';

import { ThemeSpacing, Translation } from '../../../app-context';
import { ColorText, ColorTextProps } from '../../color-text';
import { FighterTwoLineName } from './FighterTwoLineName';

interface TaleOfTheTapePickProps
  extends Pick<FightPick, 'round' | 'method' | 'confidence'> {
  winningFighter: Pick<Fighter, 'name' | 'id'>;
  playerName: string;
  score?: number;
}

export const TaleOfTheTapePick = ({
  round,
  method,
  confidence,
  winningFighter,
  playerName,
  score,
}: TaleOfTheTapePickProps) => {
  return (
    <Surface elevation={1} style={styles.fightRowContainer}>
      <View style={styles.fightRow}>
        {score !== undefined && <Score>{score}</Score>}
        <PlayerName>{playerName}</PlayerName>
        <FighterCell isLoser={score === 0}>{winningFighter.name}</FighterCell>
        <Prediction
          score={score}
          round={round}
          method={method}
          confidence={confidence}
        />
      </View>
    </Surface>
  );
};

interface ScoreProps {
  children: number;
}

const Score = ({ children }: ScoreProps) => {
  return (
    <View style={styles.scoreContainer}>
      <ColorText
        color={children > 0 ? 'primary' : 'secondary'}
        variant="displaySmall">
        {children}
      </ColorText>
    </View>
  );
};

interface PlayerNameProps {
  children: string;
}
const PlayerName = ({ children }: PlayerNameProps) => {
  return (
    <View style={styles.playerNameContainer}>
      <Text numberOfLines={1} variant="titleMedium">
        {children}
      </Text>
    </View>
  );
};

interface FighterCellProps {
  children: string;
  isLoser?: boolean;
}
const FighterCell = ({ children, isLoser }: FighterCellProps) => {
  return (
    <View style={styles.fighterContainer}>
      <FighterTwoLineName
        name={children}
        active
        activeColor={isLoser ? 'error' : undefined}
      />
    </View>
  );
};

const Prediction = ({
  round,
  method,
  confidence,
  score,
}: Pick<
  TaleOfTheTapePickProps,
  'score' | 'round' | 'method' | 'confidence'
>) => {
  let confidenceColor: ColorTextProps['color'] = 'primary';
  if (score === 0) {
    confidenceColor = 'error';
  } else if (score === undefined) {
    confidenceColor = 'secondary';
  }
  return (
    <View style={styles.predictionContainer}>
      <ColorText color={'secondary'} variant="titleMedium" numberOfLines={2}>
        {Translation.roundMethod(
          round,
          Translation.shorthandMethodOfVictory(method),
        )}
      </ColorText>
      <ColorText color={confidenceColor} variant="labelLarge">
        {Translation.confidenceMeter(confidence)}
      </ColorText>
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
  predictionContainer: {
    marginHorizontal: ThemeSpacing.base * 2,
    alignItems: 'center',
    flexShrink: 0,
    flexBasis: 60,
  },
  fighterContainer: {
    flexBasis: 40,
    flexGrow: 2,
    alignItems: 'center',
  },
  playerNameContainer: {
    flexBasis: 60,
    flexShrink: 0,
    flexGrow: 1,
    marginHorizontal: ThemeSpacing.base * 2,
    alignItems: 'flex-start',
  },
  scoreContainer: {
    marginHorizontal: ThemeSpacing.base * 2,
    alignItems: 'flex-start',
    flexShrink: 0,
    flexBasis: 20,
  },
});
