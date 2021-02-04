import React, { Fragment } from 'react'
import { v4 as uid } from 'uuid'
import {
  BOLD_ITALIC,
  ContentArrayI,
  EMPTY_LINE,
  FinalStylesArrayI,
  ITALIC,
  NO_STYLE,
  StringifiedStyle,
  STRONG
} from './constants'

export type RichStyle = 'strong' | 'italic' | 'bold+italic'

export const parseJsonStringToContent = (
  contentString: string
): Array<JSX.Element> => {
  const contentArray: Array<ContentArrayI> = JSON.parse(contentString)

  let finalContent: Array<JSX.Element> = []
  let stringifiedStyles: Array<StringifiedStyle> = []
  let finalStylesArray: Array<FinalStylesArrayI> = []

  for (let i = 0; i < contentArray.length; i++) {
    const { inlineStyleRanges, text } = contentArray[i]
    if (inlineStyleRanges.length === 0 && text !== '') {
      stringifiedStyles.push({
        lineNumber: i,
        content: NO_STYLE,
        originalStyles: { length: -1, offset: -1, style: '' },
        styleI: ''
      })
    } else if (text === '') {
      stringifiedStyles.push({
        lineNumber: i,
        content: EMPTY_LINE,
        originalStyles: { length: -1, offset: -1, style: '' },
        styleI: ''
      })
    } else {
      for (let j = 0; j < inlineStyleRanges.length; j++) {
        stringifiedStyles.push({
          lineNumber: i,
          content: JSON.stringify(inlineStyleRanges[j]).substring(
            1,
            JSON.stringify(inlineStyleRanges[j]).indexOf('style') - 2
          ),
          styleI: inlineStyleRanges[j].style,
          originalStyles: inlineStyleRanges[j]
        })
      }
    }
  }

  if (finalStylesArray.length === 0 && stringifiedStyles.length > 0) {
    finalStylesArray.push(stringifiedStyles[0])
  }

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

  function completeLine(
    i: number,
    j: number,
    text: string,
    finalLine: Array<JSX.Element>
  ) {
    if (
      !(finalStylesArray[j + 1] && finalStylesArray[j + 1].lineNumber === i)
    ) {
      finalLine.push(
        <span key={uid()}>
          {text.substring(
            finalStylesArray[j].originalStyles.offset +
              finalStylesArray[j].originalStyles.length,
            text.length
          )}
          <br />
        </span>
      )
    }
  }

  function addStyleContent(text: string, j: number, type: RichStyle) {
    switch (type) {
      case STRONG:
        return (
          <strong key={uid()}>
            {text.substring(
              finalStylesArray[j].originalStyles.offset,
              finalStylesArray[j].originalStyles.offset +
                finalStylesArray[j].originalStyles.length
            )}
          </strong>
        )

      case ITALIC:
        return (
          <i key={uid()}>
            {text.substring(
              finalStylesArray[j].originalStyles.offset,
              finalStylesArray[j].originalStyles.offset +
                finalStylesArray[j].originalStyles.length
            )}
          </i>
        )

      case BOLD_ITALIC:
        return (
          <strong>
            <i>
              {text.substring(
                finalStylesArray[j].originalStyles.offset,
                finalStylesArray[j].originalStyles.offset +
                  finalStylesArray[j].originalStyles.length
              )}
            </i>
          </strong>
        )
      default:
        return <Fragment></Fragment>
    }
  }

  function continueLine(
    text: string,
    finalLine: Array<JSX.Element>,
    j: number,
    type: RichStyle
  ) {
    finalLine.push(
      <span key={uid()}>
        {text.substring(
          finalStylesArray[j - 1].originalStyles.offset +
            finalStylesArray[j - 1].originalStyles.length,
          finalStylesArray[j].originalStyles.offset
        )}
        {addStyleContent(text, j, type)}
      </span>
    )
  }

  function startLine(
    text: string,
    finalLine: Array<JSX.Element>,
    j: number,
    type: RichStyle
  ) {
    finalLine.push(
      <span key={uid()}>
        {text.substring(0, finalStylesArray[j].originalStyles.offset)}
        {addStyleContent(text, j, type)}
      </span>
    )
  }

  for (let i = 0; i < contentArray.length; i++) {
    let { text } = contentArray[i]
    if (text.length === 0) {
      finalContent.push(
        <Fragment key={uid()}>
          <br key={uid()} />
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
                continueLine(text, finalLine, j, STRONG)
                completeLine(i, j, text, finalLine)
              } else {
                startLine(text, finalLine, j, STRONG)
                completeLine(i, j, text, finalLine)
              }
            } else if (finalStylesArray[j].styleI === 'ITALIC') {
              if (
                finalStylesArray[j - 1] &&
                finalStylesArray[j - 1].lineNumber === i
              ) {
                continueLine(text, finalLine, j, ITALIC)
                completeLine(i, j, text, finalLine)
              } else {
                startLine(text, finalLine, j, ITALIC)
                completeLine(i, j, text, finalLine)
              }
            } else {
              if (
                finalStylesArray[j - 1] &&
                finalStylesArray[j - 1].lineNumber === i
              ) {
                continueLine(text, finalLine, j, BOLD_ITALIC)
                completeLine(i, j, text, finalLine)
              } else {
                startLine(text, finalLine, j, BOLD_ITALIC)
                completeLine(i, j, text, finalLine)
              }
            }
          }
        }
      }
      finalContent.push(<span key={uid()}>{finalLine}</span>)
    }
  }

  return finalContent
}
