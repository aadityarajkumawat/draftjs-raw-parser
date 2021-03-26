import React from 'react'
import { v4 as uid } from 'uuid'
import {
  BOLD_ITALIC,
  FinalStylesArrayI,
  ITALIC,
  RichStyle,
  STRONG
} from './constants'

export const addStyleContent = (
  finalStylesArray: Array<FinalStylesArrayI>,
  text: string,
  j: number,
  type: RichStyle
) => {
  switch (type) {
    case STRONG:
      return (
        <strong key={uid()} className={uid()}>
          {text.substring(
            finalStylesArray[j].originalStyles.offset,
            finalStylesArray[j].originalStyles.offset +
              finalStylesArray[j].originalStyles.length
          )}
        </strong>
      )

    case ITALIC:
      return (
        <i key={uid()} className={uid()}>
          {text.substring(
            finalStylesArray[j].originalStyles.offset,
            finalStylesArray[j].originalStyles.offset +
              finalStylesArray[j].originalStyles.length
          )}
        </i>
      )

    case BOLD_ITALIC:
      return (
        <strong key={uid()} className={uid()}>
          <i key={uid()} className={uid()}>
            {text.substring(
              finalStylesArray[j].originalStyles.offset,
              finalStylesArray[j].originalStyles.offset +
                finalStylesArray[j].originalStyles.length
            )}
          </i>
        </strong>
      )
    default:
      return <span key={uid()}></span>
  }
}
