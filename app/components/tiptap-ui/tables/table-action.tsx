import type { MouseEvent } from "react"
import { Button } from "~/components/tiptap-ui-primitive/button"

type Props = {
  icon?: React.ComponentType<{ className?: string }>
  children: React.ReactNode
  disabled?: boolean
  active?: boolean
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

export function TableActionButton({
  icon: Icon,
  children,
  disabled,
  active,
  onClick,
}: Props) {
  return (
    <Button
      type="button"
      disabled={disabled}
      data-disabled={disabled}
      className={`flex w-full items-center justify-start gap-2 ${
        active ? "merge-active" : ""
      }`}
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        onClick?.(event)
      }}
    >
      {Icon && <Icon className="tiptap-button-icon" />}
      <span className="tiptap-button-text">{children}</span>
    </Button>
  )
}
TableActionButton.displayName = "TableActionButton"