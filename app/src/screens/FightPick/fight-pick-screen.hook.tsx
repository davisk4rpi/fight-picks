import {
  useSelectFightById,
  useSelectFightCardById,
} from '@fight-picks/native-data-access';

export const useFightPickScreen = (fightId: string) => {
  const fight = useSelectFightById(fightId);
  const fightCard = useSelectFightCardById(fight?.fightCardId ?? '');

  if (fightCard === undefined || fight === undefined)
    return { fight: undefined };

  return {
    fight,
    mainCardDate: fightCard.mainCardDate,
  };
};
