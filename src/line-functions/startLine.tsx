import React from 'react'
import { v4 as uid } from 'uuid'
import { addStyleContent } from '../addStyleContent'
import { LineParams, RichStyle } from '../constants'

export function startLine(
  { finalLine, finalStylesArray, j, text }: LineParams,
  type: RichStyle
) {
  finalLine.push(
    <span key={uid()} className={uid()}>
      {text.substring(0, finalStylesArray[j].originalStyles.offset)}
      {addStyleContent(finalStylesArray, text, j, type)}
    </span>
  )

  return finalLine
}
