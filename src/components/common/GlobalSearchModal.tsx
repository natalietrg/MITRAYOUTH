import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Briefcase, GraduationCap, Building2, FileCheck, ArrowRight, X } from 'lucide-react';
import { MODULE_NAV } from '../../data/mockData';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchModalOpen,
    setIsSearchModalOpen,
    placements,
    graduates,
    certificates,
    setActiveModule,
    setCurrentView,
    setVerifyPortalCode,
  } = useApp();

  const [query, setQuery] = useState('');

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
      if (e.key === 'Escape' && isSearchModalOpen) {
        setIsSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchModalOpen, setIsSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredModules = q
    ? MODULE_NAV.filter((m) => m.title.toLowerCase().includes(q) || m.code.toLowerCase().includes(q) || m.pillarName.toLowerCase().includes(q))
    : MODULE_NAV.slice(0, 4);

  const filteredPlacements = q
    ? placements.filter((p) => p.companyName.toLowerCase().includes(q) || p.sector.toLowerCase().includes(q) || p.id.toLowerCase().includes(q))
    : [];

  const filteredGraduates = q
    ? graduates.filter((g) => g.name.toLowerCase().includes(q) || g.nisn.includes(q) || g.programme.toLowerCase().includes(q) || g.schoolName.toLowerCase().includes(q))
    : [];

  const filteredCerts = q
    ? certificates.filter((c) => c.siapKerjaCode.toLowerCase().includes(q) || c.graduateName.toLowerCase().includes(q))
    : [];

  const handleSelectModule = (modId: string) => {
    setActiveModule(modId);
    setCurrentView('dashboard');
    setIsSearchModalOpen(false);
  };

  const handleSelectGraduate = () => {
    setActiveModule('M07');
    setCurrentView('dashboard');
    setIsSearchModalOpen(false);
  };

  const handleSelectCert = (code: string) => {
    setVerifyPortalCode(code);
    setActiveModule('M03');
    setCurrentView('dashboard');
    setIsSearchModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-950/70">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search school, programme, graduate ID, NISN, placement..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 border border-slate-700 rounded">
            ESC
          </kbd>
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="text-slate-400 hover:text-white p-1"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4 text-xs">
          {/* Modules */}
          <div>
            <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-2">
              System Modules
            </div>
            <div className="space-y-1">
              {filteredModules.map((mod) => (
                <button
                  key={mod.id}
                  onClick={() => handleSelectModule(mod.id)}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-800 text-left transition group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-blue-400 font-bold">{mod.code}</span>
                    <span className="text-slate-200 group-hover:text-white font-medium">{mod.title}</span>
                    <span className="text-[10px] text-slate-400 font-mono">({mod.pillarName})</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transition" />
                </button>
              ))}
            </div>
          </div>

          {/* Placements */}
          {filteredPlacements.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-2">
                Matching Placements (P1)
              </div>
              <div className="space-y-1">
                {filteredPlacements.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelectModule('M01')}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-800 text-left transition group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Briefcase className="w-4 h-4 text-amber-400 shrink-0" />
                      <div>
                        <div className="text-slate-200 font-medium">{p.companyName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {p.sector} · {p.province} · {p.places} places
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 transition" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Graduates */}
          {filteredGraduates.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-2">
                Traced Graduates (P3 & P4)
              </div>
              <div className="space-y-1">
                {filteredGraduates.map((g) => (
                  <button
                    key={g.id}
                    onClick={handleSelectGraduate}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-800 text-left transition group"
                  >
                    <div className="flex items-center gap-2.5">
                      <GraduationCap className="w-4 h-4 text-purple-400 shrink-0" />
                      <div>
                        <div className="text-slate-200 font-medium">
                          {g.name} <span className="font-mono text-slate-400">({g.nisn})</span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {g.schoolName} · {g.programme}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {g.currentStatus}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Certificates */}
          {filteredCerts.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-2">
                SIAPkerja Verified Certificates (P2)
              </div>
              <div className="space-y-1">
                {filteredCerts.map((c) => (
                  <button
                    key={c.certificateId}
                    onClick={() => handleSelectCert(c.siapKerjaCode)}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-800 text-left transition group"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileCheck className="w-4 h-4 text-blue-400 shrink-0" />
                      <div>
                        <div className="text-slate-200 font-medium font-mono">{c.siapKerjaCode}</div>
                        <div className="text-[10px] text-slate-400">
                          {c.graduateName} ({c.schoolName})
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-mono">Verify ↗</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {q && filteredPlacements.length === 0 && filteredGraduates.length === 0 && filteredCerts.length === 0 && (
            <div className="text-center py-6 text-slate-500">
              No matching records for "{query}". Try searching "Cimahi", "PLC", "Rian", or "SK-2026".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
