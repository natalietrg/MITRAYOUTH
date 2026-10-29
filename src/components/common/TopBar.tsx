import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  ShieldCheck,
  Bell,
  Home,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  UserCheck,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { DEMO_ROLES } from '../../data/mockData';

export const TopBar: React.FC = () => {
  const {
    currentRole,
    currentRoleInfo,
    setCurrentRole,
    setCurrentView,
    setIsAuditModalOpen,
    setIsSearchModalOpen,
    notifications,
    showToast,
  } = useApp();

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);

  const totalNotifs = Object.values(notifications).reduce((acc, curr) => acc + curr, 0);

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    showToast(!audioEnabled ? 'Auditory indicators enabled.' : 'Auditory indicators muted.', 'info');
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
      {/* Disclaimer Banner */}
      <div className="bg-gradient-to-r from-amber-950/90 via-slate-900 to-amber-950/90 border-b border-amber-500/30 px-4 py-1.5 flex items-center justify-between text-xs text-amber-200/90">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="font-medium">
            <strong>Disclaimer:</strong> Concept prototype for Meridian English Olympiad 2026. All figures other than cited national statistics are illustrative demo data for interface demonstration, not pilot results.
          </span>
        </div>
        <span className="hidden md:inline-block font-mono text-[10px] text-amber-400/80 px-2 py-0.2 rounded border border-amber-500/20">
          MEO 2026 ESSAY PROTOTYPE
        </span>
      </div>

      {/* Main TopBar Navigation */}
      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Left: Global Search trigger with Ctrl+K */}
        <div className="flex-1 max-w-md">
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="w-full flex items-center justify-between bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 px-3 py-1.5 rounded-xl text-xs transition group shadow-inner"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition" />
              <span className="text-slate-400 group-hover:text-slate-300">
                Search school, programme, graduate ID, placement...
              </span>
            </div>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 font-mono text-[10px] text-slate-400 bg-slate-800 border border-slate-700 rounded shadow-xs">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
        </div>

        {/* Right Action Group */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Data Status Pill */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Data linked — latency 24ms</span>
          </div>

          {/* Public Home Button */}
          <button
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-xl text-xs font-medium transition"
            title="Return to Public Landing Page"
          >
            <Home className="w-4 h-4 text-blue-400" />
            <span className="hidden sm:inline">Public Home</span>
          </button>

          {/* Audit Log Button */}
          <button
            onClick={() => setIsAuditModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-xl text-xs font-medium transition relative group"
            title="Inspect Immutable Audit Log"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline font-mono">Audit Log</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </button>

          {/* Audio toggle */}
          <button
            onClick={toggleAudio}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition"
            aria-label="Toggle sound alerts"
            title={audioEnabled ? 'Auditory indicators on' : 'Auditory indicators off'}
          >
            {audioEnabled ? <Volume2 className="w-4 h-4 text-blue-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => showToast(`${totalNotifs} operational items need action across modules.`, 'info')}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition relative"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              {totalNotifs > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white font-mono text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {totalNotifs}
                </span>
              )}
            </button>
          </div>

          {/* User Role Simulation Dropdown */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 transition text-left"
            >
              <img
                src={currentRoleInfo.avatar}
                alt={currentRoleInfo.name}
                className="w-7 h-7 rounded-lg object-cover border border-slate-700"
              />
              <div className="hidden xl:block leading-tight">
                <div className="text-xs font-bold text-slate-200">{currentRoleInfo.name}</div>
                <div className="text-[10px] text-blue-400 font-mono">{currentRoleInfo.badge}</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {roleMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in">
                <div className="p-2 border-b border-slate-800 mb-1">
                  <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                    Simulate Active Persona
                  </div>
                  <div className="text-xs text-slate-300">
                    Switch role to inspect permissions & available modules
                  </div>
                </div>
                <div className="space-y-1">
                  {DEMO_ROLES.map((r) => {
                    const isSelected = r.id === currentRole;
                    return (
                      <button
                        key={r.id}
                        onClick={() => {
                          setCurrentRole(r.id);
                          setRoleMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-left text-xs transition ${
                          isSelected
                            ? 'bg-blue-600/20 border border-blue-500/40 text-white font-semibold'
                            : 'hover:bg-slate-800 text-slate-300'
                        }`}
                      >
                        <img
                          src={r.avatar}
                          alt={r.name}
                          className="w-8 h-8 rounded-lg object-cover shrink-0"
                        />
                        <div className="overflow-hidden">
                          <div className="text-xs font-bold truncate">{r.name}</div>
                          <div className="text-[10px] text-slate-400 truncate font-mono">{r.badge}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
