import React from 'react';
import { Compass, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  progress: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900 text-slate-100 p-6 select-none">
      <div className="relative mb-8">
        {/* Animated 3D low-poly isometric logo wireframe */}
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500 to-sky-600 flex items-center justify-center shadow-2xl shadow-emerald-500/30 animate-pulse">
          <Compass className="w-12 h-12 text-white animate-spin" style={{ animationDuration: '8s' }} />
        </div>
        <div className="absolute -top-2 -right-2 p-1.5 rounded-full bg-amber-400 text-slate-900 shadow">
          <Sparkles className="w-4 h-4" />
        </div>
      </div>

      <h1 className="text-3xl font-extrabold tracking-wider mb-1 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-sky-300 to-indigo-300">
        ERIC&apos;S WORLD
      </h1>
      <p className="text-sm text-slate-400 font-medium mb-6">
        Loading interactive 3D developer portfolio...
      </p>

      {/* Progress Bar Container */}
      <div className="w-64 sm:w-80 h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700/60 p-0.5 shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-sky-400 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${Math.max(progress, 15)}%` }}
        />
      </div>

      <div className="mt-3 text-xs font-mono text-slate-500">
        {Math.round(progress)}% loaded
      </div>

      <div className="mt-8 flex items-center gap-2 text-xs text-slate-500">
        <span>Low-poly 3D world built with Three.js &amp; React</span>
      </div>
    </div>
  );
};
