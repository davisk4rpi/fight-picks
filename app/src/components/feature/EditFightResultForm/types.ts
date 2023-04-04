import {
  FightResultMethodFieldValue,
  FightResultRoundFieldValue,
  FightResultWinningFighterFieldValue,
} from '../FightResultFields';

export type FightResultFormValues = {
  method: FightResultMethodFieldValue;
  winningFighter: FightResultWinningFighterFieldValue;
  round: FightResultRoundFieldValue;
};
