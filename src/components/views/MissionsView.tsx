import React, { useState } from 'react';
import { 
  Target, Search, Filter, CheckCircle2, Play, Clock, Sparkles, 
  Award, Shield, BookOpen, Layers, Flame, ArrowRight
} from 'lucide-react';
import { MISSIONS } from '../../data/missions';
import { WORLDS } from '../../data/worlds';
import { useGameState } from '../../context/GameStateContext';
import { sfx } from '../../utils/audio';

export const MissionsView: React.FC = () => {
  const { student, startMission, selectedWorldId, setSelectedWorldId, assignments } = useGameState();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'todas' | 'por_fazer' | 'concluidas' | 'atribuidas'>('todas');

  const assignedMissionIds = assignments.map(a => a.missionId);

  const filteredMissions = MISSIONS.filter((mission) => {
    // World filter
    if (selectedWorldId && mission.worldId !== selectedWorldId) {
      return false;
    }

    // Status filter
    const isCompleted = student.completedMissionIds.includes(mission.id);
    const isAssigned = assignedMissionIds.includes(mission.id);

    if (statusFilter === 'por_fazer' && isCompleted) return false;
    if (statusFilter === 'concluidas' && !isCompleted) return false;
    if (statusFilter === 'atribuidas' && !isAssigned) return false;

    // Search filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchTitle = mission.title.toLowerCase().includes(q);
      const matchGoal = (mission.shortGoal || mission.subtitle).toLowerCase().includes(q);
      if (!matchTitle && !matchGoal) return false;
    }

    return true;
  });

  return (
    <div id="missions-view-container" className="space-y-6 pb-12">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight font-['Fredoka']">
            Quadro de Missões & Desafios
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-bold">
            {filteredMissions.length} missões disponíveis • Explora livremente e acumula pontos de conquista
          </p>
        </div>

        {/* Search input - pill style like reference image */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="input-search-missions"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar missão..."
            className="w-full bg-white border-2 border-slate-200 rounded-full pl-10 pr-4 py-2 text-xs font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 shadow-xs transition"
          />
        </div>
      </div>

      {/* Filter Tabs Row */}
      <div className="flex flex-wrap items-center gap-2 pt-1 border-b border-slate-200 pb-4">
        <button
          onClick={() => { sfx.playClick(); setSelectedWorldId(null); }}
          className={`px-4 py-1.5 rounded-full text-xs font-black transition cursor-pointer font-['Nunito'] ${
            selectedWorldId === null
              ? 'bg-sky-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          Todos os Mundos
        </button>

        {WORLDS.map((w) => {
          const isSelected = selectedWorldId === w.id;
          return (
            <button
              key={w.id}
              onClick={() => { sfx.playClick(); setSelectedWorldId(w.id); }}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black transition cursor-pointer font-['Nunito'] ${
                isSelected
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <span>{w.icon}</span>
              <span className="hidden md:inline">{w.title.split(' ')[0]}</span>
              <span className="md:hidden">M{w.order || w.number}</span>
            </button>
          );
        })}

        <div className="h-5 w-px bg-slate-300 mx-1 hidden sm:block" />

        {/* Status Pills */}
        {(['todas', 'por_fazer', 'concluidas', 'atribuidas'] as const).map((st) => {
          const labels = {
            todas: 'Todas',
            por_fazer: 'Por Fazer',
            concluidas: 'Concluídas',
            atribuidas: '⭐ Pela Professora',
          };
          const isSelected = statusFilter === st;
          return (
            <button
              key={st}
              onClick={() => { sfx.playClick(); setStatusFilter(st); }}
              className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                isSelected
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {labels[st]}
            </button>
          );
        })}
      </div>

      {/* Missions Grid */}
      {filteredMissions.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border-2 border-slate-100 space-y-3 shadow-xs">
          <Target className="w-10 h-10 text-slate-400 mx-auto" />
          <p className="text-base font-extrabold text-slate-800 font-['Fredoka']">Nenhuma missão encontrada com estes filtros.</p>
          <button
            onClick={() => { setSelectedWorldId(null); setStatusFilter('todas'); setSearchTerm(''); }}
            className="text-xs font-bold text-sky-600 hover:underline cursor-pointer"
          >
            Limpar filtros e ver todas as missões
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMissions.map((mission) => {
            const world = WORLDS.find(w => w.id === mission.worldId);
            const isCompleted = student.completedMissionIds.includes(mission.id);
            const isAssigned = assignedMissionIds.includes(mission.id);

            return (
              <div
                key={mission.id}
                className={`p-6 rounded-3xl border-2 transition duration-200 flex flex-col justify-between space-y-4 bg-white shadow-xs hover:shadow-md ${
                  mission.isBoss
                    ? 'border-rose-300 ring-2 ring-rose-200/50'
                    : isCompleted
                    ? 'border-emerald-300'
                    : 'border-slate-200'
                }`}
              >
                <div>
                  {/* Top Tags */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                      <span className="text-base">{world?.icon}</span>
                      <span>Mundo {world?.order || world?.number}</span>
                    </span>

                    <div className="flex items-center gap-1.5">
                      {isAssigned && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-purple-800 border border-purple-200">
                          Prof.ª Carla
                        </span>
                      )}
                      {mission.isBoss && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-100 text-rose-800 border border-rose-200">
                          👑 CHEFE
                        </span>
                      )}
                      {isCompleted ? (
                        <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Concluído
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                          Disponível
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-extrabold text-base text-slate-900 tracking-tight font-['Fredoka']">
                    {mission.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-semibold mt-1.5 line-clamp-2 leading-relaxed">
                    {mission.shortGoal || mission.subtitle}
                  </p>

                  {/* Curricular Tag */}
                  <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-50 text-[11px] font-bold text-slate-600 border border-slate-200">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span className="truncate max-w-[220px]">{mission.curricularSkill || world?.curricularDomain}</span>
                  </div>
                </div>

                {/* Footer details & action */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200 text-xs font-black font-mono">
                      +{mission.xpReward} XP
                    </span>
                    <span className="text-slate-400 text-xs font-bold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{mission.estimatedMinutes}m</span>
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      sfx.playClick();
                      startMission(mission.id);
                    }}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold transition cursor-pointer shadow-xs ${
                      isCompleted
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        : 'bg-sky-600 hover:bg-sky-500 text-white'
                    }`}
                  >
                    <span>{isCompleted ? 'Repetir' : 'Iniciar'}</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
