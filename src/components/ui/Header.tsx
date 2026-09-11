import React from 'react';
import {
  Compass,
  Briefcase,
  Cpu,
  GraduationCap,
  FolderGit2,
  Radio,
  Globe,
  ShoppingBag,
  Volume2,
  VolumeX,
  FileText,
  Sparkles,
  Footprints,
  type LucideIcon,
} from 'lucide-react';
import { DistrictId, CameraMode } from '../../types';
import { soundManager } from '../../utils/sound';

interface HeaderProps {
  selectedDistrict: DistrictId;
  cameraMode: CameraMode;
  onSelectDistrict: (id: DistrictId) => void;
  onToggleCameraMode: () => void;
  onOpenClassicPortfolio: () => void;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedDistrict,
  cameraMode,
  onSelectDistrict,
  onToggleCameraMode,
  onOpenClassicPortfolio,
  isSoundEnabled,
  onToggleSound,
}) => {
  const navItems: { id: DistrictId; label: string; icon: LucideIcon }[] = [
    { id: 'home', label: 'Overview', icon: Compass },
    { id: 'wordpress', label: 'WordPress', icon: Globe },
    { id: 'shopify', label: 'Shopify', icon: ShoppingBag },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'skills', label: 'Skills', icon: Cpu },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'contact', label: 'Contact', icon: Radio },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] pointer-events-none p-3 sm:p-5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        {/* Top-Left: Identity Card */}
        <div className="pointer-events-auto relative z-[100] bg-slate-900/90 hover:bg-slate-900 text-white backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 shadow-2xl transition-all duration-200">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundManager.playSelect();
                onSelectDistrict('home');
              }}
              className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center font-black text-lg tracking-wider text-white shadow-md shadow-emerald-500/20 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
              title="Return to World Center"
            >
              EZ
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base tracking-wide text-slate-100">
                  ERIC ZARAGOZA
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available for Hire
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Web Developer &bull; WordPress &bull; Shopify &bull; Full-Stack
              </p>
            </div>
          </div>
        </div>

        {/* Top-Right: Quick Jump Nav & Control Actions */}
        <div className="pointer-events-auto relative z-[100] flex items-center gap-1.5 sm:gap-2 flex-wrap">
          {/* Navigation Pill Bar */}
          <nav className="bg-slate-900/95 backdrop-blur-md p-1 rounded-2xl border border-white/20 shadow-2xl flex items-center overflow-x-auto max-w-full relative z-[100]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = selectedDistrict === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    soundManager.playSelect();
                    onSelectDistrict(item.id);
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                  title={`Navigate to ${item.label}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden lg:inline">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Camera Mode Toggle: Aerial Orbit vs First-Person Walk Mode */}
          <button
            onClick={() => {
              soundManager.playSelect();
              onToggleCameraMode();
            }}
            className={`flex items-center gap-1.5 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-lg transition-all cursor-pointer hover:scale-105 active:scale-95 ${
              cameraMode === 'walk'
                ? 'bg-sky-600 hover:bg-sky-500 border border-sky-400/40'
                : 'bg-emerald-600 hover:bg-emerald-500 border border-emerald-400/40 animate-pulse'
            }`}
            title={cameraMode === 'walk' ? 'Switch to Aerial Orbit & Zoom Mode' : 'Switch to 1st-Person Walk & WASD Game Mode'}
          >
            {cameraMode === 'walk' ? (
              <>
                <Compass className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Aerial Orbit</span>
              </>
            ) : (
              <>
                <Footprints className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Walk / Game Mode</span>
              </>
            )}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
            }}
            className="bg-slate-900/80 hover:bg-slate-900 text-slate-200 hover:text-white backdrop-blur-md p-2 rounded-xl border border-white/15 shadow-lg transition-colors cursor-pointer"
            title={isSoundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
            aria-label="Toggle Sound"
          >
            {isSoundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Classic Portfolio Toggle (Accessible 2D Mode) */}
          <button
            onClick={() => {
              soundManager.playSelect();
              onOpenClassicPortfolio();
            }}
            className="flex items-center gap-1.5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white text-xs font-semibold px-3 py-2 rounded-xl shadow-lg border border-sky-400/30 transition-all cursor-pointer hover:scale-105 active:scale-95"
            title="Open standard 2D portfolio layout"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Classic Portfolio</span>
          </button>
        </div>
      </div>
    </header>
  );
};
