"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

interface BubbleProps {
  position: [number, number, number]
  radius: number
  color: string
  opacity: number
}

export default function Bubble({ position, radius, color, opacity }: BubbleProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  // Subtle floating animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.001
      meshRef.current.position.x += Math.cos(state.clock.elapsedTime * 0.3) * 0.0005
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={opacity}
        metalness={0.3}
        roughness={0.4}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}
