import React, { useState } from 'react';
import { Calculator, X, Disc } from 'lucide-react';

interface PlateCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlateCalculatorModal: React.FC<PlateCalculatorModalProps> = ({ isOpen, onClose }) => {
  const [targetWeight, setTargetWeight] = useState<number>(80);
  const [barWeight, setBarWeight] = useState<number>(20); // standard Olympic barbell 20kg

  if (!isOpen) return null;

  const weightNeeded = Math.max(0, targetWeight - barWeight);
  const weightPerSide = weightNeeded / 2;

  // Available plates in kg: 25, 20, 15, 10, 5, 2.5, 1.25
  const availablePlates = [25, 20, 15, 10, 5, 2.5, 1.25];
  
  let remainder = weightPerSide;
  const plateBreakdown: { plate: number; count: number }[] = [];

  for (const plate of availablePlates) {
    if (remainder <= 0) break;
    const count = Math.floor(remainder / plate);
    if (count > 0) {
      plateBreakdown.push({ plate, count: count * 2 }); // total both sides
      remainder = Number((remainder % plate).toFixed(2));
    }
  }

  const actualWeight = barWeight + plateBreakdown.reduce((acc, curr) => acc + curr.plate * (curr.count / 2), 0) * 2;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Calculadora de Anilhas</h3>
              <p className="text-xs text-slate-400">Distribuição por lado da barra</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Carga Alvo Total (kg)
            </label>
            <input
              type="number"
              min={10}
              max={400}
              step={0.5}
              value={targetWeight}
              onChange={(e) => setTargetWeight(Number(e.target.value))}
              className="w-full bg-slate-800 border border-slate-700/70 rounded-xl px-4 py-2.5 text-white font-bold text-base focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Peso da Barra (kg)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[20, 15, 10].map((w) => (
                <button
                  key={w}
                  onClick={() => setBarWeight(w)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                    barWeight === w
                      ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  {w} kg
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/60 mt-4">
            <div className="flex justify-between items-center mb-3 text-xs">
              <span className="text-slate-400">Carga Calculada:</span>
              <span className="text-emerald-400 font-bold text-sm">{actualWeight} kg</span>
            </div>
            <div className="flex justify-between items-center mb-4 text-xs">
              <span className="text-slate-400">Por Lado:</span>
              <span className="text-white font-semibold">{weightPerSide} kg</span>
            </div>

            <h4 className="text-xs font-bold text-slate-300 mb-2.5 flex items-center gap-1.5">
              <Disc className="w-4 h-4 text-blue-400" /> Anilhas necessárias (para ambos os lados):
            </h4>

            {plateBreakdown.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-2">
                Nenhuma anilha necessária (apenas a barra).
              </p>
            ) : (
              <div className="space-y-2">
                {plateBreakdown.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-slate-900/70 px-3 py-2 rounded-xl text-xs border border-slate-800">
                    <span className="text-white font-medium flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                      Anilha de {item.plate} kg
                    </span>
                    <span className="bg-blue-500/10 text-blue-400 font-bold px-2.5 py-1 rounded-lg border border-blue-500/20">
                      {item.count} un ({item.count / 2} por lado)
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all"
        >
          Concluído
        </button>
      </div>
    </div>
  );
};
