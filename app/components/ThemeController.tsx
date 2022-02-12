import React from 'react'
import { StyleSheet, Switch, View } from 'react-native'
import { IThemeState } from 'models/reducers/theme'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux'

import * as themeActions from 'store/actions/themeActions'

interface IState {
  themeReducer: IThemeState
}

const ThemeController: React.FC = () => {
  const isDark = useSelector((state: IState) => state.themeReducer.isDark)

  const dispatch = useDispatch()
  const handleToggleTheme = () => dispatch(themeActions.setIsDarkTheme(!isDark) as any)
  const iconName = isDark ? 'weather-night' : 'white-balance-sunny'
  const iconColor = isDark ? 'white' : 'black'

  return (
    <View style={styles.container}>
      <Switch value={isDark} onValueChange={handleToggleTheme} />
      <Icon color={iconColor} name={iconName} size={20} style={styles.icon} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 12,
  },
  icon: { marginLeft: 4 },
})

export default ThemeController
