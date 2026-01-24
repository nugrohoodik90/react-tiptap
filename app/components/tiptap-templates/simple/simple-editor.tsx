"use client"

import { useEffect, useRef, useState, type FC } from "react"
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
// --- UI Primitives ---
import {
  Toolbar,
} from "~/components/tiptap-ui-primitive/toolbar"

// --- Tiptap Node ---
import { ImageUploadNode } from "~/components/tiptap-node/image-upload-node/image-upload-node-extension"
import { HorizontalRule } from "~/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension"
import "~/components/tiptap-node/blockquote-node/blockquote-node.scss"
import "~/components/tiptap-node/code-block-node/code-block-node.scss"
import "~/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss"
import "~/components/tiptap-node/list-node/list-node.scss"
import "~/components/tiptap-node/image-node/image-node.scss"
import "~/components/tiptap-node/heading-node/heading-node.scss"
import "~/components/tiptap-node/paragraph-node/paragraph-node.scss"
import "~/components/tiptap-node/table-node/table-node.scss"


// --- Tiptap UI ---

// --- Icons ---

// --- Hooks ---
import { useIsBreakpoint } from "~/hooks/use-is-breakpoint"
import { useWindowSize } from "~/hooks/use-window-size"
import { useCursorVisibility } from "~/hooks/use-cursor-visibility"

// --- Components ---

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "~/lib/tiptap-utils"

// --- Styles ---
import { MainToolbarContent, MobileToolbarContent } from "./simple-toolbar"
import { CellSelection } from "@tiptap/pm/tables"



export const SimpleEditor: FC<{ data: Content, onChange?: (content: Content) => void }> = ({ data, onChange }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isMobile = useIsBreakpoint()
  const { height } = useWindowSize()
  const [mobileView, setMobileView] = useState<"main" | "highlighter" | "link">(
    "main"
  )
  const toolbarRef = useRef<HTMLDivElement>(null)

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
        link: {
          openOnClick: false,
          enableClickSelection: true,
        },
      }),
      HorizontalRule,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      TableKit.configure({
        table: { resizable: true },
      }),
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
    ],
    content: data ?? { type: "doc", content: [{ type: "paragraph" }] },
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      onChange?.(json);
    }
  })

  const rect = useCursorVisibility({
    editor: editor ?? null,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  })

  useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main")
    }
  }, [isMobile, mobileView])

  if (!mounted || !editor) {
    return null
  }

  console.log(
    "selection type:",
    editor?.state.selection.constructor.name,
    editor?.state.selection instanceof CellSelection
  )

  return (
    <div className="simple-editor-wrapper">
      <EditorContext.Provider value={{ editor }}>
        <Toolbar
          ref={toolbarRef}
          style={{
            ...(isMobile
              ? {
                bottom: `calc(100% - ${height - rect.y}px)`,
              }
              : {}),
          }}
        >
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

        <EditorContent
          editor={editor}
          role="presentation"
          className="simple-editor-content"
        />
      </EditorContext.Provider>
    </div>
  )
}
