import React, { useState } from 'react';
import { MapPin, ChevronDown, ChevronUp, Layers } from 'lucide-react';
import { DISTRICTS } from '../../data/districts';
import { DistrictId } from '../../types';
import { soundManager } from '../../utils/sound';

interface MinimapProps {
  selectedDistrict: DistrictId;
  onSelectDistrict: (id: DistrictId) => void;
}

export const Minimap: React.FC<MinimapProps> = ({
  selectedDistrict,
  onSelectDistrict,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Map 3D coordinates [-22..22] to Minimap percentage coordinates [0..100%]
  // 3D coords: X is [-22, 22], Z is [-20, 20]
  const toMapPos = (x: number, z: number) => {
    const left = ((x + 22) / 44) * 100;
    const top = ((z + 20) / 40) * 100;
    return { left: `${Math.max(8, Math.min(92, left))}%`, top: `${Math.max(8, Math.min(92, top))}%` };
  };

  const districtList = Object.values(DISTRICTS);

  return (
    <div className="fixed bottom-4 right-4 z-30 pointer-events-auto select-none">
      <div className="bg-slate-900/85 backdrop-blur-md rounded-2xl border border-white/15 shadow-2xl overflow-hidden transition-all duration-300 w-44 sm:w-52">
        {/* Header */}
        <div
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center justify-between px-3 py-2 bg-slate-800/80 cursor-pointer border-b border-white/10 hover:bg-slate-800 transition-colors"
        >
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200 uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mini World Map</span>
          </div>
          <button className="text-slate-400 hover:text-white" aria-label="Toggle Minimap">
            {isCollapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Map Canvas Body */}
        {!isCollapsed && (
          <div className="relative w-full h-40 bg-slate-950/90 p-2 overflow-hidden">
            {/* Grid Lines */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:12px_12px]" />

            {/* Stylized River Canal Graphic */}
            <div
              className="absolute w-full h-4 bg-sky-500/25 rotate-25 -top-1 left-2 pointer-events-none blur-[1px]"
              style={{ transform: 'rotate(28deg)' }}
            />

            {/* Roads Layout Graphic */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-dashed border-slate-600/60 pointer-events-none" />

            {/* District Interactive Blips */}
            {districtList.map((district) => {
              const pos = toMapPos(district.position[0], district.position[2]);
              const isActive = selectedDistrict === district.id;

              return (
                <button
                  key={district.id}
                  onClick={() => {
                    soundManager.playSelect();
                    onSelectDistrict(district.id);
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group p-1 focus:outline-none cursor-pointer"
                  style={{ left: pos.left, top: pos.top }}
                  title={`${district.title} (${district.subtitle})`}
                >
                  {/* Outer pulse if active */}
                  {isActive && (
                    <span
                      className="absolute inset-0 rounded-full animate-ping opacity-75"
                      style={{ backgroundColor: district.color }}
                    />
                  )}

                  {/* Core Blip */}
                  <span
                    className={`block rounded-full transition-all duration-200 ${
                      isActive
                        ? 'w-3.5 h-3.5 shadow-md ring-2 ring-white'
                        : 'w-2.5 h-2.5 opacity-80 group-hover:opacity-100 group-hover:scale-125'
                    }`}
                    style={{ backgroundColor: district.color }}
                  />

                  {/* Tooltip on hover */}
                  <span className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-1.5 py-0.5 rounded bg-slate-900 text-[10px] font-semibold text-white whitespace-nowrap border border-white/20 shadow pointer-events-none z-10">
                    {district.title}
                  </span>
                </button>
              );
            })}

            {/* Compass Rose Indicator */}
            <div className="absolute bottom-1.5 left-2 text-[9px] font-mono text-slate-500 uppercase tracking-widest pointer-events-none">
              N &bull; ERIC WORLD
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
