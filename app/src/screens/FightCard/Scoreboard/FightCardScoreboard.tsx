import React from 'react';
import { FlatListProps } from 'react-native';

import { Scoreboard } from '../../../components/feature';
import { useFightCardScoreboard } from './fight-card-scoreboard.hook';

interface FightCardScoreboardProps
  extends Pick<FlatListProps<unknown>, 'style' | 'contentContainerStyle'> {
  fightIds: string[];
}

export const FightCardScoreboard = ({
  fightIds,
  style,
  contentContainerStyle,
}: FightCardScoreboardProps) => {
  const { scoreboardLoading, scoreboard } = useFightCardScoreboard(fightIds);
  return (
    <Scoreboard
      style={style}
      contentContainerStyle={contentContainerStyle}
      scoreboard={scoreboard}
      loading={scoreboardLoading}
    />
  );
};
