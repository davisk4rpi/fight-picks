import {
  selectFightById,
  selectFightCardById,
  useAppSelector,
} from '../../data-access/store';

export const useFightPickScreen = (fightId: string) => {
  const fight = useAppSelector(state => selectFightById(state, fightId));
  const fightCard = useAppSelector(state =>
    selectFightCardById(state, fight?.fightCardId ?? ''),
  );

  if (fightCard === undefined || fight === undefined)
    return { fight: undefined };

  return {
    fight,
    mainCardDate: fightCard.mainCardDate,
  };
};
