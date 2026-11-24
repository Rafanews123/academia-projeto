import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, Check, Plus, SkipForward, Clock, Dumbbell, ArrowLeft, Award, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WorkoutProgram, Exercise, WorkoutSession, WorkoutExerciseSession, WorkoutSetLog } from '../types';

interface ActiveWorkoutModalProps {
  program: WorkoutProgram;
  dayIndex: number;
  exercisesLibrary: Exercise[];
  onFinishWorkout: (session: WorkoutSession) => void;
  onCancelWorkout: () => void;
}

export const ActiveWorkoutModal: React.FC<ActiveWorkoutModalProps> = ({
  program,
  dayIndex,
  exercisesLibrary,
  onFinishWorkout,
  onCancelWorkout,
}) => {
  const daySchedule = program.schedule[dayIndex] || program.schedule[0];

  // Workout state
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);

  // Exercise sessions state initialized from daySchedule
  const [exerciseSessions, setExerciseSessions] = useState<WorkoutExerciseSession[]>(
    daySchedule.exercises.map((item) => {
      const exObj = exercisesLibrary.find((e) => e.id === item.exerciseId);
      const setsArr: WorkoutSetLog[] = [];
      for (let i = 1; i <= item.sets; i++) {
        setsArr.push({
          setNumber: i,
          weight: 60, // default placeholder or last recorded
          reps: parseInt(item.targetReps) || 10,
          completed: false,
        });
      }
      return {
        exerciseId: item.exerciseId,
        exerciseName: exObj ? exObj.name : 'Exercício',
        sets: setsArr,
        notes: '',
      };
    })
  );

  const [workoutNotes, setWorkoutNotes] = useState('');
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  // Rest Timer State
  const [restTimerSeconds, setRestTimerSeconds] = useState<number | null>(null);

  // Session timer effect
  useEffect(() => {
    if (isPaused || showSummaryModal) return;
    const interval = setInterval(() => {
      setSessionSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused, showSummaryModal]);

  // Rest timer effect
  useEffect(() => {
    if (restTimerSeconds === null || restTimerSeconds <= 0) return;
    const interval = setInterval(() => {
      setRestTimerSeconds((s) => (s !== null && s > 0 ? s - 1 : null));
    }, 1000);
    return () => clearInterval(interval);
  }, [restTimerSeconds]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSetToggle = (exIdx: number, setIdx: number) => {
    const updated = [...exerciseSessions];
    const targetSet = updated[exIdx].sets[setIdx];
    targetSet.completed = !targetSet.completed;
    setExerciseSessions(updated);

    if (targetSet.completed) {
      // Trigger default 60s rest timer
      setRestTimerSeconds(60);
    }
  };

  const handleWeightChange = (exIdx: number, setIdx: number, val: number) => {
    const updated = [...exerciseSessions];
    updated[exIdx].sets[setIdx].weight = val;
    setExerciseSessions(updated);
  };

  const handleRepsChange = (exIdx: number, setIdx: number, val: number) => {
    const updated = [...exerciseSessions];
    updated[exIdx].sets[setIdx].reps = val;
    setExerciseSessions(updated);
  };

  const handleAddSet = (exIdx: number) => {
    const updated = [...exerciseSessions];
    const sets = updated[exIdx].sets;
    const lastSet = sets[sets.length - 1];
    sets.push({
      setNumber: sets.length + 1,
      weight: lastSet ? lastSet.weight : 50,
      reps: lastSet ? lastSet.reps : 10,
      completed: false,
    });
    setExerciseSessions(updated);
  };

  const handleCompleteWorkout = () => {
    // Calculate total volume
    let totalVol = 0;
    let completedSetsCount = 0;
    exerciseSessions.forEach((ex) => {
      ex.sets.forEach((s) => {
        if (s.completed) {
          totalVol += s.weight * s.reps;
          completedSetsCount++;
        }
      });
    });

    const session: WorkoutSession = {
      id: `sess-${Date.now()}`,
      programId: program.id,
      programName: program.name,
      workoutName: daySchedule.workoutName,
      date: new Date().toISOString(),
      durationSeconds: sessionSeconds,
      exercises: exerciseSessions,
      notes: workoutNotes,
      volumeTotal: totalVol,
      prsCount: completedSetsCount > 0 ? 1 : 0,
    };

    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });

    onFinishWorkout(session);
  };

  const currentExSession = exerciseSessions[currentExerciseIdx];
  const currentExObj = exercisesLibrary.find((e) => e.id === currentExSession?.exerciseId);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col overflow-hidden animate-in fade-in duration-200">
      {/* Top Active Bar */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between shrink-0">
        <button
          onClick={() => {
            if (confirm('Deseja realmente abandonar o treino em andamento? O progresso não salvo será perdido.')) {
              onCancelWorkout();
            }
          }}
          className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5 text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" /> Sair
        </button>

        <div className="text-center">
          <h2 className="text-xs sm:text-sm font-black text-white truncate max-w-[200px] sm:max-w-xs">
            {daySchedule.workoutName}
          </h2>
          <div className="flex items-center justify-center gap-1.5 text-blue-400 font-bold text-xs">
            <Clock className="w-3.5 h-3.5 animate-pulse" />
            {formatTimer(sessionSeconds)}
          </div>
        </div>

        <button
          onClick={() => setShowSummaryModal(true)}
          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/25 flex items-center gap-1"
        >
          <Check className="w-4 h-4" /> Concluir
        </button>
      </header>

      {/* Rest Timer Banner */}
      {restTimerSeconds !== null && restTimerSeconds > 0 && (
        <div className="bg-blue-600 text-white px-4 py-2.5 flex items-center justify-between shadow-lg shrink-0 animate-in slide-in-from-top duration-200">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 animate-spin" />
            <span className="text-xs sm:text-sm font-bold">
              Descanso entre séries: <strong className="text-base">{restTimerSeconds}s</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setRestTimerSeconds((s) => (s !== null ? s + 30 : 30))}
              className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-xs font-bold"
            >
              +30s
            </button>
            <button
              onClick={() => setRestTimerSeconds(null)}
              className="px-2.5 py-1 rounded-lg bg-white text-blue-700 text-xs font-bold flex items-center gap-1"
            >
              <SkipForward className="w-3.5 h-3.5" /> Pular
            </button>
          </div>
        </div>
      )}

      {/* Main Body */}
      <div className="flex-1 overflow-y-auto p-4 max-w-2xl mx-auto w-full space-y-6">
        {/* Exercise Switcher Carousel Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {exerciseSessions.map((ex, idx) => {
            const isSelected = currentExerciseIdx === idx;
            const allDone = ex.sets.every((s) => s.completed);
            return (
              <button
                key={idx}
                onClick={() => setCurrentExerciseIdx(idx)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-2 ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/30'
                    : allDone
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                {allDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                <span>{idx + 1}. {ex.exerciseName.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Current Exercise Active Card */}
        {currentExSession && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20">
                  Exercício {currentExerciseIdx + 1} de {exerciseSessions.length}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white mt-1.5">
                  {currentExSession.exerciseName}
                </h3>
                {currentExObj && (
                  <p className="text-xs text-slate-400 mt-0.5">
                    Equipamento: <strong className="text-slate-200">{currentExObj.equipment}</strong> • Músculo: <strong className="text-slate-200">{currentExObj.primaryMuscle}</strong>
                  </p>
                )}
              </div>
            </div>

            {/* Sets Logging Table */}
            <div className="space-y-3">
              <div className="grid grid-cols-12 gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">
                <div className="col-span-2 text-center">Série</div>
                <div className="col-span-4 text-center">Carga (kg)</div>
                <div className="col-span-3 text-center">Reps</div>
                <div className="col-span-3 text-center">Feito</div>
              </div>

              {currentExSession.sets.map((set, setIdx) => (
                <div
                  key={set.setNumber}
                  className={`grid grid-cols-12 gap-2 items-center p-2.5 rounded-2xl border transition-all ${
                    set.completed
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : 'bg-slate-800/60 border-slate-700/50'
                  }`}
                >
                  <div className="col-span-2 text-center font-bold text-white text-xs">
                    #{set.setNumber}
                  </div>

                  <div className="col-span-4">
                    <input
                      type="number"
                      step="0.5"
                      min={0}
                      value={set.weight}
                      onChange={(e) => handleWeightChange(currentExerciseIdx, setIdx, Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 text-center text-white font-bold text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="col-span-3">
                    <input
                      type="number"
                      min={0}
                      value={set.reps}
                      onChange={(e) => handleRepsChange(currentExerciseIdx, setIdx, Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 text-center text-white font-bold text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="col-span-3 flex justify-center">
                    <button
                      onClick={() => handleSetToggle(currentExerciseIdx, setIdx)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                        set.completed
                          ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-105'
                          : 'bg-slate-700 hover:bg-slate-600 text-slate-400'
                      }`}
                    >
                      <Check className={`w-5 h-5 ${set.completed ? 'stroke-[3]' : ''}`} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleAddSet(currentExerciseIdx)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-400 font-bold text-xs border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" /> Adicionar Série
            </button>
          </div>
        )}
      </div>

      {/* Completion Summary Modal */}
      {showSummaryModal && (
        <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto mb-3 shadow-xl shadow-emerald-500/20">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-white">Treino Concluído com Sucesso!</h3>
              <p className="text-xs text-slate-400 mt-1">Parabéns por mais uma sessão concluída rumo aos seus objetivos.</p>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 text-center">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Tempo Total</span>
                <span className="text-base font-black text-white">{formatTimer(sessionSeconds)}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Volume Total</span>
                <span className="text-base font-black text-emerald-400">
                  {exerciseSessions.reduce((acc, ex) => acc + ex.sets.reduce((a, s) => a + (s.completed ? s.weight * s.reps : 0), 0), 0)} kg
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Notas da Sessão (Opcional)</label>
              <textarea
                rows={2}
                placeholder="Ex: Ótima disposição, aumentei a carga no supino..."
                value={workoutNotes}
                onChange={(e) => setWorkoutNotes(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-blue-500"
              ></textarea>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowSummaryModal(false)}
                className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
              >
                Voltar
              </button>
              <button
                onClick={handleCompleteWorkout}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-xs font-bold shadow-lg shadow-emerald-600/30"
              >
                Salvar & Finalizar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
