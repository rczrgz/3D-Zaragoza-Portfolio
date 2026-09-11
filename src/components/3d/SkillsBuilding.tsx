import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { FloatingMarker } from './FloatingMarker';

interface SkillsBuildingProps {
  position: [number, number, number];
  isSelected: boolean;
  onSelect: () => void;
}

export const SkillsBuilding: React.FC<SkillsBuildingProps> = ({
  position,
  isSelected,
  onSelect,
}) => {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      const targetScale = hovered || isSelected ? 1.06 : 1.0;
      groupRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        delta * 8
      );
    }
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 1.2;
      coreRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.8;
      ring1Ref.current.rotation.x += delta * 0.4;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.9;
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
        position={[0, 6.2, 0]}
        title="SKILLS"
        subtitle="Tech Stack & Tools"
        color="#ec4899"
        districtId="skills"
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
        {/* Hexagonal Base Platform */}
        <mesh receiveShadow position={[0, 0.2, 0]}>
          <cylinderGeometry args={[3.2, 3.5, 0.4, 6]} />
          <meshStandardMaterial color={hovered ? '#fce7f3' : '#1e293b'} roughness={0.4} />
        </mesh>

        {/* Lower Server Tower Body */}
        <mesh castShadow position={[0, 1.4, 0]}>
          <cylinderGeometry args={[2.4, 2.7, 2.0, 6]} />
          <meshStandardMaterial
            color={hovered ? '#db2777' : '#be185d'}
            roughness={0.3}
            metalness={0.4}
          />
        </mesh>

        {/* Mid Chamber with Floating Holographic Tech Core */}
        <mesh position={[0, 2.8, 0]}>
          <cylinderGeometry args={[1.8, 2.2, 0.8, 6]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* Glowing Hologram Core (Floating Icosahedron) */}
        <mesh ref={coreRef} position={[0, 3.8, 0]}>
          <icosahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial
            color="#f472b6"
            emissive="#db2777"
            emissiveIntensity={0.8}
            roughness={0.1}
            metalness={0.7}
          />
        </mesh>

        {/* Gyro Data Orbit Rings around the core */}
        <mesh ref={ring1Ref} position={[0, 3.8, 0]}>
          <torusGeometry args={[0.85, 0.03, 8, 24]} />
          <meshBasicMaterial color="#f472b6" />
        </mesh>
        <mesh ref={ring2Ref} position={[0, 3.8, 0]}>
          <torusGeometry args={[1.05, 0.03, 8, 24]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>

        {/* Top Antenna Cap */}
        <mesh castShadow position={[0, 4.8, 0]}>
          <coneGeometry args={[1.2, 0.8, 6]} />
          <meshStandardMaterial color="#831843" roughness={0.3} />
        </mesh>
        <mesh position={[0, 5.5, 0]}>
          <cylinderGeometry args={[0.04, 0.06, 0.8, 6]} />
          <meshStandardMaterial color="#f472b6" metalness={0.8} />
        </mesh>

        {/* Neon Circuit Panels on the 6 Facets */}
        {[0, 1, 2, 3, 4, 5].map((side) => {
          const angle = (side * Math.PI) / 3;
          const px = Math.sin(angle) * 2.15;
          const pz = Math.cos(angle) * 2.15;
          return (
            <mesh
              key={`circuit-${side}`}
              position={[px, 1.4, pz]}
              rotation={[0, angle, 0]}
            >
              <boxGeometry args={[1.0, 1.2, 0.04]} />
              <meshBasicMaterial color={hovered ? '#fbcfe8' : '#f472b6'} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
};
