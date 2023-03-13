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

  const handlePress = useCallback(() => {
    navigate('EditFightResult', { fightId });
  }, [navigate, fightId]);

  const editFightResultButton = (
    <Button onPress={handlePress}>{Translation.editResult}</Button>
  );
  return {
    editFightResultButton: currentUser?.isAdmin ? editFightResultButton : null,
  };
};
