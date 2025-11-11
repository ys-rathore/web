"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

export default function IntroScene() {
  const groupRef = useRef<THREE.Group>(null)
  const helicopterRef = useRef<THREE.Group>(null)
  const droneRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001
    }

    if (helicopterRef.current) {
      const t = clock.getElapsedTime() * 0.3
      helicopterRef.current.position.x = Math.cos(t) * 5
      helicopterRef.current.position.z = Math.sin(t) * 4
      helicopterRef.current.position.y = Math.sin(t * 0.7) * 1.5
      helicopterRef.current.rotation.y = t
    }

    if (droneRef.current) {
      const t = clock.getElapsedTime() * 0.4
      droneRef.current.position.x = Math.sin(t * 1.5) * 4
      droneRef.current.position.z = Math.cos(t * 1.5) * 3
      droneRef.current.position.y = Math.cos(t * 0.5) * 2 - 1
      droneRef.current.rotation.z = Math.sin(t * 0.8) * 0.3
    }
  })

  return (
    <group ref={groupRef}>
      <group ref={helicopterRef} position={[-3, 2, -4]}>
        {/* Main body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.6, 0.3, 1.2]} />
          <meshStandardMaterial color="#0066ff" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Cockpit */}
        <mesh position={[0, 0.2, 0.2]}>
          <sphereGeometry args={[0.25, 8, 8]} />
          <meshStandardMaterial color="#00ccff" emissive="#00ccff" emissiveIntensity={0.3} />
        </mesh>

        {/* Rotor blades */}
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[1.6, 0.05, 0.1]} />
          <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.5} />
        </mesh>
      </group>

      <group ref={droneRef} position={[3, 1, -3]}>
        {/* Central body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.4} />
        </mesh>

        {/* AI core - glowing center */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={0.8} />
        </mesh>

        {/* Propeller arms */}
        <mesh position={[0.4, 0.2, 0]}>
          <boxGeometry args={[0.15, 0.1, 0.3]} />
          <meshStandardMaterial color="#00d9ff" emissive="#00d9ff" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[-0.4, 0.2, 0]}>
          <boxGeometry args={[0.15, 0.1, 0.3]} />
          <meshStandardMaterial color="#00d9ff" emissive="#00d9ff" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </group>
  )
}
