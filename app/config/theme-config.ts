import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native'
import { DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme } from 'react-native-paper'

export const PaperThemeDefault = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: '#3498db',
  },
}

export const PaperThemeDark = {
  ...PaperDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    primary: '#3498db',
  },
}

export const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    background: '#303030',
    card: '#a5d1fe',
    text: '#ffffff',
    backdrop: 'transparent',
  },
}

export const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    background: '#303030',
    card: '#222222',
    text: '#ffffff',
  },
}
