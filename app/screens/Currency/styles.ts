import { ImageBackground as ImageBackgroundInternal, View as ViewInternal } from 'react-native'
import { TextInput as TextInputInternal } from 'react-native-paper'
import styled from 'styled-components/native'
import {
  alignItems,
  AlignItemsProps,
  flex,
  FlexProps,
  justifyContent,
  JustifyContentProps,
  layout,
  LayoutProps,
  margin,
  MarginProps,
  padding,
  PaddingProps,
} from 'styled-system'

type ViewProps = MarginProps & PaddingProps & FlexProps & JustifyContentProps & AlignItemsProps

export const View = styled(ViewInternal)<ViewProps>`
  ${margin}
  ${padding}
  ${flex}
  ${justifyContent}
  ${alignItems}
`

type TextInputProps = {
  children?: any
}
export const TextInput = styled(TextInputInternal)<TextInputProps>``

type ImageBackgroundProps = LayoutProps
export const ImageBackground = styled(ImageBackgroundInternal)<ImageBackgroundProps>`
  ${layout}
`
