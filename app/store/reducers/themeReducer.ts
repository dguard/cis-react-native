/**
 * Loading reducer made separate for easy blacklisting
 * Avoid data persist
 */
import { createReducer } from 'lib/createReducer'

import { ThemeToggleActionInterface } from 'store/actions/themeActions'
import * as types from 'store/actions/types'

export interface ThemeStateInterface {
  isDark: boolean
}

const initialState: ThemeStateInterface = {
  isDark: false,
}

export interface ThemeReducerInterface {
  themeReducer: ThemeStateInterface
}

export const themeReducer = createReducer(initialState, {
  [types.TOGGLE_THEME](state: ThemeStateInterface, action: ThemeToggleActionInterface) {
    return { ...state, isDark: action.isDark }
  },
})
