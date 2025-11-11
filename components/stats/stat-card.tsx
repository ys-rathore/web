"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import type * as THREE from "three"

interface StatCardProps {
  stat: {
    label: string
    value: string
    icon: string
  }
}

export default function StatCard({ stat }: StatCardProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  // Subtle hover-like animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <group>
      {/* Background card mesh */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 0.8, 0.1]} />
        <meshStandardMaterial
          color="#1f2937"
          metalness={0.5}
          roughness={0.5}
          emissive="#374151"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* HTML content - positioned in front of mesh */}
      <Html position={[0, 0, 0.1]} scale={0.5} distanceFactor={1} occlude="blurred">
        <div className="w-48 bg-slate-800 rounded-lg p-4 text-center border border-slate-700 shadow-lg">
          <div className="text-2xl mb-2">{stat.icon}</div>
          <div className="text-sm text-slate-400 mb-1">{stat.label}</div>
          <div className="text-xl font-bold text-white">{stat.value}</div>
        </div>
      </Html>
    </group>
  )
}
