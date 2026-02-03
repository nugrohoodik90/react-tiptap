import { useEffect, useState, useCallback, useMemo } from "react"
import type { Editor } from "@tiptap/react"
import { CellSelection } from "@tiptap/pm/tables"

interface TableState {
  isInTable: boolean
  isCellSelection: boolean
  isGapCursor: boolean
  canInsertTable: boolean
  canMergeCells: boolean
  canSplitCell: boolean
}

export function useTable(editor: Editor | null) {
  const [state, setState] = useState<TableState>({
    isInTable: false,
    isCellSelection: false,
    isGapCursor: false,
    canInsertTable: false,
    canMergeCells: false,
    canSplitCell: false,
  })

  const updateTableOutline = useCallback((isInTable: boolean) => {
    if (!editor) return

    const tables = editor.view.dom.querySelectorAll("table") as NodeListOf<HTMLElement>
    tables.forEach(table => table.classList.remove("ProseMirror-selectednode"))

    if (!isInTable) return

    const selection = editor.state.selection
    const { $from } = selection
    const node = $from.node(-1)
    
    if (node?.type.name === "table") {
      try {
        const domNode = editor.view.domAtPos($from.start(-1)).node
        if (domNode instanceof HTMLElement) {
          domNode.classList.add("ProseMirror-selectednode")
        }
      } catch {
        // Gracefully handle DOM position errors
      }
    }
  }, [editor])

  const updateState = useCallback(() => {
    if (!editor) return

    const selection = editor.state.selection
    const isCellSelection = selection instanceof CellSelection
    const isGapCursor = selection.constructor.name === "GapCursorSelection"

    const isNextToTable = (() => {
      try {
        const { $from } = selection
        return $from.nodeBefore?.type.name === "table" || $from.nodeAfter?.type.name === "table"
      } catch {
        return false
      }
    })()

    const isInTable = editor.isActive("table") || isCellSelection || (isGapCursor && isNextToTable)

    const canInsertTable = editor.can().insertTable({ rows: 1, cols: 1 })
    const canMergeCells = (() => {
      try {
        return (
          isCellSelection &&
          selection.ranges.some(range => range.$from.pos !== range.$to.pos) &&
          editor.can().mergeCells()
        )
      } catch {
        return false
      }
    })()
    
    const canSplitCell = isCellSelection && editor.can().splitCell()

    const newState: TableState = {
      isInTable,
      isCellSelection,
      isGapCursor,
      canInsertTable,
      canMergeCells,
      canSplitCell,
    }

    setState(prevState => {
      const hasChanged = 
        prevState.isInTable !== newState.isInTable ||
        prevState.isCellSelection !== newState.isCellSelection ||
        prevState.isGapCursor !== newState.isGapCursor ||
        prevState.canInsertTable !== newState.canInsertTable ||
        prevState.canMergeCells !== newState.canMergeCells ||
        prevState.canSplitCell !== newState.canSplitCell
      
      return hasChanged ? newState : prevState
    })

    updateTableOutline(isInTable)
  }, [editor, updateTableOutline])

  useEffect(() => {
    if (!editor) return

    const handleTransaction = () => {
      updateState()
    }

    editor.on('transaction', handleTransaction)
    updateState()

    return () => {
      editor.off('transaction', handleTransaction)
    }
  }, [editor, updateState])

  const actions = useMemo(() => ({
    insertTable: () => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
    addRow: () => editor?.chain().focus().addRowAfter().run(),
    removeRow: () => editor?.chain().focus().deleteRow().run(),
    addColumn: () => editor?.chain().focus().addColumnAfter().run(),
    removeColumn: () => editor?.chain().focus().deleteColumn().run(),
    toggleMerge: () => {
      if (state.canSplitCell) editor?.chain().focus().splitCell().run()
      else if (state.canMergeCells) editor?.chain().focus().mergeCells().run()
    },
    deleteTable: () => editor?.chain().focus().deleteTable().run(),
  }), [editor, state.canSplitCell, state.canMergeCells])

  return { state, actions }
}
