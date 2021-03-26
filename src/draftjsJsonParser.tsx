import React from 'react'
import { v4 as uid } from 'uuid'
import {
  BOLD_ITALIC,
  ContentArrayI,
  FinalStylesArrayI,
  ITALIC,
  NO_STYLE,
  STRONG,
  LineParams,
  RichStyle
} from './constants'
import { getFinalStylesArray } from './getFinalStylesArray'
import { getStringifiedStyles } from './getStringifiedStyles'
import { completeLine, startLine, continueLine } from './line-functions/index'

export const parseJsonStringToContent = (
  contentString: string
): Array<JSX.Element> => {
  const contentArray: Array<ContentArrayI> = JSON.parse(contentString)

  console.log(contentArray)

  let finalContent: Array<JSX.Element> = []
  let stringifiedStyles = getStringifiedStyles(contentArray)

  console.log(stringifiedStyles)
  let finalStylesArray: Array<FinalStylesArrayI> = []

  if (finalStylesArray.length === 0 && stringifiedStyles.length > 0) {
    finalStylesArray.push(stringifiedStyles[0])
  }

  finalStylesArray = getFinalStylesArray(stringifiedStyles)

  console.log(finalStylesArray)

  for (let i = 0; i < contentArray.length; i++) {
    let { text } = contentArray[i]
    if (text.length === 0) {
      finalContent.push(
        <span key={uid()}>
          <br key={uid()} className={uid()} />
        </span>
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
              </span>
            )
          } else {
            const lineParams: LineParams = {
              finalStylesArray,
              text,
              finalLine,
              j
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
              console.log('line continue')
            } else {
              finalLine = startLine(lineParams, STYLE)
              // console.log(finalStylesArray[j].lineNumber)
              console.log('line start')
            }
            finalLine = completeLine(i, j, text, finalLine, finalStylesArray)
            console.log(finalLine)
          }
        }
      }
      finalContent.push(
        <span key={uid()} className={uid()}>
          {finalLine}
        </span>
      )
    }
  }

  return finalContent
}
