"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"
import StatCard from "./stat-card"

const STATS_CONFIG = {
  // Position stats further away and higher to prevent overlap
  position: [0, -3.5, 0] as [number, number, number],
  // Rotation radius - increased to prevent clipping with bubbles
  radius: 2.2,
  // Number of stat cards
  count: 3,
  // Vertical offset to keep stats visible
  verticalOffset: 0,
}

const STAT_DATA = [
  { label: "Performance", value: "98%", icon: "⚡" },
  { label: "Uptime", value: "99.9%", icon: "✓" },
  { label: "Users", value: "50K+", icon: "👥" },
]

export default function RotatingStats() {
  const groupRef = useRef<THREE.Group>(null)

  // Rotation animation - controlled speed
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.003
    }
  })

  return (
    <group ref={groupRef} position={STATS_CONFIG.position}>
      {STAT_DATA.map((stat, index) => {
        const angle = (index / STAT_DATA.length) * Math.PI * 2
        const x = Math.cos(angle) * STATS_CONFIG.radius
        const z = Math.sin(angle) * STATS_CONFIG.radius

        return (
          <group key={index} position={[x, STATS_CONFIG.verticalOffset, z]} rotation={[0, -angle, 0]}>
            <StatCard stat={stat} />
          </group>
        )
      })}
    </group>
  )
}
