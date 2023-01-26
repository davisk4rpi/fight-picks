import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Fighter } from '../../../data-access/db';
import { ColorText } from '../../color-text';

interface FighterTwoLineNameProps {
  name: Fighter['name'];
  active?: boolean;
}

export const FighterTwoLineName = ({
  name,
  active = false,
}: FighterTwoLineNameProps) => {
  const firstSpaceIdx = name.indexOf(' ');
  const firstName = name.substring(0, firstSpaceIdx);
  const secondName = name.substring(firstSpaceIdx + 1);

  return (
    <View style={styles.stackedName}>
      <ColorText
        color="onSurfaceVariant"
        variant="labelMedium"
        adjustsFontSizeToFit
        numberOfLines={1}>
        {firstName}
      </ColorText>
      <ColorText
        color={active ? 'primary' : undefined}
        variant="titleLarge"
        adjustsFontSizeToFit
        numberOfLines={1}>
        {secondName}
      </ColorText>
    </View>
  );
};

const styles = StyleSheet.create({
  stackedName: {
    alignItems: 'flex-start',
  },
});
