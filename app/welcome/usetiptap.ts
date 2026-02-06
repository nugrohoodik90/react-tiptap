import { Editor } from '@tiptap/react'
import { useCallback } from 'react'

interface Actions {
  bold: () => void
  italic: () => void
  underline: () => void
  undo: () => void
  redo: () => void
  superscript: () => void
  subscript: () => void
  bulletList: () => void
  orderedList: () => void
  alignLeft: () => void
  alignCenter: () => void
  alignRight: () => void
  alignJustify: () => void
  insertTable: () => void
  addColumnBefore: () => void
  addColumnAfter: () => void
  deleteColumn: () => void
  addRowBefore: () => void
  addRowAfter: () => void
  deleteRow: () => void
  deleteTable: () => void
  mergeCells: () => void
  splitCell: () => void
  mergeOrSplit: () => void
  toggleHeaderColumn: () => void
  toggleHeaderRow: () => void
  toggleHeaderCell: () => void
  fixTables: () => void
  goToNextCell: () => void
  goToPreviousCell: () => void
}
export const useTiptap = ({ editor }: { editor: Editor | null }) => {
  const runCommand = useCallback(
    (command: (editor: Editor) => boolean | void) => {
      if (!editor) return false
      return command(editor)
    },
    [editor]
  )

  if (!editor) {
    return { editor: null, actions: {} as any }
  }

  const actions: Actions = {
    bold: () => runCommand(e => e.chain().focus().toggleBold().run()),
    italic: () => runCommand(e => e.chain().focus().toggleItalic().run()),
    underline: () => runCommand(e => e.chain().focus().toggleUnderline().run()),
    undo: () => runCommand(e => e.chain().focus().undo().run()),
    redo: () => runCommand(e => e.chain().focus().redo().run()),
    superscript: () =>
      runCommand(e =>
        e.chain().focus().unsetSubscript().toggleSuperscript().run()
      ),

    subscript: () =>
      runCommand(e =>
        e.chain().focus().unsetSuperscript().toggleSubscript().run()
      ),

    bulletList: () =>
      runCommand(e =>
        e.chain()
          .focus()
          .toggleBulletList()
          .run()
      ),

    orderedList: () =>
      runCommand(e =>
        e.chain()
          .focus()
          .toggleOrderedList()
          .run()
      ),

    alignLeft: () => runCommand(e => e.chain().focus().setTextAlign('left').run()),
    alignCenter: () => runCommand(e => e.chain().focus().setTextAlign('center').run()),
    alignRight: () => runCommand(e => e.chain().focus().setTextAlign('right').run()),
    alignJustify: () => runCommand(e => e.chain().focus().setTextAlign('justify').run()),

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
    mergeOrSplit: () => runCommand(e => e.chain().focus().mergeOrSplit().run()),
    toggleHeaderColumn: () => runCommand(e => e.chain().focus().toggleHeaderColumn().run()),
    toggleHeaderRow: () => runCommand(e => e.chain().focus().toggleHeaderRow().run()),
    toggleHeaderCell: () => runCommand(e => e.chain().focus().toggleHeaderCell().run()),
    fixTables: () => runCommand(e => e.chain().focus().fixTables().run()),
    goToNextCell: () => runCommand(e => e.chain().focus().goToNextCell().run()),
    goToPreviousCell: () => runCommand(e => e.chain().focus().goToPreviousCell().run()),
  }

  return { editor, actions }
}

