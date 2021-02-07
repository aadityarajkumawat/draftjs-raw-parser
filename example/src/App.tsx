import React, { Fragment } from 'react'
import { EditorOnSteroids, ParsedData } from 'draftjs-raw-parser'

const App = () => {
  return (
    <Fragment>
      <EditorOnSteroids />
      <div style={{ border: '1px solid', marginTop: '30px' }}>
        <ParsedData />
      </div>
    </Fragment>
  )
}

export default App
