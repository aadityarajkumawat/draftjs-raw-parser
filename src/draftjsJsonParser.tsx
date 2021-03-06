import React from 'react'
import { v4 as uid } from 'uuid'
import {
  BOLD_ITALIC,
  ContentArrayI,
  FinalStylesArrayI,
  ITALIC,
  LineParams,
  NO_STYLE,
  RichStyle,
  STRONG,
} from './constants'
import { completeLine, continueLine, startLine } from './line-functions/index'
import {
  getFinalStylesArray,
  getStringifiedStyles,
} from './style-functions/index'

export const parseJsonStringToContent = (
  contentString: string,
): Array<JSX.Element> => {
  const contentArray: Array<ContentArrayI> = JSON.parse(contentString)

  let finalContent: Array<JSX.Element> = []
  let stringifiedStyles = getStringifiedStyles(contentArray)
  let finalStylesArray: Array<FinalStylesArrayI> = []

  if (finalStylesArray.length === 0 && stringifiedStyles.length > 0) {
    finalStylesArray.push(stringifiedStyles[0])
  }

  finalStylesArray = getFinalStylesArray(stringifiedStyles)

  for (let i = 0; i < contentArray.length; i++) {
    let { text } = contentArray[i]
    if (text.length === 0) {
      finalContent.push(
        <span key={uid()}>
          <br key={uid()} className={uid()} />
        </span>,
      )
    } else {
      let finalLine: Array<JSX.Element> = []
      for (let j = 0; j < finalStylesArray.length; j++) {
        if (finalStylesArray[j].lineNumber === i) {
          if (finalStylesArray[i].content === NO_STYLE) {
            finalLine.push(
              <span key={uid()} className={uid()}>
                {text}
                <br key={uid()} className={uid()} />
              </span>,
            )
          } else {
            const lineParams: LineParams = {
              finalStylesArray,
              text,
              finalLine,
              j,
            }

            let STYLE: RichStyle = STRONG

            if (finalStylesArray[j].styleI === 'BOLD') {
              STYLE = STRONG
            } else if (finalStylesArray[j].styleI === 'ITALIC') {
              STYLE = ITALIC
            } else {
              STYLE = BOLD_ITALIC
            }

            if (
              finalStylesArray[j - 1] &&
              finalStylesArray[j - 1].lineNumber === i
            ) {
              finalLine = continueLine(lineParams, STYLE)
            } else {
              finalLine = startLine(lineParams, STYLE)
            }

            finalLine = completeLine(i, j, text, finalLine, finalStylesArray)
          }
        }
      }
      finalContent.push(
        <span key={uid()} className={uid()}>
          {finalLine}
        </span>,
      )
    }
  }

  return finalContent
}
