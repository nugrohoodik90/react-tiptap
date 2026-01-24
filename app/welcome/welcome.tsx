// TiptapTableEditor.tsx
import './style.scss'
import { EditorContent } from '@tiptap/react'
import { useTiptapTable } from './usetiptap-table'

export const TiptapTableEditor = () => {
  const { editor, actions } = useTiptapTable()

  if (!editor) return null

  return (
    <>
      <div className="control-group">
        <div className="button-group">
          <button onClick={actions.insertTable}>Insert table</button>
          <button onClick={actions.addColumnBefore}>Add column before</button>
          <button onClick={actions.addColumnAfter}>Add column after</button>
          <button onClick={actions.deleteColumn}>Delete column</button>
          <button onClick={actions.addRowBefore}>Add row before</button>
          <button onClick={actions.addRowAfter}>Add row after</button>
          <button onClick={actions.deleteRow}>Delete row</button>
          <button onClick={actions.deleteTable}>Delete table</button>
          <button onClick={actions.mergeCells}>Merge cells</button>
          <button onClick={actions.splitCell}>Split cell</button>
          <button onClick={actions.toggleHeaderColumn}>Toggle header column</button>
          <button onClick={actions.toggleHeaderRow}>Toggle header row</button>
          <button onClick={actions.toggleHeaderCell}>Toggle header cell</button>
          <button onClick={actions.mergeOrSplit}>Merge or split</button>
          <button onClick={() => actions.setCellAttribute('colspan', 2)}>Set cell attribute</button>
          <button onClick={actions.fixTables}>Fix tables</button>
          <button onClick={actions.goToNextCell}>Go to next cell</button>
          <button onClick={actions.goToPreviousCell}>Go to previous cell</button>
        </div>
      </div>
      <EditorContent editor={editor} />
    </>
  )
}
