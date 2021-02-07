import * as React from 'react'
import { parseJsonStringToContent } from './draftjsJsonParser'
import {
  convertFromRaw,
  convertToRaw,
  Editor,
  EditorState,
  RichUtils
} from 'draft-js'
import { useStore } from './zustand/store'

interface Props {}

interface EditorProps {}

export const ParsedData: React.FC<Props> = () => {
  const content = useStore((s) => s.content)
  const [s, setS] = React.useState<string>('[]')
  React.useEffect(() => {
    setS(content)
  }, [content])

  return <div>{parseJsonStringToContent(s)}</div>
}

export const EditorOnSteroids: React.FC<EditorProps> = () => {
  let k
  if (window.localStorage.getItem('content')) {
    k = EditorState.createWithContent(
      // @ts-ignore
      convertFromRaw(JSON.parse(window.localStorage.getItem('content')))
    )
  } else {
    k = EditorState.createEmpty()
  }
  const [editorState, setEditorState] = React.useState<EditorState>(k)
  const setContent = useStore((s) => s.setContent)

  const currentBlockKey = editorState.getSelection().getStartKey()
  const currentBlockIndex = editorState
    .getCurrentContent()
    .getBlockMap()
    .keySeq()
    .findIndex((k) => k === currentBlockKey)

  const handleKeyCommand = (command: any, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)

    if (newState) {
      setEditorState(newState)
      return 'handled'
    }

    return 'not-handled'
  }

  const setEditorStateS = (editorState: EditorState) => {
    const contentState = editorState.getCurrentContent()
    window.localStorage.setItem(
      'content',
      JSON.stringify(convertToRaw(contentState))
    )
    console.log(convertToRaw(contentState).blocks, currentBlockIndex)
    setContent(JSON.stringify(convertToRaw(contentState).blocks))
    let s = convertToRaw(contentState).blocks
    console.log(s[1].text)
    s[1].text = 'df'
    setEditorState(editorState)
  }

  const uploadImg = () => {}

  return (
    <React.Fragment>
      <button style={{ marginBottom: '30px' }} onClick={uploadImg}>
        Add Image
      </button>
      <div style={{ border: '1px solid black' }}>
        <Editor
          editorState={editorState}
          onChange={setEditorStateS}
          handleKeyCommand={handleKeyCommand}
          placeholder='Content'
        />
      </div>
    </React.Fragment>
  )
}
