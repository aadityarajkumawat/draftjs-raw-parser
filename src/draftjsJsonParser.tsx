import React, { Fragment } from 'react'
import { v4 as uid } from 'uuid'
import {
  BOLD_ITALIC,
  ContentArrayI,
  FinalStylesArrayI,
  ITALIC,
  NO_STYLE,
  STRONG
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
        <Fragment key={uid()}>
          <br key={uid()} />
        </Fragment>
      )
    } else {
      let finalLine: Array<JSX.Element> = []
      for (let j = 0; j < finalStylesArray.length; j++) {
        if (finalStylesArray[j].lineNumber === i) {
          if (finalStylesArray[i].content === NO_STYLE) {
            finalLine.push(
              <span key={uid()}>
                {text}
                <br />
              </span>
            )
          } else {
            if (finalStylesArray[j].styleI === 'BOLD') {
              if (
                finalStylesArray[j - 1] &&
                finalStylesArray[j - 1].lineNumber === i
              ) {
                finalLine = continueLine(
                  finalStylesArray,
                  text,
                  finalLine,
                  j,
                  STRONG
                )
              } else {
                finalLine = startLine(
                  finalStylesArray,
                  text,
                  finalLine,
                  j,
                  STRONG
                )
              }
              finalLine = completeLine(i, j, text, finalLine, finalStylesArray)
            } else if (finalStylesArray[j].styleI === 'ITALIC') {
              if (
                finalStylesArray[j - 1] &&
                finalStylesArray[j - 1].lineNumber === i
              ) {
                finalLine = continueLine(
                  finalStylesArray,
                  text,
                  finalLine,
                  j,
                  ITALIC
                )
              } else {
                finalLine = startLine(
                  finalStylesArray,
                  text,
                  finalLine,
                  j,
                  ITALIC
                )
              }
              finalLine = completeLine(i, j, text, finalLine, finalStylesArray)
            } else {
              if (
                finalStylesArray[j - 1] &&
                finalStylesArray[j - 1].lineNumber === i
              ) {
                finalLine = continueLine(
                  finalStylesArray,
                  text,
                  finalLine,
                  j,
                  BOLD_ITALIC
                )
              } else {
                finalLine = startLine(
                  finalStylesArray,
                  text,
                  finalLine,
                  j,
                  BOLD_ITALIC
                )
              }
              finalLine = completeLine(i, j, text, finalLine, finalStylesArray)
            }
          }
        }
      }
      finalContent.push(<span key={uid()}>{finalLine}</span>)
    }
  }

  return finalContent
}
