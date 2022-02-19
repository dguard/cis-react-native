import { ImageBackground as ImageBackgroundInternal, View as ViewInternal } from 'react-native'
import styled, { css } from 'styled-components/native'
import {
  AlignItemsProps,
  FlexProps,
  JustifyContentProps,
  layout,
  LayoutProps,
  margin,
  MarginProps,
  padding,
  PaddingProps,
  styleFn,
} from 'styled-system'

type ViewProps = MarginProps &
  PaddingProps &
  FlexProps &
  JustifyContentProps &
  AlignItemsProps & {
    stretch?: boolean
    justifyCenter?: boolean
    alignCenter?: boolean
  }

const stretchCss: styleFn = ({ stretch }: ViewProps) =>
  stretch &&
  css`
    flex: 1;
  `

const justifyCenterCss: styleFn = ({ justifyCenter }: ViewProps) =>
  justifyCenter &&
  css`
    justify-content: center;
  `

const alignCenterCss: styleFn = ({ alignCenter }: ViewProps) =>
  alignCenter &&
  css`
    align-items: center;
  `
export const View = styled(ViewInternal)<ViewProps>`
  ${margin}
  ${padding}
  ${stretchCss}
  ${justifyCenterCss}
  ${alignCenterCss}
`
type ImageBackgroundProps = LayoutProps & {
  fullWidth?: boolean
  fullHeight?: boolean
}

const fullWidthCss: styleFn = ({ fullWidth }: ImageBackgroundProps) =>
  fullWidth &&
  css`
    width: 100%;
  `
const fullHeightCss: styleFn = ({ fullHeight }: ImageBackgroundProps) =>
  fullHeight &&
  css`
    height: 100%;
  `

export const ImageBackground = styled(ImageBackgroundInternal)<ImageBackgroundProps>`
  ${layout}
  ${fullWidthCss}
  ${fullHeightCss}
`
