import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { projectsData } from '../../data/projects';
import { Project } from '../../types';
import { FloatingMarker } from './FloatingMarker';

interface ProjectDistrictProps {
  isSelected: boolean;
  onSelectDistrict: () => void;
  onSelectProject: (project: Project) => void;
}

export const ProjectDistrict: React.FC<ProjectDistrictProps> = ({
  isSelected,
  onSelectDistrict,
  onSelectProject,
}) => {
  const [hoveredBuilding, setHoveredBuilding] = useState<string | null>(null);
  const radarRef = useRef<THREE.Mesh>(null);
  const ambulanceLightRef = useRef<THREE.Mesh>(null);

  const picpaProject = projectsData.find((p) => p.id === 'picpa-ireland') || projectsData[0];
  const loveToDreamProject = projectsData.find((p) => p.id === 'lovetodream') || projectsData[1];
  const kidsAndBabyProject = projectsData.find((p) => p.id === 'kids-and-baby') || projectsData[2];
  const mamasAndPapasProject = projectsData.find((p) => p.id === 'mamas-and-papas') || projectsData[3];
  const optisnapProject = projectsData.find((p) => p.id === 'optisnap') || projectsData[0];
  const erMobileProject = projectsData.find((p) => p.id === 'er-mobile') || projectsData[4];

  useFrame((state, delta) => {
    if (radarRef.current) {
      radarRef.current.rotation.y += delta * 1.5;
    }
    if (ambulanceLightRef.current) {
      ambulanceLightRef.current.rotation.y += delta * 6.0;
    }
  });

  return (
    <group position={[-12, 0, -8]}>
      {/* Central District Floating Marker */}
      <FloatingMarker
        position={[0, 4.8, 0]}
        title="PROJECTS"
        subtitle="Interactive Works"
        color="#8b5cf6"
        districtId="projects"
        isSelected={isSelected}
        isHovered={hoveredBuilding !== null}
        onClick={onSelectDistrict}
        onPointerOver={() => setHoveredBuilding('district')}
        onPointerOut={() => setHoveredBuilding(null)}
      />

      {/* District Courtyard Ground Foundation */}
      <mesh receiveShadow position={[0, 0.05, 0]}>
        <boxGeometry args={[11, 0.1, 10]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.7} />
      </mesh>

      {/* Central Courtyard Plinth */}
      <mesh receiveShadow position={[0, 0.12, 0]}>
        <cylinderGeometry args={[2.0, 2.2, 0.08, 16]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.6} />
      </mesh>

      {/* Project 1: OptiSnap (Aperture / Camera Prism Pavilion) - Position: [-3.2, 0, -2.8] */}
      <group
        position={[-3.2, 0, -2.8]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectProject(optisnapProject);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredBuilding('optisnap');
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHoveredBuilding(null);
          document.body.style.cursor = 'auto';
        }}
      >
        <mesh castShadow position={[0, 0.9, 0]}>
          <cylinderGeometry args={[1.1, 1.2, 1.8, 8]} />
          <meshStandardMaterial
            color={hoveredBuilding === 'optisnap' ? '#c084fc' : '#9333ea'}
            roughness={0.2}
            metalness={0.5}
          />
        </mesh>
        {/* Prototype Prism Glass / Stylized Element on Roof */}
        <mesh position={[0, 1.85, 0]}>
          <cylinderGeometry args={[0.7, 0.8, 0.3, 16]} />
          <meshStandardMaterial color="#3b0764" roughness={0.1} metalness={0.8} />
        </mesh>
        <mesh position={[0, 2.01, 0]}>
          <circleGeometry args={[0.55, 16]} />
          <meshBasicMaterial color="#e879f9" />
        </mesh>
        {/* Project Label Plaque */}
        <mesh position={[0, 0.5, 1.25]}>
          <boxGeometry args={[1.2, 0.3, 0.05]} />
          <meshBasicMaterial color="#a855f7" />
        </mesh>
      </group>

      {/* Project 2: PICPA Ireland (Enterprise Portal Portico) - Position: [-3.4, 0, 2.4] */}
      <group
        position={[-3.4, 0, 2.4]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectProject(picpaProject);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredBuilding('picpa');
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHoveredBuilding(null);
          document.body.style.cursor = 'auto';
        }}
      >
        <mesh castShadow position={[0, 1.0, 0]}>
          <boxGeometry args={[2.2, 2.0, 2.0]} />
          <meshStandardMaterial
            color={hoveredBuilding === 'picpa' ? '#60a5fa' : '#2563eb'}
            roughness={0.4}
          />
        </mesh>
        {/* Triangular Pediment Portico */}
        <mesh castShadow position={[0, 2.4, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[1.6, 0.8, 4]} />
          <meshStandardMaterial color="#1e3a8a" roughness={0.3} />
        </mesh>
        {/* Pillars */}
        {[-0.8, 0.8].map((px, i) => (
          <mesh key={`picpa-pillar-${i}`} position={[px, 0.9, 1.1]} castShadow>
            <cylinderGeometry args={[0.1, 0.12, 1.8, 8]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.3} />
          </mesh>
        ))}
      </group>

      {/* Project 3: Shopify Storefronts - Kids and Baby & Mamas and Papas - Position: [3.2, 0, 2.4] */}
      <group
        position={[3.2, 0, 2.4]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectProject(kidsAndBabyProject);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredBuilding('shopify-store');
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHoveredBuilding(null);
          document.body.style.cursor = 'auto';
        }}
      >
        <mesh castShadow position={[0, 1.0, 0]}>
          <boxGeometry args={[2.4, 2.0, 2.2]} />
          <meshStandardMaterial
            color={hoveredBuilding === 'shopify-store' ? '#34d399' : '#059669'}
            roughness={0.3}
          />
        </mesh>
        {/* E-Commerce Boutique Awning (Green & White stripes) */}
        <mesh castShadow position={[0, 1.9, 1.25]} rotation={[0.4, 0, 0]}>
          <boxGeometry args={[2.5, 0.1, 0.7]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.3} />
        </mesh>
        {/* Display Glass Window */}
        <mesh position={[0, 1.0, 1.12]}>
          <boxGeometry args={[1.8, 1.1, 0.05]} />
          <meshBasicMaterial color="#ecfdf5" />
        </mesh>
        {/* Mini Shopping Bag decor on Roof */}
        <group position={[0, 2.4, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.8, 0.9, 0.5]} />
            <meshStandardMaterial color="#10b981" roughness={0.3} />
          </mesh>
          {/* Bag handle */}
          <mesh position={[0, 0.55, 0]}>
            <torusGeometry args={[0.22, 0.04, 8, 16, Math.PI]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </group>
      </group>

      {/* Project 4: Love To Dream (Sleepwear & Swaddle Boutique) - Position: [3.4, 0, -2.8] */}
      <group
        position={[3.4, 0, -2.8]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectProject(loveToDreamProject);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredBuilding('lovetodream');
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHoveredBuilding(null);
          document.body.style.cursor = 'auto';
        }}
      >
        <mesh castShadow position={[0, 0.8, 0]}>
          <cylinderGeometry args={[1.2, 1.3, 1.6, 16]} />
          <meshStandardMaterial
            color={hoveredBuilding === 'lovetodream' ? '#38bdf8' : '#0284c7'}
            roughness={0.4}
          />
        </mesh>
        {/* Swaddle Cloud / Crescent Moon Roof Motif */}
        <mesh castShadow position={[0, 1.8, 0]}>
          <sphereGeometry args={[0.9, 16, 12]} />
          <meshStandardMaterial color="#e0f2fe" roughness={0.2} metalness={0.3} />
        </mesh>
        {/* Golden Dream Star on Peak */}
        <mesh position={[0, 2.8, 0]}>
          <octahedronGeometry args={[0.3, 0]} />
          <meshBasicMaterial color="#fbbf24" />
        </mesh>
      </group>

      {/* Project 5: ER Mobile / Ambulance Project - Position: [0, 0, -3.8] */}
      <group
        position={[0, 0, -3.8]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectProject(erMobileProject);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredBuilding('er-mobile');
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHoveredBuilding(null);
          document.body.style.cursor = 'auto';
        }}
      >
        <mesh castShadow position={[0, 1.1, 0]}>
          <boxGeometry args={[2.5, 2.2, 2.0]} />
          <meshStandardMaterial
            color={hoveredBuilding === 'er-mobile' ? '#f87171' : '#dc2626'}
            roughness={0.3}
          />
        </mesh>
        {/* Medical Cross on front */}
        <group position={[0, 1.3, 1.02]}>
          <mesh>
            <boxGeometry args={[0.8, 0.25, 0.04]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh>
            <boxGeometry args={[0.25, 0.8, 0.04]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>
        {/* Ambulance Vehicle in Driveway */}
        <group position={[0, 0.3, 1.8]}>
          <mesh castShadow position={[0, 0.28, 0]}>
            <boxGeometry args={[0.8, 0.55, 1.3]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.3} />
          </mesh>
          {/* Emergency Siren Light Bar */}
          <group ref={ambulanceLightRef} position={[0, 0.6, 0.2]}>
            <mesh>
              <boxGeometry args={[0.35, 0.1, 0.1]} />
              <meshBasicMaterial color="#ef4444" />
            </mesh>
          </group>
          {/* Ambulance Wheels */}
          {[-0.42, 0.42].map((wx, i) =>
            [-0.35, 0.35].map((wz, j) => (
              <mesh key={`amb-w-${i}-${j}`} position={[wx, 0.08, wz]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.12, 0.12, 0.08, 8]} />
                <meshStandardMaterial color="#1e293b" />
              </mesh>
            ))
          )}
        </group>
      </group>
    </group>
  );
};
