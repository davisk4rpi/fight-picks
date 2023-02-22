---
to: src/screens/<%=name%>/<%=name%>Screen.tsx
---
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { LoadingScreen, Screen } from '../../components';
import { use<%=name%>Screen } from './<%=h.inflection.dasherize(h.changeCase.snake(name))%>-screen.hook';

export interface <%=name%>ScreenProps {}

const TEST_ID = '<%=name%>Screen';

export const <%=name%>Screen = ({}: <%=name%>ScreenProps) => {
  const { loading } = use<%=name%>Screen();

  if (loading) {
    return <LoadingScreen testID={TEST_ID} />;
  }
  return (
    <Screen testID={TEST_ID}>
      <View style={styles.view} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});
