import React from 'react';
import { FlatList, FlatListProps, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { ThemeSpacing, Translation } from '../../../app-context';
import { useFightCardScoreboard } from './fight-card-scoreboard.hook';
import { ScoreRow, ScoreRowHeader } from './ScoreRow';

interface FightCardScoreboardProps
  extends Pick<FlatListProps<unknown>, 'style' | 'contentContainerStyle'> {
  fightIds: string[];
}

export const FightCardScoreboard = ({
  fightIds,
  style,
  contentContainerStyle,
}: FightCardScoreboardProps) => {
  const { scores, fightPicksLoading } = useFightCardScoreboard(fightIds);
  return (
    <FlatList
      style={style}
      contentContainerStyle={contentContainerStyle}
      indicatorStyle="white"
      scrollEnabled={scores.length > 4}
      horizontal={false}
      keyExtractor={({ userUid }) => userUid}
      data={scores}
      ListHeaderComponent={scores.length > 0 ? ScoreRowHeader : undefined}
      ListEmptyComponent={fightPicksLoading ? undefined : NoScores}
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
