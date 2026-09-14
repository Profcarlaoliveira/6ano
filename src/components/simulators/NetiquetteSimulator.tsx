import React, { useState } from 'react';
import { MessageSquareShare, CheckCircle2, ArrowRight, Sparkles, Smile, ShieldAlert } from 'lucide-react';
import { sfx } from '../../utils/audio';

export const NetiquetteSimulator: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const [activeCase, setActiveCase] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isResolved, setIsResolved] = useState(false);

  const cases = [
    {
      context: 'Num chat de jogo da turma, após perderem uma partida importante:',
      toxicMessage: 'ÉS UM INÚTIL! POR TUA CAUSA PERDEMOS O JOGO TODO, NUNCA MAIS JOGAS COMIGO!',
      options: [
        {
          text: 'Fizeste porcaria outra vez, sai mas é do grupo.',
          isGood: false,
          feedback: 'Continua a ser agressivo e ataca pessoalmente o colega.',
        },
        {
          text: 'Estivemos quase! Na próxima ronda tenta ficar mais junto da equipa para nos protegermos.',
          isGood: true,
          feedback: 'Excelente! Foca-se na estratégia do jogo em vez de insultar o colega, mantendo o espírito desportivo.',
        },
        {
          text: 'Vou bloquear-te para sempre.',
          isGood: false,
          feedback: 'Reação exagerada e vingativa que destrói a amizade.',
        },
      ],
    },
    {
      context: 'Num trabalho de grupo de TIC sobre Segurança Digital:',
      toxicMessage: 'A TUA PARTE DO TRABALHO ESTÁ HORRÍVEL! NEM SEQUER SABES USAR O GOOGLE!',
      options: [
        {
          text: 'Reparei que faltam alguns pontos importantes no resumo. Queres que vejamos juntos logo à tarde por chamada?',
          isGood: true,
          feedback: 'Perfeito! Dá feedback construtivo e oferece ajuda colaborativa com educação e empatia.',
        },
        {
          text: 'Vou dizer à professora que não fizeste nada para teres negativa.',
          isGood: false,
          feedback: 'Ameaçar colegas sem tentar resolver o trabalho em equipa primeiro é tóxico.',
        },
        {
          text: 'Apaguei tudo o que escreveste e fiz eu sozinho.',
          isGood: false,
          feedback: 'Apagar o trabalho de colegas sem diálogo desrespeita o princípio do trabalho colaborativo.',
        },
      ],
    },
  ];

  const current = cases[activeCase];

  const handleSelectOption = (idx: number) => {
    sfx.playClick();
    setSelectedOption(idx);
    if (current.options[idx].isGood) {
      sfx.playSuccess();
      setIsResolved(true);
      if (onSuccess) onSuccess();
    } else {
      sfx.playError();
    }
  };

  return (
    <div id="netiquette-simulator-box" className="bg-white border-2 border-slate-200 rounded-3xl p-6 text-slate-800 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-100 border-2 border-amber-300 text-amber-800">
            <MessageSquareShare className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-lg text-slate-900 font-['Fredoka']">Transformador de Netiqueta & Empatia</h3>
            <p className="text-xs text-slate-500 font-bold">Converte comentários destrutivos em colaboração construtiva</p>
          </div>
        </div>

        <span className="text-xs font-mono font-black text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300 self-start sm:self-auto">
          Caso {activeCase + 1} de {cases.length}
        </span>
      </div>

      <p className="text-xs text-slate-600 font-bold italic">{current.context}</p>

      {/* Toxic Message Box */}
      <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-4 space-y-2">
        <div className="flex items-center gap-2 text-rose-700 text-xs font-black uppercase tracking-wider font-['Fredoka']">
          <ShieldAlert className="w-4 h-4 text-rose-600" /> Mensagem Tóxica Original (Grita em Maiúsculas):
        </div>
        <p className="font-mono text-xs text-rose-950 font-bold bg-white p-3 rounded-xl border border-rose-200">
          "{current.toxicMessage}"
        </p>
      </div>

      {/* Options to rewrite */}
      <div className="space-y-3">
        <h4 className="text-xs font-black text-amber-800 uppercase tracking-wider flex items-center gap-1.5 font-['Fredoka']">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Escolhe a Transformação Positiva Adequada:
        </h4>

        <div className="space-y-2">
          {current.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-4 rounded-2xl border-2 text-xs transition cursor-pointer flex flex-col gap-1.5 ${
                  isSelected
                    ? opt.isGood
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-950 shadow-xs'
                      : 'bg-rose-100 border-rose-400 text-rose-950'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-amber-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">{opt.text}</span>
                  {isSelected && (
                    <span>{opt.isGood ? <CheckCircle2 className="w-5 h-5 text-emerald-600 stroke-[3]" /> : '⚠️'}</span>
                  )}
                </div>
                {isSelected && (
                  <p className={`text-xs pt-1.5 border-t font-semibold ${opt.isGood ? 'border-emerald-300 text-emerald-900' : 'border-rose-300 text-rose-900'}`}>
                    {opt.feedback}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {isResolved && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-emerald-100 border-2 border-emerald-300">
          <div className="flex items-center gap-2 text-xs text-emerald-900 font-bold">
            <Smile className="w-5 h-5 text-emerald-700" />
            <span>Excelente mediação! Transformaste conflito em solução de equipa.</span>
          </div>
          {activeCase < cases.length - 1 && (
            <button
              onClick={() => {
                sfx.playClick();
                setActiveCase(prev => prev + 1);
                setSelectedOption(null);
                setIsResolved(false);
              }}
              className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center gap-1 cursor-pointer transition shadow-xs"
            >
              <span>Próximo Caso</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
