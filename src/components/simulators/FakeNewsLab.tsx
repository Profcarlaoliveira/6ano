import React, { useState } from 'react';
import { SearchCheck, CheckCircle2, XCircle, Globe, Calendar, UserCheck, GitCompare, AlertTriangle } from 'lucide-react';
import { sfx } from '../../utils/audio';

export const FakeNewsLab: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const [selectedArticle, setSelectedArticle] = useState<'a' | 'b'>('a');
  const [checksA, setChecksA] = useState({ author: false, date: false, domain: false, corroboration: false });
  const [checksB, setChecksB] = useState({ author: false, date: false, domain: false, corroboration: false });

  const articleA = {
    title: 'Descoberta água líquida e sinais de minerais na cratera Jezero em Marte',
    source: 'Agência Espacial Europeia (esa.int)',
    author: 'Dra. Helena Matos, Astrobióloga',
    date: '14 de Fevereiro de 2025',
    summary: 'A sonda espacial registou evidências espectrométricas de minerais hidratados. O estudo foi revisto por pares na revista Nature Astronomy e confirmado pela NASA.',
    realStatus: true,
  };

  const articleB = {
    title: 'PIRÂMIDE ALIENÍGENA GIGANTE ENCONTRADA EM MARTE E GOVERNOS ESCONDEM TUDO!',
    source: 'ovnis-segredos-ocultos.xyz',
    author: 'GamerBoy99 (Anónimo)',
    date: 'Sem data de publicação indicada',
    summary: 'Uma foto desfocada prova que extraterrestres construíram templos em Marte! Cientistas de todo o mundo estão proibidos de falar sobre o assunto sob ameaça de prisão!',
    realStatus: false,
  };

  const toggleCheck = (article: 'a' | 'b', key: 'author' | 'date' | 'domain' | 'corroboration') => {
    sfx.playClick();
    if (article === 'a') {
      const updated = { ...checksA, [key]: !checksA[key] };
      setChecksA(updated);
      checkCompletion(updated, checksB);
    } else {
      const updated = { ...checksB, [key]: !checksB[key] };
      setChecksB(updated);
      checkCompletion(checksA, updated);
    }
  };

  const checkCompletion = (a: typeof checksA, b: typeof checksB) => {
    const isADone = a.author && a.date && a.domain && a.corroboration;
    if (isADone && onSuccess) {
      sfx.playSuccess();
      onSuccess();
    }
  };

  return (
    <div id="fake-news-lab-box" className="bg-white border-2 border-slate-200 rounded-3xl p-6 text-slate-800 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-sky-100 border-2 border-sky-300 text-sky-800">
            <SearchCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-lg text-slate-900 font-['Fredoka']">Laboratório de Verificação de Fontes</h3>
            <p className="text-xs text-slate-500 font-bold">Aplica os 4 Filtros de Ouro para descobrir se o artigo é fiável</p>
          </div>
        </div>

        {/* Tab switch between Article A and B */}
        <div className="flex bg-slate-100 p-1 rounded-full border border-slate-200 self-start sm:self-auto">
          <button
            id="tab-article-a"
            onClick={() => { setSelectedArticle('a'); sfx.playClick(); }}
            className={`px-4 py-1.5 rounded-full text-xs font-black transition cursor-pointer ${
              selectedArticle === 'a' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Artigo A (Científico)
          </button>
          <button
            id="tab-article-b"
            onClick={() => { setSelectedArticle('b'); sfx.playClick(); }}
            className={`px-4 py-1.5 rounded-full text-xs font-black transition cursor-pointer ${
              selectedArticle === 'b' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Artigo B (Viral)
          </button>
        </div>
      </div>

      {/* Active Article Card */}
      {selectedArticle === 'a' ? (
        <div className="bg-[#f0fdf4] border-2 border-emerald-300 rounded-2xl p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="px-3 py-0.5 rounded-full text-[11px] font-mono font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
              esa.int — Portal Institucional
            </span>
            <span className="text-xs text-slate-500 font-bold">{articleA.date}</span>
          </div>

          <h4 className="text-base font-black text-slate-900 font-['Fredoka']">{articleA.title}</h4>
          <p className="text-xs text-slate-700 font-semibold leading-relaxed">{articleA.summary}</p>

          <div className="pt-2 border-t border-emerald-200">
            <h5 className="text-xs font-black text-emerald-900 mb-3 uppercase tracking-wider font-['Fredoka']">
              Aplica os 4 Filtros de Validação:
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                onClick={() => toggleCheck('a', 'author')}
                className={`p-3 rounded-2xl border-2 text-xs font-bold flex items-center justify-between text-left transition cursor-pointer ${
                  checksA.author ? 'bg-emerald-200 border-emerald-400 text-emerald-900' : 'bg-white border-emerald-200 text-slate-700 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Autor Identificado (Dra. Helena Matos)</span>
                </div>
                {checksA.author ? <CheckCircle2 className="w-4 h-4 text-emerald-700 stroke-[3]" /> : <div className="w-4 h-4 rounded-full border border-slate-300 bg-white" />}
              </button>

              <button
                onClick={() => toggleCheck('a', 'date')}
                className={`p-3 rounded-2xl border-2 text-xs font-bold flex items-center justify-between text-left transition cursor-pointer ${
                  checksA.date ? 'bg-emerald-200 border-emerald-400 text-emerald-900' : 'bg-white border-emerald-200 text-slate-700 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Data Recente e Verificável</span>
                </div>
                {checksA.date ? <CheckCircle2 className="w-4 h-4 text-emerald-700 stroke-[3]" /> : <div className="w-4 h-4 rounded-full border border-slate-300 bg-white" />}
              </button>

              <button
                onClick={() => toggleCheck('a', 'domain')}
                className={`p-3 rounded-2xl border-2 text-xs font-bold flex items-center justify-between text-left transition cursor-pointer ${
                  checksA.domain ? 'bg-emerald-200 border-emerald-400 text-emerald-900' : 'bg-white border-emerald-200 text-slate-700 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Domínio Oficial da ESA (.int)</span>
                </div>
                {checksA.domain ? <CheckCircle2 className="w-4 h-4 text-emerald-700 stroke-[3]" /> : <div className="w-4 h-4 rounded-full border border-slate-300 bg-white" />}
              </button>

              <button
                onClick={() => toggleCheck('a', 'corroboration')}
                className={`p-3 rounded-2xl border-2 text-xs font-bold flex items-center justify-between text-left transition cursor-pointer ${
                  checksA.corroboration ? 'bg-emerald-200 border-emerald-400 text-emerald-900' : 'bg-white border-emerald-200 text-slate-700 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <GitCompare className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Confirmado pela NASA e Nature</span>
                </div>
                {checksA.corroboration ? <CheckCircle2 className="w-4 h-4 text-emerald-700 stroke-[3]" /> : <div className="w-4 h-4 rounded-full border border-slate-300 bg-white" />}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#fff1f2] border-2 border-rose-300 rounded-2xl p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="px-3 py-0.5 rounded-full text-[11px] font-mono font-black bg-rose-100 text-rose-800 border border-rose-300">
              ovnis-segredos-ocultos.xyz (Blog Suspeito)
            </span>
            <span className="text-xs text-rose-600 font-black flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> Sem data indicada!
            </span>
          </div>

          <h4 className="text-base font-black text-slate-900 font-['Fredoka']">{articleB.title}</h4>
          <p className="text-xs text-slate-700 font-semibold leading-relaxed">{articleB.summary}</p>

          <div className="p-4 rounded-2xl bg-white border-2 border-rose-200 text-xs text-rose-900 font-semibold">
            <p className="font-black mb-1 font-['Fredoka'] text-rose-800">Falha em Todos os 4 Filtros:</p>
            <ul className="list-disc list-inside space-y-1 text-slate-700 text-xs">
              <li>Autor anónimo sem credenciais científicas ("GamerBoy99").</li>
              <li>Não tem data: impossível saber se a foto é antiga ou inventada.</li>
              <li>Domínio gratuito ".xyz" sem qualquer conselho editorial.</li>
              <li>Nenhum outro meio de comunicação ou agência espacial confirma o boato.</li>
            </ul>
          </div>
        </div>
      )}

      {checksA.author && checksA.date && checksA.domain && checksA.corroboration && (
        <div className="p-4 rounded-2xl bg-emerald-100 border-2 border-emerald-300 flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0 stroke-[3]" />
          <div>
            <p className="text-sm font-black text-emerald-900 font-['Fredoka']">Excelente Investigação!</p>
            <p className="text-xs text-emerald-800 font-bold">
              Comprováste que o Artigo A cumpre com rigor os 4 filtros de credibilidade, enquanto o Artigo B é puro boato sensacionalista (Clickbait).
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
