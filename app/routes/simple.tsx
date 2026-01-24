import { SimpleEditor } from "~/components/tiptap-templates/simple/simple-editor"
import content from "~/components/tiptap-templates/simple/data/content.json"
import type { Content } from "@tiptap/core"
import { useState } from "react"
import { CellSelection } from "@tiptap/pm/tables"

export default function Page() {
  const [contentState, setContentState] = useState<Content>(content as Content)


  const handleContentChange = (data: Content) => {
    setContentState(data)
  }

  return (
    <div className="flex justify-center items-start w-full p-6 bg-gray-50 min-h-screen">
      <div className="flex w-full max-w-6xl gap-6" style={{ maxHeight: '90vh' }}>
        {/* LEFT PANEL */}
        <div className="w-1/2 p-4 bg-white rounded-lg shadow-sm border border-gray-200 overflow-auto">
          <h2 className="text-lg font-semibold mb-3">Editor Output (JSON)</h2>
          <pre className="text-sm font-mono text-gray-700 whitespace-pre-wrap">
            {JSON.stringify(contentState, null, 2)}
          </pre>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-1/2 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-3">Editor</h2>
          <SimpleEditor data={content as Content} onChange={handleContentChange} />
        </div>
      </div>
    </div>
  )
}
