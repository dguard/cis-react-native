import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native'
import { DefaultTheme as PaperDefaultTheme } from 'react-native-paper'
import { colors } from 'themes/main/colors'
import { palette } from 'themes/main/palette'

export const theme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    background: palette.grayUmber,
    card: palette.darkBrown,
    text: palette.white,
    backdrop: 'transparent',
    ...colors,
  },
}
