import * as React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer, Theme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import ThemeController from 'components/ThemeController'

import Currency from 'screens/Currency'

import { navigationRef } from './NavigationService'

const Stack = createStackNavigator()

interface IProps {
  theme: Theme
}

const App: React.FC<IProps> = (props: IProps) => {
  const { theme } = props

  return (
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
  )
}

export default App
