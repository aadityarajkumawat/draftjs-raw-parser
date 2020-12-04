import * as React from 'react'
import { parseJsonStringToContent } from './draftjsJsonParser'

interface Props {
  draftJSRawData: string
}

export const ParsedData: React.FC<Props> = ({ draftJSRawData }) => {
  return <div>{parseJsonStringToContent(draftJSRawData)}</div>
}
