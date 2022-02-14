/**
 * React Native App
 * Everything starts from the Entry-point
 */
import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'

import Navigator from 'navigation'

import configureStore from 'store'

const { persistor, store } = configureStore()

const RootNavigation: React.FC = () => <Navigator />

const EntryPoint: React.FC = () => (
  <PaperProvider>
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <RootNavigation />
      </PersistGate>
    </Provider>
  </PaperProvider>
)

export default EntryPoint
