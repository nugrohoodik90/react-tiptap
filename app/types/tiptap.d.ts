import '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    mathBlock: {
      setMathBlock: (latex: string) => ReturnType
      setInlineMath: (latex: string) => ReturnType
    }
  }
}
