import React from 'react'
import { v4 as uid } from 'uuid'
import { LineParams, RichStyle } from '../constants'
import { addStyleContent } from '../style-functions/addStyleContent'

export function continueLine(
  { finalLine, finalStylesArray, j, text }: LineParams,
  type: RichStyle
) {
  finalLine.push(
    <span key={uid()} className={uid()}>
      {text.substring(
        finalStylesArray[j - 1].originalStyles.offset +
          finalStylesArray[j - 1].originalStyles.length,
        finalStylesArray[j].originalStyles.offset
      )}
      {addStyleContent(finalStylesArray, text, j, type)}
    </span>
  )

  return finalLine
}
