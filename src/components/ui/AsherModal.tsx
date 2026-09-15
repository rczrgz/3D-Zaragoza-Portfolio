import React, { useState } from 'react';
import {
  X,
  Heart,
  Camera,
  Sparkles,
  Award,
  Volume2,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Info,
  Smile,
  ShieldCheck,
} from 'lucide-react';
import { soundManager } from '../../utils/sound';
import asher1 from '../../assets/images/Asher1.jpg';
import asher2 from '../../assets/images/Asher2.jpg';
import asher3 from '../../assets/images/Asher3.jpg';
import asher4 from '../../assets/images/Asher4.jpg';

interface AsherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CatPhoto {
  id: string;
  url: string;
  title: string;
  caption: string;
  isCustom?: boolean;
}

// Asher's official photo gallery (Uploaded by Eric)
const DEFAULT_ASHER_PHOTOS: CatPhoto[] = [
  {
    id: 'asher-photobooth',
    url: asher1,
    title: 'Signature Photobooth Strip 🐾',
    caption: 'Four-cut photo booth memories with Eric and family — Asher stealing the spotlight in every shot!',
  },
  {
    id: 'asher-cafe',
    url: asher4,
    title: 'Cafe Day Out • Best Dressed',
    caption: 'Asher visiting LB Cafe in his dapper navy blue polo shirt, relaxing beside iced coffee and matcha.',
  },
  {
    id: 'asher-outdoor-kiss',
    url: asher3,
    title: 'Night Garden Snuggles',
    caption: 'Evening stroll under fairy lights wearing his cute white collar and getting loving cheek kisses.',
  },
  {
    id: 'asher-nap',
    url: asher2,
    title: 'Full Sploot Nap Mode',
    caption: 'Completely stretched out flat recharging on the marble bedding with star blanket. 99.8% nap efficiency.',
  },
];

export const AsherModal: React.FC<AsherModalProps> = ({ isOpen, onClose }) => {
  const [photos] = useState<CatPhoto[]>(DEFAULT_ASHER_PHOTOS);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'photos' | 'about'>('photos');
  const [petsCount, setPetsCount] = useState<number>(() => {
    const saved = localStorage.getItem('asher_pet_count');
    return saved ? parseInt(saved, 10) : 42;
  });
  const [heartPops, setHeartPops] = useState<{ id: number; x: number; y: number }[]>([]);

  if (!isOpen) return null;

  const handlePetAsher = (e: React.MouseEvent) => {
    soundManager.playPurr();
    soundManager.playMeow();
    const newCount = petsCount + 1;
    setPetsCount(newCount);
    localStorage.setItem('asher_pet_count', newCount.toString());

    // Generate floating heart effect at click point
    const rect = e.currentTarget.getBoundingClientRect();
    const newHeart = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setHeartPops((prev) => [...prev.slice(-5), newHeart]);
    setTimeout(() => {
      setHeartPops((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-[160] flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md transition-all animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="relative bg-gradient-to-r from-amber-600/30 via-slate-800 to-rose-600/30 p-5 sm:p-6 border-b border-white/10 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-800 border-2 border-amber-400/50 shadow-lg shrink-0 overflow-hidden relative group">
              <img
                src={asher4}
                alt="Asher the British Shorthair"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-amber-500/10 group-hover:bg-transparent transition-colors" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Asher
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  British Shorthair
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  🐾 Plaza Roamer
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                Eric’s faithful companion, Chief Morale Officer &amp; Full-Stack Code Reviewer
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={() => {
              soundManager.playClose();
              onClose();
            }}
            className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/10 transition-all cursor-pointer hover:scale-105 active:scale-95 shrink-0"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher & Quick Actions Bar */}
        <div className="px-5 sm:px-6 py-3 bg-slate-900/90 border-b border-white/5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveTab('photos');
                soundManager.playSelect();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'photos'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Photos ({photos.length})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('about');
                soundManager.playSelect();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'about'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>Bio &amp; Stats</span>
            </button>
          </div>

          {/* Interactive Petting Control */}
          <div className="flex items-center gap-2 relative">
            <button
              onClick={handlePetAsher}
              className="relative px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-extrabold shadow-lg shadow-rose-900/30 transition-all cursor-pointer hover:scale-105 active:scale-95 flex items-center gap-1.5 overflow-hidden"
              title="Click to give Asher a gentle pet!"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>Pet Asher</span>
              <span className="bg-black/30 px-1.5 py-0.5 rounded-full text-[10px] font-mono">
                {petsCount}
              </span>

              {/* Floating Heart Animations */}
              {heartPops.map((h) => (
                <span
                  key={h.id}
                  className="absolute pointer-events-none text-sm animate-ping"
                  style={{ left: h.x, top: h.y }}
                >
                  ❤️
                </span>
              ))}
            </button>

            <button
              onClick={() => soundManager.playMeow()}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-amber-300 border border-white/10 transition-all cursor-pointer"
              title="Listen to Asher meow!"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'photos' ? (
            <div className="space-y-5">
              {/* Photo Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {photos.map((photo, idx) => (
                  <div
                    key={photo.id}
                    onClick={() => {
                      setSelectedPhotoIndex(idx);
                      soundManager.playSelect();
                    }}
                    className="group relative rounded-2xl overflow-hidden bg-slate-800/60 border border-white/10 hover:border-amber-400/50 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-amber-500/10"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-slate-950">
                      <img
                        src={photo.url}
                        alt={photo.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Caption bar */}
                    <div className="p-3 bg-slate-900/90 border-t border-white/10">
                      <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                        {photo.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {photo.caption}
                      </p>
                    </div>

                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="p-1 rounded-lg bg-slate-950/80 text-white flex items-center gap-1 text-[10px] px-2 py-0.5 font-semibold">
                        <Maximize2 className="w-3 h-3 text-amber-400" />
                        View
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Bio & Breed Information Tab */
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-white/10 flex flex-col items-center text-center">
                  <Award className="w-6 h-6 text-amber-400 mb-2" />
                  <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Breed</span>
                  <span className="text-sm font-bold text-white mt-0.5">British Shorthair</span>
                  <span className="text-[10px] text-slate-400">Classic Blue / Lilac</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/60 border border-white/10 flex flex-col items-center text-center">
                  <Smile className="w-6 h-6 text-rose-400 mb-2" />
                  <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Temperament</span>
                  <span className="text-sm font-bold text-white mt-0.5">Calm &amp; Affectionate</span>
                  <span className="text-[10px] text-slate-400">Plush &amp; easygoing</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/60 border border-white/10 flex flex-col items-center text-center">
                  <ShieldCheck className="w-6 h-6 text-emerald-400 mb-2" />
                  <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Role</span>
                  <span className="text-sm font-bold text-white mt-0.5">Chief Morale Officer</span>
                  <span className="text-[10px] text-slate-400">Full-Stack Bug Patrol</span>
                </div>
              </div>

              {/* Story Description */}
              <div className="p-5 rounded-2xl bg-slate-800/40 border border-white/10 space-y-3">
                <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                  <span>🐾 Meet Asher</span>
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Asher is Eric’s beloved British Shorthair, recognized for his plush blue-grey coat, chubby cheeks, and copper eyes. While Eric builds high-performance web systems and Shopify stores, Asher provides steadfast companionship and essential supervision.
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  You can spot him roaming smoothly around the 3D portfolio island’s central plaza, soaking up the virtual sunlight and greeting visitors who explore the world!
                </p>
              </div>

              {/* Fun Metrics */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Operational Metrics
                </h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-300">Nap Efficiency</span>
                      <span className="text-amber-400">99.8%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 w-[99.8%] rounded-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-300">Keyboard Warmer Availability</span>
                      <span className="text-rose-400">100%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-rose-500 to-pink-500 w-full rounded-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-300">Bug Catch Rate</span>
                      <span className="text-emerald-400">94.5%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 w-[94.5%] rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-900 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Asher is happily roaming the plaza right now.</span>
          </div>

          <button
            onClick={() => {
              soundManager.playClose();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-all cursor-pointer ml-auto"
          >
            Back to Island
          </button>
        </div>
      </div>

      {/* Lightbox / Fullscreen Image Viewer */}
      {selectedPhotoIndex !== null && photos[selectedPhotoIndex] && (
        <div
          className="fixed inset-0 z-[180] bg-black/95 flex flex-col items-center justify-center p-4"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            title="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Nav buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPhotoIndex((prev) =>
                prev !== null ? (prev - 1 + photos.length) % photos.length : 0
              );
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPhotoIndex((prev) =>
                prev !== null ? (prev + 1) % photos.length : 0
              );
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            className="max-w-4xl max-h-[80vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[selectedPhotoIndex].url}
              alt={photos[selectedPhotoIndex].title}
              referrerPolicy="no-referrer"
              className="max-h-[72vh] max-w-full object-contain rounded-2xl shadow-2xl border border-white/20"
            />
            <div className="mt-3 text-center">
              <h3 className="text-base font-bold text-white">
                {photos[selectedPhotoIndex].title}
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                {photos[selectedPhotoIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
