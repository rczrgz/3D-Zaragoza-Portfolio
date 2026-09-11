import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { FloatingMarker } from './FloatingMarker';

interface EducationBuildingProps {
  position: [number, number, number];
  isSelected: boolean;
  onSelect: () => void;
}

export const EducationBuilding: React.FC<EducationBuildingProps> = ({
  position,
  isSelected,
  onSelect,
}) => {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const capRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      const targetScale = hovered || isSelected ? 1.06 : 1.0;
      groupRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        delta * 8
      );
    }
    if (capRef.current) {
      capRef.current.rotation.y += delta * 0.5;
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
      {/* Floating 3D Marker in PUP Maroon */}
      <FloatingMarker
        position={[0, 6.2, 0]}
        title="EDUCATION"
        subtitle="PUP • BSIT Degree"
        color="#800000"
        districtId="education"
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
        {/* Foundation Platform with stone steps */}
        <mesh receiveShadow position={[0, 0.15, 0]}>
          <boxGeometry args={[5.2, 0.3, 4.4]} />
          <meshStandardMaterial color={hovered ? '#fee2e2' : '#f8fafc'} roughness={0.6} />
        </mesh>
        <mesh receiveShadow position={[0, 0.35, 0]}>
          <boxGeometry args={[4.6, 0.2, 3.8]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.5} />
        </mesh>

        {/* Main PUP University Hall Facade (PUP Maroon) */}
        <mesh castShadow receiveShadow position={[0, 1.6, 0]}>
          <boxGeometry args={[4.2, 2.3, 3.4]} />
          <meshStandardMaterial
            color={hovered ? '#991b1b' : '#800000'}
            roughness={0.4}
            metalness={0.15}
          />
        </mesh>

        {/* Gold Architectural Trim / Banding */}
        <mesh position={[0, 2.7, 0]} castShadow>
          <boxGeometry args={[4.3, 0.12, 3.5]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.3} metalness={0.6} />
        </mesh>

        {/* Classical Portico Pillars on Front (White with Gold Trims) */}
        {[-1.5, -0.5, 0.5, 1.5].map((x, i) => (
          <group key={`col-${i}`} position={[x, 1.5, 1.8]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.12, 0.15, 2.1, 8]} />
              <meshStandardMaterial color="#ffffff" roughness={0.3} />
            </mesh>
            {/* Column Gold Capital */}
            <mesh position={[0, 1.05, 0]}>
              <cylinderGeometry args={[0.16, 0.12, 0.08, 8]} />
              <meshStandardMaterial color="#f59e0b" metalness={0.5} roughness={0.3} />
            </mesh>
          </group>
        ))}

        {/* Portico Pediment (PUP Deep Maroon Triangular Gable) */}
        <mesh castShadow position={[0, 2.85, 1.8]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[2.5, 0.8, 4]} />
          <meshStandardMaterial color="#580000" roughness={0.4} />
        </mesh>

        {/* Central Clock Tower in Maroon */}
        <mesh castShadow position={[0, 3.4, 0]}>
          <boxGeometry args={[1.6, 1.8, 1.6]} />
          <meshStandardMaterial color="#6b0000" roughness={0.3} />
        </mesh>

        {/* Clock Face with Gold Bezel */}
        <mesh position={[0, 3.6, 0.81]}>
          <circleGeometry args={[0.42, 16]} />
          <meshBasicMaterial color="#fbbf24" />
        </mesh>
        <mesh position={[0, 3.6, 0.82]}>
          <circleGeometry args={[0.36, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        {/* Clock Hands */}
        <mesh position={[0, 3.6, 0.83]} rotation={[0, 0, 0.4]}>
          <boxGeometry args={[0.04, 0.35, 0.01]} />
          <meshBasicMaterial color="#800000" />
        </mesh>

        {/* Clock Tower Spire / Bell Roof (Deep Maroon) */}
        <mesh castShadow position={[0, 4.7, 0]}>
          <coneGeometry args={[1.2, 1.2, 4]} />
          <meshStandardMaterial color="#450000" roughness={0.4} />
        </mesh>

        {/* 3D Graduation Mortarboard / Cap with PUP Gold Tassel */}
        <group ref={capRef} position={[0, 5.5, 0]}>
          {/* Flat Diamond Top (Maroon Cap) */}
          <mesh castShadow rotation={[-Math.PI / 2, 0, 0]}>
            <boxGeometry args={[0.9, 0.9, 0.06]} />
            <meshStandardMaterial color="#580000" roughness={0.3} />
          </mesh>
          {/* Skullcap base */}
          <mesh position={[0, -0.15, 0]}>
            <cylinderGeometry args={[0.28, 0.35, 0.25, 12]} />
            <meshStandardMaterial color="#580000" />
          </mesh>
          {/* Golden Tassel (PUP Gold) */}
          <mesh position={[0.3, -0.1, 0]}>
            <cylinderGeometry args={[0.02, 0.04, 0.25, 6]} />
            <meshBasicMaterial color="#fbbf24" />
          </mesh>
          {/* Golden Cap Button */}
          <mesh position={[0, 0.04, 0]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshBasicMaterial color="#fbbf24" />
          </mesh>
        </group>

        {/* Illuminated Warm Golden Library Windows */}
        {[-1.2, 1.2].map((x, i) => (
          <mesh key={`edu-win-${i}`} position={[x, 1.6, 1.72]}>
            <boxGeometry args={[0.65, 0.9, 0.05]} />
            <meshBasicMaterial color={hovered ? '#fef08a' : '#fde047'} />
          </mesh>
        ))}
      </group>
    </group>
  );
};
