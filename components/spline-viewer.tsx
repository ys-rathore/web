"use client"

import type React from "react"
import { useEffect, useRef } from "react"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": SplineViewerProps
    }
  }
}

interface SplineViewerProps {
  url: string
  "loading-anim-type"?: string
  style?: React.CSSProperties
}

export default function SplineViewer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scriptLoaded = useRef(false)

  useEffect(() => {
    if (scriptLoaded.current) return

    const script = document.createElement("script")
    script.type = "module"
    script.src = "https://unpkg.com/@splinetool/viewer@1.10.90/build/spline-viewer.js"
    script.async = true
    document.head.appendChild(script)
    scriptLoaded.current = true

    const removeWatermark = () => {
      try {
        const splineViewer = document.querySelector("spline-viewer") as any
        if (splineViewer?.shadowRoot) {
          const shadowElements = splineViewer.shadowRoot.querySelectorAll(
            "[class*='watermark'], [class*='logo'], [class*='branding']",
          )
          shadowElements.forEach((el: any) => {
            el.style.display = "none"
          })
        }
      } catch (e) {
        // Silent fail
      }
    }

    // Run removal after viewer loads
    setTimeout(removeWatermark, 1000)
    setTimeout(removeWatermark, 2000)

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="w-full h-screen relative overflow-hidden">
      <spline-viewer
        url="https://prod.spline.design/nvSwDpk1ogJtgZO8/scene.splinecode"
        loading-anim-type="none"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      />

      <div
        className="fixed bottom-0 left-0 right-0 z-20 pointer-events-none"
        style={{
          height: "90px",
          background: "#000000",
        }}
      />

      {/* Navigation buttons */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex gap-3 mt-32">
        <a
          href="https://ysrathore.space/home"
          className="px-4 py-2 rounded-full font-bold text-black backdrop-blur-md bg-white/40 hover:bg-white/50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm tracking-wide"
        >
          HOME
        </a>
        <a
          href="https://ysrathore.space/about"
          className="px-4 py-2 rounded-full font-bold text-black backdrop-blur-md bg-white/40 hover:bg-white/50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm tracking-wide"
        >
          ABOUT
        </a>
      </div>
    </div>
  )
}
