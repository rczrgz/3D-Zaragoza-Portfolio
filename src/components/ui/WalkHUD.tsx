import React from 'react';
import { Compass, Footprints, MousePointer, Sparkles, Key, Eye } from 'lucide-react';
import { DISTRICTS } from '../../data/districts';
import { DistrictId } from '../../types';
import { soundManager } from '../../utils/sound';

interface WalkHUDProps {
  nearbyDistrict: DistrictId | null;
  onInteract: (districtId: DistrictId) => void;
  onSwitchToOrbit: () => void;
}

export const WalkHUD: React.FC<WalkHUDProps> = ({
  nearbyDistrict,
  onInteract,
  onSwitchToOrbit,
}) => {
  const district = nearbyDistrict ? DISTRICTS[nearbyDistrict] : null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-4 sm:p-6 select-none">
      {/* Center Reticle / Crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
        <div className="w-2.5 h-2.5 rounded-full border border-white/80 bg-white/30 backdrop-blur-sm shadow-sm" />
        <div className="absolute w-6 h-[1px] bg-white/40" />
        <div className="absolute h-6 w-[1px] bg-white/40" />
      </div>

      {/* Top Banner: Mode Indicator & Exit Button */}
      <div className="flex items-center justify-between">
        <div className="pointer-events-auto flex items-center gap-2 bg-slate-900/85 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-emerald-500/30 text-white shadow-xl">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-bold text-emerald-300">WALK / GAME MODE</span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">&bull; 1st-Person Perspective</span>
        </div>

        <button
          onClick={() => {
            soundManager.playSelect();
            onSwitchToOrbit();
          }}
          className="pointer-events-auto flex items-center gap-2 bg-slate-900/85 hover:bg-slate-900 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/20 text-slate-200 hover:text-white shadow-xl transition-all cursor-pointer hover:scale-105 active:scale-95"
        >
          <Compass className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-bold">Exit to Aerial Orbit</span>
        </button>
      </div>

      {/* Interactive Proximity Callout (Shows up when walking close to any building!) */}
      <div className="flex flex-col items-center justify-center my-auto">
        {district && (
          <div className="pointer-events-auto animate-bounce p-0.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-sky-400 to-indigo-500 shadow-2xl">
            <button
              onClick={() => {
                soundManager.playSelect();
                onInteract(district.id);
              }}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-900/95 hover:bg-slate-900 text-white backdrop-blur-md transition-all cursor-pointer group"
            >
              <div
                className="w-3.5 h-3.5 rounded-full ring-2 ring-white/50"
                style={{ backgroundColor: district.color }}
              />
              <div className="text-left">
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  Nearby Location
                </div>
                <div className="text-sm font-extrabold flex items-center gap-1.5 text-white">
                  <span>{district.title}</span>
                  <span className="text-xs font-medium text-slate-400">({district.subtitle})</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 ml-2 px-2.5 py-1 rounded-xl bg-emerald-500 text-white text-xs font-extrabold shadow">
                <kbd className="font-mono text-xs">E</kbd>
                <span className="hidden sm:inline">or Click to View</span>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Controls HUD Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Game Movement Keys Bar */}
        <div className="pointer-events-auto bg-slate-900/85 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 text-slate-200 shadow-xl flex items-center gap-3 text-xs font-semibold flex-wrap">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <div className="flex items-center gap-0.5 font-mono text-[11px] bg-slate-800 px-1.5 py-0.5 rounded border border-white/10">
              WASD / Arrows
            </div>
            <span>Walk</span>
          </div>

          <span className="text-slate-600">•</span>

          <div className="flex items-center gap-1.5 text-sky-400">
            <Eye className="w-3.5 h-3.5" />
            <span>Mouse to Look</span>
          </div>

          <span className="text-slate-600">•</span>

          <div className="flex items-center gap-1.5 text-amber-400">
            <div className="font-mono text-[11px] bg-slate-800 px-1.5 py-0.5 rounded border border-white/10">
              Shift
            </div>
            <span>Sprint</span>
          </div>

          <span className="text-slate-600">•</span>

          <div className="flex items-center gap-1.5 text-indigo-400">
            <div className="font-mono text-[11px] bg-slate-800 px-1.5 py-0.5 rounded border border-white/10">
              Space
            </div>
            <span>Jump</span>
          </div>
        </div>

        {/* Vision hint / tip */}
        <div className="pointer-events-auto bg-slate-900/70 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/10 text-slate-400 text-[11px] flex items-center gap-1.5">
          <MousePointer className="w-3.5 h-3.5 text-emerald-400" />
          <span>Click canvas to lock cursor &bull; Esc to unlock</span>
        </div>
      </div>
    </div>
  );
};
