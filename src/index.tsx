import * as React from 'react'
import { parseJsonStringToContent } from './draftjsJsonParser'

interface Props {
  rawContent: string
}

export const ParsedData: React.FC<Props> = ({ rawContent }) => {
  return <div>{parseJsonStringToContent(rawContent)}</div>
}
