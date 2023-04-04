import React, { useCallback, useMemo } from 'react';

import { Fighter, FightResultWinningFighter } from '@fight-picks/models';

import {
  SegmentedButtonsField,
  SegmentedButtonsFieldProps,
} from '../../SegmentedButtonsField';

export type FightResultWinningFighterFieldValue =
  FightResultWinningFighter | null;

interface FightResultWinningFighterFieldProps {
  value: FightResultWinningFighterFieldValue;
  onValueChange: (val: FightResultWinningFighterFieldValue) => void;
  fighter1: Fighter;
  fighter2: Fighter;
  disabled?: boolean;
}

export const FightResultWinningFighterField = ({
  value,
  onValueChange,
  fighter1,
  fighter2,
  disabled = false,
}: FightResultWinningFighterFieldProps) => {
  const selectWinnerButtons: SegmentedButtonsFieldProps['buttons'] = useMemo(
    () => [
      {
        value: '1',
        label: fighter1.name ?? '',
      },
      {
        value: '2',
        label: fighter2.name ?? '',
      },
    ],
    [fighter1, fighter2],
  );

  const wrappedOnValueChange = useCallback(
    (val: string) => onValueChange(convertFromStringValue(val)),
    [onValueChange],
  );

  return (
    <SegmentedButtonsField
      label="Winner"
      buttons={selectWinnerButtons}
      value={value?.toString() ?? ''}
      onValueChange={wrappedOnValueChange}
      disabled={disabled}
    />
  );
};

const convertFromStringValue = (
  val: string,
): FightResultWinningFighterFieldValue => {
  if (val === '1') {
    return 1;
  } else if (val === '2') {
    return 2;
  }
  return null;
};
