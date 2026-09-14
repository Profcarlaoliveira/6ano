import React from 'react';
import { Sparkles, CheckCircle2, ChevronRight, ArrowRight, Trophy } from 'lucide-react';
import { WORLDS } from '../../data/worlds';
import { MISSIONS } from '../../data/missions';
import { useGameState } from '../../context/GameStateContext';
import { sfx } from '../../utils/audio';

export const WorldsView: React.FC = () => {
  const { student, setSelectedWorldId, setActiveView, startMission } = useGameState();

  const handleWorldClick = (worldId: any) => {
    sfx.playClick();
    setSelectedWorldId(worldId);
    setActiveView('missoes');
  };

  const pastelStyles = [
    {
      cardBg: 'bg-[#dcfce7] border-emerald-300',
      btnBg: 'bg-emerald-600 hover:bg-emerald-500 text-white',
      accentText: 'text-emerald-800',
      barColor: 'bg-emerald-500',
    },
    {
      cardBg: 'bg-[#fce7f3] border-pink-300',
      btnBg: 'bg-pink-600 hover:bg-pink-500 text-white',
      accentText: 'text-pink-800',
      barColor: 'bg-pink-500',
    },
    {
      cardBg: 'bg-[#fef9c3] border-amber-300',
      btnBg: 'bg-amber-600 hover:bg-amber-500 text-white',
      accentText: 'text-amber-900',
      barColor: 'bg-amber-500',
    },
    {
      cardBg: 'bg-[#f3e8ff] border-purple-300',
      btnBg: 'bg-purple-600 hover:bg-purple-500 text-white',
      accentText: 'text-purple-800',
      barColor: 'bg-purple-500',
    },
    {
      cardBg: 'bg-[#ffedd5] border-orange-300',
      btnBg: 'bg-orange-600 hover:bg-orange-500 text-white',
      accentText: 'text-orange-900',
      barColor: 'bg-orange-500',
    },
  ];

  return (
    <div id="worlds-view-container" className="space-y-6 pb-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-200">
            🗺️ Mapa de Exploração
          </span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight font-['Fredoka']">
          Os 5 Mundos das TIC • 6.º Ano
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl font-semibold leading-relaxed">
          Cada mundo representa uma área do currículo oficial em Portugal. Podes escolher qualquer mundo sem bloqueios: explora ao teu próprio ritmo!
        </p>
      </div>

      {/* Interactive World Map Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {WORLDS.map((world, idx) => {
          const style = pastelStyles[idx % pastelStyles.length];
          const worldMissions = MISSIONS.filter(m => m.worldId === world.id);
          const completedCount = worldMissions.filter(m => student.completedMissionIds.includes(m.id)).length;
          const isFinished = completedCount === worldMissions.length;
          const progressPct = Math.round((completedCount / worldMissions.length) * 100);
          const bossMission = worldMissions.find(m => m.isBoss);

          return (
            <div
              key={world.id}
              className={`p-6 sm:p-7 rounded-3xl border-2 transition duration-200 flex flex-col justify-between space-y-5 ${style.cardBg} shadow-xs hover:shadow-md`}
            >
              <div className="space-y-4">
                {/* World Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-3xl shadow-xs">
                      {world.icon}
                    </div>
                    <div>
                      <span className="text-xs font-black uppercase tracking-wider text-slate-600 block font-['Fredoka']">
                        Mundo {world.order || world.number} • {world.badge || world.subtitle}
                      </span>
                      <h2 className="text-xl font-black text-slate-900 tracking-tight font-['Fredoka']">
                        {world.title}
                      </h2>
                    </div>
                  </div>

                  {isFinished ? (
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-extrabold shadow-xs">
                      <CheckCircle2 className="w-4 h-4" /> 100%
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-slate-700 bg-white/90 px-3 py-1 rounded-full border border-slate-200 shadow-xs">
                      {completedCount}/{worldMissions.length} Missões
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                  {world.description || world.shortDescription}
                </p>

                {/* Pedagogical Curriculum Area Tag */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-slate-200 text-xs font-bold text-slate-700">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Domínio Curricular: <strong>{world.curriculumArea || world.curricularDomain}</strong></span>
                </div>
              </div>

              {/* Boss Mission Callout */}
              {bossMission && (
                <div className="p-3.5 rounded-2xl bg-white border-2 border-rose-300 flex items-center justify-between gap-3 shadow-xs">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-rose-600 font-black text-[11px] font-['Fredoka'] uppercase tracking-wider">
                      <span>👑 Grande Desafio Final do Mundo</span>
                      <span>• +{bossMission.xpReward} XP</span>
                    </div>
                    <p className="text-xs font-bold text-slate-900 line-clamp-1">{bossMission.title}</p>
                  </div>

                  <button
                    onClick={() => startMission(bossMission.id)}
                    className="px-3 py-1.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-extrabold shrink-0 transition cursor-pointer shadow-xs"
                  >
                    Desafiar!
                  </button>
                </div>
              )}

              {/* Progress & Action */}
              <div className="pt-2 border-t border-slate-900/10 space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-600">
                    <span>Progresso da Área</span>
                    <span>{progressPct}%</span>
                  </div>
                  <div className="h-2.5 bg-white/80 rounded-full overflow-hidden border border-slate-200">
                    <div
                      className={`h-full ${style.barColor} transition-all duration-500`}
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => handleWorldClick(world.id)}
                  className={`w-full py-3 rounded-full ${style.btnBg} text-xs font-extrabold flex items-center justify-center gap-2 transition cursor-pointer shadow-xs`}
                >
                  <span>Ver as {worldMissions.length} Missões deste Mundo</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
