import * as React from 'react'
import { parseJsonStringToContent } from './draftjsJsonParser'

interface Props {
  rawContent: string
  color?: string
  fontSize?: number
}

export const ParsedData: React.FC<Props> = ({
  rawContent,
  color,
  fontSize,
}) => {
  const contentStyles = { color, fontSize }
  return <div style={contentStyles}>{parseJsonStringToContent(rawContent)}</div>
}
