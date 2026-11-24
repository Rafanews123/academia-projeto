import React, { useState } from 'react';
import { TrendingUp, Award, Calendar, Dumbbell, ChevronRight, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { BodyWeightRecord, WorkoutSession, PersonalRecord, UserProfile } from '../types';

interface TabEvolucaoProps {
  weights: BodyWeightRecord[];
  sessions: WorkoutSession[];
  prs: PersonalRecord[];
  profile: UserProfile;
  onSaveWeight: (weight: number) => void;
}

export const TabEvolucao: React.FC<TabEvolucaoProps> = ({
  weights,
  sessions,
  prs,
  profile,
  onSaveWeight,
}) => {
  const [activeTabSub, setActiveTabSub] = useState<'graficos' | 'historico' | 'prs'>('graficos');
  const [newWeightInput, setNewWeightInput] = useState(profile.currentWeight.toString());
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [selectedSessionModal, setSelectedSessionModal] = useState<WorkoutSession | null>(null);

  // Format weights for chart
  const weightChartData = weights.map((w) => ({
    date: new Date(w.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
    peso: w.weight,
  }));

  // Format volume for chart
  const volumeChartData = sessions.map((s, idx) => ({
    treino: `T${idx + 1}`,
    volume: s.volumeTotal,
    nome: s.workoutName,
  }));

  const handleAddWeightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(newWeightInput);
    if (val > 0) {
      onSaveWeight(val);
      setShowWeightModal(false);
    }
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white">Evolução & Desempenho</h2>
          <p className="text-xs text-slate-400">Acompanhe suas cargas, volume e peso corporal</p>
        </div>
        <button
          onClick={() => setShowWeightModal(true)}
          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/25 flex items-center gap-1.5 transition-all"
        >
          + Registrar Peso
        </button>
      </div>

      {/* Subtabs */}
      <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
        <button
          onClick={() => setActiveTabSub('graficos')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTabSub === 'graficos'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Gráficos
        </button>
        <button
          onClick={() => setActiveTabSub('historico')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTabSub === 'historico'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Histórico ({sessions.length})
        </button>
        <button
          onClick={() => setActiveTabSub('prs')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTabSub === 'prs'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Recordes (PRs)
        </button>
      </div>

      {/* Subtab 1: Gráficos */}
      {activeTabSub === 'graficos' && (
        <div className="space-y-6">
          {/* Weight Chart */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
            <h3 className="font-bold text-white text-sm mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" /> Evolução do Peso Corporal (kg)
            </h3>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weightChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} domain={['dataMin - 2', 'dataMax + 2']} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                    labelStyle={{ color: '#f8fafc', fontWeight: 'bold' }}
                  />
                  <Line type="monotone" dataKey="peso" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Volume Chart */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
            <h3 className="font-bold text-white text-sm mb-4 flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-blue-400" /> Volume de Carga por Treino (kg total)
            </h3>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={volumeChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="treino" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                    labelStyle={{ color: '#f8fafc', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="volume" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 2: Histórico */}
      {activeTabSub === 'historico' && (
        <div className="space-y-3">
          {sessions.length === 0 ? (
            <div className="text-center py-12 bg-slate-900/60 rounded-3xl border border-slate-800">
              <Calendar className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <h3 className="text-white font-bold text-sm">Nenhum treino concluído ainda</h3>
              <p className="text-xs text-slate-400 mt-1">Conclua um treino para registrar seu histórico.</p>
            </div>
          ) : (
            sessions.map((session) => (
              <div
                key={session.id}
                onClick={() => setSelectedSessionModal(session)}
                className="bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-4 transition-all cursor-pointer flex items-center justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20">
                      Concluído
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(session.date).toLocaleDateString('pt-BR')} • {Math.round(session.durationSeconds / 60)} min
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-sm sm:text-base group-hover:text-blue-400 transition-colors">
                    {session.workoutName}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {session.exercises.length} exercícios • Volume: <strong className="text-slate-300">{session.volumeTotal} kg</strong>
                  </p>
                </div>

                <div className="p-2 rounded-xl bg-slate-800 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Subtab 3: Recordes (PRs) */}
      {activeTabSub === 'prs' && (
        <div className="space-y-3">
          {prs.map((pr) => (
            <div key={pr.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 font-bold">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm sm:text-base">{pr.exerciseName}</h3>
                  <p className="text-xs text-slate-400">Registrado em {new Date(pr.date).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-base font-black text-amber-400 block">{pr.maxWeight} kg</span>
                <span className="text-xs text-slate-400">{pr.maxReps} repetições</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Weight Modal */}
      {showWeightModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-3xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Registrar Peso Corporal</h3>
            <form onSubmit={handleAddWeightSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Peso atual (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  min={30}
                  max={300}
                  value={newWeightInput}
                  onChange={(e) => setNewWeightInput(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-base font-bold focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowWeightModal(false)}
                  className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Session Details Modal */}
      {selectedSessionModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800 mb-4">
              <div>
                <h3 className="font-black text-white text-base">{selectedSessionModal.workoutName}</h3>
                <p className="text-xs text-slate-400">{new Date(selectedSessionModal.date).toLocaleDateString('pt-BR')}</p>
              </div>
              <button
                onClick={() => setSelectedSessionModal(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-800/50 p-3 rounded-xl">
                <div>Duração: <strong className="text-white">{Math.round(selectedSessionModal.durationSeconds / 60)} min</strong></div>
                <div>Volume Total: <strong className="text-emerald-400">{selectedSessionModal.volumeTotal} kg</strong></div>
              </div>

              <div className="space-y-3">
                {selectedSessionModal.exercises.map((ex, idx) => (
                  <div key={idx} className="bg-slate-800/40 p-3.5 rounded-2xl border border-slate-700/50">
                    <h4 className="font-bold text-white text-sm mb-2">{ex.exerciseName}</h4>
                    <div className="space-y-1.5">
                      {ex.sets.map((set) => (
                        <div key={set.setNumber} className="flex justify-between items-center text-xs bg-slate-900/60 px-3 py-1.5 rounded-xl">
                          <span className="text-slate-400">Série {set.setNumber}</span>
                          <span className="text-white font-semibold">{set.weight} kg × {set.reps} reps</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {selectedSessionModal.notes && (
                <div className="p-3 bg-slate-800/50 rounded-xl text-xs text-slate-300">
                  <strong>Observações:</strong> {selectedSessionModal.notes}
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedSessionModal(null)}
              className="w-full mt-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
