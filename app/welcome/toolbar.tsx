import type { Editor } from "@tiptap/core"
import { useEditorState } from "@tiptap/react"
import { useTiptapTable } from "./usetiptap-table"

export const TableToolbar = ({ editor }: { editor: Editor | null }) => {
  const { actions } = useTiptapTable({ editor })

  // ⬇️ THIS forces rerender on selection / transaction
  const editorState = useEditorState({
    editor,
    selector: ctx => ({
      bold: ctx?.editor?.isActive('bold'),
      italic: ctx?.editor?.isActive('italic'),
      underline: ctx?.editor?.isActive('underline'),
    }),
  })

  if (!editor) return null

  const btn = (active = false) =>
    `tt-btn ${active ? 'is-active' : ''}`

  return (
    <div className="tt-toolbar">
      <button className={btn(editorState?.bold)} onClick={actions.bold}>
        <b>B</b>
      </button>

      <button className={btn(editorState?.italic)} onClick={actions.italic}>
        <i>I</i>
      </button>

      <button className={btn(editorState?.underline)} onClick={actions.underline}>
        <u>U</u>
      </button>

      <span className="divider" />

      <button className="tt-btn" onClick={actions.insertTable}>Table</button>
      <button className="tt-btn" onClick={actions.addColumnBefore}>Col −</button>
      <button className="tt-btn" onClick={actions.addColumnAfter}>Col +</button>
      <button className="tt-btn" onClick={actions.addRowBefore}>Row −</button>
      <button className="tt-btn" onClick={actions.addRowAfter}>Row +</button>
      <button className="tt-btn danger" onClick={actions.deleteTable}>Delete</button>
    </div>
  )
}
