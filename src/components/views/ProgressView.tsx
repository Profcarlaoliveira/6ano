import React from 'react';
import { 
  BarChart3, ShieldCheck, Search, Users, Cpu, CheckCircle2, 
  Sparkles, FileText, Calendar, Globe, Award 
} from 'lucide-react';
import { useGameState } from '../../context/GameStateContext';
import { MISSIONS } from '../../data/missions';
import { WORLDS } from '../../data/worlds';

export const ProgressView: React.FC = () => {
  const { student, currentLevelInfo } = useGameState();

  // Calculate coverage for each official area of Aprendizagens Essenciais 6.º ano
  const pillars = [
    {
      id: 'respeitar',
      title: 'Respeitar e Proteger',
      subtitle: 'Segurança, Pegada Digital, Direitos de Autor e Cidadania',
      icon: ShieldCheck,
      color: 'emerald',
      cardBg: 'bg-[#dcfce7]/50 border-emerald-200',
      barColor: 'bg-emerald-500',
      iconBg: 'bg-emerald-100 text-emerald-700',
      worldsIncluded: ['mundo-1'],
      essentialGoals: [
        'Adotar comportamentos seguros e éticos na utilização de meios digitais',
        'Reconhecer a importância da proteção de dados e privacidade online',
        'Identificar riscos de cibersegurança (phishing, engenharia social)',
        'Compreender os direitos de autor e licenciamento ético de conteúdos',
      ],
    },
    {
      id: 'investigar',
      title: 'Investigar e Pesquisar',
      subtitle: 'Navegação Crítica, Validação de Fontes e IA',
      icon: Search,
      color: 'sky',
      cardBg: 'bg-[#e0f2fe]/50 border-sky-200',
      barColor: 'bg-sky-500',
      iconBg: 'bg-sky-100 text-sky-700',
      worldsIncluded: ['mundo-2', 'mundo-3'],
      essentialGoals: [
        'Utilizar operadores e filtros avançados em motores de pesquisa',
        'Avaliar criticamente a fiabilidade das fontes de informação',
        'Compreender o funcionamento básico e os limites de sistemas de IA',
        'Verificar factos cruzando múltiplas fontes antes da partilha',
      ],
    },
    {
      id: 'comunicar',
      title: 'Comunicar e Colaborar',
      subtitle: 'Netiqueta, Trabalho de Equipa e Partilha na Nuvem',
      icon: Users,
      color: 'amber',
      cardBg: 'bg-[#fef3c7]/50 border-amber-200',
      barColor: 'bg-amber-500',
      iconBg: 'bg-amber-100 text-amber-800',
      worldsIncluded: ['mundo-4'],
      essentialGoals: [
        'Comunicar digitalmente de forma respeitosa, empática e inclusiva',
        'Trabalhar em documentos e projetos partilhados na nuvem',
        'Resolver conflitos em ambientes online construtivamente',
        'Gerir permissões de acesso (leitura, edição, comentários)',
      ],
    },
    {
      id: 'criar',
      title: 'Criar e Inovar',
      subtitle: 'Pensamento Computacional, Algoritmos e Organização',
      icon: Cpu,
      color: 'rose',
      cardBg: 'bg-[#ffe4e6]/50 border-rose-200',
      barColor: 'bg-rose-500',
      iconBg: 'bg-rose-100 text-rose-700',
      worldsIncluded: ['mundo-5'],
      essentialGoals: [
        'Decompor problemas complexos em sequências lógicas de passos',
        'Criar e depurar algoritmos recorrendo a programação por blocos',
        'Estruturar e organizar ficheiros em árvores lógicas de pastas',
        'Desenvolver pequenos projetos digitais interativos e criativos',
      ],
    },
  ];

  const calculatePillarProgress = (worldIds: string[]) => {
    const relevantMissions = MISSIONS.filter(m => worldIds.includes(m.worldId));
    if (relevantMissions.length === 0) return 0;
    const completed = relevantMissions.filter(m => student.completedMissionIds.includes(m.id)).length;
    return Math.round((completed / relevantMissions.length) * 100);
  };

  return (
    <div id="progress-view-container" className="space-y-6 pb-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-200">
            📚 Alinhamento Oficial DGE • Portugal
          </span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight font-['Fredoka']">
          Aprendizagens Essenciais de TIC • 6.º Ano
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-semibold max-w-2xl leading-relaxed">
          O teu percurso no TIC QUEST cobre integralmente os 4 domínios curriculares oficiais definidos pelo Ministério da Educação de Portugal, transformados em desafios práticos e gamificados.
        </p>
      </div>

      {/* Curriculum Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          const progress = calculatePillarProgress(pillar.worldsIncluded);

          return (
            <div
              key={pillar.id}
              className={`p-6 sm:p-7 rounded-3xl border-2 ${pillar.cardBg} space-y-4 shadow-xs`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl ${pillar.iconBg} border border-black/10 flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-base font-black text-slate-900 font-['Fredoka']">{pillar.title}</h2>
                    <p className="text-xs text-slate-600 font-bold">{pillar.subtitle}</p>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-slate-700 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-xs">
                  {progress}% Coberto
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-2.5 bg-white rounded-full overflow-hidden border border-slate-200">
                <div
                  className={`h-full ${pillar.barColor} transition-all duration-500`}
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Essential Goals */}
              <div className="space-y-2 pt-2 border-t border-black/10">
                <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider block font-['Fredoka']">
                  Metas de Aprendizagem:
                </span>
                <ul className="space-y-2">
                  {pillar.essentialGoals.map((goal, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
