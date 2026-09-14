import React, { useState } from 'react';
import { Bot, Sparkles, Sliders, CheckCircle2, Copy, Send } from 'lucide-react';
import { sfx } from '../../utils/audio';

export const AIPromptLab: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const [role, setRole] = useState('Monitor de TIC');
  const [task, setTask] = useState('Explicar o perigo do lixo eletrónico');
  const [audience, setAudience] = useState('Alunos do 6.º ano');
  const [format, setFormat] = useState('3 tópicos curtos com emojis');
  const [constraints, setConstraints] = useState('Menos de 60 palavras, sem termos complicados');
  const [isGenerated, setIsGenerated] = useState(false);

  const assembledPrompt = `Atua como ${role}. A tua tarefa é ${task.toLowerCase()} para ${audience}. Apresenta o resultado em ${format}. Restrições: ${constraints}.`;

  const handleGenerate = () => {
    sfx.playClick();
    setIsGenerated(true);
    if (onSuccess) {
      sfx.playSuccess();
      onSuccess();
    }
  };

  return (
    <div id="ai-prompt-lab-box" className="bg-white border-2 border-slate-200 rounded-3xl p-6 text-slate-800 shadow-xs space-y-5">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-purple-100 border-2 border-purple-300 text-purple-800">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-black text-lg text-slate-900 font-['Fredoka']">Laboratório de Engenharia de Prompts</h3>
          <p className="text-xs text-slate-500 font-bold">Constrói instruções com Papel, Contexto, Formato e Restrições para guiar a IA</p>
        </div>
      </div>

      {/* Building Blocks Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-purple-50/50 p-5 rounded-2xl border-2 border-purple-200">
        <div>
          <label className="text-xs font-black text-purple-800 uppercase tracking-wider block mb-1 font-['Fredoka']">
            1. Papel (Persona)
          </label>
          <select
            value={role}
            onChange={(e) => { setRole(e.target.value); setIsGenerated(false); }}
            className="w-full bg-white border-2 border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:border-purple-500 focus:outline-none"
          >
            <option value="Monitor de TIC">Monitor de TIC Amigável</option>
            <option value="Cientista Ambiental">Cientista Ambiental</option>
            <option value="Robô Explorador do Espaço">Robô Explorador do Espaço</option>
            <option value="Historiador Medieval">Historiador Medieval</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-black text-purple-800 uppercase tracking-wider block mb-1 font-['Fredoka']">
            2. Tarefa Principal
          </label>
          <select
            value={task}
            onChange={(e) => { setTask(e.target.value); setIsGenerated(false); }}
            className="w-full bg-white border-2 border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:border-purple-500 focus:outline-none"
          >
            <option value="Explicar o perigo do lixo eletrónico">Explicar o perigo do lixo eletrónico</option>
            <option value="Criar uma palavra-passe inquebrável">Criar uma palavra-passe inquebrável</option>
            <option value="Dar 3 dicas para pesquisar no Google">Dar 3 dicas para pesquisar no Google</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-black text-purple-800 uppercase tracking-wider block mb-1 font-['Fredoka']">
            3. Formato de Saída
          </label>
          <select
            value={format}
            onChange={(e) => { setFormat(e.target.value); setIsGenerated(false); }}
            className="w-full bg-white border-2 border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:border-purple-500 focus:outline-none"
          >
            <option value="3 tópicos curtos com emojis">3 tópicos curtos com emojis</option>
            <option value="uma tabela com 2 colunas">Uma tabela com 2 colunas</option>
            <option value="um poema bem-humorado em rima">Um poema bem-humorado em rima</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-black text-purple-800 uppercase tracking-wider block mb-1 font-['Fredoka']">
            4. Restrições e Limites
          </label>
          <select
            value={constraints}
            onChange={(e) => { setConstraints(e.target.value); setIsGenerated(false); }}
            className="w-full bg-white border-2 border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:border-purple-500 focus:outline-none"
          >
            <option value="Menos de 60 palavras, sem termos complicados">Menos de 60 palavras, sem termos complicados</option>
            <option value="Linguagem rigorosa e científica">Linguagem rigorosa e científica</option>
            <option value="Inclui um desafio rápido no final">Inclui um desafio rápido no final</option>
          </select>
        </div>
      </div>

      {/* Assembled Prompt Preview */}
      <div className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-200 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-black text-purple-900 flex items-center gap-1.5 font-['Fredoka']">
            <Sparkles className="w-4 h-4 text-amber-500" /> Prompt Montado:
          </span>
          <span className="text-[11px] font-mono font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
            Qualidade: 100% (5/5 Critérios)
          </span>
        </div>
        <p className="font-mono text-xs text-slate-900 bg-white p-3.5 rounded-xl border border-slate-200 leading-relaxed font-bold">
          "{assembledPrompt}"
        </p>

        <button
          id="btn-run-prompt"
          onClick={handleGenerate}
          className="w-full py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>Testar Resposta da IA com este Prompt</span>
        </button>
      </div>

      {/* Simulated Output */}
      {isGenerated && (
        <div className="p-5 rounded-2xl bg-[#faf5ff] border-2 border-purple-200 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between text-xs text-purple-900">
            <span className="font-black flex items-center gap-1.5 font-['Fredoka']">
              <Bot className="w-4 h-4 text-purple-600" /> Resposta da IA Estruturada:
            </span>
            <span className="text-[10px] font-mono text-slate-500 font-bold">Modelo Educativo TIC</span>
          </div>

          <div className="text-xs text-slate-700 space-y-2 bg-white p-4 rounded-xl border border-purple-100 shadow-xs">
            <p className="font-black text-purple-900">Olá, turma do 6.º ano! Como vosso monitor, aqui vai a explicação:</p>
            <ul className="space-y-1.5 text-slate-700 font-semibold">
              <li>🔋 <strong>Metais Tóxicos:</strong> Pilhas no lixo comum libertam substâncias que contaminam os solos e a água.</li>
              <li>♻️ <strong>Ponto Eletrão:</strong> Computadores e telemóveis velhos têm componentes nobres que podem ser reaproveitados.</li>
              <li>🌍 <strong>Missão do Planeta:</strong> Guardar pilhas e cabos usados para entregar na escola protege o nosso futuro!</li>
            </ul>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-800 font-bold pt-1">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 stroke-[3]" />
            <span>Excelente! A IA cumpriu o limite de palavras, o tom adequado e o formato em 3 tópicos pedidos no teu prompt.</span>
          </div>
        </div>
      )}
    </div>
  );
};
