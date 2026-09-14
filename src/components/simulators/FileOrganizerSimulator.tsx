import React, { useState } from 'react';
import { Folder, FileText, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { sfx } from '../../utils/audio';

interface FileItem {
  id: string;
  name: string;
  category: string;
  targetFolder: string;
  assignedFolder?: string;
}

export const FileOrganizerSimulator: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const initialFiles: FileItem[] = [
    { id: 'f1', name: 'Planetas_SistemaSolar.pptx', category: 'Ciências', targetFolder: 'Ciencias_Naturais' },
    { id: 'f2', name: 'Algoritmo_Robo.sb3', category: 'TIC', targetFolder: 'TIC_Programacao' },
    { id: 'f3', name: 'Redacao_Camoes.docx', category: 'Português', targetFolder: 'Portugues' },
    { id: 'f4', name: 'Estatistica_Graficos.xlsx', category: 'Matemática', targetFolder: 'Matematica' },
  ];

  const folders = [
    { id: 'Ciencias_Naturais', label: '📁 Ciências Naturais', color: 'bg-emerald-50 border-emerald-300 text-emerald-900' },
    { id: 'TIC_Programacao', label: '📁 TIC & Programação', color: 'bg-sky-50 border-sky-300 text-sky-900' },
    { id: 'Portugues', label: '📁 Língua Portuguesa', color: 'bg-amber-50 border-amber-300 text-amber-900' },
    { id: 'Matematica', label: '📁 Matemática', color: 'bg-purple-50 border-purple-300 text-purple-900' },
  ];

  const [files, setFiles] = useState<FileItem[]>(initialFiles);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  const handleSelectFile = (fileId: string) => {
    sfx.playClick();
    setSelectedFileId(fileId);
  };

  const handleAssignToFolder = (folderId: string) => {
    if (!selectedFileId) return;
    sfx.playClick();

    const updated = files.map(f => {
      if (f.id === selectedFileId) {
        return { ...f, assignedFolder: folderId };
      }
      return f;
    });
    setFiles(updated);
    setSelectedFileId(null);

    const allAssigned = updated.every(f => f.assignedFolder !== undefined);
    const allCorrect = updated.every(f => f.assignedFolder === f.targetFolder);

    if (allAssigned && allCorrect) {
      sfx.playSuccess();
      if (onSuccess) onSuccess();
    } else if (allAssigned && !allCorrect) {
      sfx.playError();
    }
  };

  const resetAll = () => {
    sfx.playClick();
    setFiles(initialFiles);
    setSelectedFileId(null);
  };

  const unassignedFiles = files.filter(f => !f.assignedFolder);
  const allCorrect = files.every(f => f.assignedFolder === f.targetFolder);

  return (
    <div id="file-organizer-simulator-box" className="bg-white border-2 border-slate-200 rounded-3xl p-6 text-slate-800 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="font-black text-lg text-slate-900 font-['Fredoka']">Organizador de Ficheiros & Pastas</h3>
          <p className="text-xs text-slate-500 font-bold">Seleciona um ficheiro solto e clica na pasta correspondente para arrumar o Desktop</p>
        </div>

        <button
          onClick={resetAll}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold transition cursor-pointer self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reiniciar</span>
        </button>
      </div>

      {/* Desktop Files (Unassigned) */}
      <div className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-200 space-y-3">
        <span className="text-xs font-black text-slate-700 uppercase tracking-wider block font-['Fredoka']">
          Ambiente de Trabalho (Ficheiros Soltos):
        </span>

        {unassignedFiles.length === 0 ? (
          <p className="text-xs text-emerald-800 font-black italic py-2 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 stroke-[3]" /> Ambiente de Trabalho limpo! Todos os ficheiros foram arquivados nas respetivas pastas.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {unassignedFiles.map(file => {
              const isSelected = selectedFileId === file.id;
              return (
                <button
                  key={file.id}
                  onClick={() => handleSelectFile(file.id)}
                  className={`p-3 rounded-xl border-2 text-left text-xs font-mono flex items-center gap-2.5 transition cursor-pointer font-bold ${
                    isSelected
                      ? 'bg-sky-100 border-sky-400 text-sky-900 ring-4 ring-sky-200'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-sky-300'
                  }`}
                >
                  <FileText className="w-4 h-4 text-sky-600 shrink-0" />
                  <span className="truncate">{file.name}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Target Folder Shelves */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {folders.map(folder => {
          const folderFiles = files.filter(f => f.assignedFolder === folder.id);
          const isTargetActive = selectedFileId !== null;

          return (
            <div
              key={folder.id}
              onClick={() => handleAssignToFolder(folder.id)}
              className={`p-5 rounded-2xl border-2 transition cursor-pointer ${
                isTargetActive
                  ? 'border-dashed border-sky-400 bg-sky-50/50 hover:bg-sky-100/60'
                  : folder.color
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black font-['Fredoka']">{folder.label}</span>
                <span className="text-[11px] font-mono font-bold opacity-70">
                  {folderFiles.length} {folderFiles.length === 1 ? 'ficheiro' : 'ficheiros'}
                </span>
              </div>

              {folderFiles.length === 0 ? (
                <div className="h-10 flex items-center justify-center text-[11px] text-slate-400 font-bold italic border-2 border-dashed border-slate-200 rounded-xl bg-white/60">
                  {isTargetActive ? 'Clica aqui para mover' : 'Pasta Vazia'}
                </div>
              ) : (
                <div className="space-y-1.5">
                  {folderFiles.map(f => {
                    const isCorrect = f.assignedFolder === f.targetFolder;
                    return (
                      <div
                        key={f.id}
                        className={`px-3 py-1.5 rounded-xl border text-[11px] font-mono flex items-center justify-between font-bold bg-white ${
                          isCorrect
                            ? 'border-emerald-300 text-emerald-900'
                            : 'border-rose-300 text-rose-900'
                        }`}
                      >
                        <span className="truncate">{f.name}</span>
                        {isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-1 stroke-[3]" /> : <span className="text-rose-600 text-xs">⚠️</span>}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {allCorrect && unassignedFiles.length === 0 && (
        <div className="p-4 rounded-2xl bg-emerald-100 border-2 border-emerald-300 flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0 stroke-[3]" />
          <div>
            <p className="text-sm font-black text-emerald-900 font-['Fredoka']">Organização Digital Perfeita!</p>
            <p className="text-xs text-emerald-800 font-bold">
              Todos os ficheiros foram arquivados nas suas respetivas pastas disciplinares. Nunca mais perderás trabalhos importantes.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
