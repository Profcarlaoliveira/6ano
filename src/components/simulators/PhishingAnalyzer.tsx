import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, ShieldAlert, MousePointerClick, Info } from 'lucide-react';
import { sfx } from '../../utils/audio';

interface Clue {
  id: string;
  label: string;
  foundText: string;
  explanation: string;
}

export const PhishingAnalyzer: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const [revealedClues, setRevealedClues] = useState<string[]>([]);

  const clues: Clue[] = [
    {
      id: 'sender',
      label: 'Remetente Falso (Spoofing)',
      foundText: 'suporte-urgente@fortn1te-skins-gratis.net',
      explanation: 'Usa um domínio não oficial (.net em vez de .com) e trocou a letra "i" pelo número "1" em "fortn1te". Isto é falsificação de identidade!',
    },
    {
      id: 'urgency',
      label: 'Pânico e Falsa Urgência',
      foundText: 'A tua conta será suspensa em 15 minutos!!!',
      explanation: 'Os criminosos usam prazos curtos para te assustar e impedir que penses com calma ou fales com um adulto.',
    },
    {
      id: 'generic',
      label: 'Saudação Vaga',
      foundText: 'Olá Utilizador!',
      explanation: 'Plataformas oficiais tratam-te pelo teu nome próprio ou nome de utilizador oficial, e não por termos vagos.',
    },
    {
      id: 'link',
      label: 'Botão com Link Perigoso',
      foundText: 'http://login-falso.xyz/hack',
      explanation: 'O link não é seguro (usa http em vez de https) e aponta para um domínio ".xyz" estranho criado para roubar a tua conta.',
    },
  ];

  const handleToggleClue = (id: string) => {
    sfx.playClick();
    if (!revealedClues.includes(id)) {
      const next = [...revealedClues, id];
      setRevealedClues(next);
      if (next.length === clues.length) {
        sfx.playSuccess();
        if (onSuccess) onSuccess();
      }
    }
  };

  const progress = (revealedClues.length / clues.length) * 100;

  return (
    <div id="phishing-analyzer-box" className="bg-white border-2 border-slate-200 rounded-3xl p-6 text-slate-800 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-rose-100 border-2 border-rose-300 text-rose-800">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-lg text-slate-900 font-['Fredoka']">Laboratório de Deteção de Phishing</h3>
            <p className="text-xs text-slate-500 font-bold">Clica nos elementos suspeitos do email para desmascarar a armadilha</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-rose-50 px-4 py-1.5 rounded-full border border-rose-200 self-start sm:self-auto">
          <span className="text-xs text-rose-700 font-bold">Pistas encontradas:</span>
          <span className="text-xs font-black text-rose-900 font-mono">{revealedClues.length} / {clues.length}</span>
        </div>
      </div>

      {/* Email Mockup Container */}
      <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        {/* Email Header Bar */}
        <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
            <span className="ml-2 font-bold text-slate-700">Caixa de Entrada (1 Mensagem Urgente)</span>
          </div>
          <span className="text-rose-600 font-black text-[11px] animate-pulse">● Mensagem Não Confiável</span>
        </div>

        {/* Email Meta details */}
        <div className="p-4 border-b border-slate-200 space-y-2 bg-white text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-500 font-bold w-16">De:</span>
            <span className="font-extrabold text-slate-900">Equipa Epic Games Oficial</span>
            <button
              id="clue-btn-sender"
              onClick={() => handleToggleClue('sender')}
              className={`font-mono px-2.5 py-0.5 rounded-full cursor-pointer transition border-2 text-xs font-bold ${
                revealedClues.includes('sender')
                  ? 'bg-rose-100 text-rose-900 border-rose-400'
                  : 'bg-slate-100 text-slate-700 border-dashed border-slate-300 hover:border-rose-400'
              }`}
            >
              &lt;suporte-urgente@fortn1te-skins-gratis.net&gt;
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-500 font-bold w-16">Assunto:</span>
            <button
              id="clue-btn-urgency"
              onClick={() => handleToggleClue('urgency')}
              className={`font-extrabold cursor-pointer px-2.5 py-0.5 rounded-full transition border-2 text-xs ${
                revealedClues.includes('urgency')
                  ? 'bg-rose-100 text-rose-900 border-rose-400'
                  : 'bg-slate-100 text-slate-800 border-dashed border-slate-300 hover:border-rose-400'
              }`}
            >
              URGENTE: A tua conta será suspensa em 15 minutos!!!
            </button>
          </div>
        </div>

        {/* Email Body Content */}
        <div className="p-6 space-y-4 text-xs sm:text-sm text-slate-700 bg-white">
          <div>
            <button
              id="clue-btn-generic"
              onClick={() => handleToggleClue('generic')}
              className={`cursor-pointer px-2.5 py-1 rounded-full transition border-2 text-xs font-black ${
                revealedClues.includes('generic')
                  ? 'bg-rose-100 text-rose-900 border-rose-400'
                  : 'border-dashed border-slate-300 text-slate-700 hover:border-rose-400'
              }`}
            >
              Olá Utilizador!
            </button>
          </div>

          <p className="leading-relaxed font-semibold">
            Detetamos uma atividade suspeita na tua conta de jogador. Para não perderes todas as tuas skins raras, itens cosméticos e moedas acumuladas, é obrigatório revalidar as tuas credenciais de acesso imediatamente.
          </p>

          <div className="pt-3 pb-2 text-center">
            <button
              id="clue-btn-link"
              onClick={() => handleToggleClue('link')}
              className={`cursor-pointer px-6 py-3 rounded-full font-black text-xs sm:text-sm transition border-2 shadow-xs ${
                revealedClues.includes('link')
                  ? 'bg-rose-600 text-white border-rose-700 ring-4 ring-rose-200'
                  : 'bg-rose-500 hover:bg-rose-600 text-white border-rose-600 animate-bounce'
              }`}
            >
              🚨 SALVAR CONTA AGORA (http://login-falso.xyz/hack)
            </button>
            <p className="text-[11px] text-slate-500 mt-2 font-mono font-bold">
              Destino do link: http://login-falso.xyz/hack?token=roubo_de_dados
            </p>
          </div>

          <p className="text-xs text-slate-400 border-t border-slate-100 pt-3 italic">
            Se não responderes em 15 minutos, a tua conta será eliminada permanentemente. Não respondas a este email.
          </p>
        </div>
      </div>

      {/* Clues Feedback Section */}
      <div className="space-y-3">
        <h4 className="text-xs font-black text-slate-700 flex items-center gap-2 uppercase tracking-wider font-['Fredoka']">
          <Info className="w-4 h-4 text-sky-600" />
          <span>Relatório do Investigador:</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {clues.map((clue) => {
            const isDone = revealedClues.includes(clue.id);
            return (
              <div
                key={clue.id}
                className={`p-3.5 rounded-2xl border-2 text-xs transition ${
                  isDone
                    ? 'bg-rose-50 border-rose-200 text-slate-800'
                    : 'bg-slate-50 border-slate-200 text-slate-500 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-black text-rose-800 flex items-center gap-1.5 font-['Fredoka']">
                    {isDone ? <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[3]" /> : <MousePointerClick className="w-3.5 h-3.5 text-slate-400" />}
                    {clue.label}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">
                    {isDone ? 'Identificado ✓' : 'Por encontrar'}
                  </span>
                </div>
                {isDone ? (
                  <p className="text-slate-700 font-semibold leading-relaxed">{clue.explanation}</p>
                ) : (
                  <p className="italic text-slate-500">Clica na parte correspondente no email para analisar esta suspeita.</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {progress === 100 && (
        <div className="p-4 rounded-2xl bg-emerald-100 border-2 border-emerald-300 flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0 stroke-[3]" />
          <div>
            <p className="text-sm font-black text-emerald-900 font-['Fredoka']">Parabéns, Detetive!</p>
            <p className="text-xs text-emerald-800 font-bold">
              Desmascaraste todos os 4 truques de Phishing. Ninguém te apanhará nesta armadilha!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
