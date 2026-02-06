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
import DragHandle from '@tiptap/extension-drag-handle'
import { BulletList, ListItem, OrderedList } from '@tiptap/extension-list'
import { Image } from "@tiptap/extension-image"
import { uploadImage } from './lib/upload-image'

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
        horizontalRule: false,
        link: { openOnClick: false, enableClickSelection: false },
      }),
      OrderedList.configure({
        keepMarks: true,
        keepAttributes: false,
      }),
      BulletList.configure({
        keepMarks: true,
        keepAttributes: false,
      }),
      DragHandle.configure({
        render: () => {
          const el = document.createElement('div')
          el.className = 'drag-handle'
          el.innerHTML = '⋮⋮'

          const wrapper = document.createElement('div')
          wrapper.appendChild(el)


          return wrapper
        },
      }),
      Image.configure({
        inline: false,
        allowBase64: false,
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
        types: ['heading', 'paragraph'],
        defaultAlignment: 'left',
        alignments: ['left', 'center', 'right', 'justify'],
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

  const handleUploadImage = async () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'

  input.onchange = async () => {
    const file = input.files?.[0]
    if (!file) return

    const url = await uploadImage(file)

    editor?.chain().focus().setImage({ src: url, width: 400, height: 300, alt: 'image', title: 'test' }).run()
  }

  input.click()
}

  if (!editor) return null

  return (
    <div>
      <TableToolbar editor={editor} onUploadImage={handleUploadImage}/>
      <EditorContent editor={editor} />
    </div>
  )
}
