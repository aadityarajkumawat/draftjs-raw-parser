import {
  ContentArrayI,
  EMPTY_LINE,
  NO_STYLE,
  StringifiedStyle
} from './constants'

export const getStringifiedStyles = (contentArray: Array<ContentArrayI>) => {
  const stringifiedStyles: Array<StringifiedStyle> = []
  for (let i = 0; i < contentArray.length; i++) {
    const { inlineStyleRanges, text } = contentArray[i]
    if (inlineStyleRanges.length === 0 && text !== '') {
      stringifiedStyles.push({
        lineNumber: i,
        content: NO_STYLE,
        originalStyles: { length: -1, offset: -1, style: '' },
        styleI: ''
      })
    } else if (text === '') {
      stringifiedStyles.push({
        lineNumber: i,
        content: EMPTY_LINE,
        originalStyles: { length: -1, offset: -1, style: '' },
        styleI: ''
      })
    } else {
      for (let j = 0; j < inlineStyleRanges.length; j++) {
        stringifiedStyles.push({
          lineNumber: i,
          content: JSON.stringify(inlineStyleRanges[j]).substring(
            1,
            JSON.stringify(inlineStyleRanges[j]).indexOf('style') - 2
          ),
          styleI: inlineStyleRanges[j].style,
          originalStyles: inlineStyleRanges[j]
        })
      }
    }
  }

  return stringifiedStyles
}
