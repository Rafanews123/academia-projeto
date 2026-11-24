import React from 'react';
import { Play, Calendar, TrendingUp, Dumbbell, Award, ArrowRight, CheckCircle2 } from 'lucide-react';
import { WorkoutProgram, UserProfile, WorkoutSession, PersonalRecord } from '../types';

interface TabInicioProps {
  profile: UserProfile;
  programs: WorkoutProgram[];
  sessions: WorkoutSession[];
  prs: PersonalRecord[];
  onStartWorkout: (programId: string, dayIndex: number) => void;
  setActiveTab: (tab: 'inicio' | 'treinos' | 'exercicios' | 'evolucao' | 'perfil') => void;
}

export const TabInicio: React.FC<TabInicioProps> = ({
  profile,
  programs,
  sessions,
  prs,
  onStartWorkout,
  setActiveTab,
}) => {
  const activeProgram = programs.find((p) => p.id === profile.activeProgramId) || programs[0];

  // Today's day of week matching Portuguese
  const todayName = new Date().toLocaleDateString('pt-BR', { weekday: 'long' });
  // Capitalize first letter
  const formattedToday = todayName.charAt(0).toUpperCase() + todayName.slice(1);

  // Find workout for today in active program, or fallback to first
  const todayWorkoutIndex = activeProgram?.schedule.findIndex(
    (s) => s.dayOfWeek.toLowerCase() === formattedToday.toLowerCase()
  );
  const currentWorkout =
    todayWorkoutIndex !== undefined && todayWorkoutIndex >= 0
      ? activeProgram.schedule[todayWorkoutIndex]
      : activeProgram?.schedule[0];

  const workoutsThisWeek = sessions.length; // simplified or filtered by current week
  const plannedWeekly = activeProgram?.daysPerWeek || 3;
  const progressPercent = Math.min(100, Math.round((workoutsThisWeek / plannedWeekly) * 100));

  const recentPR = prs[prs.length - 1];

  return (
    <div className="space-y-6 pb-24">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-900/40 via-slate-900 to-slate-900 border border-slate-800/80 rounded-3xl p-5 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.15),transparent_70%)] pointer-events-none"></div>
        <div className="flex items-center justify-between">
          <div>
            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 font-semibold text-xs border border-blue-500/20">
              {profile.goal} • {profile.experience}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
              Olá, {profile.name}! 💪
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Pronto para superar seus limites hoje? Seu programa ativo é o <strong className="text-white">{activeProgram.name}</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Weekly Summary Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            <h3 className="font-bold text-white text-sm sm:text-base">Resumo Semanal</h3>
          </div>
          <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-xl border border-blue-500/20">
            {workoutsThisWeek} de {plannedWeekly} treinos
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden mb-4">
          <div
            className="bg-gradient-to-r from-blue-600 to-emerald-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        {/* Week Days Bubbles */}
        <div className="grid grid-cols-7 gap-1.5 text-center">
          {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((day, idx) => {
            const isCompleted = idx < workoutsThisWeek;
            return (
              <div
                key={day}
                className={`flex flex-col items-center justify-center py-2.5 rounded-2xl border transition-all ${
                  isCompleted
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-slate-800/50 border-slate-700/50 text-slate-400'
                }`}
              >
                <span className="text-[10px] font-bold uppercase">{day}</span>
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 mt-1 text-emerald-400" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-2"></span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Today's Workout Featured Card */}
      {currentWorkout && (
        <div className="bg-gradient-to-br from-blue-950/60 via-slate-900 to-slate-900 border border-blue-500/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Dumbbell className="w-28 h-28 text-blue-400" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <span className="px-3 py-1 rounded-full bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/30">
                Treino de Hoje • {currentWorkout.dayOfWeek}
              </span>
              <span className="text-xs text-slate-400">
                ~{activeProgram.estimatedDurationMin} min
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-white mt-1">
              {currentWorkout.workoutName}
            </h3>

            <div className="flex flex-wrap gap-2 my-3">
              {currentWorkout.focusMuscles.map((m, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-lg bg-slate-800 text-slate-300 text-xs border border-slate-700"
                >
                  {m}
                </span>
              ))}
            </div>

            <p className="text-xs text-slate-400 mb-5">
              {currentWorkout.exercises.length} exercícios planejados com cargas progressivas e descanso automático.
            </p>

            <button
              onClick={() => {
                const dayIdx = activeProgram.schedule.findIndex(
                  (s) => s.dayOfWeek === currentWorkout.dayOfWeek
                );
                onStartWorkout(activeProgram.id, dayIdx >= 0 ? dayIdx : 0);
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-black text-sm shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transition-all transform active:scale-95"
            >
              <Play className="w-5 h-5 fill-white" /> INICIAR TREINO DE HOJE
            </button>
          </div>
        </div>
      )}

      {/* Evolution / PR Quick Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          onClick={() => setActiveTab('evolucao')}
          className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 hover:border-slate-700 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-500 group-hover:scale-110 transition-transform">
              <Award className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
          </div>
          <h4 className="font-bold text-white text-sm">Último Recorde (PR)</h4>
          {recentPR ? (
            <p className="text-xs text-slate-300 mt-1">
              <strong className="text-amber-400">{recentPR.exerciseName}</strong>: {recentPR.maxWeight} kg x {recentPR.maxReps} reps
            </p>
          ) : (
            <p className="text-xs text-slate-400 mt-1">Nenhum recorde registrado ainda.</p>
          )}
        </div>

        <div
          onClick={() => setActiveTab('exercicios')}
          className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 hover:border-slate-700 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
          </div>
          <h4 className="font-bold text-white text-sm">Peso Corporal Atual</h4>
          <p className="text-xs text-slate-300 mt-1">
            <strong className="text-emerald-400">{profile.currentWeight} kg</strong> ({profile.goal})
          </p>
        </div>
      </div>

      {/* Quick Access Buttons */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5">
        <h4 className="font-bold text-white text-sm mb-3">Acesso Rápido</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => setActiveTab('exercicios')}
            className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-left border border-slate-700/50 transition-colors"
          >
            <Dumbbell className="w-5 h-5 text-blue-400 mb-2" />
            <span className="text-xs font-bold text-white block">Exercícios</span>
            <span className="text-[10px] text-slate-400">Consultar biblioteca</span>
          </button>

          <button
            onClick={() => setActiveTab('treinos')}
            className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-left border border-slate-700/50 transition-colors"
          >
            <Calendar className="w-5 h-5 text-purple-400 mb-2" />
            <span className="text-xs font-bold text-white block">Programas</span>
            <span className="text-[10px] text-slate-400">Full Body & 5x</span>
          </button>

          <button
            onClick={() => setActiveTab('evolucao')}
            className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-left border border-slate-700/50 transition-colors"
          >
            <TrendingUp className="w-5 h-5 text-emerald-400 mb-2" />
            <span className="text-xs font-bold text-white block">Evolução</span>
            <span className="text-[10px] text-slate-400">Gráficos & Histórico</span>
          </button>

          <button
            onClick={() => setActiveTab('perfil')}
            className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-left border border-slate-700/50 transition-colors"
          >
            <Award className="w-5 h-5 text-amber-400 mb-2" />
            <span className="text-xs font-bold text-white block">Perfil</span>
            <span className="text-[10px] text-slate-400">Metas & Backup</span>
          </button>
        </div>
      </div>
    </div>
  );
};
