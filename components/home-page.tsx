"use client"

import { useState } from "react"
import CodeBlock from "./code-block"
import CodeBlockForm from "./code-block-form"

interface CodeItem {
  id: string
  title: string
  language: string
  code: string
}

export default function HomePage({ onNavigate }: { onNavigate: (page: "intro" | "home") => void }) {
  const [codeBlocks, setCodeBlocks] = useState<CodeItem[]>([
    {
      id: "1",
      title: "React Hook Example",
      language: "typescript",
      code: `export const useCustomHook = () => {
  const [state, setState] = useState(null);
  
  useEffect(() => {
    // Initialize hook logic
  }, []);
  
  return { state, setState };
};`,
    },
  ])

  const [showForm, setShowForm] = useState(false)

  const addCodeBlock = (title: string, language: string, code: string) => {
    setCodeBlocks([
      ...codeBlocks,
      {
        id: Date.now().toString(),
        title,
        language,
        code,
      },
    ])
    setShowForm(false)
  }

  const deleteCodeBlock = (id: string) => {
    setCodeBlocks(codeBlocks.filter((block) => block.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 p-8">
      {/* Header */}
      <div className="mb-12">
        <button
          onClick={() => onNavigate("intro")}
          className="mb-6 px-4 py-2 bg-amber-700 text-white rounded-full hover:bg-amber-800 transition-colors text-sm font-semibold"
        >
          ← Back to Intro
        </button>

        <h1 className="text-5xl font-bold text-amber-950 mb-2">My Code Repository</h1>
        <p className="text-lg text-amber-800">Store and manage your code snippets</p>
      </div>

      {/* Add Code Block Button */}
      <div className="mb-8">
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-all font-semibold shadow-md"
        >
          {showForm ? "Cancel" : "+ Add Code Block"}
        </button>
      </div>

      {/* Form */}
      {showForm && <CodeBlockForm onSubmit={addCodeBlock} onCancel={() => setShowForm(false)} />}

      {/* Instructions */}
      <div className="mb-8 bg-amber-100 border-2 border-amber-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-amber-950 mb-3">How to Add Code Blocks</h2>
        <ol className="list-decimal list-inside space-y-2 text-amber-900">
          <li>
            Click the <strong>"+ Add Code Block"</strong> button above
          </li>
          <li>Fill in the title, select a programming language</li>
          <li>Paste or write your code in the code editor</li>
          <li>
            Click <strong>"Save Code"</strong> to store your snippet
          </li>
          <li>Use the copy button to quickly copy code to clipboard</li>
          <li>Delete blocks using the delete button when needed</li>
        </ol>
      </div>

      {/* Code Blocks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {codeBlocks.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-2xl text-amber-800 font-semibold">No code blocks yet</p>
            <p className="text-amber-700">Add your first code snippet to get started</p>
          </div>
        ) : (
          codeBlocks.map((block) => <CodeBlock key={block.id} {...block} onDelete={deleteCodeBlock} />)
        )}
      </div>
    </div>
  )
}
