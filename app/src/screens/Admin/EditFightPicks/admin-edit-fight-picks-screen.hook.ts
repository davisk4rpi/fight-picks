import { decodeFightResult } from '@fight-picks/models';
import {
  PLACEHOLDER_FIGHTER,
  useFightPicksByFightId,
  useSelectFightById,
  useSelectFightersFromFight,
} from '@fight-picks/native-data-access';
import { useMemo } from 'react';

export const useAdminEditFightPicksScreen = (fightId: string) => {
  const { fightPicks, loading: fightPicksLoading } =
    useFightPicksByFightId(fightId);
  const fight = useSelectFightById(fightId);

  const { fighter1, fighter2 } = useSelectFightersFromFight(fight);

  const fightResult = useMemo(
    () => decodeFightResult(fight?.resultCode ?? null),
    [fight?.resultCode],
  );

  return {
    fightPicks: fightPicks,
    fight,
    fightPicksLoading,
    fighter1: fighter1 ?? PLACEHOLDER_FIGHTER,
    fighter2: fighter2 ?? PLACEHOLDER_FIGHTER,
    fightResult,
  };
};
