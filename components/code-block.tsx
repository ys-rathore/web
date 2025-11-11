"use client"

import { useState } from "react"
import { Copy, Trash2, Check } from "lucide-react"

interface CodeBlockProps {
  id: string
  title: string
  language: string
  code: string
  onDelete: (id: string) => void
}

export default function CodeBlock({ id, title, language, code, onDelete }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const languageColors: Record<string, string> = {
    javascript: "bg-yellow-200 text-yellow-900",
    typescript: "bg-blue-200 text-blue-900",
    python: "bg-green-200 text-green-900",
    react: "bg-cyan-200 text-cyan-900",
    html: "bg-orange-200 text-orange-900",
    css: "bg-purple-200 text-purple-900",
    sql: "bg-red-200 text-red-900",
    bash: "bg-gray-200 text-gray-900",
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border-4 border-amber-700 hover:shadow-xl transition-shadow">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-700 to-amber-600 p-4">
        <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
        <div
          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${languageColors[language] || "bg-gray-200"}`}
        >
          {language.toUpperCase()}
        </div>
      </div>

      {/* Code Area */}
      <div className="bg-amber-950 p-4 font-mono text-sm text-amber-50 overflow-x-auto max-h-64 relative">
        <pre className="whitespace-pre-wrap break-words">{code}</pre>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 bg-amber-700 hover:bg-amber-600 text-white p-2 rounded transition-colors"
          title="Copy to clipboard"
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
        </button>
      </div>

      {/* Footer */}
      <div className="bg-amber-50 p-4 flex justify-end">
        <button
          onClick={() => onDelete(id)}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors font-semibold"
        >
          <Trash2 size={18} />
          Delete
        </button>
      </div>
    </div>
  )
}
