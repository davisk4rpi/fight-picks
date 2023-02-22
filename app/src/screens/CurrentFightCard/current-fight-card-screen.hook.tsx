import { useMemo } from 'react';

import { useFightsWithPicks } from '../../data-access/hooks';
import {
  selectCurrentFightCard,
  selectFightsByIds,
  useAppSelector,
} from '../../data-access/store';
import { isNotUndefined } from '../../libs/utililities';

export const useCurrentFightCardScreen = () => {
  const currentFightCard = useAppSelector(selectCurrentFightCard);
  const fights = useAppSelector(state =>
    selectFightsByIds(state, currentFightCard?.fightIds ?? []),
  );

  const { fightsWithPicks } = useFightsWithPicks(fights);
  const orderedFightsWithPicks = useMemo(
    () =>
      currentFightCard?.fightIds
        ?.map(fightId => fightsWithPicks.find(({ id }) => fightId === id))
        ?.filter(isNotUndefined) ?? fightsWithPicks,
    [currentFightCard?.fightIds, fightsWithPicks],
  );

  return {
    loading: false,
    fightCard: currentFightCard,
    fightsWithPicks: orderedFightsWithPicks,
  };
};
