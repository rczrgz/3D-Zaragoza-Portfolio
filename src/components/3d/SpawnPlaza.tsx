import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SpawnPlazaProps {
  onSelect: () => void;
}

export const SpawnPlaza: React.FC<SpawnPlazaProps> = ({ onSelect }) => {
  const fountainWaterRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (fountainWaterRef.current) {
      fountainWaterRef.current.rotation.z += 0.01;
    }
    if (ringRef.current) {
      ringRef.current.rotation.y = state.clock.elapsedTime * 0.25;
    }
  });

  return (
    <group position={[0, 0, 0]} onClick={onSelect}>
      {/* Outer Plaza Stone Ring */}
      <mesh receiveShadow position={[0, 0.03, 0]}>
        <cylinderGeometry args={[4.2, 4.4, 0.06, 32]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.7} />
      </mesh>

      {/* Inner Decorative Paving with Compass Star Pattern */}
      <mesh receiveShadow position={[0, 0.065, 0]}>
        <cylinderGeometry args={[3.2, 3.2, 0.02, 32]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.6} />
      </mesh>

      {/* Compass Points / Stylized inlays */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((rot, i) => (
        <mesh
          key={`compass-point-${i}`}
          position={[0, 0.08, 0]}
          rotation={[-Math.PI / 2, 0, rot]}
        >
          <coneGeometry args={[0.3, 2.2, 3]} />
          <meshStandardMaterial color="#10b981" roughness={0.4} />
        </mesh>
      ))}

      {/* Fountain Outer Basin */}
      <mesh castShadow receiveShadow position={[0, 0.35, 0]}>
        <cylinderGeometry args={[1.5, 1.6, 0.5, 24]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.5} metalness={0.1} />
      </mesh>

      {/* Fountain Water Surface */}
      <mesh
        ref={fountainWaterRef}
        position={[0, 0.55, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <circleGeometry args={[1.35, 24]} />
        <meshStandardMaterial
          color="#38bdf8"
          roughness={0.1}
          metalness={0.4}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Fountain Central Pedestal */}
      <mesh castShadow position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.4, 0.5, 0.9, 16]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.4} />
      </mesh>

      {/* Floating Emerald Prism / Core */}
      <group ref={ringRef} position={[0, 1.45, 0]}>
        <mesh castShadow>
          <octahedronGeometry args={[0.42, 0]} />
          <meshStandardMaterial
            color="#10b981"
            emissive="#059669"
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.7}
          />
        </mesh>
        {/* Orbiting Gyro Ring */}
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[0.62, 0.04, 8, 24]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Plaza Corner Pillars */}
      {[
        [-2.4, 2.4],
        [2.4, 2.4],
        [-2.4, -2.4],
        [2.4, -2.4],
      ].map(([px, pz], i) => (
        <group key={`plaza-pillar-${i}`} position={[px, 0, pz]}>
          <mesh castShadow position={[0, 0.45, 0]}>
            <cylinderGeometry args={[0.18, 0.22, 0.9, 8]} />
            <meshStandardMaterial color="#cbd5e1" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.95, 0]}>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshBasicMaterial color="#34d399" />
          </mesh>
        </group>
      ))}
    </group>
  );
};
