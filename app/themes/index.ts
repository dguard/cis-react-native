import { theme as dark } from './dark'
import { theme as main } from './main'

export const themes = {
  main,
  dark,
}
export type Theme = keyof typeof themes
