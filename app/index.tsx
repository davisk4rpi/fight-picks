import '@react-native-firebase/app';
import 'core-js/actual/array/at';
import 'expo-dev-client';
import 'react-native-get-random-values';

import { registerRootComponent } from 'expo';
import React from 'react';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';

import {
  authChanged,
  createAuthUserIfNotExists,
  enableFirestoreEmulator,
  setFirestoreInstance,
  store,
} from '@fight-picks/native-data-access';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import GoogleServives from './google-services.json';
import App from './src/App';
import { devEnv } from './src/environments';

const firestoreInstance = firestore();
firestoreInstance.settings({ serverTimestampBehavior: 'estimate' });
setFirestoreInstance(firestoreInstance);

// set the host and the port property to connect to the emulator
// set these before any read/write operations occur to ensure it doesn't affect your Cloud Firestore data!
if (__DEV__) {
  const localhost =
    Platform.OS === 'android' ? devEnv.androidLocalhost : 'localhost';
  enableFirestoreEmulator(localhost, devEnv.firebase.firestoreEmulatorPort);
  const authUrl = `http://${localhost}:${devEnv.firebase.authEmulatorPort}`;
  auth().useEmulator(authUrl);
}

GoogleSignin.configure({
  webClientId: GoogleServives.client[0].oauth_client.find(
    ({ client_type }) => client_type === 3,
  )?.client_id,
});
auth().onAuthStateChanged(async user => {
  if (user) createAuthUserIfNotExists(user);
  store.dispatch(authChanged(user));
});
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(() => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
});
