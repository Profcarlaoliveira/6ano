import React, { useState } from 'react';
import { 
  GraduationCap, Users, PlusCircle, Trash2, Calendar, AlertTriangle, 
  CheckCircle2, Sparkles, Target, BarChart2, Search, BookOpen, Clock
} from 'lucide-react';
import { useGameState } from '../../context/GameStateContext';
import { TEACHER_EMAIL, TEACHER_NAME } from '../../data/mockTeacherData';
import { MISSIONS } from '../../data/missions';
import { sfx } from '../../utils/audio';

export const TeacherDashboardView: React.FC = () => {
  const { studentsRoster, assignments, createAssignment, deleteAssignment } = useGameState();

  const [selectedClass, setSelectedClass] = useState<string>('todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAssignModal, setShowAssignModal] = useState(false);

  // Form State for creating assignments
  const [selectedMissionId, setSelectedMissionId] = useState(MISSIONS[0].id);
  const [targetClassGroup, setTargetClassGroup] = useState('6.º A');
  const [targetStudentId, setTargetStudentId] = useState('all');
  const [dueDate, setDueDate] = useState('2026-09-25');
  const [teacherNote, setTeacherNote] = useState('');

  const filteredStudents = studentsRoster.filter(s => {
    if (selectedClass !== 'todas' && s.classGroup !== selectedClass) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q);
    }
    return true;
  });

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    const mission = MISSIONS.find(m => m.id === selectedMissionId);
    if (!mission) return;

    const targetStudents = targetStudentId === 'all' ? [] : [targetStudentId];
    createAssignment(
      targetClassGroup,
      mission.id,
      mission.title,
      targetStudents,
      dueDate,
      teacherNote.trim() || 'Atenção às instruções pedagógicas desta missão.'
    );

    setShowAssignModal(false);
    setTeacherNote('');
  };

  return (
    <div id="teacher-dashboard-container" className="space-y-6 pb-12">
      {/* Teacher Profile & Platform Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-purple-200 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-100 border-2 border-purple-300 flex items-center justify-center text-purple-700 shadow-xs">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-0.5 rounded-full text-xs font-black bg-purple-100 text-purple-800 border border-purple-300 font-['Fredoka']">
                  Painel de Gestão Pedagógica
                </span>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline">• {TEACHER_EMAIL}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1 font-['Fredoka']">
                {TEACHER_NAME}
              </h1>
              <p className="text-xs text-slate-600 font-bold">
                Disciplina de TIC • 6.º Ano de Escolaridade • Acompanhamento Curricular & Autonomia
              </p>
            </div>
          </div>

          <button
            id="btn-open-assign-modal"
            onClick={() => { sfx.playClick(); setShowAssignModal(true); }}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-black shadow-xs transition cursor-pointer shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Atribuir Nova Missão</span>
          </button>
        </div>

        {/* Global Class Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-purple-100">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-black uppercase text-slate-500 block font-['Fredoka']">Total de Alunos</span>
            <span className="text-lg font-black text-slate-900 font-mono">{studentsRoster.length} Estudantes</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
            <span className="text-[10px] font-black uppercase text-amber-700 block font-['Fredoka']">Média de XP</span>
            <span className="text-lg font-black text-amber-900 font-mono">
              {Math.round(studentsRoster.reduce((acc, s) => acc + s.xp, 0) / studentsRoster.length)} XP
            </span>
          </div>
          <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200">
            <span className="text-[10px] font-black uppercase text-purple-700 block font-['Fredoka']">Missões Atribuídas</span>
            <span className="text-lg font-black text-purple-900 font-mono">{assignments.length} Ativas</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200">
            <span className="text-[10px] font-black uppercase text-rose-700 block font-['Fredoka']">Alertas Pedagógicos</span>
            <span className="text-lg font-black text-rose-900 font-mono">
              {studentsRoster.filter(s => s.struggles.length > 0).length} Requerem Apoio
            </span>
          </div>
        </div>
      </div>

      {/* Active Assignments Management Section */}
      <div className="p-6 rounded-3xl bg-white border-2 border-slate-100 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Target className="w-5 h-5 text-purple-600" />
            <h2 className="text-base font-black text-slate-900 font-['Fredoka']">Missões Atribuídas Atualmente</h2>
          </div>
          <span className="text-xs font-bold text-slate-500">{assignments.length} ativas</span>
        </div>

        {assignments.length === 0 ? (
          <p className="text-xs text-slate-500 font-semibold italic py-2">
            Nenhuma missão atribuída de momento. Podes propor desafios a toda a turma ou a alunos específicos.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assignments.map((assign) => (
              <div
                key={assign.id}
                className="p-4 rounded-2xl bg-purple-50/60 border-2 border-purple-200 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-mono">
                      {assign.classGroup}
                    </span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <Clock className="w-3 h-3" /> {assign.dueDate}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-xs text-slate-900 line-clamp-1">{assign.missionTitle}</h3>
                  <p className="text-[11px] text-slate-600 mt-1 italic line-clamp-2">
                    "{assign.teacherNote}"
                  </p>
                </div>

                <div className="pt-2 border-t border-purple-200/80 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-bold">
                    {assign.targetStudentIds.length === 0 ? 'Toda a turma' : 'Aluno específico'}
                  </span>
                  <button
                    onClick={() => { sfx.playClick(); deleteAssignment(assign.id); }}
                    className="text-slate-400 hover:text-rose-600 transition cursor-pointer p-1"
                    title="Remover atribuição"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Student Roster Table & Monitoring */}
      <div className="p-6 rounded-3xl bg-white border-2 border-slate-100 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2 font-['Fredoka']">
              <Users className="w-5 h-5 text-sky-600" />
              <span>Acompanhamento Individual dos Alunos</span>
            </h2>
            <p className="text-xs text-slate-500 font-bold">Monitoriza o nível, XP, insígnias e ritmo de aprendizagem</p>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Class Pill tabs */}
            <div className="flex bg-slate-100 p-1 rounded-full border border-slate-200">
              {(['todas', '6.º A', '6.º B'] as const).map((cls) => (
                <button
                  key={cls}
                  onClick={() => { sfx.playClick(); setSelectedClass(cls); }}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                    selectedClass === cls
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cls === 'todas' ? 'Todas' : cls}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-48">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filtrar aluno..."
                className="w-full bg-slate-50 border border-slate-200 rounded-full pl-8 pr-3 py-1 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-black uppercase text-slate-500 border-b border-slate-200 font-['Fredoka']">
              <tr>
                <th className="p-4">Aluno</th>
                <th className="p-4">Turma</th>
                <th className="p-4">Nível & XP</th>
                <th className="p-4">Missões</th>
                <th className="p-4">Insígnias</th>
                <th className="p-4">Frequência</th>
                <th className="p-4">Estado Pedagógico</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredStudents.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50/60 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{st.avatar}</span>
                      <div>
                        <span className="font-extrabold text-slate-900 block">{st.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{st.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full font-mono text-[11px] font-bold bg-slate-100 text-slate-700">
                      {st.classGroup}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="font-mono">
                      <span className="font-black text-amber-600">{st.xp} XP</span>
                      <span className="text-slate-400 text-[10px] block">Nível {st.level}</span>
                    </div>
                  </td>
                  <td className="p-4 font-mono font-bold text-emerald-600">
                    {st.completedMissionsCount} concluídas
                  </td>
                  <td className="p-4 font-mono text-purple-700 font-bold">
                    🎖️ {st.badgesCount}
                  </td>
                  <td className="p-4 font-mono text-orange-600 font-bold">
                    🔥 {st.streak}d
                  </td>
                  <td className="p-4">
                    {st.struggles.length === 0 ? (
                      <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Ritmo Ótimo
                      </span>
                    ) : (
                      <div className="space-y-1">
                        {st.struggles.map((str, idx) => (
                          <div
                            key={idx}
                            className="px-2 py-0.5 rounded-full bg-rose-100 border border-rose-200 text-[11px] font-bold text-rose-800 flex items-center gap-1.5"
                          >
                            <AlertTriangle className="w-3 h-3 text-rose-500 shrink-0" />
                            <span>{str}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Creating New Assignment */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white border-2 border-purple-200 rounded-3xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h3 className="font-black text-base text-slate-900 font-['Fredoka']">Atribuir Missão de TIC</h3>
              </div>
              <button
                onClick={() => setShowAssignModal(false)}
                className="text-slate-400 hover:text-slate-700 transition cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAssignment} className="space-y-4 text-xs">
              {/* Select Mission */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">Selecionar Missão:</label>
                <select
                  value={selectedMissionId}
                  onChange={(e) => setSelectedMissionId(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl p-2.5 text-slate-900 font-bold focus:border-purple-500 focus:outline-none"
                >
                  {MISSIONS.map(m => (
                    <option key={m.id} value={m.id}>
                      [{m.worldId.toUpperCase()}] {m.title} (+{m.xpReward} XP)
                    </option>
                  ))}
                </select>
              </div>

              {/* Target Class & Target Student */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">Turma:</label>
                  <select
                    value={targetClassGroup}
                    onChange={(e) => setTargetClassGroup(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl p-2.5 text-slate-900 font-bold focus:border-purple-500 focus:outline-none"
                  >
                    <option value="6.º A">Turma 6.º A</option>
                    <option value="6.º B">Turma 6.º B</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">Destinatário:</label>
                  <select
                    value={targetStudentId}
                    onChange={(e) => setTargetStudentId(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl p-2.5 text-slate-900 font-bold focus:border-purple-500 focus:outline-none"
                  >
                    <option value="all">Toda a Turma</option>
                    {studentsRoster
                      .filter(s => s.classGroup === targetClassGroup)
                      .map(s => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Due Date */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">Data Limite de Realização:</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl p-2.5 text-slate-900 font-bold focus:border-purple-500 focus:outline-none"
                />
              </div>

              {/* Pedagogical Note */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">Nota / Orientação da Professora:</label>
                <textarea
                  rows={3}
                  value={teacherNote}
                  onChange={(e) => setTeacherNote(e.target.value)}
                  placeholder="Ex: Esta semana foquem-se no laboratório de avaliação de fontes..."
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl p-2.5 text-slate-900 font-bold placeholder:text-slate-400 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-black shadow-xs cursor-pointer"
                >
                  Confirmar Atribuição
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
