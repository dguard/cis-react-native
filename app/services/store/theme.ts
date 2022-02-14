import { IThemeState } from 'models/reducers/theme'
import { useSelector } from 'react-redux'
import themes from 'themes'

interface IState {
  themeReducer: IThemeState
}

export function useTheme() {
  const isDark = useSelector((state: IState) => state.themeReducer.isDark)
  const theme = isDark ? themes.dark : themes.main

  return { theme }
}
