import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft, 
  Sparkles, Award, Lightbulb, Compass, CheckSquare, Send, Globe, ChevronRight
} from 'lucide-react';
import { getMissionById } from '../../data/missions';
import { BADGES } from '../../data/badges';
import { useGameState } from '../../context/GameStateContext';
import { sfx } from '../../utils/audio';

// Simulators
import { PasswordSimulator } from '../simulators/PasswordSimulator';
import { PhishingAnalyzer } from '../simulators/PhishingAnalyzer';
import { FakeNewsLab } from '../simulators/FakeNewsLab';
import { AIPromptLab } from '../simulators/AIPromptLab';
import { NetiquetteSimulator } from '../simulators/NetiquetteSimulator';
import { BlockCodingRunner } from '../simulators/BlockCodingRunner';
import { FileOrganizerSimulator } from '../simulators/FileOrganizerSimulator';

interface Props {
  missionId: string;
  onClose: () => void;
}

export const MissionPlayer: React.FC<Props> = ({ missionId, onClose }) => {
  const { completeMission, submitRealWorldReflection, student } = useGameState();
  const mission = getMissionById(missionId);

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Step 1 state
  const [quickCheckAnswer, setQuickCheckAnswer] = useState<number | null>(null);
  const [quickCheckConfirmed, setQuickCheckConfirmed] = useState(false);

  // Step 2 state
  const [experimentSuccess, setExperimentSuccess] = useState(false);

  // Step 3 state (Desafio)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: number }>({});
  const [questionFeedback, setQuestionFeedback] = useState<{ [qId: string]: { correct: boolean; attempted: boolean } }>({});
  const [showHint, setShowHint] = useState<{ [qId: string]: boolean }>({});

  // Step 4 state (Missão Real)
  const [checklist, setChecklist] = useState<boolean[]>(() => 
    mission ? new Array(mission.step4MissaoReal.instructions.length).fill(false) : []
  );
  const [reflectionText, setReflectionText] = useState('');
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);

  // Step 5 state (Recompensa)
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);

  if (!mission) {
    return null;
  }

  const badge = mission.step5Recompensa.badgeId
    ? BADGES.find(b => b.id === mission.step5Recompensa.badgeId)
    : undefined;

  const handleQuickCheck = (index: number) => {
    sfx.playClick();
    setQuickCheckAnswer(index);
    setQuickCheckConfirmed(true);
    if (index === mission.step1Descobre.quickCheck.correctIndex) {
      sfx.playSuccess();
    } else {
      sfx.playError();
    }
  };

  const handleAnswerQuestion = (qId: string, optIndex: number, correctVal: number | boolean | number[]) => {
    sfx.playClick();
    const isCorrect = typeof correctVal === 'number' ? optIndex === correctVal : false;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optIndex }));
    setQuestionFeedback(prev => ({ ...prev, [qId]: { correct: isCorrect, attempted: true } }));

    if (isCorrect) {
      sfx.playSuccess();
    } else {
      sfx.playError();
    }
  };

  const toggleChecklist = (index: number) => {
    sfx.playClick();
    setChecklist(prev => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const handleSubmitReflection = () => {
    if (!reflectionText.trim()) return;
    sfx.playSuccess();
    submitRealWorldReflection(mission.id, reflectionText);
    setReflectionSubmitted(true);
  };

  const handleFinishMission = () => {
    sfx.playLevelUp();
    completeMission(mission.id);
    setCurrentStep(5);

    if (!hasTriggeredConfetti) {
      setHasTriggeredConfetti(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const stepLabels = [
    { num: 1, label: 'Descobre', icon: '💡' },
    { num: 2, label: 'Experimenta', icon: '🧪' },
    { num: 3, label: 'Desafio', icon: '🎯' },
    { num: 4, label: 'Missão Real', icon: '🌍' },
    { num: 5, label: 'Recompensa', icon: '🏆' },
  ];

  return (
    <div id="mission-player-modal" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="w-full max-w-4xl bg-white border-2 border-slate-200 rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden my-auto"
      >
        {/* Header Bar */}
        <div className="bg-slate-50 px-6 py-4 border-b-2 border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-sky-100 border-2 border-sky-300 flex items-center justify-center text-xl shadow-xs">
              {stepLabels[currentStep - 1].icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-sky-700 font-['Fredoka']">
                  Missão TIC 6.º Ano
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-mono text-amber-900 bg-amber-100 border border-amber-300 px-2 py-0.2 rounded-full font-black">
                  +{mission.xpReward} XP
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight font-['Fredoka']">
                {mission.title}
              </h2>
            </div>
          </div>

          <button
            id="btn-close-mission"
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition cursor-pointer"
            title="Fechar Missão"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar (Pills matching reference style) */}
        <div className="bg-slate-50/70 px-6 py-2.5 border-b border-slate-100 shrink-0">
          <div className="flex items-center justify-between gap-2 overflow-x-auto">
            {stepLabels.map((s) => {
              const isCurrent = currentStep === s.num;
              const isCompleted = currentStep > s.num;
              return (
                <button
                  key={s.num}
                  onClick={() => {
                    if (s.num <= currentStep || isCompleted) {
                      sfx.playClick();
                      setCurrentStep(s.num as any);
                    }
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black transition shrink-0 font-['Nunito'] ${
                    isCurrent
                      ? 'bg-sky-600 text-white shadow-xs'
                      : isCompleted
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'text-slate-400 bg-slate-100 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <span>{s.icon}</span>
                  <span>{s.num}. {s.label}</span>
                  {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 ml-0.5 stroke-[3]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-800">
          {/* ================================================================= */}
          {/* ETAPA 1 — DESCOBRE */}
          {/* ================================================================= */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <span className="text-xs font-black text-sky-600 font-['Fredoka'] uppercase tracking-wider">
                  Etapa 1 de 5 • Descobre
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-1 font-['Fredoka']">{mission.step1Descobre.title}</h3>
                <p className="text-xs text-slate-500 font-semibold mt-1">Lê com atenção estes conceitos visuais antes de avançares para o laboratório.</p>
              </div>

              {/* Cards Grid with gentle pastel backgrounds */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mission.step1Descobre.cards.map((card, i) => {
                  const pastels = ['bg-[#e0f2fe] border-sky-200', 'bg-[#fef9c3] border-amber-200', 'bg-[#f3e8ff] border-purple-200'];
                  return (
                    <div
                      key={i}
                      className={`p-5 rounded-2xl border-2 ${pastels[i % pastels.length]} transition flex flex-col justify-between space-y-3 shadow-xs`}
                    >
                      <div>
                        <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-800 mb-2 font-black text-xs">
                          {i + 1}
                        </div>
                        <h4 className="text-sm font-black text-slate-900 mb-1.5 font-['Fredoka']">{card.title}</h4>
                        <p className="text-xs text-slate-700 font-semibold leading-relaxed">{card.text}</p>
                      </div>

                      {card.highlight && (
                        <div className="p-2.5 rounded-xl bg-white border border-sky-300 text-[11px] text-sky-900 font-bold">
                          💡 {card.highlight}
                        </div>
                      )}
                      {card.example && (
                        <div className="p-2.5 rounded-xl bg-white border border-amber-300 text-[11px] text-amber-900 font-bold">
                          🔍 Exemplo: {card.example}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Quick Check Question */}
              <div className="p-6 rounded-3xl bg-[#f0f9ff] border-2 border-sky-200 space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-sky-700 text-xs font-black uppercase tracking-wider font-['Fredoka']">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Pergunta Rápida de Verificação:</span>
                </div>
                <p className="text-sm font-extrabold text-slate-900">{mission.step1Descobre.quickCheck.question}</p>

                <div className="space-y-2">
                  {mission.step1Descobre.quickCheck.options.map((option, idx) => {
                    const isSelected = quickCheckAnswer === idx;
                    const isCorrect = idx === mission.step1Descobre.quickCheck.correctIndex;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleQuickCheck(idx)}
                        className={`w-full text-left p-3 rounded-2xl border-2 text-xs font-bold transition cursor-pointer flex items-center justify-between ${
                          quickCheckConfirmed && isSelected
                            ? isCorrect
                              ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                              : 'bg-rose-100 border-rose-400 text-rose-900'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-sky-300'
                        }`}
                      >
                        <span>{option}</span>
                        {quickCheckConfirmed && isSelected && (
                          <span>{isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[3]" /> : <AlertCircle className="w-4 h-4 text-rose-600 stroke-[3]" />}</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {quickCheckConfirmed && (
                  <div className={`p-3.5 rounded-2xl text-xs font-semibold leading-relaxed ${
                    quickCheckAnswer === mission.step1Descobre.quickCheck.correctIndex
                      ? 'bg-emerald-100 text-emerald-900 border-2 border-emerald-300'
                      : 'bg-amber-100 text-amber-900 border-2 border-amber-300'
                  }`}>
                    {mission.step1Descobre.quickCheck.explanation}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* ETAPA 2 — EXPERIMENTA */}
          {/* ================================================================= */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <span className="text-xs font-black text-sky-600 font-['Fredoka'] uppercase tracking-wider">
                  Etapa 2 de 5 • Experimenta
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-1 font-['Fredoka']">{mission.step2Experimenta.title}</h3>
                <p className="text-xs text-slate-500 font-semibold mt-1">{mission.step2Experimenta.instruction}</p>
              </div>

              {/* Dynamic Simulator based on type */}
              <div className="bg-slate-50 p-2 sm:p-4 rounded-3xl border-2 border-slate-200">
                {mission.step2Experimenta.type === 'password_tester' && (
                  <PasswordSimulator onSuccess={() => setExperimentSuccess(true)} />
                )}
                {mission.step2Experimenta.type === 'phishing_analyzer' && (
                  <PhishingAnalyzer onSuccess={() => setExperimentSuccess(true)} />
                )}
                {mission.step2Experimenta.type === 'source_evaluator' && (
                  <FakeNewsLab onSuccess={() => setExperimentSuccess(true)} />
                )}
                {mission.step2Experimenta.type === 'fake_detector' && (
                  <FakeNewsLab onSuccess={() => setExperimentSuccess(true)} />
                )}
                {mission.step2Experimenta.type === 'prompt_crafter' && (
                  <AIPromptLab onSuccess={() => setExperimentSuccess(true)} />
                )}
                {mission.step2Experimenta.type === 'ai_hallucination_check' && (
                  <AIPromptLab onSuccess={() => setExperimentSuccess(true)} />
                )}
                {mission.step2Experimenta.type === 'netiquette_fixer' && (
                  <NetiquetteSimulator onSuccess={() => setExperimentSuccess(true)} />
                )}
                {mission.step2Experimenta.type === 'block_algorithm' && (
                  <BlockCodingRunner isBossLevel={mission.isBoss} onSuccess={() => setExperimentSuccess(true)} />
                )}
                {mission.step2Experimenta.type === 'file_organizer' && (
                  <FileOrganizerSimulator onSuccess={() => setExperimentSuccess(true)} />
                )}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* ETAPA 3 — DESAFIO */}
          {/* ================================================================= */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <span className="text-xs font-black text-sky-600 font-['Fredoka'] uppercase tracking-wider">
                  Etapa 3 de 5 • Desafio Prático
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-1 font-['Fredoka']">{mission.step3Desafio.title}</h3>
                <p className="text-xs text-slate-500 font-semibold mt-1">{mission.step3Desafio.scenario}</p>
              </div>

              <div className="space-y-4">
                {mission.step3Desafio.questions.map((q, qIndex) => {
                  const currentAnswer = selectedAnswers[q.id];
                  const feedback = questionFeedback[q.id];
                  const hintOpen = showHint[q.id];

                  return (
                    <div key={q.id} className="p-6 rounded-3xl bg-white border-2 border-slate-200 space-y-3 shadow-xs">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="font-black text-sky-600 font-['Fredoka']">Pergunta {qIndex + 1} de {mission.step3Desafio.questions.length}</span>
                        {feedback && (
                          <span className={feedback.correct ? 'text-emerald-700 font-black' : 'text-rose-600 font-black'}>
                            {feedback.correct ? '✓ Resolvido com sucesso' : '⚠️ Quase lá! Revisa a tua escolha'}
                          </span>
                        )}
                      </div>

                      <p className="text-sm font-extrabold text-slate-900">{q.prompt}</p>

                      <div className="space-y-2">
                        {q.options.map((opt, oIndex) => {
                          const isSelected = currentAnswer === oIndex;
                          const isCorrect = oIndex === q.correctAnswer;
                          const hasAnswered = feedback?.attempted;

                          return (
                            <button
                              key={oIndex}
                              onClick={() => handleAnswerQuestion(q.id, oIndex, q.correctAnswer)}
                              className={`w-full text-left p-3.5 rounded-2xl border-2 text-xs font-bold transition cursor-pointer flex items-center justify-between ${
                                hasAnswered && isSelected
                                  ? isCorrect
                                    ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                                    : 'bg-rose-100 border-rose-400 text-rose-900'
                                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-sky-300'
                              }`}
                            >
                              <span>{opt}</span>
                              {hasAnswered && isSelected && (
                                <span>{isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[3]" /> : <AlertCircle className="w-4 h-4 text-rose-600 stroke-[3]" />}</span>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Hint Toggle */}
                      <div className="pt-2 flex items-center justify-between">
                        <button
                          onClick={() => {
                            sfx.playClick();
                            setShowHint(prev => ({ ...prev, [q.id]: !prev[q.id] }));
                          }}
                          className="text-xs font-extrabold text-amber-700 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                          <span>{hintOpen ? 'Esconder Dica' : 'Ver Dica de Ajuda'}</span>
                        </button>
                      </div>

                      {hintOpen && (
                        <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-bold">
                          💡 Dica: {q.hint}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* ETAPA 4 — MISSÃO REAL */}
          {/* ================================================================= */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <span className="text-xs font-black text-sky-600 font-['Fredoka'] uppercase tracking-wider">
                  Etapa 4 de 5 • Missão no Mundo Real
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-1 font-['Fredoka']">{mission.step4MissaoReal.title}</h3>
                <p className="text-xs text-slate-500 font-semibold mt-1">Aplica o que aprendeste no teu computador, escola ou casa!</p>
              </div>

              {/* Checklist */}
              <div className="p-6 rounded-3xl bg-white border-2 border-slate-200 space-y-3 shadow-xs">
                <span className="text-xs font-black text-slate-700 uppercase tracking-wider block font-['Fredoka']">
                  Passos para Realizar:
                </span>
                <div className="space-y-2">
                  {mission.step4MissaoReal.instructions.map((inst, idx) => (
                    <div
                      key={idx}
                      onClick={() => toggleChecklist(idx)}
                      className={`p-3.5 rounded-2xl border-2 transition cursor-pointer flex items-center justify-between text-xs font-bold ${
                        checklist[idx]
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-lg flex items-center justify-center border-2 ${
                          checklist[idx] ? 'bg-emerald-500 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {checklist[idx] && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                        </div>
                        <span>{inst}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        {checklist[idx] ? 'Feito ✓' : 'Por fazer'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Student Reflection Input */}
              <div className="p-6 rounded-3xl bg-white border-2 border-slate-200 space-y-3 shadow-xs">
                <label className="text-xs font-black text-slate-800 block font-['Fredoka']">
                  {mission.step4MissaoReal.reflectionPrompt}
                </label>
                <textarea
                  id="textarea-reflection"
                  rows={3}
                  value={reflectionText}
                  onChange={(e) => setReflectionText(e.target.value)}
                  placeholder="Escreve aqui o que descobriste, como aplicaste a regra ou que resultado obtiveste..."
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl p-3 text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none transition"
                />

                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-1">
                  <span className="text-[11px] text-slate-500 font-semibold">
                    A tua reflexão ficará registada no perfil e poderá ser vista pela professora.
                  </span>
                  <button
                    id="btn-submit-reflection"
                    onClick={handleSubmitReflection}
                    disabled={!reflectionText.trim() || reflectionSubmitted}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-white font-black text-xs transition cursor-pointer shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{reflectionSubmitted ? 'Reflexão Registada!' : 'Registar Missão Real'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* ETAPA 5 — RECOMPENSA */}
          {/* ================================================================= */}
          {currentStep === 5 && (
            <div className="space-y-6 text-center py-6 animate-fadeIn">
              <div className="w-24 h-24 rounded-full bg-amber-100 border-4 border-amber-300 flex items-center justify-center text-5xl mx-auto shadow-md animate-bounce">
                🏆
              </div>

              <div>
                <span className="text-xs font-black text-amber-700 font-['Fredoka'] uppercase tracking-widest">
                  Missão Cumprida com Honra!
                </span>
                <h3 className="text-3xl font-black text-slate-900 mt-1 font-['Fredoka']">
                  {mission.step5Recompensa.rewardTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-bold max-w-md mx-auto mt-2 leading-relaxed">
                  {mission.step5Recompensa.celebrationMessage}
                </p>
              </div>

              {/* XP & Rewards Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto text-left">
                <div className="p-5 rounded-3xl bg-amber-50 border-2 border-amber-300 flex items-center gap-3.5 shadow-xs">
                  <div className="w-11 h-11 rounded-2xl bg-amber-200 text-amber-900 font-black flex items-center justify-center text-sm">
                    XP
                  </div>
                  <div>
                    <span className="text-[11px] text-amber-800 font-bold block">Experiência Ganha:</span>
                    <span className="text-xl font-black text-amber-900 font-mono">+{mission.xpReward} XP</span>
                  </div>
                </div>

                {badge && (
                  <div className="p-5 rounded-3xl bg-sky-50 border-2 border-sky-300 flex items-center gap-3.5 shadow-xs">
                    <div className="w-11 h-11 rounded-2xl bg-sky-200 text-sky-900 font-bold flex items-center justify-center text-xl">
                      🎖️
                    </div>
                    <div>
                      <span className="text-[11px] text-sky-800 font-bold block">Insígnia Desbloqueada:</span>
                      <span className="text-xs font-black text-sky-900 font-['Fredoka']">{badge.title}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  id="btn-return-dashboard"
                  onClick={onClose}
                  className="px-8 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-sm shadow-md border-2 border-amber-500/40 transition cursor-pointer"
                >
                  Voltar ao Início
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Navigation Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t-2 border-slate-100 flex items-center justify-between shrink-0">
          <button
            onClick={() => {
              sfx.playClick();
              if (currentStep > 1) setCurrentStep((currentStep - 1) as any);
            }}
            disabled={currentStep === 1 || currentStep === 5}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black text-slate-500 hover:text-slate-800 disabled:opacity-30 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Etapa Anterior</span>
          </button>

          {currentStep < 4 && (
            <button
              onClick={() => {
                sfx.playClick();
                setCurrentStep((currentStep + 1) as any);
              }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-sky-600 hover:bg-sky-500 text-white font-black text-xs shadow-xs transition cursor-pointer"
            >
              <span>Próxima Etapa</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {currentStep === 4 && (
            <button
              id="btn-complete-all-mission"
              onClick={handleFinishMission}
              className="flex items-center gap-2 px-7 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-xs shadow-md border-2 border-amber-500/40 transition cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Concluir Missão & Receber XP!</span>
            </button>
          )}

          {currentStep === 5 && (
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-black text-xs transition cursor-pointer"
            >
              <span>Continuar Aventura</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
