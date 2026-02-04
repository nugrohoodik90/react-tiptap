// TiptapTableEditor.tsx
import './style.scss'
import { EditorContent } from '@tiptap/react'
import { useTiptapTable } from './usetiptap-table'

export const TiptapEditor = () => {
  const { editor } = useTiptapTable()

  if (!editor) return null

  return (
    <>
      <EditorContent editor={editor} />
    </>
  )
}
