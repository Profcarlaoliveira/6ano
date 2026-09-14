import React, { useState } from 'react';
import { User, Sparkles, Check, RotateCcw, Flame, Award, Shield, CheckCircle2 } from 'lucide-react';
import { useGameState } from '../../context/GameStateContext';
import { sfx } from '../../utils/audio';

export const ProfileModal: React.FC = () => {
  const { student, updateAvatar, resetProgress, currentLevelInfo, setActiveView } = useGameState();

  const [name, setName] = useState(student.name);
  const [selectedIcon, setSelectedIcon] = useState(student.avatarIcon);
  const [selectedBg, setSelectedBg] = useState(student.avatarBg);
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const icons = ['👨‍🚀', '👩‍🔬', '🥷', '🤖', '🦊', '🧙‍♂️', '🎨', '🛡️', '🛸', '👾', '🕹️', '🐱'];
  const backgrounds = [
    { label: 'Azul Céu', class: 'bg-sky-500' },
    { label: 'Esmeralda', class: 'bg-emerald-500' },
    { label: 'Violeta', class: 'bg-purple-500' },
    { label: 'Rosa', class: 'bg-pink-500' },
    { label: 'Âmbar', class: 'bg-amber-500' },
    { label: 'Índigo', class: 'bg-indigo-500' },
  ];

  const handleSave = () => {
    sfx.playSuccess();
    updateAvatar(selectedIcon, selectedBg, name);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2500);
  };

  const handleReset = () => {
    resetProgress();
    setShowConfirmReset(false);
    setActiveView('dashboard');
  };

  return (
    <div id="profile-view-container" className="space-y-6 pb-12 max-w-3xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight font-['Fredoka']">
          Perfil do Aluno • Identidade Digital
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-bold">
          Personaliza o teu avatar e consulta o teu histórico no TIC QUEST
        </p>
      </div>

      {/* Main Profile Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-100 shadow-xs space-y-6">
        {/* Avatar Preview & Name Input */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className={`w-24 h-24 rounded-3xl ${selectedBg} border-4 border-white flex items-center justify-center text-5xl shadow-md shrink-0 transition-all text-white`}>
            {selectedIcon}
          </div>

          <div className="space-y-2 flex-1 w-full text-center sm:text-left">
            <label className="text-xs font-black uppercase tracking-wider text-slate-500 block font-['Fredoka']">
              Nome do Aluno
            </label>
            <input
              id="input-profile-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-extrabold text-slate-900 focus:outline-none focus:border-sky-500 transition"
            />
            <div className="flex items-center justify-center sm:justify-start gap-3 text-xs font-bold text-slate-500 pt-1">
              <span className="font-mono text-sky-700 bg-sky-100 px-2.5 py-0.5 rounded-full">{student.classGroup}</span>
              <span>•</span>
              <span className="text-slate-600">{student.email}</span>
            </div>
          </div>
        </div>

        {/* Icon Selection */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <span className="text-xs font-black text-slate-800 uppercase tracking-wider block font-['Fredoka']">
            Escolhe o teu Avatar:
          </span>
          <div className="grid grid-cols-6 gap-2.5">
            {icons.map((icon, idx) => (
              <button
                key={idx}
                onClick={() => { sfx.playClick(); setSelectedIcon(icon); }}
                className={`w-12 h-12 rounded-2xl text-2xl flex items-center justify-center border-2 transition cursor-pointer ${
                  selectedIcon === icon
                    ? 'bg-sky-50 border-sky-500 ring-2 ring-sky-400/40 scale-105 shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Background Color Selection */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <span className="text-xs font-black text-slate-800 uppercase tracking-wider block font-['Fredoka']">
            Cor de Fundo:
          </span>
          <div className="grid grid-cols-6 gap-2.5">
            {backgrounds.map((bg, idx) => (
              <button
                key={idx}
                onClick={() => { sfx.playClick(); setSelectedBg(bg.class); }}
                className={`h-11 rounded-2xl ${bg.class} border-2 transition cursor-pointer flex items-center justify-center ${
                  selectedBg === bg.class
                    ? 'border-slate-900 ring-2 ring-slate-900/20 scale-105 shadow-xs'
                    : 'border-transparent opacity-80 hover:opacity-100'
                }`}
                title={bg.label}
              >
                {selectedBg === bg.class && <Check className="w-5 h-5 text-white stroke-[3]" />}
              </button>
            ))}
          </div>
        </div>

        {/* Save button & feedback */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            id="btn-save-profile"
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-sky-600 hover:bg-sky-500 text-white font-black text-xs shadow-xs transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Guardar Alterações</span>
          </button>

          {showSavedToast && (
            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4" /> Perfil atualizado com sucesso!
            </span>
          )}
        </div>
      </div>

      {/* Progress & Reset Card */}
      <div className="p-6 rounded-3xl bg-white border-2 border-slate-100 shadow-xs space-y-4">
        <h3 className="text-sm font-black text-slate-800 font-['Fredoka']">Estatísticas do Aluno</h3>
        
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200">
            <span className="text-lg font-black text-amber-900 font-mono block">{student.xp}</span>
            <span className="text-[11px] font-bold text-amber-700">XP Acumulado</span>
          </div>
          <div className="p-3 rounded-2xl bg-sky-50 border border-sky-200">
            <span className="text-lg font-black text-sky-900 font-mono block">{student.completedMissionIds.length}</span>
            <span className="text-[11px] font-bold text-sky-700">Missões Feitas</span>
          </div>
          <div className="p-3 rounded-2xl bg-orange-50 border border-orange-200">
            <span className="text-lg font-black text-orange-900 font-mono block">{student.streakDays} dias</span>
            <span className="text-[11px] font-bold text-orange-700">Frequência</span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-bold">Reiniciar percurso de teste</span>
          
          {showConfirmReset ? (
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="px-3 py-1 bg-rose-600 text-white rounded-full text-xs font-bold hover:bg-rose-700 cursor-pointer"
              >
                Confirmar
              </button>
              <button
                onClick={() => setShowConfirmReset(false)}
                className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold hover:bg-slate-200 cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowConfirmReset(true)}
              className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
            >
              Reiniciar Progresso
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
