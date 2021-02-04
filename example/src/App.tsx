import React, { Fragment } from 'react'

import { ParsedData } from 'draftjs-raw-parser'
// import { dataS } from './data'
import { convertToRaw, Editor, EditorState, RichUtils } from 'draft-js'

const App = () => {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  )

  const postRawContent = convertToRaw(editorState.getCurrentContent()).blocks
  console.log(postRawContent)

  const handleKeyCommand = (command: any, editorState: any) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)

    if (newState) {
      setEditorState(newState)
      return 'handled'
    }

    return 'not-handled'
  }
  return (
    <Fragment>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
        placeholder='Content'
      />
      <div style={{ border: '1px solid' }}>
        <ParsedData draftJSRawData={JSON.stringify(postRawContent)} />
      </div>
    </Fragment>
  )
}

export default App
