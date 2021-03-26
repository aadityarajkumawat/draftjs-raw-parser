import { FinalStylesArrayI, StringifiedStyle } from '../constants'

export const getFinalStylesArray = (
  stringifiedStyles: Array<StringifiedStyle>
) => {
  let finalStylesArray: Array<FinalStylesArrayI> = []
  for (let i = 0; i < stringifiedStyles.length; i++) {
    let sty = stringifiedStyles[i]
    let found = false
    for (let j = 0; j < finalStylesArray.length; j++) {
      if (
        finalStylesArray[j].content === sty.content &&
        finalStylesArray[j].lineNumber === sty.lineNumber
      ) {
        found = true
      }
      if (
        finalStylesArray[j].content === sty.content &&
        finalStylesArray[j].lineNumber === sty.lineNumber &&
        finalStylesArray[j].styleI !== sty.styleI
      ) {
        finalStylesArray[j].styleI = 'BOLD+ITALIC'
      }
    }

    if (!found) {
      finalStylesArray.push(sty)
    }
  }

  return finalStylesArray
}
