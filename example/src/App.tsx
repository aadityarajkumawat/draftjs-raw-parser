import React, { Fragment } from 'react'
import { ParsedData } from 'draftjs-raw-parser'
import { dataS } from './data'

const App = () => {
  return (
    <Fragment>
      <div style={{ border: '1px solid', marginTop: '30px' }}>
        <ParsedData rawContent={dataS} color='#0066ff' fontSize={32} />
      </div>
    </Fragment>
  )
}

export default App
