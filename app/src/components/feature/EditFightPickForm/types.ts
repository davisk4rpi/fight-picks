import { Confidence, MethodWithWinner } from '@fight-picks/models';
import {
  FightResultRoundFieldValue,
  FightResultWinningFighterFieldValue,
} from '../FightResultFields';

export type FightPickMethodFieldValue = MethodWithWinner | null;
export type FightPickConfidenceFieldValue = Confidence | null;

export type FightPickFormValues = {
  id: string;
  userUid: string;
  fightId: string;
  method: FightPickMethodFieldValue;
  confidence: FightPickConfidenceFieldValue;
  winningFighter: FightResultWinningFighterFieldValue;
  round: FightResultRoundFieldValue;
};
