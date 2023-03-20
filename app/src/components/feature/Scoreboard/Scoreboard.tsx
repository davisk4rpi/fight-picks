import React from 'react';
import { FlatList, FlatListProps, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { ThemeSpacing, Translation } from '../../../app-context';
import { UserScore } from '../../../libs/scoring';
import { ScoreRow, ScoreRowHeader } from './ScoreRow';

interface ScoreboardProps
  extends Pick<FlatListProps<unknown>, 'style' | 'contentContainerStyle'> {
  scoreboard: UserScore[];
  loading?: boolean;
}

export const Scoreboard = ({
  style,
  contentContainerStyle,
  scoreboard,
  loading,
}: ScoreboardProps) => {
  return (
    <FlatList
      style={style}
      contentContainerStyle={contentContainerStyle}
      indicatorStyle="white"
      scrollEnabled={scoreboard.length > 4}
      horizontal={false}
      keyExtractor={({ userUid }) => userUid}
      data={scoreboard}
      ListHeaderComponent={scoreboard.length > 0 ? ScoreRowHeader : undefined}
      ListEmptyComponent={loading ? undefined : NoScores}
      renderItem={({ item, index }) => (
        <ScoreRow
          rank={index + 1}
          userUid={item.userUid}
          score={item.score}
          confidence={item.confidence}
        />
      )}
    />
  );
};

const NoScores = () => {
  return (
    <View style={styles.noScoresYet}>
      <Text>{Translation.thereAreNoScoresYet}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  noScoresYet: {
    margin: ThemeSpacing.base * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
