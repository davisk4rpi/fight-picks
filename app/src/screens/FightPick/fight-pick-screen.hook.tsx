import {
  selectFightCardById,
  useAppSelector,
  useSelectFightById,
} from '@fight-picks/native-data-access';

export const useFightPickScreen = (fightId: string) => {
  const fight = useSelectFightById(fightId);
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
