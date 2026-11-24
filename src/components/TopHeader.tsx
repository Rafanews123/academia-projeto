import React, { useState } from 'react';
import { Dumbbell, Bell, Calculator, X } from 'lucide-react';
import { UserProfile } from '../types';

interface TopHeaderProps {
  profile: UserProfile;
  onOpenPlateCalculator: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ profile, onOpenPlateCalculator }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const todayStr = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'short'
  });

  return (
    <header className="sticky top-0 z-35 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-bold text-lg">
            <Dumbbell className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-black tracking-wider text-white uppercase">MEU TREINO <span className="text-blue-500">PRO</span></h1>
            </div>
            <p className="text-xs text-slate-400 capitalize">{todayStr}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPlateCalculator}
            title="Calculadora de Cargas (Anilhas)"
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700/50"
          >
            <Calculator className="w-4 h-4 text-blue-400" />
          </button>

          <button
            onClick={() => setShowNotifications(true)}
            title="Notificações e Lembretes"
            className="relative p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700/50"
          >
            <Bell className="w-4 h-4 text-slate-300" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          </button>
        </div>
      </div>

      {showNotifications && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-5 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-bold text-white">Notificações e Dicas</h3>
              </div>
              <button
                onClick={() => setShowNotifications(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/40">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-semibold text-sm text-blue-400">Hora de Treinar!</h4>
                  <span className="text-[10px] text-slate-400">Hoje</span>
                </div>
                <p className="text-xs text-slate-300">
                  Olá, {profile.name}! O programa <span className="font-semibold text-white">Full Body 3x</span> está agendado para hoje. Mantenha a consistência!
                </p>
              </div>

              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/40">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-semibold text-sm text-emerald-400">Recorde Pessoal Conquistado</h4>
                  <span className="text-[10px] text-slate-400">Há 2 dias</span>
                </div>
                <p className="text-xs text-slate-300">
                  Você bateu seu recorde no Supino Reto com Barra (75 kg x 8 reps). Parabéns pela evolução!
                </p>
              </div>

              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/40">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-semibold text-sm text-amber-400">Dica de Hidratação</h4>
                  <span className="text-[10px] text-slate-400">Dica Pro</span>
                </div>
                <p className="text-xs text-slate-300">
                  Lembre-se de consumir pelo menos 500ml de água durante sua sessão de treino para manter o desempenho máximo.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowNotifications(false)}
              className="w-full mt-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/25 transition-all"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
