import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Surface, Text } from 'react-native-paper';

import { ThemeSpacing } from '../../../app-context';
import { LoadingScreen, Screen } from '../../../components';
import { useMigrationsScreen } from './migrations-screen.hook';

export interface MigrationsScreenProps {}

const TEST_ID = 'MigrationsScreen';

export const MigrationsScreen = ({}: MigrationsScreenProps) => {
  const {
    loading,
    pendingMigrationsMap,
    initializedMigrations,
    failedMigrations,
    completeMigrations,
  } = useMigrationsScreen();

  if (loading) {
    return <LoadingScreen testID={TEST_ID} />;
  }
  return (
    <Screen testID={TEST_ID}>
      <View style={styles.view}>
        <View>
          <Text variant="titleMedium">Pending Migrations</Text>
          {initializedMigrations.map(migration => (
            <MigrationSurface
              key={migration.name}
              name={migration.name}
              date={migration.initializedAt}
            />
          ))}
          {Array.from(pendingMigrationsMap).map(
            ([migrationName, migration]) => {
              return (
                <Button
                  key={migrationName}
                  onPress={migration}
                  mode="contained-tonal"
                  style={styles.migrationButton}>
                  Run "{migrationName}"
                </Button>
              );
            },
          )}
        </View>
        <View>
          <Text variant="titleMedium">Complete Migrations</Text>
          {completeMigrations.map(migration => (
            <MigrationSurface
              key={migration.name}
              name={migration.name}
              date={migration.endedAt}
            />
          ))}
        </View>
        <View>
          <Text variant="titleMedium">Failed Migrations</Text>
          {failedMigrations.map(migration => (
            <MigrationSurface
              key={migration.name}
              name={migration.name}
              date={migration.updatedAt}
            />
          ))}
        </View>
      </View>
    </Screen>
  );
};

interface MigrationSurfaceProps {
  name: string;
  date: Date | null;
}
const MigrationSurface = ({ name, date }: MigrationSurfaceProps) => {
  return (
    <Surface key={name} style={styles.migrationSurface}>
      <Text variant="labelLarge">
        {name} - <Text variant="labelSmall">{date?.toString()}</Text>
      </Text>
    </Surface>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  migrationSurface: {
    padding: ThemeSpacing.base,
    margin: ThemeSpacing.base,
  },
  migrationButton: {
    margin: ThemeSpacing.base,
  },
});
