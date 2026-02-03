"use client"

import { Button } from "~/components/tiptap-ui-primitive/button"
import { Spacer } from "~/components/tiptap-ui-primitive/spacer"
import {
	ToolbarGroup,
	ToolbarSeparator,
} from "~/components/tiptap-ui-primitive/toolbar"

// --- Tiptap UI ---
import { ImageUploadButton } from "~/components/tiptap-ui/image-upload-button"
import { ListDropdownMenu } from "~/components/tiptap-ui/list-dropdown-menu"
import {
	ColorHighlightPopoverContent,
} from "~/components/tiptap-ui/color-highlight-popover"
import {
	LinkContent,
} from "~/components/tiptap-ui/link-popover"
import { MarkButton } from "~/components/tiptap-ui/mark-button"
import { UndoRedoButton } from "~/components/tiptap-ui/undo-redo-button"

// --- Icons ---
import { ArrowLeftIcon } from "~/components/tiptap-icons/arrow-left-icon"
import { HighlighterIcon } from "~/components/tiptap-icons/highlighter-icon"
import { LinkIcon } from "~/components/tiptap-icons/link-icon"

// --- Components ---
// --- Styles ---
import "~/components/tiptap-templates/simple/simple-editor.scss"
import type { Editor } from "@tiptap/react"
import { TextAlignButton } from "~/components/tiptap-ui/text-align-button"

export const MainToolbarContent = ({
	editor,
	isMobile,
}: {
	onHighlighterClick: () => void
	onLinkClick: () => void
	editor: Editor | null
	isMobile: boolean
}) => {
	return (
		<>
			<Spacer />

			<ToolbarGroup>
				<UndoRedoButton action="undo" />
				<UndoRedoButton action="redo" />
			</ToolbarGroup>

			<ToolbarSeparator />

			<ToolbarGroup>
				{/* <HeadingDropdownMenu levels={[1, 2, 3, 4]} portal={isMobile} /> */}
				<ListDropdownMenu
					types={["bulletList", "orderedList"]}
					portal={isMobile}
				/>
				{/* <BlockquoteButton />
        <CodeBlockButton /> */}
			</ToolbarGroup>

			<ToolbarSeparator />

			<ToolbarGroup>
				<MarkButton type="bold" />
				<MarkButton type="italic" />
				{/* <MarkButton type="strike" />
        <MarkButton type="code" /> */}
				<MarkButton type="underline" />
				{/* {!isMobile ? (
          <ColorHighlightPopover />
        ) : (
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        )}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />} */}
			</ToolbarGroup>

			<ToolbarSeparator />

			<ToolbarGroup>
				<MarkButton type="superscript" />
				<MarkButton type="subscript" />
			</ToolbarGroup>

			<ToolbarSeparator />

			<ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>  

      <ToolbarSeparator />

			<ToolbarGroup>
				<ImageUploadButton text="Add" />
			</ToolbarGroup>

			<Spacer />

			{isMobile && <ToolbarSeparator />}
		</>
	)
}

export const MobileToolbarContent = ({
	type,
	onBack,
}: {
	type: "highlighter" | "link"
	onBack: () => void
}) => (
	<>
		<ToolbarGroup>
			<Button data-style="ghost" onClick={onBack}>
				<ArrowLeftIcon className="tiptap-button-icon" />
				{type === "highlighter" ? (
					<HighlighterIcon className="tiptap-button-icon" />
				) : (
					<LinkIcon className="tiptap-button-icon" />
				)}
			</Button>
		</ToolbarGroup>

		<ToolbarSeparator />

		{type === "highlighter" ? (
			<ColorHighlightPopoverContent />
		) : (
			<LinkContent />
		)}
	</>
)