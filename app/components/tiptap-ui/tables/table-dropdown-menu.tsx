import { forwardRef, useMemo, useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/tiptap-ui-primitive/dropdown-menu"

import type { Editor } from "@tiptap/react"

import { Button, ButtonGroup } from "~/components/tiptap-ui-primitive/button"
import { Card, CardBody } from "~/components/tiptap-ui-primitive/card"

import { TableActionButton } from "./table-action"
import { useTable } from "./use-tables"

import { TableIcon } from "~/components/tiptap-icons/tables-icon"
import { ChevronDownIcon } from "~/components/tiptap-icons/chevron-down-icon"
import { TableRowAddIcon } from "~/components/tiptap-icons/table-add-row-icon"
import { TableColumnAddIcon } from "~/components/tiptap-icons/table-add-col-icon"
import { TableRowRemoveIcon } from "~/components/tiptap-icons/table-rem-row-icon"
import { TableColumnRemoveIcon } from "~/components/tiptap-icons/table-rem-col-icon"
import { TableMergeCellsIcon } from "~/components/tiptap-icons/table-merge-ixon"
import { TrashIcon } from "~/components/tiptap-icons/trash-icon"

interface TableDropdownMenuProps {
  editor: Editor | null
}

export const TableDropdownMenu = forwardRef<HTMLButtonElement, TableDropdownMenuProps>(
  ({ editor }, ref) => {
    const [isOpen, setIsOpen] = useState(false)

    const { state, actions } = useTable(editor)

    const menuItems = useMemo(
      () => [
        {
          key: "insert",
          label: "Insert table",
          icon: TableIcon,
          disabled: !state.canInsertTable,
          onClick: actions.insertTable,
        },
        {
          key: "addRow",
          label: "Add row",
          icon: TableRowAddIcon,
          disabled: !state.isInTable,
          onClick: actions.addRow,
        },
        {
          key: "removeRow",
          label: "Remove row",
          icon: TableRowRemoveIcon,
          disabled: !state.isInTable,
          onClick: actions.removeRow,
        },
        {
          key: "addColumn",
          label: "Add column",
          icon: TableColumnAddIcon,
          disabled: !state.isInTable,
          onClick: actions.addColumn,
        },
        {
          key: "removeColumn",
          label: "Remove column",
          icon: TableColumnRemoveIcon,
          disabled: !state.isInTable,
          onClick: actions.removeColumn,
        },
        {
          key: "merge",
          label: state.canSplitCell ? "Split cell" : "Merge cells",
          icon: TableMergeCellsIcon,
          disabled: !(state.canMergeCells || state.canSplitCell),
          onClick: actions.toggleMerge,
        },
        {
          key: "delete",
          label: "Delete table",
          icon: TrashIcon,
          disabled: !state.isInTable,
          onClick: actions.deleteTable,
        },
      ],
      [state, actions]
    )

    return (
      <DropdownMenu modal open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            ref={ref}
            type="button"
            data-style="ghost"
            data-active-state={state.isInTable ? "on" : "off"}
            aria-label="Table options"
            tooltip="Table"
          >
            <TableIcon className="tiptap-button-icon" />
            <ChevronDownIcon className="tiptap-button-dropdown-small" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" side="bottom">
          <Card>
            <CardBody>
              <ButtonGroup className="flex-col items-start">
                {menuItems.map((item) => (
                  <DropdownMenuItem
                    key={item.key}
                    asChild
                    disabled={item.disabled}
                  >
                    <TableActionButton
                      icon={item.icon}
                      disabled={item.disabled}
                      onClick={() => {
                        item.onClick()
                        setIsOpen(false) // close menu after action
                      }}
                    >
                      {item.label}
                    </TableActionButton>
                  </DropdownMenuItem>
                ))}
              </ButtonGroup>
            </CardBody>
          </Card>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
)

TableDropdownMenu.displayName = "TableDropdownMenu"
