import React from 'react';
import { X, Heart, Dumbbell, ShieldAlert, CheckCircle2, ArrowRight, Layers } from 'lucide-react';
import { Exercise } from '../types';
import { ExerciseVisualizer } from './ExerciseVisualizer';

interface ExerciseDetailModalProps {
  exercise: Exercise | null;
  exercisesLibrary?: Exercise[];
  onClose: () => void;
  onToggleFavorite: (id: string) => void;
  onSelectAlternative?: (altId: string) => void;
}

export const ExerciseDetailModal: React.FC<ExerciseDetailModalProps> = ({
  exercise,
  exercisesLibrary = [],
  onClose,
  onToggleFavorite,
  onSelectAlternative,
}) => {
  if (!exercise) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 w-full sm:max-w-2xl rounded-t-3xl sm:rounded-3xl max-h-[92vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom duration-300">
        
        {/* Header Visual Box */}
        <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-6 border-b border-slate-800">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(exercise.id)}
              className={`p-2.5 rounded-2xl border transition-colors ${
                exercise.isFavorite
                  ? 'bg-rose-500/15 text-rose-500 border-rose-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${exercise.isFavorite ? 'fill-rose-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-2xl bg-slate-800 text-slate-400 border border-slate-700 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">
              {exercise.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700">
              {exercise.equipment}
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold border border-amber-500/20">
              {exercise.difficulty}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white">{exercise.name}</h2>
          
          <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-300">
            <div><strong className="text-white">Músculo Principal:</strong> {exercise.primaryMuscle}</div>
            <div><strong className="text-white">Séries sugeridas:</strong> {exercise.defaultSets} x {exercise.defaultReps}</div>
          </div>
        </div>

        {/* Biomechanical Precision Visualizer Suite */}
        <div className="p-5 border-b border-slate-800 bg-slate-950">
          <ExerciseVisualizer
            animationType={exercise.animationType}
            exerciseName={exercise.name}
            primaryMuscle={exercise.primaryMuscle}
          />
        </div>

        {/* Content Details */}
        <div className="p-6 space-y-6">
          {/* Setup / Posição Inicial */}
          <div>
            <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Dumbbell className="w-4 h-4" /> Posição Inicial e Ajuste
            </h3>
            <p className="text-sm text-slate-300 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 leading-relaxed">
              {exercise.setupPosition}
            </p>
          </div>

          {/* Execution Steps */}
          <div>
            <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Execução Passo a Passo
            </h3>
            <div className="space-y-2.5">
              {exercise.executionSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-slate-800/40 p-3.5 rounded-2xl border border-slate-700/40">
                  <span className="w-6 h-6 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-blue-600/30">
                    {idx + 1}
                  </span>
                  <p className="text-sm text-slate-200">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Breathing & Range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/40">
              <h4 className="font-bold text-xs text-slate-300 uppercase mb-1">Respiração</h4>
              <p className="text-xs text-slate-400">{exercise.breathing}</p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/40">
              <h4 className="font-bold text-xs text-slate-300 uppercase mb-1">Amplitude Recomendada</h4>
              <p className="text-xs text-slate-400">{exercise.rangeOfMotion}</p>
            </div>
          </div>

          {/* Common Mistakes */}
          <div>
            <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" /> Erros Comuns a Evitar
            </h3>
            <ul className="space-y-2">
              {exercise.commonMistakes.map((mistake, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 bg-rose-500/5 p-3 rounded-xl border border-rose-500/15">
                  <span className="text-rose-400 font-bold">•</span>
                  {mistake}
                </li>
              ))}
            </ul>
          </div>

          {/* Tips */}
          {exercise.tips && exercise.tips.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                Dicas de Ouro do Treinador
              </h3>
              <ul className="space-y-2">
                {exercise.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 bg-emerald-500/5 p-3 rounded-xl border border-emerald-500/15">
                    <span className="text-emerald-400 font-bold">✓</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Alternative Exercises */}
          {exercise.alternatives && exercise.alternatives.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-purple-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4" /> Exercícios Alternativos Equivalentes
              </h3>
              <div className="flex flex-wrap gap-2">
                {exercise.alternatives.map((altId) => {
                  const altObj = exercisesLibrary.find((e) => e.id === altId);
                  if (!altObj) return null;
                  return (
                    <button
                      key={altId}
                      onClick={() => {
                        if (onSelectAlternative) onSelectAlternative(altId);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5"
                    >
                      <span>{altObj.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-end sticky bottom-0">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
          >
            Fechar Guia <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
