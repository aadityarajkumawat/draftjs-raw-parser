import React, { Fragment } from 'react'
import { v4 as uid } from 'uuid'
import {
  BOLD_ITALIC,
  ContentArrayI,
  FinalStylesArrayI,
  ITALIC,
  NO_STYLE,
  STRONG,
  LineParams
} from './constants'
import { getFinalStylesArray } from './getFinalStylesArray'
import { getStringifiedStyles } from './getStringifiedStyles'
import { completeLine } from './line-functions/completeLine'
import { continueLine } from './line-functions/continueLine'
import { startLine } from './line-functions/startLine'

export const parseJsonStringToContent = (
  contentString: string
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
        <Fragment>
          <br key={uid()} className={uid()} />
        </Fragment>
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

            if (finalStylesArray[j].styleI === 'BOLD') {
              if (
                finalStylesArray[j - 1] &&
                finalStylesArray[j - 1].lineNumber === i
              ) {
                finalLine = continueLine(lineParams, STRONG)
              } else {
                finalLine = startLine(lineParams, STRONG)
              }
              finalLine = completeLine(i, j, text, finalLine, finalStylesArray)
            } else if (finalStylesArray[j].styleI === 'ITALIC') {
              if (
                finalStylesArray[j - 1] &&
                finalStylesArray[j - 1].lineNumber === i
              ) {
                finalLine = continueLine(lineParams, ITALIC)
              } else {
                finalLine = startLine(lineParams, ITALIC)
              }
              finalLine = completeLine(i, j, text, finalLine, finalStylesArray)
            } else {
              if (
                finalStylesArray[j - 1] &&
                finalStylesArray[j - 1].lineNumber === i
              ) {
                finalLine = continueLine(lineParams, BOLD_ITALIC)
              } else {
                finalLine = startLine(lineParams, BOLD_ITALIC)
              }
              finalLine = completeLine(i, j, text, finalLine, finalStylesArray)
            }
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
