import { memo } from "react"

type SvgProps = React.ComponentPropsWithoutRef<"svg">

export const TableColumnAddIcon = memo(({ className, ...props }: SvgProps) => {
  return (
    <svg
      width="24"
      height="24"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M4 4h16v16H4z" />
      <path d="M9 4v16" />
      <path d="M14 4v16" />
      <path d="M11 12h6" />
      <path d="M14 9v6" />
    </svg>
  )
})

TableColumnAddIcon.displayName = "TableColumnAddIcon"
