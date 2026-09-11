import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { FloatingMarker } from './FloatingMarker';

interface ExperienceMonumentProps {
  position: [number, number, number];
  isSelected: boolean;
  onSelect: () => void;
}

export const ExperienceMonument: React.FC<ExperienceMonumentProps> = ({
  position,
  isSelected,
  onSelect,
}) => {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const starRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      const targetScale = hovered || isSelected ? 1.06 : 1.0;
      groupRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        delta * 8
      );
    }
    if (starRef.current) {
      starRef.current.rotation.y += delta * 0.8;
      starRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
    }
  });

  const handlePointerOver = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = 'auto';
  };

  return (
    <group position={position}>
      {/* Floating Marker */}
      <FloatingMarker
        position={[0, 6.8, 0]}
        title="EXPERIENCE"
        subtitle="Career Milestones"
        color="#f59e0b"
        districtId="experience"
        isSelected={isSelected}
        isHovered={hovered}
        onClick={onSelect}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />

      <group
        ref={groupRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {/* Tiered Base Steps */}
        <mesh receiveShadow position={[0, 0.15, 0]}>
          <cylinderGeometry args={[4.2, 4.6, 0.3, 8]} />
          <meshStandardMaterial color={hovered ? '#fef3c7' : '#f8fafc'} roughness={0.6} />
        </mesh>
        <mesh receiveShadow position={[0, 0.45, 0]}>
          <cylinderGeometry args={[3.4, 3.8, 0.3, 8]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.5} />
        </mesh>

        {/* Central Obelisk Tier 1 */}
        <mesh castShadow position={[0, 1.6, 0]}>
          <cylinderGeometry args={[1.8, 2.3, 2.0, 8]} />
          <meshStandardMaterial
            color={hovered ? '#fbbf24' : '#f59e0b'}
            roughness={0.3}
            metalness={0.4}
          />
        </mesh>

        {/* Central Obelisk Tier 2 */}
        <mesh castShadow position={[0, 3.1, 0]}>
          <cylinderGeometry args={[1.2, 1.7, 1.8, 8]} />
          <meshStandardMaterial
            color={hovered ? '#f59e0b' : '#d97706'}
            roughness={0.3}
            metalness={0.4}
          />
        </mesh>

        {/* Central Obelisk Tier 3 (Spire) */}
        <mesh castShadow position={[0, 4.4, 0]}>
          <coneGeometry args={[1.1, 1.8, 8]} />
          <meshStandardMaterial
            color={hovered ? '#fbbf24' : '#b45309'}
            roughness={0.2}
            metalness={0.6}
          />
        </mesh>

        {/* Floating Rotating Golden Star of Achievement */}
        <mesh ref={starRef} position={[0, 5.6, 0]} castShadow>
          <octahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial
            color="#fef08a"
            emissive="#eab308"
            emissiveIntensity={0.6}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Surrounding Milestone Plaques / Pillars */}
        {[
          [-2.2, 2.2],
          [2.2, 2.2],
          [-2.2, -2.2],
          [2.2, -2.2],
        ].map(([px, pz], i) => (
          <group key={`milestone-pillar-${i}`} position={[px, 0.6, pz]}>
            <mesh castShadow>
              <boxGeometry args={[0.6, 0.9, 0.6]} />
              <meshStandardMaterial color="#475569" roughness={0.4} />
            </mesh>
            {/* Glowing crystal on top */}
            <mesh position={[0, 0.6, 0]}>
              <octahedronGeometry args={[0.18, 0]} />
              <meshBasicMaterial color="#fbbf24" />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};
