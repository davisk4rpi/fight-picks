import React, { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface } from 'react-native-paper';

import { ThemeSpacing } from '../../../../app-context';

export const TaleOfTheTapeContainer = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Surface elevation={1} style={styles.fightRowContainer}>
      <View style={styles.fightRow}>{children}</View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  fightRowContainer: {
    alignItems: 'center',
    marginTop: ThemeSpacing.base * 2,
    paddingHorizontal: ThemeSpacing.base,
    paddingVertical: ThemeSpacing.base * 2,
  },
  fightRow: {
    marginTop: ThemeSpacing.base,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
