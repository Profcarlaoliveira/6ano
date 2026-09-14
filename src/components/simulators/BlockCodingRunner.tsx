import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Plus, Trash2, CheckCircle2, Sparkles, AlertCircle, Award } from 'lucide-react';
import { sfx } from '../../utils/audio';

type BlockCommand = 'avancar' | 'virar_direita' | 'virar_esquerda' | 'apanhar_gema';

interface Props {
  onSuccess?: () => void;
  isBossLevel?: boolean;
}

export const BlockCodingRunner: React.FC<Props> = ({ onSuccess, isBossLevel = false }) => {
  // Grid coordinates: 0,0 is top-left.
  const gridSize = isBossLevel ? 5 : 4;
  const initialRobot = { x: 0, y: 0, dir: 1 }; // dir: 0 = up, 1 = right, 2 = down, 3 = left
  const goal = isBossLevel ? { x: 4, y: 4 } : { x: 3, y: 2 };
  const initialGems = isBossLevel
    ? [{ x: 2, y: 1, collected: false }, { x: 4, y: 2, collected: false }]
    : [{ x: 1, y: 0, collected: false }, { x: 3, y: 1, collected: false }];

  const [program, setProgram] = useState<BlockCommand[]>([
    'avancar',
    'apanhar_gema',
    'virar_direita',
    'avancar',
  ]);

  const [robot, setRobot] = useState(initialRobot);
  const [gems, setGems] = useState(initialGems);
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetSimulation = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRunning(false);
    setActiveStepIndex(null);
    setRobot(initialRobot);
    setGems(initialGems.map(g => ({ ...g, collected: false })));
    setMessage(null);
    setIsSuccess(false);
    sfx.playClick();
  };

  const addBlock = (cmd: BlockCommand) => {
    sfx.playClick();
    if (program.length < 10) {
      setProgram(prev => [...prev, cmd]);
    }
  };

  const removeBlock = (index: number) => {
    sfx.playClick();
    setProgram(prev => prev.filter((_, i) => i !== index));
  };

  const runAlgorithm = () => {
    if (isRunning || program.length === 0) return;
    resetSimulation();
    setIsRunning(true);
    sfx.playClick();

    let currentRobot = { ...initialRobot };
    let currentGems = initialGems.map(g => ({ ...g, collected: false }));
    let step = 0;

    timerRef.current = setInterval(() => {
      if (step >= program.length) {
        clearInterval(timerRef.current!);
        setIsRunning(false);
        setActiveStepIndex(null);

        // Check victory conditions
        const isAtGoal = currentRobot.x === goal.x && currentRobot.y === goal.y;
        const allGems = currentGems.every(g => g.collected);

        if (isAtGoal && allGems) {
          setIsSuccess(true);
          setMessage('Fantástico! O robô recolheu todas as gemas e chegou em segurança à meta.');
          sfx.playSuccess();
          if (onSuccess) onSuccess();
        } else if (isAtGoal && !allGems) {
          setIsSuccess(false);
          setMessage('Chegaste à meta, mas esqueceste-te de recolher todas as gemas de energia pelo caminho.');
          sfx.playError();
        } else {
          setIsSuccess(false);
          setMessage('O algoritmo terminou, mas o robô não alcançou a meta. Ajusta a tua sequência de passos!');
          sfx.playError();
        }
        return;
      }

      const cmd = program[step];
      setActiveStepIndex(step);
      sfx.playClick();

      if (cmd === 'virar_direita') {
        currentRobot.dir = (currentRobot.dir + 1) % 4;
        setRobot({ ...currentRobot });
      } else if (cmd === 'virar_esquerda') {
        currentRobot.dir = (currentRobot.dir + 3) % 4;
        setRobot({ ...currentRobot });
      } else if (cmd === 'avancar') {
        let nx = currentRobot.x;
        let ny = currentRobot.y;
        if (currentRobot.dir === 0) ny -= 1;
        if (currentRobot.dir === 1) nx += 1;
        if (currentRobot.dir === 2) ny += 1;
        if (currentRobot.dir === 3) nx -= 1;

        if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize) {
          currentRobot.x = nx;
          currentRobot.y = ny;
          setRobot({ ...currentRobot });
        } else {
          clearInterval(timerRef.current!);
          setIsRunning(false);
          setIsSuccess(false);
          setMessage('Colisão com a parede exterior do labirinto! O robô teve de parar.');
          sfx.playError();
          return;
        }
      } else if (cmd === 'apanhar_gema') {
        const found = currentGems.find(g => g.x === currentRobot.x && g.y === currentRobot.y && !g.collected);
        if (found) {
          found.collected = true;
          setGems([...currentGems]);
          sfx.playSuccess();
        }
      }

      step++;
    }, 600);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const getRotationStyle = (dir: number) => {
    switch (dir) {
      case 0: return 'rotate-270';
      case 1: return 'rotate-0';
      case 2: return 'rotate-90';
      case 3: return 'rotate-180';
      default: return 'rotate-0';
    }
  };

  const getCommandLabel = (cmd: BlockCommand) => {
    switch (cmd) {
      case 'avancar': return 'Avançar 1 Passo';
      case 'virar_direita': return 'Virar 90º Direita ↷';
      case 'virar_esquerda': return 'Virar 90º Esquerda ↶';
      case 'apanhar_gema': return 'Apanhar Gema 💎';
    }
  };

  const getCommandColor = (cmd: BlockCommand) => {
    switch (cmd) {
      case 'avancar': return 'bg-sky-500 border-sky-600 text-white shadow-xs';
      case 'virar_direita': return 'bg-amber-500 border-amber-600 text-white shadow-xs';
      case 'virar_esquerda': return 'bg-amber-500 border-amber-600 text-white shadow-xs';
      case 'apanhar_gema': return 'bg-purple-500 border-purple-600 text-white shadow-xs';
    }
  };

  return (
    <div id="block-coding-runner-box" className="bg-white border-2 border-slate-200 rounded-3xl p-6 text-slate-800 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="font-black text-lg text-slate-900 flex items-center gap-2 font-['Fredoka']">
            <span>Arena de Programação por Blocos</span>
            {isBossLevel && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-800 border border-rose-300 font-mono">
                DESAFIO FINAL
              </span>
            )}
          </h3>
          <p className="text-xs text-slate-500 font-bold">Constrói a sequência de comandos para guiar o robô até à meta</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-run-code"
            onClick={runAlgorithm}
            disabled={isRunning || program.length === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white text-xs font-black shadow-xs transition cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{isRunning ? 'A Executar...' : 'Executar Algoritmo'}</span>
          </button>
          <button
            id="btn-reset-code"
            onClick={resetSimulation}
            disabled={isRunning}
            className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition cursor-pointer"
            title="Reiniciar posição do robô"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 2D Grid Arena */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center bg-slate-50 p-5 rounded-3xl border-2 border-slate-200">
          <div className="text-xs text-slate-600 mb-3 flex items-center justify-between w-full px-2 font-bold">
            <span className="font-['Fredoka']">Labirinto do Robô</span>
            <span className="text-purple-800 font-black bg-purple-100 px-2.5 py-0.5 rounded-full font-mono">
              💎 {gems.filter(g => g.collected).length} / {gems.length}
            </span>
          </div>

          <div
            className="grid gap-2 p-3 bg-white rounded-2xl border-2 border-slate-200 shadow-inner"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: gridSize * gridSize }).map((_, idx) => {
              const x = idx % gridSize;
              const y = Math.floor(idx / gridSize);
              const isRobotHere = robot.x === x && robot.y === y;
              const isGoalHere = goal.x === x && goal.y === y;
              const gemHere = gems.find(g => g.x === x && g.y === y && !g.collected);

              return (
                <div
                  key={idx}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-slate-50 border-2 border-slate-100 flex items-center justify-center relative transition-colors"
                >
                  {/* Grid cell coordinate watermark */}
                  <span className="absolute bottom-0.5 right-1 text-[8px] font-mono text-slate-300 select-none">
                    {x},{y}
                  </span>

                  {/* Goal Battery */}
                  {isGoalHere && (
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-lg animate-pulse" title="Meta Final">
                      🔋
                    </div>
                  )}

                  {/* Gem Pickup */}
                  {gemHere && (
                    <div className="text-xl animate-bounce" title="Gema de Energia">
                      💎
                    </div>
                  )}

                  {/* Robot Avatar */}
                  {isRobotHere && (
                    <div
                      className={`w-10 h-10 rounded-full bg-sky-100 border-2 border-sky-400 flex items-center justify-center text-xl shadow-md transition-transform duration-300 ${getRotationStyle(
                        robot.dir
                      )}`}
                      title="Robô TIC QUEST"
                    >
                      🤖
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Programming Sequence & Palette */}
        <div className="lg:col-span-6 flex flex-col space-y-4">
          {/* Blocks Palette */}
          <div>
            <span className="text-xs font-black text-slate-700 uppercase tracking-wider block mb-2 font-['Fredoka']">
              Paleta de Blocos de Comando:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => addBlock('avancar')}
                disabled={isRunning}
                className="p-2.5 rounded-xl bg-sky-100 hover:bg-sky-200 border-2 border-sky-300 text-sky-900 text-xs font-black flex items-center gap-1.5 transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Avançar 1 Passo</span>
              </button>

              <button
                onClick={() => addBlock('apanhar_gema')}
                disabled={isRunning}
                className="p-2.5 rounded-xl bg-purple-100 hover:bg-purple-200 border-2 border-purple-300 text-purple-900 text-xs font-black flex items-center gap-1.5 transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Apanhar Gema</span>
              </button>

              <button
                onClick={() => addBlock('virar_direita')}
                disabled={isRunning}
                className="p-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 border-2 border-amber-300 text-amber-900 text-xs font-black flex items-center gap-1.5 transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Virar Direita ↷</span>
              </button>

              <button
                onClick={() => addBlock('virar_esquerda')}
                disabled={isRunning}
                className="p-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 border-2 border-amber-300 text-amber-900 text-xs font-black flex items-center gap-1.5 transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Virar Esquerda ↶</span>
              </button>
            </div>
          </div>

          {/* Code sequence container */}
          <div className="flex-1 bg-slate-50 p-4 rounded-2xl border-2 border-slate-200 flex flex-col space-y-2 min-h-[160px]">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-black text-slate-800 uppercase tracking-wider font-['Fredoka']">
                O Teu Algoritmo ({program.length}/10 blocos)
              </span>
              <button
                onClick={() => { setProgram([]); sfx.playClick(); }}
                disabled={isRunning || program.length === 0}
                className="text-[11px] font-bold text-rose-600 hover:text-rose-700 transition cursor-pointer"
              >
                Limpar Tudo
              </button>
            </div>

            {program.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-xs text-slate-400 font-bold italic py-4">
                Clica nos blocos da paleta acima para construir a tua sequência lógica.
              </div>
            ) : (
              <div className="space-y-1.5 overflow-y-auto max-h-[220px] pr-1">
                {program.map((cmd, idx) => {
                  const isActive = activeStepIndex === idx;
                  return (
                    <div
                      key={idx}
                      className={`flex items-center justify-between px-3.5 py-2 rounded-xl border-2 text-xs font-black transition ${getCommandColor(
                        cmd
                      )} ${isActive ? 'ring-4 ring-sky-300 scale-[1.02]' : 'opacity-95'}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-white/80 text-[10px]">{idx + 1}.</span>
                        <span>{getCommandLabel(cmd)}</span>
                      </div>
                      <button
                        onClick={() => removeBlock(idx)}
                        disabled={isRunning}
                        className="text-white/80 hover:text-white transition cursor-pointer p-0.5"
                        title="Remover bloco"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Output message banner */}
      {message && (
        <div
          className={`p-4 rounded-2xl border-2 flex items-center gap-3 text-xs font-bold ${
            isSuccess
              ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
              : 'bg-rose-100 border-rose-300 text-rose-900'
          }`}
        >
          {isSuccess ? <Award className="w-5 h-5 text-emerald-700 shrink-0" /> : <AlertCircle className="w-5 h-5 text-rose-700 shrink-0" />}
          <span className="leading-relaxed">{message}</span>
        </div>
      )}
    </div>
  );
};
