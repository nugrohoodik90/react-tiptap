import { useEffect, useState, useCallback } from "react"
import type { Editor } from "@tiptap/react"
import { CellSelection } from "@tiptap/pm/tables"

export function useTable(editor: Editor | null) {
  const [state, setState] = useState({
    isInTable: false,
    isCellSelection: false,
    isGapCursor: false,
    canInsertTable: false,
    canMergeCells: false,
    canSplitCell: false,
  })

  const updateState = useCallback(() => {
    if (!editor) return

    const selection = editor.state.selection
    const isCellSelection = selection instanceof CellSelection
    const isGapCursor = selection.constructor.name === "GapCursorSelection"

    const isNextToTable = (): boolean => {
      const { $from } = selection
      return $from.nodeBefore?.type.name === "table" || $from.nodeAfter?.type.name === "table"
    }

    const isInTable = editor.isActive("table") || isCellSelection || (isGapCursor && isNextToTable())

    const canInsertTable = editor.can().insertTable({ rows: 1, cols: 1 })
    const canMergeCells =
      isCellSelection &&
      selection.ranges.some(range => range.$from.pos !== range.$to.pos) &&
      editor.can().mergeCells()
    const canSplitCell = isCellSelection && editor.can().splitCell()

    setState({
      isInTable,
      isCellSelection,
      isGapCursor,
      canInsertTable,
      canMergeCells,
      canSplitCell,
    })

    // ---- update table outline ----
    const tables = Array.from(editor.view.dom.querySelectorAll("table"))
    tables.forEach(table => table.classList.remove("ProseMirror-selectednode"))

    if (isInTable) {
      const { $from } = selection
      const node = $from.node(-1)
      if (node?.type.name === "table") {
        const domTable = editor.view.domAtPos($from.start(-1)).node
        if (domTable instanceof HTMLElement) {
          domTable.classList.add("ProseMirror-selectednode")
        }
      }
    }
  }, [editor])

  useEffect(() => {
    if (!editor) return
    let rafId: number

    const tick = () => {
      updateState()
      rafId = requestAnimationFrame(tick)
    }
    tick()

    return () => cancelAnimationFrame(rafId)
  }, [editor, updateState])

  const actions = {
    insertTable: () => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
    addRow: () => editor?.chain().focus().addRowAfter().run(),
    removeRow: () => editor?.chain().focus().deleteRow().run(),
    addColumn: () => editor?.chain().focus().addColumnAfter().run(),
    removeColumn: () => editor?.chain().focus().deleteColumn().run(),
    toggleMerge: () => {
      // use current state values
      if (state.canSplitCell) editor?.chain().focus().splitCell().run()
      else if (state.canMergeCells) editor?.chain().focus().mergeCells().run()
    },
    deleteTable: () => editor?.chain().focus().deleteTable().run(),
  }

  return { state, actions }
}
