"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"
import Bubble from "./bubble"

const BUBBLE_CONFIG = {
  // Main center bubble - DECREASED SIZE for original appearance
  center: {
    position: [0, 0, 0] as [number, number, number],
    radius: 1.2, // Reduced from ~2.0 to match original
    color: "#6366f1",
    opacity: 0.8,
  },
  // Surrounding smaller bubbles
  surrounding: [
    {
      position: [2.5, 1.5, 0.5] as [number, number, number],
      radius: 0.6,
      color: "#ec4899",
      opacity: 0.7,
    },
    {
      position: [-2.5, 1.5, 0.5] as [number, number, number],
      radius: 0.6,
      color: "#f59e0b",
      opacity: 0.7,
    },
    {
      position: [1.5, -2, 0.8] as [number, number, number],
      radius: 0.5,
      color: "#10b981",
      opacity: 0.7,
    },
    {
      position: [-1.5, -2, 0.8] as [number, number, number],
      radius: 0.5,
      color: "#06b6d4",
      opacity: 0.7,
    },
    {
      position: [0, 2.5, -0.5] as [number, number, number],
      radius: 0.55,
      color: "#8b5cf6",
      opacity: 0.7,
    },
  ],
}

export default function BubbleGroup() {
  const groupRef = useRef<THREE.Group>(null)

  // Gentle rotation animation
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0005
      groupRef.current.rotation.x += 0.0002
    }
  })

  return (
    <group ref={groupRef}>
      {/* Center bubble */}
      <Bubble
        position={BUBBLE_CONFIG.center.position}
        radius={BUBBLE_CONFIG.center.radius}
        color={BUBBLE_CONFIG.center.color}
        opacity={BUBBLE_CONFIG.center.opacity}
      />

      {/* Surrounding bubbles */}
      {BUBBLE_CONFIG.surrounding.map((bubble, index) => (
        <Bubble
          key={index}
          position={bubble.position}
          radius={bubble.radius}
          color={bubble.color}
          opacity={bubble.opacity}
        />
      ))}
    </group>
  )
}
