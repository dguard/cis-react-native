import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'styled-components/native'
import { margin, MarginProps } from 'styled-system'

type StyledIconProps = MarginProps

export const StyledIcon = styled(Icon)<StyledIconProps>`
  ${margin}
`
