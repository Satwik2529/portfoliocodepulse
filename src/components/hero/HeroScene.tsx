import { useRef } from 'react';
import type { RefObject } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import type { Group, Mesh } from 'three';

type PointerRef = RefObject<{ x: number; y: number }>;

// Lerps the whole scene's rotation toward the pointer position each frame,
// read from a plain ref (not React state) so mouse movement never
// triggers a re-render of the React tree.
function PointerTilt({
  pointer,
  reducedMotion,
  children,
}: {
  pointer: PointerRef;
  reducedMotion: boolean;
  children: React.ReactNode;
}) {
  const groupRef = useRef<Group>(null);

  useFrame(() => {
    if (reducedMotion || !groupRef.current) return;
    const targetY = pointer.current.x * 0.35;
    const targetX = pointer.current.y * -0.22;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.06;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.06;
  });

  return <group ref={groupRef}>{children}</group>;
}

// Two small accent nodes traveling along the tilted orbit ring — a quiet
// "technical system" motif rather than decoration for its own sake.
function OrbitNodes({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;
    groupRef.current.rotation.z += delta * 0.35;
  });

  return (
    <group ref={groupRef} rotation={[1.15, 0, 0.3]}>
      <mesh position={[1.85, 0, 0]}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshStandardMaterial color="#C8FF4D" emissive="#C8FF4D" emissiveIntensity={1.4} toneMapped={false} />
      </mesh>
      <mesh position={[-1.85, 0, 0]} rotation={[0, 0, Math.PI]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#FFB347" emissive="#FFB347" emissiveIntensity={1.4} toneMapped={false} />
      </mesh>
    </group>
  );
}

function OrbitRing() {
  return (
    <mesh rotation={[1.15, 0, 0.3]}>
      <torusGeometry args={[1.85, 0.008, 8, 120]} />
      <meshBasicMaterial color="#FF5C7A" transparent opacity={0.35} />
    </mesh>
  );
}

function CrystalCore() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.1;
    meshRef.current.rotation.y += delta * 0.15;
  });

  return (
    <mesh ref={meshRef}>
      {/* Zero-subdivision icosahedron: 20 flat triangular faces, so each
          catches the colored lights at a different angle — real facets
          instead of a smooth, featureless sphere. */}
      <icosahedronGeometry args={[1.35, 0]} />
      <meshStandardMaterial
        color="#8B6CFF"
        flatShading
        roughness={0.28}
        metalness={0.15}
        emissive="#00E6F6"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}

function OuterShell() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x -= delta * 0.05;
    meshRef.current.rotation.y -= delta * 0.07;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.85, 1]} />
      <meshBasicMaterial color="#00E6F6" wireframe transparent opacity={0.16} />
    </mesh>
  );
}

function Rig() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 2.5, 4]} intensity={55} color="#00E6F6" />
      <pointLight position={[-4, -1.5, -2]} intensity={40} color="#FF5C7A" />
      <pointLight position={[-1, 3.5, 3]} intensity={28} color="#C8FF4D" />
      <pointLight position={[2, -3, -4]} intensity={20} color="#8B6CFF" />
    </>
  );
}

interface HeroSceneProps {
  reducedMotion: boolean;
  pointer: PointerRef;
}

export function HeroScene({ reducedMotion, pointer }: HeroSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 5.4], fov: 42 }}
      frameloop={reducedMotion ? 'demand' : 'always'}
    >
      <Rig />
      <PointerTilt pointer={pointer} reducedMotion={reducedMotion}>
        <Float speed={reducedMotion ? 0 : 1.3} rotationIntensity={0.15} floatIntensity={reducedMotion ? 0 : 0.6}>
          <OuterShell />
          <CrystalCore />
          <OrbitRing />
          <OrbitNodes reducedMotion={reducedMotion} />
        </Float>
      </PointerTilt>
    </Canvas>
  );
}
