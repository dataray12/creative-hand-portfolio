import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Icosahedron, Torus } from '@react-three/drei'
import * as THREE from 'three'

function Particles({ count = 900 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const siz = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 9
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = (Math.random() - 0.5) * 11
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
      siz[i] = Math.random() * 0.05 + 0.012
    }
    return [pos, siz]
  }, [count])

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.035
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.25
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        sizeAttenuation
        color="#1F4FFF"
        transparent
        opacity={0.35}
        depthWrite={false}
      />
    </points>
  )
}

/** Four interlocking blocks echoing the CHMS puzzle mark. */
function PuzzleCluster() {
  const group = useRef<THREE.Group>(null)
  const { viewport } = useThree()
  const wide = viewport.width > 9
  const scale = wide ? 0.88 : Math.min(1, viewport.width / 9)
  // Keep the cluster clear of the headline on wide screens.
  const offsetX = wide ? viewport.width * 0.26 : 0
  const offsetY = wide ? viewport.height * 0.05 : -viewport.height * 0.12

  useFrame((state, delta) => {
    if (!group.current) return
    group.current.rotation.y += delta * 0.12
    const { x, y } = state.pointer
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y * 0.25, 0.04)
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      offsetX + x * 0.4,
      0.04,
    )
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, offsetY, 0.04)
  })

  const tiles: { pos: [number, number, number]; color: string }[] = [
    { pos: [-0.62, 0.62, 0], color: '#1F4FFF' },
    { pos: [0.62, 0.62, 0], color: '#00B37E' },
    { pos: [-0.62, -0.62, 0], color: '#FF4D4D' },
    { pos: [0.62, -0.62, 0], color: '#F5B50A' },
  ]

  return (
    <group ref={group} scale={scale} position={[offsetX, offsetY, 0]}>
      {tiles.map((t, i) => (
        <Float key={i} speed={1.4} rotationIntensity={0.25} floatIntensity={0.5}>
          <mesh position={t.pos} castShadow>
            <boxGeometry args={[1.06, 1.06, 0.2]} />
            <meshStandardMaterial
              color={t.color}
              roughness={0.35}
              metalness={0.12}
            />
          </mesh>
        </Float>
      ))}
      <Float speed={1} rotationIntensity={0.6} floatIntensity={0.8}>
        <Torus args={[2.6, 0.012, 12, 128]} rotation={[Math.PI / 2.6, 0, 0]}>
          <meshBasicMaterial color="#1F4FFF" transparent opacity={0.4} />
        </Torus>
      </Float>
      <Float speed={0.8} rotationIntensity={0.4} floatIntensity={0.6}>
        <Icosahedron args={[3.4, 1]} position={[0, 0, -3]}>
          <meshBasicMaterial color="#C3CCDC" wireframe transparent opacity={0.6} />
        </Icosahedron>
      </Float>
    </group>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 8], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop="always"
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[4, 6, 5]} intensity={2.2} />
      <directionalLight position={[-5, -3, -4]} intensity={0.8} color="#1F4FFF" />
      <PuzzleCluster />
      <Particles />
      <fog attach="fog" args={['#FFFFFF', 10, 20]} />
    </Canvas>
  )
}
