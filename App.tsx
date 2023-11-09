// In App.js in a new project

import * as React from 'react';
import KeyboardStatusProvider from './src/contexts/keyboard-status-provider';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainNavigator from './src/navigation/MainNavigator';

function App() {
  return (
    <SafeAreaProvider>
      <KeyboardStatusProvider>
        <MainNavigator />
      </KeyboardStatusProvider>
    </SafeAreaProvider>
  );
}

export default App;
