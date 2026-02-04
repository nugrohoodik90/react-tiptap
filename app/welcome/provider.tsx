'use client'

import { EditorProvider } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {Table, TableCell, TableHeader, TableRow} from '@tiptap/extension-table'

export const TiptapEditorProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <EditorProvider
      extensions={[
        StarterKit,
        Table.configure({
          resizable: true,
        }),
        TableRow,
        TableHeader,
        TableCell,
      ]}
      content=""
      immediatelyRender={false}
    >
      {children}
    </EditorProvider>
  )
}
