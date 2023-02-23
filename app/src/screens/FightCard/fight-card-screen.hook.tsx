import {
  selectFightCardByIdOrCurrent,
  selectFightCardsStatus,
  useAppSelector,
} from '../../data-access/store';

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
