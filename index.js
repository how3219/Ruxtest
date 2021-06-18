/**
 * @format
 */

import {AppRegistry, Text, TextInput,Platform} from 'react-native';
import React from 'react';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  if (Platform.OS === 'ios') {
    PushNotificationIOS.getApplicationIconBadgeNumber(function(number) {
      PushNotificationIOS.setApplicationIconBadgeNumber(number+1);
    });
  }
});


Text.defaultProps = Text.defaultProps || {}
Text.defaultProps.allowFontScaling = false

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

// function HeadlessCheck({ isHeadless }) {
//     if (isHeadless) {
//       // App has been launched in the background by iOS, ignore
//       return null;
//     }
  
//     return <App />;
//   }
AppRegistry.registerComponent(appName, () => App);
