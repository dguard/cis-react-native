/**
 * React Native App
 * Everything starts from the Entry-point
 */
import React from 'react'
import { ActivityIndicator } from 'react-native'
import { IThemeState } from 'models/reducers/theme'
import { Provider as PaperProvider } from 'react-native-paper'
import { Provider, useSelector } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'

import {
  CombinedDarkTheme,
  CombinedDefaultTheme,
  PaperThemeDark,
  PaperThemeDefault,
} from 'config/theme-config'

import Navigator from 'navigation'

import configureStore from 'store'

const { persistor, store } = configureStore()

interface IState {
  themeReducer: IThemeState
}

const RootNavigation: React.FC = () => {
  const isDark = useSelector((state: IState) => state.themeReducer.isDark)
  const paperTheme = isDark ? PaperThemeDark : PaperThemeDefault
  const combinedTheme = isDark ? CombinedDarkTheme : CombinedDefaultTheme

  return (
    <PaperProvider theme={paperTheme}>
      <Navigator theme={combinedTheme} />
    </PaperProvider>
  )
}

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
