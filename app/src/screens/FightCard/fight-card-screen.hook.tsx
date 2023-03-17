import { useCallback, useState } from 'react';

import {
  useSelectFightCardByIdOrCurrent,
  useSelectFightCardsStatus,
} from '@fight-picks/native-data-access';

import { FightCardScreenContext } from './types';

export const useFightCardScreen = (fightCardId?: string) => {
  const fightCardStatus = useSelectFightCardsStatus();
  const fightCard = useSelectFightCardByIdOrCurrent(fightCardId);
  const [context, setContext] = useState<FightCardScreenContext>('fights');
  const onContextValueChange = useCallback(
    (value: string) =>
      value === 'scores' ? setContext('scores') : setContext('fights'),
    [],
  );

  const isFightCardInFuture =
    fightCard && fightCard.mainCardDate > new Date().toISOString();

  return {
    loading: fightCardStatus === 'pending',
    fightCard,
    context,
    onContextValueChange,
    isFightCardInFuture,
  };
};
