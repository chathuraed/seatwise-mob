// In App.js in a new project

import * as React from 'react'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {Provider} from 'react-redux'

import KeyboardStatusProvider from './src/contexts/keyboard-status-provider'
import InitialPoint from './src/navigation'
import store from './src/store'
import Toast from 'react-native-toast-message'

function App() {
  return (
    <>
      <Provider store={store}>
        <SafeAreaProvider>
          <KeyboardStatusProvider>
            <InitialPoint />
          </KeyboardStatusProvider>
        </SafeAreaProvider>
      </Provider>
      <Toast />
    </>
  )
}

export default App
