"use client"

import { useState } from "react"
import IntroPage from "@/components/intro-page"
import HomePage from "@/components/home-page"

export default function Page() {
  const [currentPage, setCurrentPage] = useState<"intro" | "home">("intro")

  return (
    <div className="w-full h-screen">
      {currentPage === "intro" && <IntroPage onNavigate={setCurrentPage} />}
      {currentPage === "home" && <HomePage onNavigate={setCurrentPage} />}
    </div>
  )
}
