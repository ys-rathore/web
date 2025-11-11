"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei"
import { Suspense } from "react"
import BubbleGroup from "./bubbles/bubble-group"
import RotatingStats from "./stats/rotating-stats"

export default function Scene3D() {
  return (
    <Canvas className="w-full h-screen">
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />

      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, 10]} intensity={0.4} />

      {/* Environment */}
      <Environment preset="studio" />

      {/* 3D Content */}
      <Suspense fallback={null}>
        {/* Main bubble group - center composition */}
        <BubbleGroup />

        {/* Rotating stats element - positioned to avoid clipping */}
        <RotatingStats />
      </Suspense>

      {/* Controls */}
      <OrbitControls enableZoom={true} enablePan={true} autoRotate={false} />
    </Canvas>
  )
}
