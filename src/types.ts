export type CurricularDomain = 
  | 'Respeitar e Proteger'
  | 'Investigar e Pesquisar'
  | 'Comunicar e Colaborar'
  | 'Criar e Inovar';

export type WorldId = 'mundo-1' | 'mundo-2' | 'mundo-3' | 'mundo-4' | 'mundo-5';

export interface LevelInfo {
  level: number;
  title: string;
  minXP: number;
  maxXP: number;
  perk: string;
  badgeId: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  icon?: string;
  worldId: WorldId | 'global';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: string;
  category: string;
  criteria?: string;
  xpBonus?: number;
}

export type SimulatorType =
  | 'password_tester'
  | 'phishing_analyzer'
  | 'source_evaluator'
  | 'fake_detector'
  | 'prompt_crafter'
  | 'ai_hallucination_check'
  | 'netiquette_fixer'
  | 'block_algorithm'
  | 'file_organizer';

export interface StepDescobreCard {
  icon: string;
  title: string;
  text: string;
  highlight?: string;
  example?: string;
}

export interface StepDescobre {
  title: string;
  cards: StepDescobreCard[];
  quickCheck: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface StepExperimenta {
  type: SimulatorType;
  title: string;
  instruction: string;
  context: string;
  payload?: any;
}

export interface ChallengeQuestion {
  id: string;
  prompt: string;
  type: 'single_choice' | 'multi_choice' | 'true_false' | 'order_steps' | 'spot_defect';
  options: string[];
  correctAnswer: number | number[] | boolean | number[]; // index or array of indexes
  explanation: string;
  hint: string;
  scenarioSnippet?: string;
}

export interface StepDesafio {
  title: string;
  scenario: string;
  questions: ChallengeQuestion[];
}

export interface StepMissaoReal {
  title: string;
  tagline: string;
  duration: string;
  instructions: string[];
  tips: string[];
  reflectionPrompt: string;
  deliverableType: 'checklist' | 'reflection' | 'choice';
}

export interface StepRecompensa {
  xp: number;
  badgeId?: string;
  rewardTitle: string;
  celebrationMessage: string;
}

export interface Mission {
  id: string;
  worldId: WorldId;
  areaId: string;
  title: string;
  subtitle: string;
  shortGoal?: string;
  curricularSkill?: string;
  xpReward: number;
  estimatedMinutes: number;
  isBoss?: boolean;
  step1Descobre: StepDescobre;
  step2Experimenta: StepExperimenta;
  step3Desafio: StepDesafio;
  step4MissaoReal: StepMissaoReal;
  step5Recompensa: StepRecompensa;
}

export interface WorldArea {
  id: string;
  title: string;
  description: string;
  topics: string[];
  missionIds: string[];
}

export interface World {
  id: WorldId;
  number: number;
  order?: number;
  title: string;
  subtitle: string;
  shortDescription: string;
  description?: string;
  fullObjective: string;
  icon: string;
  badge?: string;
  accentColor: string;
  bgGradient: string;
  bgColor?: string;
  borderColor: string;
  totalMissions?: number;
  curricularDomain: CurricularDomain;
  curriculumArea?: string;
  areas: WorldArea[];
  bossMissionId: string;
}

export interface RealWorldSubmission {
  missionId: string;
  missionTitle: string;
  submittedAt: string;
  reflectionText: string;
  checklistDone: boolean[];
  status: 'concluido' | 'validado_pelo_professor';
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  classGroup: string;
  avatarIcon: string;
  avatarBg: string;
  avatarFrame: string;
  level: number;
  xp: number;
  streakDays: number;
  lastActiveDate: string;
  soundEnabled: boolean;
  completedMissionIds: string[];
  activeMissionId: string;
  unlockedBadgeIds: string[];
  realWorldSubmissions: RealWorldSubmission[];
  assignedMissionIds: {
    missionId: string;
    assignedBy: string;
    assignedAt: string;
    dueDate: string;
    note?: string;
  }[];
}

export interface TeacherStudentSummary {
  id: string;
  name: string;
  email: string;
  classGroup: string;
  avatar: string;
  level: number;
  xp: number;
  completedMissionsCount: number;
  badgesCount: number;
  lastActive: string;
  streak: number;
  struggles: string[];
  curriculumCoverage: {
    respeitarEProteger: number;
    investigarEPesquisar: number;
    comunicarEColaborar: number;
    criarEInovar: number;
  };
  realWorldSubmissionsCount: number;
}

export interface Assignment {
  id: string;
  missionId: string;
  missionTitle: string;
  classGroup: string;
  targetStudentIds: string[]; // empty means all students in class
  assignedAt: string;
  dueDate: string;
  teacherNote: string;
}
