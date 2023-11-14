// In App.js in a new project

import * as React from 'react';
import KeyboardStatusProvider from './src/contexts/keyboard-status-provider';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import MainNavigator from './src/navigation/MainNavigator';
import store from './src/store';
import AppNavigator from './src/navigation';

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <KeyboardStatusProvider>
          <AppNavigator />
        </KeyboardStatusProvider>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
