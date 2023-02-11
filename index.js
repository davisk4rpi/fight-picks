import { registerRootComponent } from 'expo';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { devEnv } from './environments';
import GoogleServives from './google-services.json';
import App from './App';

// set the host and the port property to connect to the emulator
// set these before any read/write operations occur to ensure it doesn't affect your Cloud Firestore data!
if (__DEV__) {
  firestore().useEmulator(
    Platform.OS === 'android' ? devEnv.androidLocalhost : 'localhost',
    devEnv.firebase.firestoreEmulatorPort,
  );
  const authUrl = `http://${
    Platform.OS === 'android' ? devEnv.androidLocalhost : 'localhost'
  }:${devEnv.firebase.authEmulatorPort}`;
  auth().useEmulator(authUrl);
  functions().useEmulator(
    Platform.OS === 'android' ? devEnv.androidLocalhost : 'localhost',
    devEnv.firebase.functionsEmulatorPort,
  );
}

GoogleSignin.configure({
  webClientId: GoogleServives.client[0].oauth_client.find(
    ({ client_type }) => client_type === 3,
  )?.client_id,
});

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
