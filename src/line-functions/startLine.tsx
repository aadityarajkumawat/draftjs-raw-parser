import React from 'react'
import { v4 as uid } from 'uuid'
import { addStyleContent } from '../addStyleContent'
import { FinalStylesArrayI, RichStyle } from '../constants'

export function startLine(
  finalStylesArray: Array<FinalStylesArrayI>,
  text: string,
  finalLine: Array<JSX.Element>,
  j: number,
  type: RichStyle
) {
  finalLine.push(
    <span key={uid()}>
      {text.substring(0, finalStylesArray[j].originalStyles.offset)}
      {addStyleContent(finalStylesArray, text, j, type)}
    </span>
  )

  return finalLine
}
