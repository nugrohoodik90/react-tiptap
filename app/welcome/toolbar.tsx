import type { Editor } from "@tiptap/core"
import { useEditorState } from "@tiptap/react"
import { useTiptap } from "./usetiptap"

export const TableToolbar = ({ editor, onUploadImage }: { editor: Editor | null, onUploadImage: () => void }) => {
  const { actions } = useTiptap({ editor })

  // ⬇️ THIS forces rerender on selection / transaction
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      bold: editor?.isActive('bold'),
      italic: editor?.isActive('italic'),
      underline: editor?.isActive('underline'),
      canUndo: editor?.can().undo(),
      canRedo: editor?.can().redo(),
      align: editor?.getAttributes('paragraph').textAlign,
      superscript: editor?.isActive('superscript'),
      subscript: editor?.isActive('subscript'),
      bulletList: editor?.isActive('bulletList'),
      orderedList: editor?.isActive('orderedList'),
    }),
  })

  if (!editor) return null

  const btn = (active = false) =>
    `tt-btn ${active ? 'is-active' : ''}`

  return (
    <div className="tt-toolbar">
      <button
        className="tt-btn"
        onClick={actions.undo}
        disabled={!editor.can().undo()}
        title="Undo (Ctrl+Z)"
      >
        ↶
      </button>

      <button
        className="tt-btn"
        onClick={actions.redo}
        disabled={!editor.can().redo()}
        title="Redo (Ctrl+Shift+Z)"
      >
        ↷
      </button>
      <span className="divider" />
      <button
        className={btn(editorState?.align === 'left')}
        onClick={actions.alignLeft}
      >
        ⬅
      </button>

      <button
        className={btn(editorState?.align === 'center')}
        onClick={actions.alignCenter}
      >
        ⬍
      </button>

      <button
        className={btn(editorState?.align === 'right')}
        onClick={actions.alignRight}
      >
        ➡
      </button>

      <button
        className={btn(editorState?.align === 'justify')}
        onClick={actions.alignJustify}
      >
        ☰
      </button>
      <span className="divider" />

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
      <button
        className={btn(editorState?.superscript)}
        onClick={actions.superscript}
        title="Superscript"
      >
        X<sup>2</sup>
      </button>

      <button
        className={btn(editorState?.subscript)}
        onClick={actions.subscript}
        title="Subscript"
      >
        X<sub>2</sub>
      </button>
      <span className="divider" />
      <span className="divider" />

      <button
        className={btn(editorState?.bulletList)}
        onClick={actions.bulletList}
        title="Bullet List"
      >
        ••
      </button>

      <button
        className={btn(editorState?.orderedList)}
        onClick={actions.orderedList}
        title="Ordered List"
      >
        1.
      </button>
      <span className="divider" />

      <button className="tt-btn" onClick={actions.insertTable}>Table</button>
      <button className="tt-btn" onClick={actions.addColumnAfter}>Col +</button>
      <button className="tt-btn" onClick={actions.addRowAfter}>Row +</button>
      <button className="tt-btn" onClick={actions.deleteColumn}>Col -</button>
      <button className="tt-btn" onClick={actions.deleteRow}>Row -</button>
      <button className="tt-btn" onClick={actions.mergeCells}>Merge</button>
      <button className="tt-btn" onClick={actions.splitCell}>Splite</button>
      <button className="tt-btn danger" onClick={actions.deleteTable}>Delete Table</button>
      <button type="button" onClick={onUploadImage}>
        Upload Image
      </button>
    </div>
  )
}
