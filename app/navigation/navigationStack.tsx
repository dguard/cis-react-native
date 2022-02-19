import * as React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { ThemeController } from 'components/blocks/ThemeController'
import { DarkTheme, DefaultTheme, ThemeProvider as ThemeProviderPaper } from 'react-native-paper'
import { ThemeProvider } from 'styled-components/native'

import { useTheme } from 'services/theme'

import { CurrencyScreen } from 'screens/currency/screen'

const Stack = createStackNavigator()

export const App = () => {
  const { theme } = useTheme()
  const navigationRef = React.createRef<NavigationContainerRef>()

  return (
    <ThemeProviderPaper theme={theme.dark ? DarkTheme : DefaultTheme}>
      <ThemeProvider theme={theme}>
        <NavigationContainer ref={navigationRef} theme={theme}>
          <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />

          <Stack.Navigator>
            <Stack.Screen
              component={CurrencyScreen}
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
