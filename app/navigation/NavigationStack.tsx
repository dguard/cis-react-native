import * as React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import ThemeController from 'components/blocks/ThemeController'
import { DarkTheme, DefaultTheme, ThemeProvider as ThemeProviderPaper } from 'react-native-paper'
import { ThemeProvider } from 'styled-components/native'

import { useTheme } from 'services/store/theme'

import Currency from 'screens/Currency'

import { navigationRef } from './NavigationService'

const Stack = createStackNavigator()

function App() {
  const { theme } = useTheme()

  return (
    <ThemeProviderPaper theme={theme.dark ? DarkTheme : DefaultTheme}>
      <ThemeProvider theme={theme}>
        <NavigationContainer ref={navigationRef} theme={theme}>
          <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />

          <Stack.Navigator>
            <Stack.Screen
              component={Currency}
              name="Currency"
              options={{
                headerRight: () => <ThemeController />,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </ThemeProviderPaper>
  )
}

export default App
