import React from 'react'
import { FinalStylesArrayI } from '../constants'
import { v4 as uid } from 'uuid'

export function completeLine(
  i: number,
  j: number,
  text: string,
  finalLine: Array<JSX.Element>,
  finalStylesArray: Array<FinalStylesArrayI>
): Array<JSX.Element> {
  if (!(finalStylesArray[j + 1] && finalStylesArray[j + 1].lineNumber === i)) {
    finalLine.push(
      <span key={uid()} className={uid()}>
        {text.substring(
          finalStylesArray[j].originalStyles.offset +
            finalStylesArray[j].originalStyles.length,
          text.length
        )}
      </span>
    )
  }

  return finalLine
}
