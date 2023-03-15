import React, { useMemo } from 'react';

import { Fighter } from '@fight-picks/models';

import { SegmentedButtonsField, SegmentedButtonsFieldProps } from '../..';

interface WinningFighterFieldProps {
  value: string;
  onValueChange: (val: string) => void;
  fighter1: Fighter;
  fighter2: Fighter;
}

export const WinningFighterField = ({
  value,
  onValueChange,
  fighter1,
  fighter2,
}: WinningFighterFieldProps) => {
  const selectWinnerButtons: SegmentedButtonsFieldProps['buttons'] = useMemo(
    () => [
      {
        value: fighter1.id ?? '1',
        label: fighter1.name ?? '',
      },
      {
        value: fighter2.id ?? '2',
        label: fighter2.name ?? '',
      },
    ],
    [fighter1, fighter2],
  );

  return (
    <SegmentedButtonsField
      label="Winner"
      buttons={selectWinnerButtons}
      value={value}
      onValueChange={onValueChange}
    />
  );
};
