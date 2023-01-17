import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemeSpacing } from '../../app-context';

export const Screen = ({ style, testID, ...props }: ViewProps) => {
  return (
    <SafeAreaView
      style={styles.safeAreaView}
      mode="padding"
      edges={['bottom', 'left', 'right']}>
      <View testID={testID} style={[styles.defaultScreen, style]} {...props} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  defaultScreen: {
    flex: 1,
    paddingBottom: ThemeSpacing.verticalScreen,
    paddingHorizontal: ThemeSpacing.horizontalScreen,
  },
  safeAreaView: {
    flex: 1,
  },
});
