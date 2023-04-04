import React, { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

import { FightPick, FightResult } from '@fight-picks/models';

import { ThemeSpacing, Translation } from '../../../../app-context';
import { ColorText, ColorTextProps } from '../../../color-text';
import { FighterTwoLineName } from '../FighterTwoLineName';
import { TaleOfTheTapeContainer } from './TaleOfTheTapePickContainer';

interface TaleOfTheTapePickProps extends Pick<FightResult, 'round' | 'method'> {
  winningFighterName: string;
  playerName: string;
  playerLoading?: boolean;
  score?: number;
  leftAdornment?: () => JSX.Element;
  confidence: FightPick['confidence'];
}

export const TaleOfTheTapePick = ({
  round,
  method,
  confidence,
  winningFighterName,
  playerName,
  playerLoading = false,
  score,
  leftAdornment,
}: TaleOfTheTapePickProps) => {
  return (
    <TaleOfTheTapeContainer>
      {leftAdornment && leftAdornment()}
      <Score>{score ?? ' '}</Score>
      <PlayerName>
        {playerLoading ? <ActivityIndicator /> : playerName}
      </PlayerName>
      <FighterCell isLoser={score === 0}>{winningFighterName}</FighterCell>
      <Prediction
        score={score}
        round={round}
        method={method}
        confidence={confidence}
      />
    </TaleOfTheTapeContainer>
  );
};

interface ScoreProps {
  children: number | string;
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

interface PlayerNameProps extends PropsWithChildren<{}> {}
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
