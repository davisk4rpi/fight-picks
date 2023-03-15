import React from 'react';

import { FightPickWithScore } from '@fight-picks/models';

import { TaleOfTheTapePick } from '../../../components/feature';
import { useFightPickRowItem } from './fight-pick-row-item.hook';

interface FightPickRowItemProps {
  fightPick: Pick<
    FightPickWithScore,
    'userUid' | 'winningFighterId' | 'round' | 'method' | 'confidence' | 'score'
  >;
}
export const FightPickRowItem = ({ fightPick }: FightPickRowItemProps) => {
  const { playerName, winningFighterName } = useFightPickRowItem(fightPick);

  return (
    <TaleOfTheTapePick
      playerName={playerName}
      round={fightPick.round}
      method={fightPick.method}
      score={fightPick.score}
      confidence={fightPick.confidence}
      winningFighterName={winningFighterName}
    />
  );
};
