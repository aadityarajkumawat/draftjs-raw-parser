// const data = [
//   {
//     key: 'a7jup',
//     text:
//       'Note that the Draft library does not currently provide utilities to convert to and from markdown or markup, since different clients may have different requirements for these formats. We instead provide JavaScript objects that can be converted to other formats as needed.',
//     type: 'unstyled',
//     depth: 0,
//     inlineStyleRanges: [{ offset: 37, length: 9, style: 'BOLD' }],
//     entityRanges: [],
//     data: {}
//   },
//   {
//     key: '27uib',
//     text: '',
//     type: 'unstyled',
//     depth: 0,
//     inlineStyleRanges: [],
//     entityRanges: [],
//     data: {}
//   },
//   {
//     key: '4ov0s',
//     text:
//       'Note that the Draft library does not currently provide utilities to convert to and from markdown or markup, since different clients may have different requirements for these formats. We instead provide JavaScript objects that can be converted to other formats as needed.',
//     type: 'unstyled',
//     depth: 0,
//     inlineStyleRanges: [],
//     entityRanges: [],
//     data: {}
//   },
//   {
//     key: '25ke9',
//     text: '',
//     type: 'unstyled',
//     depth: 0,
//     inlineStyleRanges: [],
//     entityRanges: [],
//     data: {}
//   },
//   {
//     key: '78bob',
//     text:
//       'Note that the Draft library does not currently provide utilities to convert to and from markdown or markup, since different clients may have different requirements for these formats. We instead provide JavaScript objects that can be converted to other formats as needed.',
//     type: 'unstyled',
//     depth: 0,
//     inlineStyleRanges: [
//       { offset: 37, length: 9, style: 'BOLD' },
//       { offset: 37, length: 9, style: 'ITALIC' },
//       { offset: 88, length: 8, style: 'ITALIC' }
//     ],
//     entityRanges: [],
//     data: {}
//   }
// ]

const k = [
  {
    key: '4m4b8',
    text:
      'Cool i hope bold works now, this should make the italic also start working, this is italic. ',
    type: 'unstyled',
    depth: 0,
    inlineStyleRanges: [
      { offset: 23, length: 4, style: 'BOLD' },
      { offset: 67, length: 9, style: 'BOLD' },
      { offset: 67, length: 9, style: 'ITALIC' },
      { offset: 84, length: 7, style: 'ITALIC' }
    ],
    entityRanges: [],
    data: {}
  }
]

export const dataS = JSON.stringify(k)
