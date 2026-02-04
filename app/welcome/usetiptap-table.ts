import { useCurrentEditor, Editor } from '@tiptap/react'
import { useCallback } from 'react'

export const useTiptapTable = () => {
  const { editor } = useCurrentEditor()

  const runCommand = useCallback(
    (command: (editor: Editor) => void) => {
      if (!editor) return
      command(editor)
    },
    [editor]
  )

  if (!editor) {
    return { editor: null, actions: {} as any }
  }

  const actions = {
    insertTable: () =>
      runCommand(e =>
        e.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
      ),
    addColumnBefore: () => runCommand(e => e.chain().focus().addColumnBefore().run()),
    addColumnAfter: () => runCommand(e => e.chain().focus().addColumnAfter().run()),
    deleteColumn: () => runCommand(e => e.chain().focus().deleteColumn().run()),
    addRowBefore: () => runCommand(e => e.chain().focus().addRowBefore().run()),
    addRowAfter: () => runCommand(e => e.chain().focus().addRowAfter().run()),
    deleteRow: () => runCommand(e => e.chain().focus().deleteRow().run()),
    deleteTable: () => runCommand(e => e.chain().focus().deleteTable().run()),
    mergeCells: () => runCommand(e => e.chain().focus().mergeCells().run()),
    splitCell: () => runCommand(e => e.chain().focus().splitCell().run()),
    toggleHeaderColumn: () => runCommand(e => e.chain().focus().toggleHeaderColumn().run()),
    toggleHeaderRow: () => runCommand(e => e.chain().focus().toggleHeaderRow().run()),
    toggleHeaderCell: () => runCommand(e => e.chain().focus().toggleHeaderCell().run()),
    mergeOrSplit: () => runCommand(e => e.chain().focus().mergeOrSplit().run()),
    setCellAttribute: (attr: string, value: any) =>
      runCommand(e => e.chain().focus().setCellAttribute(attr, value).run()),
    fixTables: () => runCommand(e => e.chain().focus().fixTables().run()),
    goToNextCell: () => runCommand(e => e.chain().focus().goToNextCell().run()),
    goToPreviousCell: () => runCommand(e => e.chain().focus().goToPreviousCell().run()),
  }

  return { editor, actions }
}
