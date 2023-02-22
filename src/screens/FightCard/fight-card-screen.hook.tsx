import { useMemo } from 'react';

import {
  useFightCard,
  useFightsWithFightersByFightCardId,
  useFightsWithPicks,
} from '../../data-access/hooks';
import { isNotUndefined } from '../../libs/utililities';

export const useFightCardScreen = (fightCardId: string) => {
  const { fightCard, loading: fightCardLoading } = useFightCard(fightCardId);
  const { fights, loading: fightsLoading } = useFightsWithFightersByFightCardId(
    fightCard?.id,
  );

  const { fightsWithPicks } = useFightsWithPicks(fights);

  const orderFightsWithPicks = useMemo(
    () =>
      fightCard?.fightIds
        ?.map(fightId => fightsWithPicks.find(({ id }) => fightId === id))
        ?.filter(isNotUndefined) ?? fightsWithPicks,
    [fightCard?.fightIds, fightsWithPicks],
  );

  return {
    loading: fightCardLoading || fightsLoading,
    fightCard,
    fightsWithPicks: orderFightsWithPicks,
  };
};
