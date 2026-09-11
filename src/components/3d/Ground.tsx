import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Ground: React.FC = () => {
  const waterRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (waterRef.current) {
      waterRef.current.position.y = -0.15 + Math.sin(state.clock.elapsedTime * 1.5) * 0.04;
    }
  });

  return (
    <group>
      {/* Main Island Grass Base (Top surface) */}
      <mesh receiveShadow position={[0, -0.2, 0]}>
        <boxGeometry args={[44, 0.4, 40]} />
        <meshStandardMaterial color="#86efac" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Island Sub-Base / Dirt & Cliff Edge */}
      <mesh position={[0, -1.2, 0]}>
        <boxGeometry args={[44.4, 1.6, 40.4]} />
        <meshStandardMaterial color="#475569" roughness={0.9} />
      </mesh>
      
      {/* Lower Bedrock */}
      <mesh position={[0, -2.4, 0]}>
        <boxGeometry args={[42, 1.0, 38]} />
        <meshStandardMaterial color="#334155" roughness={0.95} />
      </mesh>

      {/* River / Water Canal Cutting Across */}
      <mesh
        ref={waterRef}
        position={[4, -0.15, -4]}
        rotation={[-Math.PI / 2, 0, Math.PI / 6]}
      >
        <planeGeometry args={[10, 42]} />
        <meshStandardMaterial
          color="#38bdf8"
          roughness={0.1}
          metalness={0.3}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* River Bed underneath */}
      <mesh position={[4, -0.4, -4]} rotation={[-Math.PI / 2, 0, Math.PI / 6]}>
        <planeGeometry args={[10.2, 42.2]} />
        <meshStandardMaterial color="#0284c7" roughness={0.9} />
      </mesh>

      {/* Low-Poly Arched Wooden Bridges over the Canal */}
      <group position={[1.5, 0.1, 1]}>
        {/* Bridge 1 Deck */}
        <mesh castShadow receiveShadow position={[0, 0.25, 0]} rotation={[0, -Math.PI / 3, 0]}>
          <boxGeometry args={[3.2, 0.2, 7.5]} />
          <meshStandardMaterial color="#b45309" roughness={0.7} />
        </mesh>
        {/* Rails */}
        <mesh castShadow position={[-1.5, 0.6, 0]} rotation={[0, -Math.PI / 3, 0]}>
          <boxGeometry args={[0.15, 0.5, 7.5]} />
          <meshStandardMaterial color="#78350f" roughness={0.8} />
        </mesh>
        <mesh castShadow position={[1.5, 0.6, 0]} rotation={[0, -Math.PI / 3, 0]}>
          <boxGeometry args={[0.15, 0.5, 7.5]} />
          <meshStandardMaterial color="#78350f" roughness={0.8} />
        </mesh>
      </group>

      <group position={[6.5, 0.1, -11]}>
        {/* Bridge 2 Deck */}
        <mesh castShadow receiveShadow position={[0, 0.25, 0]} rotation={[0, -Math.PI / 3, 0]}>
          <boxGeometry args={[3.2, 0.2, 7.5]} />
          <meshStandardMaterial color="#b45309" roughness={0.7} />
        </mesh>
        <mesh castShadow position={[-1.5, 0.6, 0]} rotation={[0, -Math.PI / 3, 0]}>
          <boxGeometry args={[0.15, 0.5, 7.5]} />
          <meshStandardMaterial color="#78350f" roughness={0.8} />
        </mesh>
        <mesh castShadow position={[1.5, 0.6, 0]} rotation={[0, -Math.PI / 3, 0]}>
          <boxGeometry args={[0.15, 0.5, 7.5]} />
          <meshStandardMaterial color="#78350f" roughness={0.8} />
        </mesh>
      </group>

      {/* Decorative canal stone embankments */}
      {[-12, -6, 0, 6, 12].map((offset, i) => (
        <group key={`embankment-${i}`} position={[4 + offset * 0.5, 0.05, -4 + offset * 0.86]}>
          <mesh position={[-4.5, 0, 0]} castShadow>
            <boxGeometry args={[0.4, 0.3, 2.2]} />
            <meshStandardMaterial color="#94a3b8" roughness={0.9} />
          </mesh>
          <mesh position={[4.5, 0, 0]} castShadow>
            <boxGeometry args={[0.4, 0.3, 2.2]} />
            <meshStandardMaterial color="#94a3b8" roughness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Stylized garden / park patches with darker lush green */}
      <mesh receiveShadow position={[-6, 0.02, 3]}>
        <boxGeometry args={[4, 0.04, 5]} />
        <meshStandardMaterial color="#4ade80" roughness={0.85} />
      </mesh>
      <mesh receiveShadow position={[6, 0.02, -2]}>
        <boxGeometry args={[3.5, 0.04, 4.5]} />
        <meshStandardMaterial color="#4ade80" roughness={0.85} />
      </mesh>
      <mesh receiveShadow position={[-5, 0.02, -12]}>
        <boxGeometry args={[5, 0.04, 4]} />
        <meshStandardMaterial color="#4ade80" roughness={0.85} />
      </mesh>
    </group>
  );
};
