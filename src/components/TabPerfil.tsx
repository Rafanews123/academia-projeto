import React, { useState, useEffect } from 'react';
import { User, Settings, Download, Upload, Shield, Award, Volume2, VolumeX, Check, Smartphone } from 'lucide-react';
import { UserProfile } from '../types';
import { exportBackupData, importBackupData } from '../utils/storage';

interface TabPerfilProps {
  profile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  onRefreshData: () => void;
}

export const TabPerfil: React.FC<TabPerfilProps> = ({
  profile,
  onUpdateProfile,
  onRefreshData,
}) => {
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [successMsg, setSuccessMsg] = useState('');
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) {
      alert('Para instalar o aplicativo no seu celular:\n\n1. No Android (Chrome): Toque no menu (três pontinhos) e selecione "Adicionar à tela inicial" ou "Instalar aplicativo".\n2. No iPhone (Safari): Toque no botão Compartilhar e selecione "Adicionar à Tela de Início".');
      return;
    }
    installPrompt.prompt();
    const choiceResult = await installPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      setInstallPrompt(null);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setSuccessMsg('Perfil atualizado com sucesso!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleExport = () => {
    const jsonStr = exportBackupData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meu-treino-pro-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content && importBackupData(content)) {
        alert('Backup restaurado com sucesso! O aplicativo será recarregado.');
        onRefreshData();
        window.location.reload();
      } else {
        alert('Erro ao restaurar backup. Verifique o arquivo.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 pb-24">
      <div>
        <h2 className="text-xl font-black text-white">Perfil & Configurações</h2>
        <p className="text-xs text-slate-400">Gerencie seus dados pessoais, metas e preferências</p>
      </div>

      {successMsg && (
        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4" /> {successMsg}
        </div>
      )}

      {/* PWA Install App Card */}
      <div className="bg-gradient-to-r from-blue-900/50 via-slate-900 to-slate-900 border border-blue-500/30 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 font-bold text-[10px] border border-blue-500/30">
              Aplicativo PWA
            </span>
            <h3 className="text-base font-black text-white mt-1">Instalar no Celular</h3>
            <p className="text-xs text-slate-300 max-w-xs">
              Adicione o MEU TREINO PRO à sua tela inicial para usar offline e ter experiência de app nativo.
            </p>
          </div>
          <button
            onClick={handleInstallClick}
            className="px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all transform active:scale-95 shrink-0"
          >
            <Smartphone className="w-4 h-4" /> Instalar App
          </button>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
          <User className="w-4 h-4 text-blue-400" /> Dados Pessoais e Metas
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Nome</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Idade</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Altura (cm)</label>
            <input
              type="number"
              value={formData.height}
              onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Peso Atual (kg)</label>
            <input
              type="number"
              step="0.1"
              value={formData.currentWeight}
              onChange={(e) => setFormData({ ...formData, currentWeight: Number(e.target.value) })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Objetivo Principal</label>
            <select
              value={formData.goal}
              onChange={(e) => setFormData({ ...formData, goal: e.target.value as any })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="Hipertrofia">Hipertrofia</option>
              <option value="Emagrecimento">Emagrecimento</option>
              <option value="Definição muscular">Definição muscular</option>
              <option value="Força">Força</option>
              <option value="Condicionamento físico">Condicionamento físico</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Nível de Experiência</label>
            <select
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value as any })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="Iniciante">Iniciante</option>
              <option value="Intermediário">Intermediário</option>
              <option value="Avançado">Avançado</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all mt-4"
        >
          Salvar Alterações
        </button>
      </form>

      {/* Preferences & Sound */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
          <Settings className="w-4 h-4 text-purple-400" /> Preferências do Aplicativo
        </h3>

        <div className="flex items-center justify-between py-2 border-b border-slate-800">
          <div>
            <h4 className="font-semibold text-white text-sm">Alertas Sonoros no Cronômetro</h4>
            <p className="text-xs text-slate-400">Emitir sinal sonoro ao fim do descanso</p>
          </div>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, soundEnabled: !formData.soundEnabled })}
            className={`p-2.5 rounded-xl border transition-colors ${
              formData.soundEnabled ? 'bg-blue-500/20 text-blue-400 border-blue-500/40' : 'bg-slate-800 text-slate-500 border-slate-700'
            }`}
          >
            {formData.soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>

        <div className="flex items-center justify-between py-2">
          <div>
            <h4 className="font-semibold text-white text-sm">Modo Escuro Esportivo</h4>
            <p className="text-xs text-slate-400">Interface otimizada para alta visibilidade</p>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
            Ativo (Padrão Pro)
          </div>
        </div>
      </div>

      {/* Backup & Restore */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <h3 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-400" /> Backup e Segurança de Dados
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Seus dados são salvos localmente no dispositivo (IndexedDB/LocalStorage). Exporte um backup para transferir para outro celular.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={handleExport}
            className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 flex items-center justify-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4 text-blue-400" /> Exportar Backup (JSON)
          </button>

          <label className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 flex items-center justify-center gap-2 transition-colors cursor-pointer">
            <Upload className="w-4 h-4 text-emerald-400" /> Importar Backup
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
        </div>
      </div>
    </div>
  );
};
