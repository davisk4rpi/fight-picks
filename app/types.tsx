/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  AdminHome: undefined;
  EditFightResult: { fightId: string };
  AdminEditFightPick: {
    fightId: string;
    userUid: string;
    existingFightPickId?: string;
  };
  AdminEditFightPicks: { fightId: string };
  FightPick: { fightId: string; noSpoilers?: boolean };
  FightCard?: { fightCardId: string };
  Login: undefined;
  Modal: undefined;
  NotFound: undefined;
  Settings?: { isAdmin: boolean };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  CurrentFightCard?: undefined;
  PastFightCards: undefined;
  Score: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
