import {
  selectFightCardByIdOrCurrent,
  selectFightCardsStatus,
  useAppSelector,
} from '@fight-picks/native-data-access';

export const useFightCardScreen = (fightCardId?: string) => {
  const fightCardStatus = useAppSelector(selectFightCardsStatus);
  const fightCard = useAppSelector(state =>
    selectFightCardByIdOrCurrent(state, fightCardId),
  );

  return {
    loading: fightCardStatus === 'pending',
    fightCard,
  };
};
