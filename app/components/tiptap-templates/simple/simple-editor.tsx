"use client"

import { useEffect, useRef, useState, type FC, useMemo } from "react"
import { EditorContent, EditorContext, useEditor, type Content } from "@tiptap/react"

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit"
import { Image } from "@tiptap/extension-image"
import { TaskItem, TaskList } from "@tiptap/extension-list"
import { TextAlign } from "@tiptap/extension-text-align"
import { Typography } from "@tiptap/extension-typography"
import { Highlight } from "@tiptap/extension-highlight"
import { Subscript } from "@tiptap/extension-subscript"
import { Superscript } from "@tiptap/extension-superscript"
import { Gapcursor } from "@tiptap/extensions"
import { TableKit } from "@tiptap/extension-table"
import UniqueID from "@tiptap/extension-unique-id"
import DragHandle from "@tiptap/extension-drag-handle-react"

// --- Custom Nodes ---
import { ImageUploadNode } from "~/components/tiptap-node/image-upload-node/image-upload-node-extension"
import { HorizontalRule } from "~/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension"

// --- Styles ---
import "~/components/tiptap-node/blockquote-node/blockquote-node.scss"
import "~/components/tiptap-node/code-block-node/code-block-node.scss"
import "~/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss"
import "~/components/tiptap-node/list-node/list-node.scss"
import "~/components/tiptap-node/image-node/image-node.scss"
import "~/components/tiptap-node/heading-node/heading-node.scss"
import "~/components/tiptap-node/paragraph-node/paragraph-node.scss"
import "~/components/tiptap-node/table-node/table-node.scss"

// --- UI ---
import { Toolbar } from "~/components/tiptap-ui-primitive/toolbar"
import { MainToolbarContent, MobileToolbarContent } from "./simple-toolbar"

// --- Hooks ---
import { useIsBreakpoint } from "~/hooks/use-is-breakpoint"
import { useWindowSize } from "~/hooks/use-window-size"
import { useCursorVisibility } from "~/hooks/use-cursor-visibility"

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "~/lib/tiptap-utils"

// --- Constants ---
const NESTED_CONFIG = { edgeDetection: { threshold: -16 } }

export const SimpleEditor: FC<{ data: Content; onChange?: (content: Content) => void }> = ({
  data,
  onChange,
}) => {
  const [mounted, setMounted] = useState(false)
  const [nested, setNested] = useState(true)
  const toolbarRef = useRef<HTMLDivElement>(null)

  const isMobile = useIsBreakpoint()
  const { height } = useWindowSize()
  const [mobileView, setMobileView] = useState<"main" | "highlighter" | "link">("main")

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
        class: "simple-editor",
      },
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: { openOnClick: false, enableClickSelection: true },
      }),
      HorizontalRule,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      TableKit.configure({ table: { resizable: true } }),
      Gapcursor,
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
      UniqueID.configure({
        types: [
          "heading",
          "paragraph",
          "image",
          "orderedList",
          "taskItem",
          "table",
          "tableRow",
          "tableCell",
        ],
      }),
    ],
    content: data ?? { type: "doc", content: [{ type: "paragraph" }] },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getJSON())
    },
  })

  // ------------------------
  // Mounted Effect
  // ------------------------
  useEffect(() => setMounted(true), [])

  // ------------------------
  // Mobile View Effect
  // ------------------------
  useEffect(() => {
    if (!isMobile && mobileView !== "main") setMobileView("main")
  }, [isMobile, mobileView])

  // ------------------------
  // Cursor overlay rect
  // ------------------------
  const rect = useCursorVisibility({
    editor: editor ?? null,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  })

  // ------------------------
  // Memoized toolbar style
  // ------------------------
  const toolbarStyle = useMemo(
    () =>
      isMobile
        ? { bottom: `calc(100% - ${height - rect.y}px)` }
        : {},
    [isMobile, height, rect.y]
  )

  if (!mounted || !editor) return null

  // ------------------------
  // Helpers
  // ------------------------
  const toggleEditable = () => editor.setEditable(!editor.isEditable)
  const toggleNested = () => setNested((prev) => !prev)

  return (
    <div className="simple-editor-wrapper">
      <EditorContext.Provider value={{ editor }}>
        <Toolbar ref={toolbarRef} style={toolbarStyle}>
          {mobileView === "main" ? (
            <MainToolbarContent
              onHighlighterClick={() => setMobileView("highlighter")}
              onLinkClick={() => setMobileView("link")}
              isMobile={isMobile}
              editor={editor}
            />
          ) : (
            <MobileToolbarContent
              type={mobileView === "highlighter" ? "highlighter" : "link"}
              onBack={() => setMobileView("main")}
            />
          )}
        </Toolbar>

        <DragHandle editor={editor} nested={nested ? NESTED_CONFIG : false}>
          <div className="custom-drag-handle" />
        </DragHandle>

        <EditorContent editor={editor} role="presentation" className="simple-editor-content" />
      </EditorContext.Provider>
    </div>
  )
}
