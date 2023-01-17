import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { Fighter } from '../../../data-access';

export const FighterTwoLineName = ({ name }: Pick<Fighter, 'name'>) => {
  const firstSpaceIdx = name.indexOf(' ');
  const firstName = name.substring(0, firstSpaceIdx);
  const secondName = name.substring(firstSpaceIdx + 1);

  return (
    <View style={styles.stackedName}>
      <Text variant="labelMedium" adjustsFontSizeToFit numberOfLines={1}>
        {firstName}
      </Text>
      <Text variant="titleLarge" adjustsFontSizeToFit numberOfLines={1}>
        {secondName}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  stackedName: {
    alignItems: 'flex-start',
  },
});
