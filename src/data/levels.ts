import { LevelInfo } from '../types';

export const LEVELS: LevelInfo[] = [
  {
    level: 1,
    title: 'Recruta Digital',
    minXP: 0,
    maxXP: 250,
    perk: 'Desbloqueia os 5 mundos e a tua primeira insígnia de identificação.',
    badgeId: 'recruta-digital',
  },
  {
    level: 2,
    title: 'Explorador',
    minXP: 251,
    maxXP: 600,
    perk: 'Acesso às ferramentas de simulação avançadas e desafios práticos.',
    badgeId: 'explorador',
  },
  {
    level: 3,
    title: 'Utilizador Consciente',
    minXP: 601,
    maxXP: 1050,
    perk: 'Capacidade de submeter Missões do Mundo Real e desbloquear avatares cibernéticos.',
    badgeId: 'utilizador-consciente',
  },
  {
    level: 4,
    title: 'Investigador',
    minXP: 1051,
    maxXP: 1600,
    perk: 'Acesso às ferramentas de análise de fontes e deteção de IA.',
    badgeId: 'investigador',
  },
  {
    level: 5,
    title: 'Comunicador',
    minXP: 1601,
    maxXP: 2300,
    perk: 'Desbloqueia o laboratório de colaboração em equipa e netiqueta avançada.',
    badgeId: 'comunicador',
  },
  {
    level: 6,
    title: 'Pensador Digital',
    minXP: 2301,
    maxXP: 3150,
    perk: 'Desbloqueia a depuração de código e algoritmos modulares.',
    badgeId: 'pensador-digital',
  },
  {
    level: 7,
    title: 'Criador',
    minXP: 3151,
    maxXP: 4200,
    perk: 'Acesso ao modo de criação de jogos e projetos multimédia.',
    badgeId: 'criador',
  },
  {
    level: 8,
    title: 'Mestre Digital',
    minXP: 4201,
    maxXP: 6000,
    perk: 'Grau máximo alcançado! Certificado de Excelência em TIC do 6.º Ano.',
    badgeId: 'mestre-digital',
  },
];

export function getLevelForXP(xp: number): LevelInfo {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXP) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
}
