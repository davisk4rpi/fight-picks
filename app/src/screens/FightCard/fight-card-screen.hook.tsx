import {
  useSelectFightCardByIdOrCurrent,
  useSelectFightCardsStatus,
} from '@fight-picks/native-data-access';

export const useFightCardScreen = (fightCardId?: string) => {
  const fightCardStatus = useSelectFightCardsStatus();
  const fightCard = useSelectFightCardByIdOrCurrent(fightCardId);

  return {
    loading: fightCardStatus === 'pending',
    fightCard,
  };
};
