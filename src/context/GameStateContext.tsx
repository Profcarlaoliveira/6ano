import React, { createContext, useContext, useState, useEffect } from 'react';
import { StudentProfile, WorldId, Assignment, TeacherStudentSummary, RealWorldSubmission } from '../types';
import { getLevelForXP } from '../data/levels';
import { INITIAL_STUDENTS, INITIAL_ASSIGNMENTS } from '../data/mockTeacherData';
import { sfx } from '../utils/audio';

interface GameStateContextType {
  student: StudentProfile;
  activeView: 'dashboard' | 'mundos' | 'missoes' | 'conquistas' | 'progresso' | 'perfil' | 'teacher';
  setActiveView: (view: 'dashboard' | 'mundos' | 'missoes' | 'conquistas' | 'progresso' | 'perfil' | 'teacher') => void;
  activeMissionId: string | null;
  startMission: (missionId: string) => void;
  closeMission: () => void;
  selectedWorldId: WorldId | null;
  setSelectedWorldId: (worldId: WorldId | null) => void;
  completeMission: (missionId: string, earnedXP: number, badgeId?: string) => void;
  submitRealWorldReflection: (missionId: string, reflection: string, checklist: boolean[]) => void;
  updateAvatar: (avatarIcon: string, avatarBg: string, name: string) => void;
  toggleSound: () => void;
  assignments: Assignment[];
  studentsRoster: TeacherStudentSummary[];
  createAssignment: (classGroup: string, missionId: string, missionTitle: string, targetStudentIds: string[], dueDate: string, note: string) => void;
  deleteAssignment: (assignmentId: string) => void;
  resetProgress: () => void;
  currentLevelInfo: ReturnType<typeof getLevelForXP>;
}

const STORAGE_KEY_STUDENT = 'tic_quest_student_profile_v2';
const STORAGE_KEY_ASSIGNMENTS = 'tic_quest_assignments_v2';

const DEFAULT_STUDENT: StudentProfile = {
  id: 's-1',
  name: 'João Silva',
  email: 'joao.silva@escola-digital.pt',
  classGroup: '6.º A',
  avatarIcon: '👨‍🚀',
  avatarBg: 'bg-indigo-600',
  avatarFrame: 'border-cyan-400',
  level: 3,
  xp: 1240,
  streakDays: 4,
  lastActiveDate: new Date().toISOString(),
  soundEnabled: true,
  completedMissionIds: ['m1-1', 'm1-2'],
  activeMissionId: 'm2-3',
  unlockedBadgeIds: ['guardiao-privacidade', 'mestre-seguranca'],
  realWorldSubmissions: [
    {
      missionId: 'm1-1',
      missionTitle: 'Auditoria da Minha Pegada Digital',
      submittedAt: 'Há 2 dias',
      reflectionText: 'Pesquisei o meu nome e reparei que o meu perfil de um jogo antigo tinha a minha fotografia com a camisola da escola. Mudei imediatamente para privado e alterei o avatar.',
      checklistDone: [true, true, true],
      status: 'validado_pelo_professor',
    },
    {
      missionId: 'm1-2',
      missionTitle: 'Missão do Guardião do Cofre',
      submittedAt: 'Ontem',
      reflectionText: 'Criei uma frase-passe com 16 caracteres misturando números e símbolos. Ficou muito mais forte no simulador!',
      checklistDone: [true, true, true],
      status: 'concluido',
    }
  ],
  assignedMissionIds: [
    {
      missionId: 'm1-2',
      assignedBy: 'Prof.ª Carla',
      assignedAt: '10 Setembro',
      dueDate: '18 Setembro',
      note: 'Atenção aos 4 ingredientes da palavra-passe!',
    },
    {
      missionId: 'm2-3',
      assignedBy: 'Prof.ª Carla',
      assignedAt: '12 Setembro',
      dueDate: '17 Setembro',
      note: 'Aprende a detetar fontes falsas antes do trabalho de pesquisa.',
    },
  ],
};

const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

export const GameStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [student, setStudent] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STUDENT);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading student profile from localStorage:', e);
    }
    return DEFAULT_STUDENT;
  });

  const [activeView, setActiveView] = useState<'dashboard' | 'mundos' | 'missoes' | 'conquistas' | 'progresso' | 'perfil' | 'teacher'>('dashboard');
  const [activeMissionId, setActiveMissionId] = useState<string | null>(null);
  const [selectedWorldId, setSelectedWorldId] = useState<WorldId | null>(null);

  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ASSIGNMENTS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading assignments from localStorage:', e);
    }
    return INITIAL_ASSIGNMENTS;
  });

  const [studentsRoster] = useState<TeacherStudentSummary[]>(INITIAL_STUDENTS);

  // Sync sound manager enabled flag
  useEffect(() => {
    sfx.enabled = student.soundEnabled;
  }, [student.soundEnabled]);

  // Persist student profile
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STUDENT, JSON.stringify(student));
    } catch (e) {
      console.error('Error saving student profile:', e);
    }
  }, [student]);

  // Persist assignments
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ASSIGNMENTS, JSON.stringify(assignments));
    } catch (e) {
      console.error('Error saving assignments:', e);
    }
  }, [assignments]);

  const currentLevelInfo = getLevelForXP(student.xp);

  const startMission = (missionId: string) => {
    sfx.playClick();
    setActiveMissionId(missionId);
  };

  const closeMission = () => {
    sfx.playClick();
    setActiveMissionId(null);
  };

  const completeMission = (missionId: string, earnedXP: number, badgeId?: string) => {
    sfx.playSuccess();
    setStudent(prev => {
      const isFirstTime = !prev.completedMissionIds.includes(missionId);
      const newCompleted = isFirstTime ? [...prev.completedMissionIds, missionId] : prev.completedMissionIds;
      const newXP = isFirstTime ? prev.xp + earnedXP : prev.xp + Math.floor(earnedXP * 0.2); // bonus for replay
      const newBadges = badgeId && !prev.unlockedBadgeIds.includes(badgeId)
        ? [...prev.unlockedBadgeIds, badgeId]
        : prev.unlockedBadgeIds;
      
      const newLevel = getLevelForXP(newXP).level;
      if (newLevel > prev.level) {
        sfx.playLevelUp();
      }

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        completedMissionIds: newCompleted,
        unlockedBadgeIds: newBadges,
      };
    });
  };

  const submitRealWorldReflection = (missionId: string, reflection: string, checklist: boolean[]) => {
    sfx.playSuccess();
    setStudent(prev => {
      const submission: RealWorldSubmission = {
        missionId,
        missionTitle: missionId,
        submittedAt: 'Agora mesmo',
        reflectionText: reflection,
        checklistDone: checklist,
        status: 'concluido',
      };
      const existing = prev.realWorldSubmissions.filter(s => s.missionId !== missionId);
      const bonusXP = 50;
      return {
        ...prev,
        xp: prev.xp + bonusXP,
        realWorldSubmissions: [submission, ...existing],
      };
    });
  };

  const updateAvatar = (avatarIcon: string, avatarBg: string, name: string) => {
    sfx.playClick();
    setStudent(prev => ({
      ...prev,
      avatarIcon,
      avatarBg,
      name: name.trim() || prev.name,
    }));
  };

  const toggleSound = () => {
    setStudent(prev => {
      const updated = !prev.soundEnabled;
      sfx.enabled = updated;
      if (updated) sfx.playClick();
      return {
        ...prev,
        soundEnabled: updated,
      };
    });
  };

  const createAssignment = (
    classGroup: string,
    missionId: string,
    missionTitle: string,
    targetStudentIds: string[],
    dueDate: string,
    note: string
  ) => {
    sfx.playSuccess();
    const newAssign: Assignment = {
      id: 'as-' + Date.now(),
      classGroup,
      missionId,
      missionTitle,
      targetStudentIds,
      assignedAt: new Date().toISOString().split('T')[0],
      dueDate,
      teacherNote: note,
    };
    setAssignments(prev => [newAssign, ...prev]);
  };

  const deleteAssignment = (assignmentId: string) => {
    sfx.playClick();
    setAssignments(prev => prev.filter(a => a.id !== assignmentId));
  };

  const resetProgress = () => {
    setStudent(DEFAULT_STUDENT);
    setAssignments(INITIAL_ASSIGNMENTS);
    localStorage.removeItem(STORAGE_KEY_STUDENT);
    localStorage.removeItem(STORAGE_KEY_ASSIGNMENTS);
    sfx.playClick();
  };

  return (
    <GameStateContext.Provider
      value={{
        student,
        activeView,
        setActiveView,
        activeMissionId,
        startMission,
        closeMission,
        selectedWorldId,
        setSelectedWorldId,
        completeMission,
        submitRealWorldReflection,
        updateAvatar,
        toggleSound,
        assignments,
        studentsRoster,
        createAssignment,
        deleteAssignment,
        resetProgress,
        currentLevelInfo,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
};
