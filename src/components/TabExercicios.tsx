import React, { useState } from 'react';
import { Search, Heart, Dumbbell, ChevronRight, Play } from 'lucide-react';
import { Exercise } from '../types';

interface TabExerciciosProps {
  exercises: Exercise[];
  onToggleFavorite: (id: string) => void;
  onSelectExercise: (exercise: Exercise) => void;
}

export const TabExercicios: React.FC<TabExerciciosProps> = ({
  exercises,
  onToggleFavorite,
  onSelectExercise,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('Todos');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const categories = ['Todos', 'Peito', 'Costas', 'Ombros', 'Bíceps', 'Tríceps', 'Quadríceps', 'Posterior de coxa', 'Glúteos', 'Panturrilhas', 'Abdômen'];
  const equipments = ['Todos', 'Barras', 'Halteres', 'Máquinas', 'Polias', 'Peso corporal'];

  const filteredExercises = exercises.filter((ex) => {
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.primaryMuscle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || ex.category === selectedCategory;
    const matchesEquipment = selectedEquipment === 'Todos' || ex.equipment === selectedEquipment;
    const matchesFav = !showOnlyFavorites || ex.isFavorite;

    return matchesSearch && matchesCategory && matchesEquipment && matchesFav;
  });

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div>
        <h2 className="text-xl font-black text-white">Biblioteca Profissional com Vídeos</h2>
        <p className="text-xs text-slate-400">Demonstrações biomecânicas em vídeo, tutoriais e execução passo a passo</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por exercício ou músculo (ex: Supino, Dorsal)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500 shadow-inner"
          />
        </div>

        {/* Categories Horizontal Scroll */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Equipment & Favorites Filters */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-x-auto">
            <select
              value={selectedEquipment}
              onChange={(e) => setSelectedEquipment(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
            >
              {equipments.map((eq) => (
                <option key={eq} value={eq}>Equipamento: {eq}</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
              showOnlyFavorites
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${showOnlyFavorites ? 'fill-rose-500' : ''}`} />
            Favoritos
          </button>
        </div>
      </div>

      {/* Exercises Grid / List with HD Video Thumbnails */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredExercises.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-slate-900/60 rounded-3xl border border-slate-800">
            <Dumbbell className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-white font-bold text-sm">Nenhum exercício encontrado</h3>
            <p className="text-xs text-slate-400 mt-1">Tente buscar por outro termo ou categoria.</p>
          </div>
        ) : (
          filteredExercises.map((ex) => (
            <div
              key={ex.id}
              onClick={() => onSelectExercise(ex)}
              className="bg-slate-900 border border-slate-800 hover:border-blue-500/60 rounded-3xl overflow-hidden transition-all cursor-pointer group shadow-xl flex flex-col justify-between"
            >
              {/* Thumbnail / Video preview box */}
              <div className="relative h-40 w-full bg-slate-950 overflow-hidden">
                {ex.thumbnailUrl ? (
                  <img
                    src={ex.thumbnailUrl}
                    alt={ex.name}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-700">
                    <Dumbbell className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>

                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-blue-400 text-[10px] font-bold border border-white/10 uppercase">
                    {ex.category}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(ex.id);
                    }}
                    className={`p-2 rounded-xl backdrop-blur-md border transition-colors ${
                      ex.isFavorite
                        ? 'bg-rose-500/20 text-rose-500 border-rose-500/40'
                        : 'bg-black/50 text-white border-white/10 hover:bg-black/70'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${ex.isFavorite ? 'fill-rose-500' : ''}`} />
                  </button>
                </div>

                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-white font-semibold bg-blue-600/90 px-2.5 py-1 rounded-lg shadow-md">
                    <Play className="w-3 h-3 fill-white" /> Vídeo HD
                  </div>
                  <span className="text-[11px] text-slate-300 font-medium">
                    {ex.equipment}
                  </span>
                </div>
              </div>

              {/* Card Footer info */}
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors">
                    {ex.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Músculo: <strong className="text-slate-300">{ex.primaryMuscle}</strong>
                  </p>
                </div>
                <div className="p-2 rounded-xl bg-slate-800 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
