import React from 'react'
import { Switch } from 'react-native'
import { Icon } from 'components/ui'
import { useDispatch, useSelector } from 'react-redux'

import * as themeActions from 'store/actions/themeActions'
import { ThemeReducerInterface } from 'store/reducers/themeReducer'

import { Row } from './styles'

export function ThemeController() {
  const isDark = useSelector((state: ThemeReducerInterface) => state.themeReducer.isDark)

  const dispatch = useDispatch()
  const handleToggleTheme = () => dispatch(themeActions.setIsDarkTheme(!isDark) as any)
  const iconName = isDark ? 'weather-night' : 'white-balance-sunny'

  return (
    <Row mx={12} my={12} alignCenter justifyEnd>
      <Switch value={isDark} onValueChange={handleToggleTheme} />
      <Icon color="white" ml={1} name={iconName} size={20} />
    </Row>
  )
}
