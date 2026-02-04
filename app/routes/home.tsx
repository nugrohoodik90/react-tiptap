import type { Route } from "./+types/home";
import { TiptapEditorProvider } from "~/welcome/provider";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="flex justify-center items-start w-full p-6 bg-gray-50 min-h-screen">
      <div className="flex w-full max-w-8xl gap-6" style={{ maxHeight: '90vh' }}>
        {/* LEFT PANEL */}
        <div className="w-1/2 p-4 bg-white rounded-lg shadow-sm border border-gray-200 overflow-auto">
          <h2 className="text-lg font-semibold mb-3">Editor Output (JSON)</h2>
          <pre className="text-sm font-mono text-gray-700 whitespace-pre-wrap">
            {JSON.stringify(null, null, 2)}
          </pre>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-1/2 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-3">Editor</h2>
          <TiptapEditorProvider/>
        </div>
      </div>
    </div>
  )
}
