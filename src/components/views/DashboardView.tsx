import React, { useState } from 'react';
import { 
  Flame, ArrowRight, Play, CheckCircle2, 
  Award, Sparkles, ChevronRight, Lightbulb, MessageSquare, 
  Trophy, Laptop, Compass, ShieldCheck, Globe, Cpu, FolderOpen, Search
} from 'lucide-react';
import { useGameState } from '../../context/GameStateContext';
import { WORLDS } from '../../data/worlds';
import { MISSIONS, getMissionById } from '../../data/missions';
import { BADGES } from '../../data/badges';
import { sfx } from '../../utils/audio';

export const DashboardView: React.FC = () => {
  const { 
    student, 
    startMission, 
    setActiveView, 
    setSelectedWorldId, 
    currentLevelInfo, 
    assignments 
  } = useGameState();

  const [activeTipIdx, setActiveTipIdx] = useState(0);

  const quickTips = [
    { key1: 'Ctrl', key2: 'C', desc: 'Copia um texto ou imagem facilmente!' },
    { key1: 'Ctrl', key2: 'V', desc: 'Cola o que copiaste para onde quiseres!' },
    { key1: 'Ctrl', key2: 'Z', desc: 'Enganaste-te? Desfaz a última ação num segundo!' },
    { key1: 'Ctrl', key2: 'F', desc: 'Pesquisa qualquer palavra dentro de uma página!' },
  ];

  // Next suggested mission
  const nextMission = MISSIONS.find(m => !student.completedMissionIds.includes(m.id)) || MISSIONS[0];
  const assignedMission = assignments.length > 0 ? getMissionById(assignments[0].missionId) : null;

  // World completed count
  const getWorldCompletedCount = (worldId: string) => {
    const worldMissions = MISSIONS.filter(m => m.worldId === worldId);
    return worldMissions.filter(m => student.completedMissionIds.includes(m.id)).length;
  };

  // 5 Pastel Theme Colors matching reference image
  const worldPastels = [
    {
      bg: 'bg-[#dcfce7]', // Mint green (like "Computador" in reference)
      border: 'border-emerald-300',
      hoverBorder: 'hover:border-emerald-400',
      title: 'Computador & Eu',
      sub: 'Conhece as partes, segurança e privacidade.',
      tag: 'Respeitar e Proteger',
      btnBg: 'bg-emerald-700 text-white',
      badgeBg: 'bg-emerald-100 text-emerald-800',
    },
    {
      bg: 'bg-[#fce7f3]', // Pink/Rose (like "Internet" in reference)
      border: 'border-pink-300',
      hoverBorder: 'hover:border-pink-400',
      title: 'Internet & Notícias',
      sub: 'Navega em segurança e avalia fontes.',
      tag: 'Investigar e Pesquisar',
      btnBg: 'bg-pink-700 text-white',
      badgeBg: 'bg-pink-100 text-pink-800',
    },
    {
      bg: 'bg-[#fef9c3]', // Sunny yellow (like "Programação" in reference)
      border: 'border-amber-300',
      hoverBorder: 'hover:border-amber-400',
      title: 'Fronteira da IA',
      sub: 'Dá os teus passos no mundo da inteligência artificial!',
      tag: 'Inovar e Criar',
      btnBg: 'bg-amber-700 text-white',
      badgeBg: 'bg-amber-100 text-amber-900',
    },
    {
      bg: 'bg-[#f3e8ff]', // Lavender/Purple (like "Criação Digital" in reference)
      border: 'border-purple-300',
      hoverBorder: 'hover:border-purple-400',
      title: 'Criação & Nuvem',
      sub: 'Documentos partilhados, netiqueta e empatia.',
      tag: 'Comunicar e Colaborar',
      btnBg: 'bg-purple-700 text-white',
      badgeBg: 'bg-purple-100 text-purple-800',
    },
    {
      bg: 'bg-[#ffedd5]', // Peach/Orange (like "Segurança Online" in reference)
      border: 'border-orange-300',
      hoverBorder: 'hover:border-orange-400',
      title: 'Laboratório Criativo',
      sub: 'Algoritmos em blocos e organização digital.',
      tag: 'Criar e Inovar',
      btnBg: 'bg-orange-700 text-white',
      badgeBg: 'bg-orange-100 text-orange-900',
    },
  ];

  return (
    <div id="dashboard-view-container" className="space-y-8 pb-12">
      
      {/* 1. HERO BANNER - 1:1 Design from Reference Image */}
      <div className="relative overflow-hidden rounded-[32px] bg-[#bae6fd] border-2 border-sky-300 p-6 sm:p-10 shadow-sm">
        
        {/* Subtle decorative doodle sparks */}
        <div className="absolute top-4 left-6 text-amber-400 text-2xl font-bold select-none opacity-80">✦</div>
        <div className="absolute bottom-6 left-1/4 text-sky-400 text-xl font-bold select-none opacity-60">✦</div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero Text */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Title with yellow doodle underline */}
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight font-['Fredoka']">
                Bem-vindo ao mundo das TIC!
              </h1>
              {/* Playful yellow highlight brush */}
              <div className="w-36 sm:w-48 h-2.5 bg-amber-400 rounded-full -mt-1 ml-1" />
            </div>

            <p className="text-base sm:text-lg font-bold text-slate-800 font-['Nunito']">
              Explora, aprende, cria e diverte-te com a tecnologia!
            </p>

            <p className="text-sm sm:text-base text-slate-700 max-w-lg leading-relaxed font-['Nunito']">
              Aqui vais descobrir como usar o computador, a internet e muitas ferramentas digitais para dar vida às tuas ideias.
            </p>

            {/* CTA Button & XP preview */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                id="btn-hero-vamos-comecar"
                onClick={() => {
                  sfx.playClick();
                  startMission(nextMission.id);
                }}
                className="flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-900 font-extrabold text-sm sm:text-base shadow-md shadow-amber-500/20 border-2 border-amber-500/30 transition cursor-pointer"
              >
                <span>Vamos começar!</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>

              <div className="bg-white/80 backdrop-blur-xs px-4 py-2 rounded-full border border-sky-200 text-xs font-bold text-slate-700 flex items-center gap-2">
                <span>Próxima missão:</span>
                <strong className="text-sky-800 truncate max-w-[160px]">{nextMission.title}</strong>
                <span className="text-amber-600 font-mono font-black">+{nextMission.xpReward} XP</span>
              </div>
            </div>
          </div>

          {/* Right Hero Illustration & Doodle Bubble */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Cheerful Kids Illustration */}
              <img 
                src="/src/assets/images/tic_hero_kids_1789392809348.jpg" 
                alt="Alunos de TIC a criar no computador"
                className="w-full h-auto object-contain rounded-2xl drop-shadow-md"
              />

              {/* Hand-drawn motivational sticker */}
              <div className="absolute -top-3 -right-2 bg-white/95 border-2 border-slate-900 rounded-2xl p-2.5 shadow-md transform rotate-3 select-none text-center">
                <div className="text-[10px] sm:text-xs font-black text-slate-800 font-['Fredoka'] leading-tight">
                  IDEIAS<br />+<br />TECNOLOGIA<br />=<br /><span className="text-amber-500">UM MUNDO MELHOR!</span> ♡
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Student Level & Experience Bar */}
      <div className="bg-white border-2 border-slate-100 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg">
            ⭐
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-slate-900 font-['Fredoka']">
                {currentLevelInfo.title}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-sky-100 text-sky-800">
                Nível {currentLevelInfo.level}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-bold">
              Tens <strong className="text-amber-600 font-mono">{student.xp} XP</strong>. Faltam <strong className="text-sky-600 font-mono">{currentLevelInfo.xpToNextLevel} XP</strong> para o próximo nível!
            </p>
          </div>
        </div>

        {/* Level progress bar */}
        <div className="w-full sm:w-64 space-y-1">
          <div className="flex justify-between text-[11px] font-bold text-slate-400">
            <span>Progresso de Nível</span>
            <span className="text-sky-600">{Math.round(currentLevelInfo.progressPercent)}%</span>
          </div>
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div 
              className="h-full bg-sky-500 rounded-full transition-all duration-500"
              style={{ width: `${currentLevelInfo.progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. THE 5 PASTEL WORLD CARDS (Matching Reference Layout) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Fredoka'] tracking-tight">
            Áreas de Exploração Digital
          </h2>
          <button
            onClick={() => { sfx.playClick(); setActiveView('mundos'); }}
            className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 cursor-pointer"
          >
            <span>Ver Mapa Completo</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {WORLDS.map((world, idx) => {
            const pastel = worldPastels[idx % worldPastels.length];
            const completedCount = getWorldCompletedCount(world.id);
            const worldMissions = MISSIONS.filter(m => m.worldId === world.id);
            const totalCount = worldMissions.length;
            const isCompleted = completedCount >= totalCount;

            return (
              <div
                key={world.id}
                onClick={() => {
                  sfx.playClick();
                  setSelectedWorldId(world.id);
                  setActiveView('missoes');
                }}
                className={`p-5 rounded-2xl border-2 ${pastel.bg} ${pastel.border} ${pastel.hoverBorder} shadow-xs transition hover:-translate-y-1 hover:shadow-md cursor-pointer flex flex-col justify-between space-y-4`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between">
                    <div className="w-11 h-11 rounded-xl bg-white/80 border border-slate-200/60 flex items-center justify-center text-2xl shadow-xs">
                      {world.icon}
                    </div>

                    {isCompleted && (
                      <span className="p-1 rounded-full bg-emerald-500 text-white" title="Mundo 100% Concluído!">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 font-['Fredoka'] leading-snug">
                      {pastel.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {pastel.sub}
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-900/10">
                  <span className="text-[11px] font-bold text-slate-500 font-mono">
                    {completedCount}/{totalCount} missões
                  </span>
                  <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs hover:scale-110 transition shadow-xs">
                    →
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. THREE BOTTOM FEATURE CARDS (1:1 Reference Screenshot) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Card 1: 🏆 Desafio da Semana */}
        <div className="bg-white border-2 border-slate-100 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🏆</span>
                <h3 className="text-lg font-black text-slate-900 font-['Fredoka']">
                  Desafio da Semana
                </h3>
              </div>
              <button 
                onClick={() => { sfx.playClick(); setActiveView('missoes'); }}
                className="text-xs font-bold text-sky-600 hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                <span>Ver todos</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Picture Frame / Challenge Preview */}
            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-sky-200 border-2 border-sky-300 flex items-center justify-center text-2xl shrink-0">
                  🖼️
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 leading-snug">
                    {nextMission.title}
                  </h4>
                  <p className="text-xs text-slate-600 font-medium line-clamp-2 mt-0.5">
                    {nextMission.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              sfx.playClick();
              startMission(nextMission.id);
            }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-sm shadow-sm transition cursor-pointer"
          >
            <span>Aceito o desafio!</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Card 2: 💡 Dica Rápida (Interactive Keyboard Shortcuts) */}
        <div className="bg-[#fefce8] border-2 border-amber-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">💡</span>
              <h3 className="text-lg font-black text-slate-900 font-['Fredoka']">
                Dica Rápida
              </h3>
            </div>

            <div className="space-y-1.5">
              <span className="text-sm font-extrabold text-slate-900 block font-['Fredoka']">
                Sabias que...?
              </span>
              <p className="text-xs font-semibold text-slate-600">
                Podes usar teclas de atalho para seres muito mais rápido no computador!
              </p>
            </div>

            {/* Keyboard shortcut display */}
            <div className="p-3.5 rounded-2xl bg-white border border-amber-300/80 shadow-xs space-y-2 text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="px-3 py-1.5 rounded-lg bg-slate-100 border-2 border-slate-300 font-mono font-black text-slate-800 text-xs shadow-xs">
                  {quickTips[activeTipIdx].key1}
                </span>
                <span className="text-slate-400 font-bold">+</span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-100 border-2 border-slate-300 font-mono font-black text-slate-800 text-xs shadow-xs">
                  {quickTips[activeTipIdx].key2}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-700">
                {quickTips[activeTipIdx].desc}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sfx.playClick();
              setActiveTipIdx((prev) => (prev + 1) % quickTips.length);
            }}
            className="text-center text-xs font-extrabold text-amber-800 hover:text-amber-900 py-1 cursor-pointer"
          >
            ↻ Mostrar outra dica rápida
          </button>
        </div>

        {/* Card 3: 💬 Frase do Dia (Post-It Note with tape) */}
        <div className="bg-[#ecfdf5] border-2 border-emerald-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">💬</span>
              <h3 className="text-lg font-black text-slate-900 font-['Fredoka']">
                Frase do Dia
              </h3>
            </div>

            {/* Yellow Post-It Note with Tape Sticker */}
            <div className="relative pt-3">
              {/* Tape sticker at top */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-16 h-5 bg-amber-300/70 rounded-xs transform -rotate-2 z-10 border border-amber-400/50 shadow-xs" />

              {/* Note body */}
              <div className="p-5 rounded-2xl bg-[#fef08a] border-2 border-amber-300 shadow-sm space-y-3 transform rotate-1">
                <p className="text-sm sm:text-base font-extrabold text-slate-900 font-['Fredoka'] leading-snug text-center">
                  “A tecnologia é mais poderosa quando aproxima pessoas.”
                </p>
                <div className="flex items-center justify-center text-xl">
                  ☺
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-[11px] font-bold text-emerald-800">
            Cidadania e Empatia Digital • TIC 6.º Ano
          </p>
        </div>

      </div>

      {/* 4. Badges Showcase Banner */}
      <div className="bg-white border-2 border-slate-100 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🎖️</span>
            <div>
              <h3 className="text-lg font-black text-slate-900 font-['Fredoka']">
                A Tua Coleção de Insígnias
              </h3>
              <p className="text-xs text-slate-500 font-semibold">
                Desbloqueaste <strong className="text-amber-600 font-mono">{student.unlockedBadgeIds.length}</strong> de {BADGES.length} insígnias de mérito
              </p>
            </div>
          </div>

          <button
            onClick={() => { sfx.playClick(); setActiveView('conquistas'); }}
            className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 cursor-pointer"
          >
            <span>Ver Todas</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {BADGES.slice(0, 6).map((badge) => {
            const isUnlocked = student.unlockedBadgeIds.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`p-3.5 rounded-2xl border-2 text-center flex flex-col items-center justify-center space-y-1.5 transition ${
                  isUnlocked
                    ? 'bg-amber-50/60 border-amber-300 shadow-xs'
                    : 'bg-slate-50 border-slate-200 opacity-60 grayscale'
                }`}
                title={badge.description}
              >
                <div className="text-2xl">{badge.icon || '🎖️'}</div>
                <h4 className="text-xs font-black text-slate-900 truncate max-w-full font-['Fredoka']">
                  {badge.title}
                </h4>
                <span className="text-[10px] font-bold text-amber-700 font-mono">
                  {isUnlocked ? '✓ Conquistada' : 'Bloqueada'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
