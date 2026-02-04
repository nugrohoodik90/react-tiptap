'use client'

import { useTiptapTable } from './usetiptap-table'

export const TableToolbar = () => {
  const { editor, actions } = useTiptapTable()

  if (!editor) return null

  return (
    <div className="control-group">
      <div className="button-group">
        <button onClick={actions.insertTable}>Insert table</button>
        <button onClick={actions.addColumnBefore}>Col before</button>
        <button onClick={actions.addColumnAfter}>Col after</button>
        <button onClick={actions.deleteColumn}>Delete col</button>

        <button onClick={actions.addRowBefore}>Row before</button>
        <button onClick={actions.addRowAfter}>Row after</button>
        <button onClick={actions.deleteRow}>Delete row</button>

        <button onClick={actions.mergeCells}>Merge</button>
        <button onClick={actions.splitCell}>Split</button>
        <button onClick={actions.mergeOrSplit}>Merge / Split</button>

        <button onClick={actions.toggleHeaderRow}>Header row</button>
        <button onClick={actions.toggleHeaderColumn}>Header col</button>

        <button onClick={actions.deleteTable}>Delete table</button>
      </div>
    </div>
  )
}
