import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, KeyRound, Sparkles, CheckCircle2, XCircle } from 'lucide-react';
import { sfx } from '../../utils/audio';

interface Props {
  onSuccess?: () => void;
}

export const PasswordSimulator: React.FC<Props> = ({ onSuccess }) => {
  const [password, setPassword] = useState('escola123');
  const [suggestedCopied, setSuggestedCopied] = useState(false);

  const hasLength = password.length >= 12;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  const scoreList = [hasLength, hasLower, hasUpper, hasNumber, hasSpecial];
  const passedCount = scoreList.filter(Boolean).length;
  const scorePercent = (passedCount / 5) * 100;

  let strengthLabel = 'Muito Fraca';
  let strengthColor = 'text-rose-800 bg-rose-100 border-rose-300';
  let crackTimeEstimate = 'Menos de 1 segundo';

  if (scorePercent === 100) {
    strengthLabel = 'Impenetrável (Mestre)';
    strengthColor = 'text-emerald-800 bg-emerald-100 border-emerald-300';
    crackTimeEstimate = 'Mais de 8 500 anos por supercomputador!';
  } else if (scorePercent >= 80) {
    strengthLabel = 'Forte';
    strengthColor = 'text-teal-800 bg-teal-100 border-teal-300';
    crackTimeEstimate = 'Cerca de 200 anos';
  } else if (scorePercent >= 60) {
    strengthLabel = 'Razoável';
    strengthColor = 'text-amber-800 bg-amber-100 border-amber-300';
    crackTimeEstimate = 'Cerca de 3 dias';
  } else if (scorePercent >= 40) {
    strengthLabel = 'Fraca';
    strengthColor = 'text-orange-800 bg-orange-100 border-orange-300';
    crackTimeEstimate = 'Cerca de 2 minutos';
  }

  const handleGeneratePhrase = () => {
    sfx.playClick();
    const suggestions = [
      'Gato$Azul_Salta#2026',
      'Praia!Sol@Faro99',
      'Robo*Verde_Estuda!6Ano',
      'Castelo#Guimaraes_1128!',
    ];
    const picked = suggestions[Math.floor(Math.random() * suggestions.length)];
    setPassword(picked);
    setSuggestedCopied(true);
    setTimeout(() => setSuggestedCopied(false), 2000);
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div id="password-simulator-box" className="bg-white border-2 border-slate-200 rounded-3xl p-6 text-slate-800 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-100 border-2 border-emerald-300 text-emerald-800">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-lg text-slate-900 font-['Fredoka']">Simulador de Força de Palavras-Passe</h3>
            <p className="text-xs text-slate-500 font-bold">Experimenta digitar ou gera uma frase-passe segura</p>
          </div>
        </div>

        <button
          id="btn-generate-passphrase"
          onClick={handleGeneratePhrase}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 text-xs font-black transition cursor-pointer self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>{suggestedCopied ? 'Frase Aplicada! ✓' : 'Gerar Frase-Passe Segura'}</span>
        </button>
      </div>

      {/* Input Field */}
      <div className="space-y-2">
        <label className="text-xs font-black text-slate-700 flex justify-between font-['Fredoka']">
          <span>Testa a tua palavra-passe fictícia:</span>
          <span className="text-slate-500 font-mono text-xs">{password.length} caracteres</span>
        </label>
        <div className="relative">
          <input
            id="input-password-test"
            type="text"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (scorePercent === 100 && onSuccess) {
                onSuccess();
              }
            }}
            placeholder="Digita aqui para analisar..."
            className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-3 font-mono text-sm text-slate-900 font-bold focus:outline-none focus:border-emerald-500 transition"
          />
        </div>
      </div>

      {/* Strength Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-slate-600">Nível de Segurança:</span>
          <span className={`px-3 py-1 rounded-full border text-xs font-black ${strengthColor}`}>
            {strengthLabel} ({Math.round(scorePercent)}%)
          </span>
        </div>
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200 flex">
          <div
            className={`h-full transition-all duration-500 ${
              scorePercent === 100
                ? 'bg-emerald-500'
                : scorePercent >= 60
                ? 'bg-amber-500'
                : 'bg-rose-500'
            }`}
            style={{ width: `${scorePercent}%` }}
          />
        </div>
        <p className="text-xs text-slate-600 font-medium flex items-center gap-1.5 pt-1">
          <span>Tempo estimado de quebra por computador:</span>
          <strong className="text-slate-900 font-black">{crackTimeEstimate}</strong>
        </p>
      </div>

      {/* Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
        <div className={`p-3 rounded-2xl border-2 text-xs font-bold flex items-center gap-2 ${hasLength ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
          {hasLength ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 stroke-[3]" /> : <XCircle className="w-4 h-4 text-slate-400 shrink-0" />}
          <span>Pelo menos 12 caracteres ({password.length}/12)</span>
        </div>
        <div className={`p-3 rounded-2xl border-2 text-xs font-bold flex items-center gap-2 ${hasUpper ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
          {hasUpper ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 stroke-[3]" /> : <XCircle className="w-4 h-4 text-slate-400 shrink-0" />}
          <span>Letras Maiúsculas (A-Z)</span>
        </div>
        <div className={`p-3 rounded-2xl border-2 text-xs font-bold flex items-center gap-2 ${hasLower ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
          {hasLower ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 stroke-[3]" /> : <XCircle className="w-4 h-4 text-slate-400 shrink-0" />}
          <span>Letras Minúsculas (a-z)</span>
        </div>
        <div className={`p-3 rounded-2xl border-2 text-xs font-bold flex items-center gap-2 ${hasNumber ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
          {hasNumber ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 stroke-[3]" /> : <XCircle className="w-4 h-4 text-slate-400 shrink-0" />}
          <span>Números (0-9)</span>
        </div>
        <div className={`sm:col-span-2 p-3 rounded-2xl border-2 text-xs font-bold flex items-center gap-2 ${hasSpecial ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
          {hasSpecial ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 stroke-[3]" /> : <XCircle className="w-4 h-4 text-slate-400 shrink-0" />}
          <span>Símbolos Especiais (!, @, #, $, _, ?, *)</span>
        </div>
      </div>

      {scorePercent === 100 && (
        <div className="p-4 rounded-2xl bg-emerald-100 border-2 border-emerald-300 flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0" />
          <p className="text-xs text-emerald-900 font-bold">
            <strong>Excelente!</strong> Atingiste a pontuação máxima de segurança. Esta palavra-passe resistiria a qualquer ataque cibernético moderno.
          </p>
        </div>
      )}
    </div>
  );
};
