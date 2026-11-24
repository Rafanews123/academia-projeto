import React from 'react';
import { Home, Dumbbell, BookOpen, TrendingUp, Bot, User } from 'lucide-react';

interface NavbarProps {
  activeTab: 'inicio' | 'treinos' | 'exercicios' | 'evolucao' | 'chat' | 'perfil';
  setActiveTab: (tab: 'inicio' | 'treinos' | 'exercicios' | 'evolucao' | 'chat' | 'perfil') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'inicio', label: 'Início', icon: Home },
    { id: 'treinos', label: 'Treinos', icon: Dumbbell },
    { id: 'exercicios', label: 'Exercícios', icon: BookOpen },
    { id: 'evolucao', label: 'Evolução', icon: TrendingUp },
    { id: 'chat', label: 'Coach IA', icon: Bot },
    { id: 'perfil', label: 'Perfil', icon: User },
  ] as const;

  return (
    <nav aria-label="Navegação Principal" className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 text-slate-400 pb-safe">
      <div className="max-w-2xl mx-auto flex items-center justify-around h-16 px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-all ${
                isActive
                  ? 'text-blue-500 font-semibold scale-105'
                  : 'hover:text-slate-200'
              }`}
            >
              <div className={`p-1 rounded-xl transition-colors ${isActive ? 'bg-blue-500/10' : ''}`}>
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-500 stroke-[2.5]' : 'stroke-[1.75]'}`} />
              </div>
              <span className="text-[10px] sm:text-[11px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
