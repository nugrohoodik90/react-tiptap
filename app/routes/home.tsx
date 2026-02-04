import { TiptapEditor } from "~/welcome/welcome";
import type { Route } from "./+types/home";
import { TiptapEditorProvider } from "~/welcome/provider";
import { TableToolbar } from "~/welcome/toolbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <TiptapEditorProvider>
      <TableToolbar />
      <TiptapEditor />
    </TiptapEditorProvider>
  ) 
}
