import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { WorldScene } from '../components/3d/WorldScene';
import { Header } from '../components/ui/Header';
import { BottomControls } from '../components/ui/BottomControls';
import { Minimap } from '../components/ui/Minimap';
import { InfoPanel } from '../components/ui/InfoPanel';
import { WalkHUD } from '../components/ui/WalkHUD';
import { LoadingScreen } from '../components/ui/LoadingScreen';
import { ClassicPortfolio } from '../components/ui/ClassicPortfolio';
import { DistrictId, Project, CameraMode } from '../types';
import { soundManager } from '../utils/sound';

export const PortfolioWorld: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictId>('home');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [cameraMode, setCameraMode] = useState<CameraMode>('orbit');
  const [nearbyDistrict, setNearbyDistrict] = useState<DistrictId | null>(null);
  const [showClassic, setShowClassic] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [loadProgress, setLoadProgress] = useState<number>(20);
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(true);
  const [webGLSupported, setWebGLSupported] = useState<boolean>(true);

  // Check WebGL availability
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGLSupported(false);
        setShowClassic(true);
      }
    } catch {
      setWebGLSupported(false);
      setShowClassic(true);
    }
  }, []);

  // Simulate smooth loading transition for 3D assets
  useEffect(() => {
    const timer1 = setTimeout(() => setLoadProgress(65), 300);
    const timer2 = setTimeout(() => setLoadProgress(100), 700);
    const timer3 = setTimeout(() => setIsLoaded(true), 900);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleSelectDistrict = (id: DistrictId) => {
    setSelectedDistrict(id);
    setActiveProject(null);
    soundManager.playSelect();
  };

  const handleSelectProject = (project: Project | null) => {
    setActiveProject(project);
    if (project) {
      setSelectedDistrict('projects');
      soundManager.playSelect();
    }
  };

  const handleResetToWorld = () => {
    setSelectedDistrict('home');
    setActiveProject(null);
    soundManager.playClose();
  };

  const handleToggleCameraMode = () => {
    setCameraMode((prev) => {
      const next = prev === 'orbit' ? 'walk' : 'orbit';
      soundManager.playSelect();
      return next;
    });
  };

  const handleToggleSound = () => {
    const next = !isSoundEnabled;
    setIsSoundEnabled(next);
    soundManager.enabled = next;
    if (next) soundManager.playSelect();
  };

  // If user chooses classic portfolio or WebGL is not supported
  if (showClassic || !webGLSupported) {
    return <ClassicPortfolio onBackTo3D={() => setShowClassic(false)} />;
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-sky-200 select-none">
      {/* Loading Overlay */}
      {!isLoaded && <LoadingScreen progress={loadProgress} />}

      {/* 3D Canvas Layer */}
      <Canvas
        shadows
        camera={{
          position: [0, 16, 24],
          fov: 45,
          near: 0.1,
          far: 120,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          <WorldScene
            selectedDistrict={selectedDistrict}
            cameraMode={cameraMode}
            onSelectDistrict={handleSelectDistrict}
            onSelectProject={handleSelectProject}
            onResetToWorld={handleResetToWorld}
            onNearbyDistrictChange={setNearbyDistrict}
          />
        </Suspense>
      </Canvas>

      {/* Overlay UI: Top Navigation Header */}
      <Header
        selectedDistrict={selectedDistrict}
        cameraMode={cameraMode}
        onSelectDistrict={handleSelectDistrict}
        onToggleCameraMode={handleToggleCameraMode}
        onOpenClassicPortfolio={() => setShowClassic(true)}
        isSoundEnabled={isSoundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Overlay UI: Walk Mode HUD (Crosshair, Proximity Action, Vision Controls) */}
      {cameraMode === 'walk' ? (
        <WalkHUD
          nearbyDistrict={nearbyDistrict}
          onInteract={handleSelectDistrict}
          onSwitchToOrbit={() => setCameraMode('orbit')}
        />
      ) : (
        /* Overlay UI: Bottom Exploration Controls for Orbit Mode */
        <BottomControls
          selectedDistrict={selectedDistrict}
          cameraMode={cameraMode}
          onResetToWorld={handleResetToWorld}
          onToggleCameraMode={handleToggleCameraMode}
        />
      )}

      {/* Overlay UI: Top-Down Miniature Map */}
      <Minimap
        selectedDistrict={selectedDistrict}
        onSelectDistrict={handleSelectDistrict}
      />

      {/* Overlay UI: District / Project Information Modal Panel */}
      {(selectedDistrict !== 'home' || activeProject !== null) && (
        <InfoPanel
          districtId={selectedDistrict}
          activeProject={activeProject}
          onClose={handleResetToWorld}
          onSelectDistrict={handleSelectDistrict}
          onSelectProject={handleSelectProject}
        />
      )}
    </div>
  );
};
