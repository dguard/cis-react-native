/**
 * Loading reducer made separate for easy blacklisting
 * Avoid data persist
 */
import createReducer from 'lib/createReducer'
import { IThemeToggleAction } from 'models/actions/theme'
import { IThemeState } from 'models/reducers/theme'

import * as types from 'store/actions/types'

const initialState: IThemeState = {
  isDark: false,
}

export const themeReducer = createReducer(initialState, {
  [types.TOGGLE_THEME](state: IThemeState, action: IThemeToggleAction) {
    return { ...state, isDark: action.isDark }
  },
})
