"use client"

import type React from "react"

import { useState } from "react"

interface CodeBlockFormProps {
  onSubmit: (title: string, language: string, code: string) => void
  onCancel: () => void
}

export default function CodeBlockForm({ onSubmit, onCancel }: CodeBlockFormProps) {
  const [title, setTitle] = useState("")
  const [language, setLanguage] = useState("javascript")
  const [code, setCode] = useState("")

  const languages = ["javascript", "typescript", "python", "react", "html", "css", "sql", "bash"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim() && code.trim()) {
      onSubmit(title, language, code)
      setTitle("")
      setCode("")
      setLanguage("javascript")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border-4 border-amber-700 rounded-lg p-8 mb-8 shadow-lg">
      <div className="space-y-6">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-bold text-amber-950 mb-2">Code Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Custom React Hook"
            className="w-full px-4 py-3 border-2 border-amber-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 bg-amber-50"
            required
          />
        </div>

        {/* Language Select */}
        <div>
          <label className="block text-sm font-bold text-amber-950 mb-2">Programming Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-4 py-3 border-2 border-amber-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 bg-amber-50"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Code Textarea */}
        <div>
          <label className="block text-sm font-bold text-amber-950 mb-2">Code</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste or write your code here..."
            rows={10}
            className="w-full px-4 py-3 border-2 border-amber-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 bg-amber-50 font-mono text-sm"
            required
          />
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors font-bold"
          >
            Save Code
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-bold"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  )
}
