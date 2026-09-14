import React from 'react';
import { 
  Compass, Map, Target, Award, BarChart3, Volume2, VolumeX, 
  Flame, GraduationCap, Sparkles, Search
} from 'lucide-react';
import { useGameState } from '../../context/GameStateContext';
import { sfx } from '../../utils/audio';

export const Navbar: React.FC = () => {
  const { 
    student, 
    activeView, 
    setActiveView, 
    toggleSound, 
    currentLevelInfo 
  } = useGameState();

  const navItems = [
    { id: 'dashboard', label: 'Início', icon: Compass },
    { id: 'mundos', label: 'Mundos', icon: Map },
    { id: 'missoes', label: 'Missões', icon: Target },
    { id: 'conquistas', label: 'Conquistas', icon: Award },
    { id: 'progresso', label: 'Currículo TIC', icon: BarChart3 },
  ];

  return (
    <header id="main-navbar" className="sticky top-0 z-40 bg-white border-b-2 border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Subtitle */}
          <div 
            onClick={() => { sfx.playClick(); setActiveView('dashboard'); }}
            className="flex items-center gap-3 cursor-pointer group shrink-0 select-none"
          >
            {/* Mascot Icon */}
            <div className="w-12 h-12 rounded-2xl bg-sky-100 border-2 border-sky-300 flex items-center justify-center p-1 shadow-sm group-hover:scale-105 transition">
              <img 
                src="/src/assets/images/tic_laptop_logo_1789392825075.jpg" 
                alt="TIC Mascot" 
                className="w-full h-full object-cover rounded-xl"
                onError={(e) => {
                  // Fallback if image load fails
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="text-2xl hidden" id="fallback-laptop-emoji">💻</span>
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-extrabold text-2xl tracking-tight text-slate-900 font-['Fredoka']">
                  TIC <span className="text-sky-600">QUEST</span>
                </span>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300 font-sans">
                  6.º ANO
                </span>
              </div>
              <p className="text-xs font-bold text-slate-500 font-['Nunito'] hidden sm:block">
                Aprender Hoje, Criar Amanhã!
              </p>
            </div>
          </div>

          {/* Center Navigation Links (Pill Style from Reference) */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-100/80 p-1.5 rounded-full border border-slate-200">
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => { sfx.playClick(); setActiveView(item.id as any); }}
                  className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition cursor-pointer font-['Nunito'] ${
                    isActive
                      ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Area: XP, Streak, Teacher & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Streak Counter */}
            <div 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-100 border border-orange-300 text-orange-800 text-xs font-extrabold shadow-sm"
              title={`${student.streakDays} dias seguidos no TIC QUEST!`}
            >
              <Flame className="w-4 h-4 fill-current text-orange-500 animate-bounce" />
              <span className="font-mono text-xs">{student.streakDays}d</span>
            </div>

            {/* XP Badge */}
            <div 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-extrabold shadow-sm"
              title={`Nível ${currentLevelInfo.level} • ${student.xp} Pontos de Experiência`}
            >
              <span className="text-sm">⭐</span>
              <span className="font-mono">{student.xp} XP</span>
              <span className="hidden xl:inline text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded-full font-bold">
                Nv.{currentLevelInfo.level}
              </span>
            </div>

            {/* Sound Toggle */}
            <button
              id="btn-toggle-sound"
              onClick={toggleSound}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 transition cursor-pointer"
              title={student.soundEnabled ? 'Silenciar Efeitos de Som' : 'Ativar Efeitos de Som'}
            >
              {student.soundEnabled ? <Volume2 className="w-4 h-4 text-sky-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>

            {/* Teacher Mode Button */}
            <button
              id="btn-nav-teacher"
              onClick={() => { sfx.playClick(); setActiveView('teacher'); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer border ${
                activeView === 'teacher'
                  ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                  : 'bg-purple-100 hover:bg-purple-200 text-purple-800 border-purple-300'
              }`}
              title="Área Pedagógica (Prof.ª Carla Ferreira)"
            >
              <GraduationCap className="w-4 h-4" />
              <span className="hidden sm:inline">Professora</span>
            </button>

            {/* Student Avatar Button */}
            <button
              id="btn-nav-profile"
              onClick={() => { sfx.playClick(); setActiveView('perfil'); }}
              className={`flex items-center gap-2 p-1.5 pr-3 rounded-full border transition cursor-pointer ${
                activeView === 'perfil'
                  ? 'bg-sky-50 border-sky-400 ring-2 ring-sky-400/30'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div className={`w-8 h-8 rounded-full ${student.avatarBg} flex items-center justify-center text-sm shadow-sm text-white`}>
                {student.avatarIcon}
              </div>
              <div className="text-left hidden md:block">
                <p className="text-xs font-bold text-slate-800 leading-tight">{student.name}</p>
                <p className="text-[10px] font-bold text-slate-400 leading-none">{student.classGroup}</p>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile secondary navigation bar */}
        <div className="flex lg:hidden items-center justify-between py-2.5 border-t border-slate-100 overflow-x-auto gap-2">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { sfx.playClick(); setActiveView(item.id as any); }}
                className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 transition ${
                  isActive ? 'bg-sky-600 text-white' : 'text-slate-600 bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
