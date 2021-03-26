import React, { useState } from 'react'
import { ParsedData } from 'draftjs-raw-parser'
import { convertToRaw, Editor, EditorState, RichUtils } from 'draft-js'

const App = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )

  const keyCommands = (command: any, state: any) => {
    const newState = RichUtils.handleKeyCommand(state, command)

    if (newState) {
      setEditorState(newState)
      return 'handled'
    }

    return 'not-handled'
  }

  return (
    <div>
      <div style={{ border: '1px solid', marginTop: '30px' }}>
        <ParsedData
          rawContent={JSON.stringify(
            convertToRaw(editorState.getCurrentContent()).blocks
          )}
        />
      </div>

      <Editor
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={keyCommands}
      />
    </div>
  )
}

export default App
