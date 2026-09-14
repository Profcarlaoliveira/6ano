import React, { useState } from 'react';
import { Award, Sparkles, CheckCircle2, Lock, ShieldCheck, Star } from 'lucide-react';
import { BADGES } from '../../data/badges';
import { useGameState } from '../../context/GameStateContext';
import { sfx } from '../../utils/audio';

export const BadgesView: React.FC = () => {
  const { student } = useGameState();
  const [activeCategory, setActiveCategory] = useState<string>('todas');

  const categories = [
    { id: 'todas', label: 'Todas as Insígnias' },
    { id: 'Respeitar e Proteger', label: '🛡️ Segurança & Identidade' },
    { id: 'Investigar e Pesquisar', label: '🔍 Pesquisa & Factos' },
    { id: 'Comunicar e Colaborar', label: '🤝 Netiqueta & Nuvem' },
    { id: 'Criar e Inovar', label: '💻 Código & Ficheiros' },
    { id: 'Especial', label: '⭐ Conquistas Especiais' },
  ];

  const filteredBadges = BADGES.filter(b => {
    if (activeCategory === 'todas') return true;
    return b.category === activeCategory;
  });

  const unlockedCount = student.unlockedBadgeIds.length;
  const totalCount = BADGES.length;

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'bg-amber-100 text-amber-900 border-amber-300 font-extrabold';
      case 'epic':
        return 'bg-purple-100 text-purple-900 border-purple-300 font-bold';
      case 'rare':
        return 'bg-sky-100 text-sky-900 border-sky-300 font-bold';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return '🛡️';
      case 'LockKeyhole': return '🔐';
      case 'Award': return '👑';
      case 'SearchCode': return '🔍';
      case 'FileSearch': return '📰';
      case 'BrainCircuit': return '🧠';
      case 'MessageSquareHeart': return '💬';
      case 'Share2': return '🤝';
      case 'Bot': return '🤖';
      case 'FolderTree': return '📁';
      case 'Code2': return '💻';
      case 'Compass': return '🧭';
      case 'Flame': return '🔥';
      default: return '🎖️';
    }
  };

  return (
    <div id="badges-view-container" className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight font-['Fredoka']">
            Galeria de Conquistas & Insígnias
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-bold">
            Conquistaste <strong className="text-amber-600 font-mono font-black">{unlockedCount}</strong> de {totalCount} medalhas de mérito
          </p>
        </div>

        {/* Badge unlock counter bar */}
        <div className="bg-white border-2 border-slate-100 px-5 py-2.5 rounded-full flex items-center gap-3 shadow-xs">
          <span className="text-xl">🏆</span>
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400 block font-['Fredoka']">Progresso da Coleção</span>
            <span className="text-xs font-black text-slate-900 font-mono">
              {Math.round((unlockedCount / totalCount) * 100)}% Desbloqueado
            </span>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => { sfx.playClick(); setActiveCategory(cat.id); }}
              className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition cursor-pointer font-['Nunito'] ${
                isSelected
                  ? 'bg-amber-400 text-slate-900 shadow-xs border border-amber-500/40'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredBadges.map((badge) => {
          const isUnlocked = student.unlockedBadgeIds.includes(badge.id);

          return (
            <div
              key={badge.id}
              className={`p-5 rounded-3xl border-2 transition duration-200 flex flex-col justify-between space-y-4 ${
                isUnlocked
                  ? 'bg-white border-amber-300 shadow-xs hover:shadow-md'
                  : 'bg-slate-50/80 border-slate-200 opacity-60'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-xs ${
                      isUnlocked
                        ? 'bg-amber-100 border-2 border-amber-300'
                        : 'bg-slate-100 border border-slate-200 grayscale'
                    }`}
                  >
                    {badge.icon || getBadgeIcon(badge.iconName)}
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider border ${getRarityBadge(badge.rarity)}`}>
                    {badge.rarity}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-base text-slate-900 font-['Fredoka']">{badge.title}</h3>
                  <p className="text-xs text-slate-600 font-semibold mt-1 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>

              {/* Criteria details */}
              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                <p className="text-slate-500 font-bold">
                  <strong className="text-slate-800">Categoria:</strong> {badge.category}
                </p>

                <div className="flex items-center justify-between text-xs font-bold pt-1">
                  <span className="text-amber-700 font-mono">+{badge.xpBonus || 50} XP</span>
                  {isUnlocked ? (
                    <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Conquistada
                    </span>
                  ) : (
                    <span className="text-slate-400 font-medium flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" /> Bloqueada
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
