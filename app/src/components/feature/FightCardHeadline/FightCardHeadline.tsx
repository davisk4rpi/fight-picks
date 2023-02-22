import { intlFormat } from 'date-fns';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, SurfaceProps, Text } from 'react-native-paper';

import { ThemeSpacing } from '../../../app-context';

interface FightCardHeadlineProps {
  name: string;
  mainCardDate: string;
  elevation?: SurfaceProps['elevation'];
  LeftAdornment?: () => JSX.Element;
  compact?: boolean;
}

export const FightCardHeadline = ({
  elevation = 0,
  name,
  mainCardDate,
  LeftAdornment,
  compact,
}: FightCardHeadlineProps) => {
  return (
    <Surface elevation={elevation} style={styles.surface}>
      {LeftAdornment && LeftAdornment()}
      <View style={styles.column}>
        <Text
          style={styles.fightCardName}
          variant={compact ? 'headlineMedium' : 'displayMedium'}
          adjustsFontSizeToFit
          numberOfLines={1}>
          {name}
        </Text>
        <Text
          variant={compact ? 'titleSmall' : 'headlineSmall'}
          adjustsFontSizeToFit
          numberOfLines={1}>
          {intlFormat(new Date(mainCardDate), {
            month: 'long',
            day: 'numeric',
            hour12: true,
            hour: 'numeric',
            minute: '2-digit',
          })}
        </Text>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  surface: {
    paddingVertical: ThemeSpacing.base * 2,
    paddingHorizontal: ThemeSpacing.base * 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  column: {
    alignItems: 'center',
  },
  fightCardName: {
    marginBottom: ThemeSpacing.base * 2,
  },
});
