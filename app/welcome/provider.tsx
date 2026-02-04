'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Table, TableCell, TableHeader, TableRow } from '@tiptap/extension-table'
import { TableToolbar } from './toolbar'

import '~/welcome/style.scss'
import Typography from '@tiptap/extension-typography'

export const TiptapEditorProvider = () => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
        class: "simple-editor",
      },
    },
    extensions: [
      StarterKit,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      Typography
    ],
    content: '<p>Hello World!</p>',
    immediatelyRender: false,
  })

  if (!editor) return null

  return (
    <>
      <TableToolbar editor={editor} />
      <EditorContent editor={editor} />
    </>
  )
}
