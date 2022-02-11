import React from 'react'
import { StyleSheet, View } from 'react-native'
import { IThemeState } from 'app/models/reducers/theme'
import * as themeActions from 'app/store/actions/themeActions'
import { Switch } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux'

interface IState {
  themeReducer: IThemeState
}

const ThemeController: React.FC = () => {
  const isDark = useSelector((state: IState) => state.themeReducer.isDark)

  const dispatch = useDispatch()
  const onToggleTheme = () => dispatch(themeActions.setIsDarkTheme(!isDark))
  const iconName = isDark ? 'weather-night' : 'white-balance-sunny'
  const iconColor = isDark ? 'white' : 'black'

  return (
    <View style={styles.container}>
      <Switch value={isDark} onValueChange={onToggleTheme} />
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
