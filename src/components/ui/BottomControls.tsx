import React from 'react';
import { RotateCcw, Compass, MousePointerClick, Move, Footprints, Eye } from 'lucide-react';
import { DistrictId, CameraMode } from '../../types';
import { soundManager } from '../../utils/sound';

interface BottomControlsProps {
  selectedDistrict: DistrictId;
  cameraMode: CameraMode;
  onResetToWorld: () => void;
  onToggleCameraMode: () => void;
}

export const BottomControls: React.FC<BottomControlsProps> = ({
  selectedDistrict,
  cameraMode,
  onResetToWorld,
  onToggleCameraMode,
}) => {
  const isFocusedOnDistrict = selectedDistrict !== 'home';

  if (cameraMode === 'walk') {
    // In Walk Mode, WalkHUD handles controls display
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:right-auto z-20 pointer-events-none flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
      {/* Return to World Button */}
      {isFocusedOnDistrict && (
        <button
          onClick={() => {
            soundManager.playSelect();
            onResetToWorld();
          }}
          className="pointer-events-auto flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-2xl shadow-xl border border-emerald-300/30 transition-all transform hover:scale-105 active:scale-95 cursor-pointer animate-bounce"
          style={{ animationIterationCount: 2 }}
          title="Return to World Overview (Shortcut: Esc or R)"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Back to World</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-black/25 text-[10px] font-mono">
            ESC
          </kbd>
        </button>
      )}

      {/* Free Zoom & Exploration Helper Bar */}
      <div className="pointer-events-auto bg-slate-900/80 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/15 text-slate-300 shadow-xl flex items-center gap-2 sm:gap-3 text-xs font-medium">
        <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
          <Move className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Drag to rotate</span>
        </div>
        <span className="text-slate-600">•</span>
        <div className="flex items-center gap-1.5 text-sky-400 font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>Scroll to zoom freely</span>
        </div>
        <span className="text-slate-600">•</span>
        <div className="flex items-center gap-1.5 text-amber-400">
          <MousePointerClick className="w-3.5 h-3.5" />
          <span>Click any building</span>
        </div>

        {/* Walk Mode Quick Toggle Pill */}
        <div className="border-l border-white/10 pl-2">
          <button
            onClick={() => {
              soundManager.playSelect();
              onToggleCameraMode();
            }}
            className="flex items-center gap-1 text-emerald-300 hover:text-white bg-emerald-500/20 hover:bg-emerald-500/30 px-2 py-1 rounded-lg border border-emerald-500/40 text-[11px] font-bold cursor-pointer transition-colors"
            title="Switch to First-Person Walking Game Mode (WASD + Mouse Vision)"
          >
            <Footprints className="w-3 h-3" />
            <span>Walk Mode</span>
          </button>
        </div>
      </div>
    </div>
  );
};
