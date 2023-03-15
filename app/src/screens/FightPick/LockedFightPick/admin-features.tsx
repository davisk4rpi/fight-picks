import React, { useCallback } from 'react';
import { Button } from 'react-native-paper';

import {
  selectCurrentUser,
  useAppSelector,
} from '@fight-picks/native-data-access';
import { useNavigation } from '@react-navigation/native';

import { Translation } from '../../../app-context';

export const useAdminFeatures = (fightId: string) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const { navigate } = useNavigation();

  const handleEditPicksPress = useCallback(() => {
    navigate('AdminEditFightPicks', { fightId });
  }, [navigate, fightId]);
  const handleEditResultPress = useCallback(() => {
    navigate('EditFightResult', { fightId });
  }, [navigate, fightId]);

  const editFightResultButton = (
    <Button onPress={handleEditResultPress}>{Translation.editResult}</Button>
  );

  const editFightPicksButton = (
    <Button onPress={handleEditPicksPress}>{Translation.editPicks}</Button>
  );
  return {
    editFightResultButton: currentUser?.isAdmin ? editFightResultButton : null,
    editFightPicksButton: currentUser?.isAdmin ? editFightPicksButton : null,
  };
};
