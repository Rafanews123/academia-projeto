import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Activity, Dumbbell, User } from 'lucide-react';

interface ExerciseVisualizerProps {
  animationType: string;
  exerciseName: string;
  primaryMuscle: string;
}

export const ExerciseVisualizer: React.FC<ExerciseVisualizerProps> = ({
  animationType,
  exerciseName,
  primaryMuscle,
}) => {
  const [activePhase, setActivePhase] = useState<'phase1' | 'phase2'>('phase1');

  return (
    <div className="relative w-full rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 p-5 shadow-2xl overflow-hidden">
      {/* Header controls & badges */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-blue-500/15 text-blue-400 font-bold text-[10px] border border-blue-500/30 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-blue-400 animate-pulse" /> Boneco Anatômico & Equipamento Detalhado
          </span>
        </div>

        {/* Phase Toggle */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActivePhase('phase1')}
            className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
              activePhase === 'phase1'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Fase 1 (Início)
          </button>
          <button
            onClick={() => setActivePhase('phase2')}
            className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
              activePhase === 'phase2'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Fase 2 (Contração)
          </button>
        </div>
      </div>

      {/* Main Illustration Canvas with SVG Mannequin */}
      <div className="relative w-full h-72 sm:h-80 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-center p-4 overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0,transparent_70%)] pointer-events-none"></div>

        {/* BENCH PRESS SVG ILLUSTRATION */}
        {animationType === 'bench-press' && (
          <svg className="w-full h-full max-w-sm" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Rack vertical posts */}
            <rect x="50" y="30" width="8" height="140" rx="4" fill="#475569" />
            <rect x="242" y="30" width="8" height="140" rx="4" fill="#475569" />
            
            {/* Flat Bench */}
            <rect x="70" y="110" width="160" height="14" rx="4" fill="#334155" />
            <rect x="90" y="124" width="12" height="40" fill="#1e293b" />
            <rect x="198" y="124" width="12" height="40" fill="#1e293b" />

            {/* Human Mannequin lying down */}
            {/* Head */}
            <circle cx="105" cy="100" r="12" fill="#94a3b8" />
            {/* Torso with glowing pectoral muscle highlight */}
            <rect x="125" y="88" width="70" height="26" rx="8" fill="#64748b" />
            <ellipse cx="160" cy="101" rx="20" ry="10" fill={activePhase === 'phase1' ? '#f43f5e' : '#e11d48'} opacity="0.9" />
            {/* Arms holding barbell */}
            {activePhase === 'phase1' ? (
              <>
                {/* Arms extended up */}
                <path d="M140 88 L130 50" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
                <path d="M180 88 L190 50" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
                {/* Barbell at top */}
                <rect x="80" y="46" width="140" height="8" rx="4" fill="#e2e8f0" />
                <rect x="70" y="38" width="14" height="24" rx="4" fill="#3b82f6" />
                <rect x="216" y="38" width="14" height="24" rx="4" fill="#3b82f6" />
              </>
            ) : (
              <>
                {/* Arms down near chest */}
                <path d="M140 88 L145 70" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
                <path d="M180 88 L175 70" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
                {/* Barbell lowered */}
                <rect x="80" y="66" width="140" height="8" rx="4" fill="#e2e8f0" />
                <rect x="70" y="58" width="14" height="24" rx="4" fill="#3b82f6" />
                <rect x="216" y="58" width="14" height="24" rx="4" fill="#3b82f6" />
              </>
            )}
            {/* Legs */}
            <path d="M195 101 L230 135" stroke="#cbd5e1" strokeWidth="10" strokeLinecap="round" />
          </svg>
        )}

        {/* SQUAT SVG ILLUSTRATION */}
        {animationType === 'squat' && (
          <svg className="w-full h-full max-w-sm" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Ground */}
            <line x1="60" y1="170" x2="240" y2="170" stroke="#475569" strokeWidth="4" strokeLinecap="round" />

            {/* Human Mannequin */}
            {activePhase === 'phase1' ? (
              <>
                {/* Standing Up Phase */}
                <circle cx="150" cy="40" r="12" fill="#94a3b8" />
                <rect x="140" y="56" width="20" height="50" rx="6" fill="#10b981" opacity="0.8" />
                {/* Barbell on shoulders */}
                <rect x="90" y="52" width="120" height="8" rx="4" fill="#e2e8f0" />
                <circle cx="85" cy="56" r="14" fill="#3b82f6" />
                <circle cx="215" cy="56" r="14" fill="#3b82f6" />
                {/* Legs straight */}
                <path d="M145 106 L140 170" stroke="#cbd5e1" strokeWidth="10" strokeLinecap="round" />
                <path d="M155 106 L160 170" stroke="#cbd5e1" strokeWidth="10" strokeLinecap="round" />
              </>
            ) : (
              <>
                {/* Deep Squat Phase */}
                <circle cx="150" cy="70" r="12" fill="#94a3b8" />
                <rect x="140" y="86" width="20" height="40" rx="6" fill="#10b981" opacity="0.9" />
                {/* Barbell lowered */}
                <rect x="90" y="82" width="120" height="8" rx="4" fill="#e2e8f0" />
                <circle cx="85" cy="86" r="14" fill="#3b82f6" />
                <circle cx="215" cy="86" r="14" fill="#3b82f6" />
                {/* Legs bent */}
                <path d="M145 126 L120 150 L140 170" stroke="#cbd5e1" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M155 126 L180 150 L160 170" stroke="#cbd5e1" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
              </>
            )}
          </svg>
        )}

        {/* LAT PULLDOWN SVG ILLUSTRATION */}
        {animationType === 'lat-pulldown' && (
          <svg className="w-full h-full max-w-sm" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Cable Machine Frame */}
            <rect x="130" y="10" width="40" height="170" rx="4" fill="#334155" />
            <path d="M150 10 L80 10 L80 60" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
            
            {/* Bench */}
            <rect x="110" y="125" width="80" height="12" rx="4" fill="#1e293b" />

            {/* Mannequin sitting */}
            <circle cx="150" cy="85" r="10" fill="#94a3b8" />
            <rect x="140" y="98" width="20" height="35" rx="6" fill="#3b82f6" opacity="0.9" />

            {/* Pulldown Bar & Cable */}
            {activePhase === 'phase1' ? (
              <>
                <line x1="150" y1="10" x2="150" y2="40" stroke="#94a3b8" strokeWidth="3" />
                <rect x="90" y="40" width="120" height="6" rx="3" fill="#e2e8f0" />
                <path d="M140 98 L100 45" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
                <path d="M160 98 L200 45" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
              </>
            ) : (
              <>
                <line x1="150" y1="10" x2="150" y2="70" stroke="#94a3b8" strokeWidth="3" />
                <rect x="90" y="70" width="120" height="6" rx="3" fill="#e2e8f0" />
                <path d="M140 98 L110 75" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
                <path d="M160 98 L190 75" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
              </>
            )}
          </svg>
        )}

        {/* DEFAULT ANATOMICAL MANNEQUIN */}
        {animationType !== 'bench-press' && animationType !== 'squat' && animationType !== 'lat-pulldown' && (
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 mb-3 shadow-xl">
              <User className="w-10 h-10" />
            </div>
            <h4 className="font-bold text-sm text-white">{exerciseName}</h4>
            <span className="text-xs text-emerald-400 mt-1 font-semibold">
              {activePhase === 'phase1' ? 'Fase 1: Início / Alongamento' : 'Fase 2: Contração / Pico'}
            </span>
          </div>
        )}
      </div>

      {/* Description Footer */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 mt-3 pt-3 border-t border-slate-800">
        <span>Boneco Anatômico 3D • Equipamentos e Fases 1 e 2</span>
        <span className="text-blue-400 font-bold">MEU TREINO PRO</span>
      </div>
    </div>
  );
};
