import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { WorldScene } from '../components/3d/WorldScene';
import { Header } from '../components/ui/Header';
import { BottomControls } from '../components/ui/BottomControls';
import { Minimap } from '../components/ui/Minimap';
import { InfoPanel } from '../components/ui/InfoPanel';
import { WalkHUD } from '../components/ui/WalkHUD';
import { AsherModal } from '../components/ui/AsherModal';
import { LoadingScreen } from '../components/ui/LoadingScreen';
import { ExternalLink, Compass } from 'lucide-react';
import { DistrictId, Project, CameraMode } from '../types';
import { soundManager } from '../utils/sound';

export const PortfolioWorld: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictId>('home');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [cameraMode, setCameraMode] = useState<CameraMode>('orbit');
  const [nearbyDistrict, setNearbyDistrict] = useState<DistrictId | null>(null);
  const [isAsherModalOpen, setIsAsherModalOpen] = useState<boolean>(false);
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
      }
    } catch {
      setWebGLSupported(false);
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

  // If WebGL is not supported
  if (!webGLSupported) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-4">
          <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '8s' }} />
        </div>
        <h2 className="text-2xl font-black mb-2 tracking-tight">3D World View</h2>
        <p className="text-slate-400 max-w-md text-sm mb-6 leading-relaxed">
          WebGL hardware acceleration is not active on this browser or device. You can view Eric Zaragoza's standard portfolio directly.
        </p>
        <a
          href="https://eric-zaragoza-portfolio.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white text-sm font-bold shadow-xl shadow-sky-500/25 hover:scale-105 active:scale-95 transition-all"
        >
          <span>Open Portfolio (eric-zaragoza-portfolio.vercel.app)</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    );
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
            onSelectCat={() => {
              setIsAsherModalOpen(true);
              soundManager.playMeow();
            }}
          />
        </Suspense>
      </Canvas>

      {/* Overlay UI: Top Navigation Header */}
      <Header
        selectedDistrict={selectedDistrict}
        cameraMode={cameraMode}
        onSelectDistrict={handleSelectDistrict}
        onToggleCameraMode={handleToggleCameraMode}
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

      {/* Asher The British Shorthair Modal */}
      <AsherModal
        isOpen={isAsherModalOpen}
        onClose={() => setIsAsherModalOpen(false)}
      />
    </div>
  );
};
