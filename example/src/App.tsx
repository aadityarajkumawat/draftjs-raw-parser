import React from 'react'

import { ParsedData } from 'draftjs-raw-parser'
import 'draftjs-raw-parser/dist/index.css'
import { dataS } from './data'

const App = () => {
  return <ParsedData draftJSRawData={dataS} />
}

export default App
