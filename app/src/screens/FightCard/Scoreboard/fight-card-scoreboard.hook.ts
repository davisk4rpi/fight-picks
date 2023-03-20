import { useMemo } from 'react';

import {
  useFightPicksByFightIds,
  useSelectNormalizedFightsByIds,
} from '@fight-picks/native-data-access';

import { buildUserScoreboard } from '../../../libs/scoring';

export const useFightCardScoreboard = (fightIds: string[]) => {
  const { fightPicks, loading } = useFightPicksByFightIds(fightIds);
  const normalizedFights = useSelectNormalizedFightsByIds(fightIds);

  const scoreboard = useMemo(
    () => buildUserScoreboard(fightPicks, normalizedFights),
    [fightPicks, normalizedFights],
  );
  return {
    scoreboard,
    scoreboardLoading: loading,
  };
};
