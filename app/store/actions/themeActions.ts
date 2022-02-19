import * as types from './types'

export interface ThemeToggleActionInterface {
  isDark: boolean
}

export function setIsDarkTheme(value: boolean) {
  return {
    type: types.TOGGLE_THEME,
    isDark: value,
  }
}
