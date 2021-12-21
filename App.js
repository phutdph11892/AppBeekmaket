/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {NativeBaseProvider} from 'native-base';
import Navigation from './src/components/Navigation';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import {LogBox} from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
import messaging from '@react-native-firebase/messaging';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    // console.log('Authorization status:', authStatus);
  }
}

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const App = () => {
  React.useEffect(() => {
    requestUserPermission();
  }, []);
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <KeyboardAvoidingView style={{flex: 1}}>
          <Navigation />
        </KeyboardAvoidingView>
      </NativeBaseProvider>
    </Provider>
  );
};
export default App;
