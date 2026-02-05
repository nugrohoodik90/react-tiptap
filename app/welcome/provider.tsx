'use client'

import { EditorContent, useEditor, type Content } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Table, TableCell, TableHeader, TableRow } from '@tiptap/extension-table'
import { TableToolbar } from './toolbar'

import '~/welcome/style.scss'
import Typography from '@tiptap/extension-typography'
import TextAlign from '@tiptap/extension-text-align'
import Superscript from '@tiptap/extension-superscript'
import Subscript from '@tiptap/extension-subscript'
import type { FC } from 'react'
import UniqueID from '@tiptap/extension-unique-id'
import { Gapcursor } from '@tiptap/extensions'
import { BulletList, ListItem, OrderedList } from '@tiptap/extension-list'

export const TiptapEditorProvider: FC<{ data: Content; onChange?: (content: Content) => void }> = ({ data, onChange }) => {
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
      StarterKit.configure({
        orderedList: false,
        bulletList: false,
        listItem: false,
      }),

      OrderedList.configure({
        keepMarks: true,
        keepAttributes: false,
      }),

      BulletList.configure({
        keepMarks: true,
        keepAttributes: false,
      }),

      ListItem,

      Superscript,
      Subscript,
      Gapcursor,

      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,

      TextAlign.configure({
        types: ['heading', 'paragraph'], // ⚠️ jangan listItem
      }),

      UniqueID.configure({
        types: [
          'heading',
          'paragraph',
          'orderedList',
          'bulletList',
          'listItem',
          'table',
          'tableRow',
          'tableCell',
        ],
      }),

      Typography,
    ]
    ,
    content: data ?? '<p>Hello World!</p>',
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getJSON())
    },
  })

  if (!editor) return null

  return (
    <>
      <TableToolbar editor={editor} />
      <EditorContent editor={editor} />
    </>
  )
}
