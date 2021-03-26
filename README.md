# draftjs-raw-parser

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/draftjs-raw-parser.svg)](https://www.npmjs.com/package/draftjs-raw-parser) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install draftjs-raw-parser
```

or

```bash
yarn add draftjs-raw-parser
```

## Usage

```jsx
import React from 'react'
import { ParsedData } from 'draftjs-raw-parser'
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
      {/* Parsed Data */}
      <div style={{ border: '1px solid' }}>
        <ParsedData
          rawContent={JSON.stringify(postRawContent)}
          color='#0066ff'
          fontSize='20px'
        />
      </div>
    </Fragment>
  )
}

export default App
```

## License

MIT © [aadityarajkumawat](https://github.com/aadityarajkumawat)
