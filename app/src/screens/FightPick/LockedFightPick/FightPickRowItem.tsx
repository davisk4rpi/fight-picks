import React from 'react';

import { Fighter, FightPickWithScore } from '@fight-picks/models';

import { TaleOfTheTapePick } from '../../../components/feature';
import { useFightPickRowItem } from './fight-pick-row-item.hook';

interface FightPickRowItemProps {
  fightPick: Pick<
    FightPickWithScore,
    'userUid' | 'resultCode' | 'confidence' | 'score'
  >;
  fighter1: Fighter;
  fighter2: Fighter;
}
export const FightPickRowItem = ({
  fightPick,
  fighter1,
  fighter2,
}: FightPickRowItemProps) => {
  const { playerName, winningFighterName, result } = useFightPickRowItem(
    fightPick,
    fighter1,
    fighter2,
  );

  return (
    <TaleOfTheTapePick
      playerName={playerName}
      round={result.round}
      method={result.method}
      score={fightPick.score}
      confidence={fightPick.confidence}
      winningFighterName={winningFighterName}
    />
  );
};
