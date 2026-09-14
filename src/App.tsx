import React from 'react';
import { GameStateProvider, useGameState } from './context/GameStateContext';
import { Navbar } from './components/layout/Navbar';
import { DashboardView } from './components/views/DashboardView';
import { WorldsView } from './components/views/WorldsView';
import { MissionsView } from './components/views/MissionsView';
import { BadgesView } from './components/views/BadgesView';
import { ProgressView } from './components/views/ProgressView';
import { ProfileModal } from './components/views/ProfileModal';
import { TeacherDashboardView } from './components/views/TeacherDashboardView';
import { MissionPlayer } from './components/mission/MissionPlayer';
import { Rocket, Youtube, Instagram, MessageCircle, Heart } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeView, activeMissionId, closeMission } = useGameState();

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-800 flex flex-col font-['Nunito'] selection:bg-sky-400/30 selection:text-sky-900">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        {activeView === 'dashboard' && <DashboardView />}
        {activeView === 'mundos' && <WorldsView />}
        {activeView === 'missoes' && <MissionsView />}
        {activeView === 'conquistas' && <BadgesView />}
        {activeView === 'progresso' && <ProgressView />}
        {activeView === 'perfil' && <ProfileModal />}
        {activeView === 'teacher' && <TeacherDashboardView />}
      </main>

      {/* Mission Player Interactive Modal */}
      {activeMissionId && (
        <MissionPlayer
          missionId={activeMissionId}
          onClose={closeMission}
        />
      )}

      {/* Cheerful Footer 1:1 Reference Style */}
      <footer className="bg-[#1e293b] text-white py-6 border-t-4 border-sky-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          
          {/* Left Slogan */}
          <div className="flex items-center gap-2 font-['Fredoka'] text-sm sm:text-base font-bold text-sky-200">
            <span>Miúdos de hoje, criadores de amanhã!</span>
            <span className="text-xl">🚀</span>
          </div>

          {/* Social Icons from reference */}
          <div className="flex items-center gap-4 text-slate-300">
            <span className="text-slate-400 font-bold">Segue-nos:</span>
            <a href="#youtube" onClick={(e) => e.preventDefault()} className="w-8 h-8 rounded-full bg-slate-800 hover:bg-rose-600 hover:text-white flex items-center justify-center transition" title="YouTube">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="#instagram" onClick={(e) => e.preventDefault()} className="w-8 h-8 rounded-full bg-slate-800 hover:bg-pink-600 hover:text-white flex items-center justify-center transition" title="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#comunidade" onClick={(e) => e.preventDefault()} className="w-8 h-8 rounded-full bg-slate-800 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition" title="Comunidade Escolar">
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>

          {/* Right Slogan */}
          <div className="font-bold text-slate-400 flex items-center gap-2">
            <span>Aprende • Cria • Partilha • Faz a diferença!</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <GameStateProvider>
      <AppContent />
    </GameStateProvider>
  );
}

export default App;
