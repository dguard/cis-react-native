import dark from './dark'
import main from './main'

const themes = {
  main,
  dark,
}
export type Theme = keyof typeof themes
export default themes
