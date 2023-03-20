import { useCallback, useState } from 'react';

import {
  useSelectFightCardByIdOrCurrent,
  useSelectFightCardsStatus,
} from '@fight-picks/native-data-access';

import { FightCardScreenContext } from './types';

export const useFightCardScreen = (fightCardId?: string) => {
  const fightCardStatus = useSelectFightCardsStatus();
  const fightCard = useSelectFightCardByIdOrCurrent(fightCardId);
  const [context, setContext] = useState<FightCardScreenContext>('picks');
  const onContextValueChange = useCallback(
    (value: string) => setContext(convertStringToContext(value)),
    [],
  );

  const showNavigation =
    fightCard && fightCard.mainCardDate > new Date().toISOString();

  return {
    loading: fightCardStatus === 'pending',
    fightCard,
    context,
    onContextValueChange,
    showNavigation,
  };
};

export const useFightCardScreenContextNavigation = () => {
  const [context, setContext] = useState<FightCardScreenContext>('picks');
  const onContextValueChange = useCallback(
    (value: string) => setContext(convertStringToContext(value)),
    [],
  );
  return { context, onContextValueChange };
};

const convertStringToContext = (value: string): FightCardScreenContext => {
  if (value === 'results') return value;
  if (value === 'scores') return value;
  return 'picks';
};
