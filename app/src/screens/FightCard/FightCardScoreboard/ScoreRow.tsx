import React, { PropsWithChildren, useMemo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { ThemeSpacing, Translation } from '../../../app-context';
import { ColorText, ColorTextProps } from '../../../components';
import { useScoreRow } from './score-row.hook';

interface ScoreRowProps {
  userUid: string;
  score: number;
  confidence: number;
  rank: number;
}
export const ScoreRowHeader = () => {
  return (
    <View style={[styles.scoreRow, styles.scoreRowHeader]}>
      <DataColumn alignment="center" columnSize={1} color="onPrimaryContainer">
        {' '}
      </DataColumn>
      <DataColumn
        alignment="flex-start"
        columnSize={4}
        color="onPrimaryContainer">
        {Translation.player}
      </DataColumn>
      <DataColumn alignment="center" columnSize={1} color="onPrimaryContainer">
        {Translation.score}
      </DataColumn>
      <DataColumn alignment="center" columnSize={1} color="onPrimaryContainer">
        $$$
      </DataColumn>
    </View>
  );
};
export const ScoreRow = ({
  userUid,
  score,
  confidence,
  rank,
}: ScoreRowProps) => {
  const { playerName, playerNameLoading } = useScoreRow(userUid);
  return (
    <View style={styles.scoreRow}>
      <DataColumn alignment="center" columnSize={1}>
        {rank}
      </DataColumn>
      <DataColumn
        alignment="flex-start"
        columnSize={4}
        loading={playerNameLoading}>
        {playerName}
      </DataColumn>
      <DataColumn alignment="center" columnSize={1}>
        {score}
      </DataColumn>
      <DataColumn alignment="center" columnSize={1}>
        {score === 0 ? -1 * confidence : confidence}
      </DataColumn>
    </View>
  );
};

interface DataColumnProps extends Pick<ColorTextProps, 'color'> {
  loading?: boolean;
  columnSize: number;
  alignment: 'flex-start' | 'center';
}
const DataColumn = ({
  children,
  loading = false,
  color,
  alignment,
  columnSize,
}: PropsWithChildren<DataColumnProps>) => {
  const containerStyle = useMemo(
    () =>
      StyleSheet.compose<ViewStyle>(styles.dataColumn, {
        alignItems: alignment,
        flexGrow: columnSize,
      }),
    [alignment, columnSize],
  );
  return (
    <View style={containerStyle}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <ColorText color={color} numberOfLines={1} variant="titleMedium">
          {children}
        </ColorText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scoreRow: {
    flexDirection: 'row',
  },
  scoreRowHeader: {
    marginVertical: ThemeSpacing.base,
  },
  dataColumn: {
    flexShrink: 0,
    flexBasis: 40,
    marginHorizontal: ThemeSpacing.base * 2,
  },
});
