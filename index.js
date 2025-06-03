import { registerRootComponent } from 'expo';

import App from './App';
import { Platform } from 'react-native';

import messaging from '@react-native-firebase/messaging';

// if (Platform.OS == 'android' || Platform.OS == 'ios') {
//     messaging().setBackgroundMessageHandler(async remoteMessage => {
//       console.log('📬 Message handled in the background!', remoteMessage);
//     });
// }

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
