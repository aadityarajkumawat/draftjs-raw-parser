import * as React from 'react'

interface Props {
  draftJSRawData: string
}

export const ParsedData: React.FC<Props> = ({ draftJSRawData }) => {
  return <div>{draftJSRawData}</div>
}
