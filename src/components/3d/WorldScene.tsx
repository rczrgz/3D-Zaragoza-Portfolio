import React from 'react';
import { Ground } from './Ground';
import { Roads } from './Roads';
import { TreesAndNature } from './TreesAndNature';
import { SpawnPlaza } from './SpawnPlaza';
import { WordPressBuilding } from './WordPressBuilding';
import { ShopifyBuilding } from './ShopifyBuilding';
import { ProjectDistrict } from './ProjectDistrict';
import { ExperienceMonument } from './ExperienceMonument';
import { EducationBuilding } from './EducationBuilding';
import { SkillsBuilding } from './SkillsBuilding';
import { ContactBuilding } from './ContactBuilding';
import { CameraController } from './CameraController';
import { WalkController } from './WalkController';
import { RoamingCat } from './RoamingCat';
import { DISTRICTS } from '../../data/districts';
import { DistrictId, Project, CameraMode } from '../../types';

interface WorldSceneProps {
  selectedDistrict: DistrictId;
  cameraMode: CameraMode;
  onSelectDistrict: (id: DistrictId) => void;
  onSelectProject: (project: Project) => void;
  onResetToWorld: () => void;
  onNearbyDistrictChange: (districtId: DistrictId | null) => void;
  onSelectCat: () => void;
}

export const WorldScene: React.FC<WorldSceneProps> = ({
  selectedDistrict,
  cameraMode,
  onSelectDistrict,
  onSelectProject,
  onResetToWorld,
  onNearbyDistrictChange,
  onSelectCat,
}) => {
  return (
    <>
      {/* Dynamic Camera Control: Free Orbit vs Game Walk Mode */}
      {cameraMode === 'orbit' ? (
        <CameraController
          selectedDistrict={selectedDistrict}
          onReset={onResetToWorld}
        />
      ) : (
        <WalkController
          onNearbyDistrictChange={onNearbyDistrictChange}
          onInteractDistrict={onSelectDistrict}
        />
      )}

      {/* Atmospheric Fog */}
      <fog attach="fog" args={['#e0f2fe', 30, 85]} />

      {/* Lighting Setup */}
      <ambientLight intensity={0.65} />
      
      {/* Sky/Ground Hemisphere Light for rich natural low-poly bounce */}
      <hemisphereLight
        args={['#bae6fd', '#4ade80', 0.5]}
      />

      {/* Main Sunlight */}
      <directionalLight
        position={[25, 35, 20]}
        intensity={1.3}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={80}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-bias={-0.0002}
      />

      {/* Soft Secondary Fill Light */}
      <directionalLight position={[-20, 15, -15]} intensity={0.3} color="#93c5fd" />

      {/* Island Ground & Canal */}
      <Ground />

      {/* Road & Walkway Network */}
      <Roads />

      {/* Natural Flora, Trees, Rocks & Benches */}
      <TreesAndNature />

      {/* Area 1: Home / Spawn Plaza */}
      <SpawnPlaza onSelect={() => onSelectDistrict('home')} />

      {/* Special Feature: Asher, British Shorthair Roaming Companion */}
      <RoamingCat onSelectCat={onSelectCat} />

      {/* Area 2: WordPress District */}
      <WordPressBuilding
        position={DISTRICTS.wordpress.position}
        isSelected={selectedDistrict === 'wordpress'}
        onSelect={() => onSelectDistrict('wordpress')}
      />

      {/* Area 3: Shopify District */}
      <ShopifyBuilding
        position={DISTRICTS.shopify.position}
        isSelected={selectedDistrict === 'shopify'}
        onSelect={() => onSelectDistrict('shopify')}
      />

      {/* Area 4: Project District */}
      <ProjectDistrict
        isSelected={selectedDistrict === 'projects'}
        onSelectDistrict={() => onSelectDistrict('projects')}
        onSelectProject={onSelectProject}
      />

      {/* Area 5: Experience Monument */}
      <ExperienceMonument
        position={DISTRICTS.experience.position}
        isSelected={selectedDistrict === 'experience'}
        onSelect={() => onSelectDistrict('experience')}
      />

      {/* Area 6: Education University */}
      <EducationBuilding
        position={DISTRICTS.education.position}
        isSelected={selectedDistrict === 'education'}
        onSelect={() => onSelectDistrict('education')}
      />

      {/* Area 7: Skills Tech Hub */}
      <SkillsBuilding
        position={DISTRICTS.skills.position}
        isSelected={selectedDistrict === 'skills'}
        onSelect={() => onSelectDistrict('skills')}
      />

      {/* Area 8: Contact Beacon Spire */}
      <ContactBuilding
        position={DISTRICTS.contact.position}
        isSelected={selectedDistrict === 'contact'}
        onSelect={() => onSelectDistrict('contact')}
      />
    </>
  );
};
