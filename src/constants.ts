export const STRONG = 'strong'
export const ITALIC = 'italic'
export const BOLD_ITALIC = 'bold+italic'
export const EMPTY_LINE = 'empty'
export const NO_STYLE = 'no-styles'

export interface InlineStyleRangeI {
  offset: number
  length: number
  style: string
}

export interface ContentArrayI {
  key: string
  text: string
  type: string
  depth: number
  inlineStyleRanges: Array<InlineStyleRangeI>
  entityRanges: any
  data: any
}

export interface StringifiedStyle {
  content: string
  lineNumber: number
  originalStyles: InlineStyleRangeI
  styleI: string
}

export interface FinalStylesArrayI {
  content: string
  lineNumber: number
  originalStyles: InlineStyleRangeI
  styleI: string
}
