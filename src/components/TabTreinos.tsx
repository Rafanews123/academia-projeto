import React, { useState } from 'react';
import { Dumbbell, Calendar, Play, Settings, Plus, Check, Clock, ChevronRight, Trash2 } from 'lucide-react';
import { WorkoutProgram, Exercise, UserProfile } from '../types';

interface TabTreinosProps {
  programs: WorkoutProgram[];
  exercises: Exercise[];
  profile: UserProfile;
  onSelectProgram: (programId: string) => void;
  onStartWorkout: (programId: string, dayIndex: number) => void;
  onSavePrograms: (programs: WorkoutProgram[]) => void;
}

export const TabTreinos: React.FC<TabTreinosProps> = ({
  programs,
  exercises,
  profile,
  onSelectProgram,
  onStartWorkout,
  onSavePrograms,
}) => {
  const [selectedProgramId, setSelectedProgramId] = useState<string>(profile.activeProgramId);
  const [editingProgram, setEditingProgram] = useState<WorkoutProgram | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const currentViewProgram = programs.find((p) => p.id === selectedProgramId) || programs[0];

  const handleDuplicate = (prog: WorkoutProgram) => {
    const newProg: WorkoutProgram = {
      ...prog,
      id: `custom-${Date.now()}`,
      name: `${prog.name} (Cópia)`,
      isCustom: true,
    };
    onSavePrograms([...programs, newProg]);
    setSelectedProgramId(newProg.id);
  };

  const handleDelete = (progId: string) => {
    if (programs.length <= 1) {
      alert('Você precisa manter pelo menos um programa cadastrado.');
      return;
    }
    if (confirm('Tem certeza que deseja excluir este programa?')) {
      const updated = programs.filter((p) => p.id !== progId);
      onSavePrograms(updated);
      setSelectedProgramId(updated[0].id);
    }
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Header & Program Selection Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-black text-white">Programas de Treinamento</h2>
            <p className="text-xs text-slate-400">Escolha ou personalize sua divisão muscular</p>
          </div>
          <button
            onClick={() => {
              const newProg: WorkoutProgram = {
                id: `custom-${Date.now()}`,
                name: 'Novo Programa Personalizado',
                objective: 'Personalizado para meus objetivos',
                frequency: '4 dias por semana',
                daysPerWeek: 4,
                description: 'Criado pelo usuário',
                estimatedDurationMin: 55,
                isCustom: true,
                schedule: [
                  {
                    dayOfWeek: 'Segunda-feira',
                    workoutName: 'Treino A',
                    focusMuscles: ['Peito', 'Tríceps'],
                    exercises: [
                      { exerciseId: exercises[0]?.id || '', sets: 4, targetReps: '10', restTime: 60 }
                    ]
                  }
                ]
              };
              onSavePrograms([...programs, newProg]);
              setSelectedProgramId(newProg.id);
              setEditingProgram(newProg);
            }}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/25 flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" /> Novo Programa
          </button>
        </div>

        {/* Program Cards Carousel / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {programs.map((prog) => {
            const isActive = profile.activeProgramId === prog.id;
            const isViewing = selectedProgramId === prog.id;
            return (
              <div
                key={prog.id}
                onClick={() => setSelectedProgramId(prog.id)}
                className={`bg-slate-900 border rounded-3xl p-5 cursor-pointer transition-all relative ${
                  isViewing
                    ? 'border-blue-500 shadow-xl shadow-blue-500/10 bg-gradient-to-br from-slate-900 to-blue-950/40'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {isActive && (
                  <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-[10px] border border-emerald-500/30 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Ativo
                  </span>
                )}

                <h3 className="font-black text-white text-base mb-1">{prog.name}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 mb-3">{prog.objective}</p>

                <div className="flex flex-wrap gap-2 text-xs text-slate-300 mb-4">
                  <span className="bg-slate-800 px-2.5 py-1 rounded-xl border border-slate-700/50 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" /> {prog.frequency}
                  </span>
                  <span className="bg-slate-800 px-2.5 py-1 rounded-xl border border-slate-700/50 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" /> ~{prog.estimatedDurationMin} min
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProgram(prog.id);
                    }}
                    disabled={isActive}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                      isActive
                        ? 'bg-emerald-500/20 text-emerald-400 cursor-default'
                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20'
                    }`}
                  >
                    {isActive ? 'Programa Principal' : 'Definir como Principal'}
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingProgram(prog);
                      }}
                      title="Editar programa"
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                    {prog.isCustom && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(prog.id);
                        }}
                        title="Excluir programa"
                        className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Program Schedule Viewer */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div>
            <h3 className="font-bold text-white text-base">Rotina: {currentViewProgram.name}</h3>
            <p className="text-xs text-slate-400">{currentViewProgram.description}</p>
          </div>
          <button
            onClick={() => setEditingProgram(currentViewProgram)}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Settings className="w-4 h-4 text-blue-400" /> Editar Rotina
          </button>
        </div>

        <div className="space-y-4">
          {currentViewProgram.schedule.map((daySch, idx) => (
            <div key={idx} className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/60">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20">
                    {daySch.dayOfWeek}
                  </span>
                  <h4 className="font-bold text-white text-sm sm:text-base mt-1.5">
                    {daySch.workoutName}
                  </h4>
                </div>

                <button
                  onClick={() => onStartWorkout(currentViewProgram.id, idx)}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-1.5 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-white" /> Iniciar
                </button>
              </div>

              <div className="space-y-2 mt-3 pt-3 border-t border-slate-700/50">
                {daySch.exercises.map((item, exIdx) => {
                  const exObj = exercises.find((e) => e.id === item.exerciseId);
                  return (
                    <div key={exIdx} className="flex items-center justify-between text-xs bg-slate-900/60 px-3 py-2 rounded-xl border border-slate-800">
                      <span className="font-medium text-slate-200 flex items-center gap-2">
                        <Dumbbell className="w-3.5 h-3.5 text-blue-400" />
                        {exObj ? exObj.name : 'Exercício'}
                      </span>
                      <span className="text-slate-400 bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-700">
                        {item.sets} séries • {item.targetReps} reps • {item.restTime}s desc.
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Program Editor Modal */}
      {editingProgram && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-5">
              <h3 className="text-lg font-bold text-white">Editar Programa: {editingProgram.name}</h3>
              <button
                onClick={() => setEditingProgram(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nome do Programa</label>
                <input
                  type="text"
                  value={editingProgram.name}
                  onChange={(e) => setEditingProgram({ ...editingProgram, name: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Objetivo</label>
                <input
                  type="text"
                  value={editingProgram.objective}
                  onChange={(e) => setEditingProgram({ ...editingProgram, objective: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <h4 className="font-bold text-sm text-blue-400 mb-2">Dias de Treinamento e Exercícios</h4>
                <div className="space-y-4">
                  {editingProgram.schedule.map((day, dIdx) => (
                    <div key={dIdx} className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-white text-sm">{day.dayOfWeek} - {day.workoutName}</span>
                        <button
                          onClick={() => {
                            const updatedSch = [...editingProgram.schedule];
                            updatedSch[dIdx].exercises.push({
                              exerciseId: exercises[0]?.id || '',
                              sets: 3,
                              targetReps: '10',
                              restTime: 60
                            });
                            setEditingProgram({ ...editingProgram, schedule: updatedSch });
                          }}
                          className="px-2.5 py-1 rounded-lg bg-blue-600/20 text-blue-400 text-xs font-semibold border border-blue-500/30"
                        >
                          + Adicionar Exercício
                        </button>
                      </div>

                      <div className="space-y-2">
                        {day.exercises.map((exItem, eIdx) => (
                          <div key={eIdx} className="flex items-center gap-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                            <select
                              value={exItem.exerciseId}
                              onChange={(e) => {
                                const updatedSch = [...editingProgram.schedule];
                                updatedSch[dIdx].exercises[eIdx].exerciseId = e.target.value;
                                setEditingProgram({ ...editingProgram, schedule: updatedSch });
                              }}
                              className="flex-1 bg-slate-800 text-white text-xs rounded-lg p-2 border border-slate-700"
                            >
                              {exercises.map((ex) => (
                                <option key={ex.id} value={ex.id}>{ex.name} ({ex.category})</option>
                              ))}
                            </select>

                            <input
                              type="number"
                              min={1}
                              max={10}
                              value={exItem.sets}
                              onChange={(e) => {
                                const updatedSch = [...editingProgram.schedule];
                                updatedSch[dIdx].exercises[eIdx].sets = Number(e.target.value);
                                setEditingProgram({ ...editingProgram, schedule: updatedSch });
                              }}
                              className="w-16 bg-slate-800 text-white text-xs rounded-lg p-2 border border-slate-700 text-center"
                              title="Séries"
                            />

                            <button
                              onClick={() => {
                                const updatedSch = [...editingProgram.schedule];
                                updatedSch[dIdx].exercises.splice(eIdx, 1);
                                setEditingProgram({ ...editingProgram, schedule: updatedSch });
                              }}
                              className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-800">
              <button
                onClick={() => setEditingProgram(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-700"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  const updatedPrograms = programs.map((p) => (p.id === editingProgram.id ? editingProgram : p));
                  onSavePrograms(updatedPrograms);
                  setEditingProgram(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
