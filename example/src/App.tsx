import { convertToRaw, Editor, EditorState, RichUtils } from 'draft-js'
import { ParsedData } from 'draftjs-raw-parser'
import React, { useState } from 'react'

const App = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
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
      <div
        style={{ margin: '20px 0 20px 0', border: '2px dashed black' }}
      ></div>

      <h2>Editor</h2>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={keyCommands}
      />

      <h2>Output</h2>
      <div style={{ border: '1px solid' }}>
        <ParsedData
          rawContent={JSON.stringify(
            convertToRaw(editorState.getCurrentContent()).blocks,
          )}
        />
      </div>
    </div>
  )
}

export default App
