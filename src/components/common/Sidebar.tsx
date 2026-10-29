import React from 'react';
import { useApp } from '../../context/AppContext';
import { MODULE_NAV, DEMO_ROLES } from '../../data/mockData';
import {
  Briefcase,
  Award,
  Layers,
  ArrowRight,
  ChevronRight,
  Shield,
  FileCheck,
  TrendingUp,
  FlaskConical,
  Lock,
  AlertTriangle,
  ClipboardCheck,
  Users,
  Compass,
  CheckCircle2,
  GraduationCap
} from 'lucide-react';
import { RoleType } from '../../types';

export const Sidebar: React.FC = () => {
  const {
    currentRole,
    currentRoleInfo,
    setCurrentRole,
    activeModule,
    setActiveModule,
    notifications,
  } = useApp();

  // Filter modules based on current simulated role
  const allowedModules = MODULE_NAV.filter((mod) =>
    mod.rolesAllowed.includes(currentRole)
  );

  const graduateJourneyMods = allowedModules.filter((m) =>
    ['P1', 'P2', 'P3', 'P4'].includes(m.pillar)
  );

  const governanceMods = allowedModules.filter((m) =>
    m.pillar === 'GOV'
  );

  const getModuleIcon = (code: string) => {
    switch (code) {
      case 'M01': return Briefcase;
      case 'M02': return FileCheck;
      case 'M03': return Award;
      case 'M04': return CheckCircle2;
      case 'M05': return Lock;
      case 'M06': return TrendingUp;
      case 'M07': return Users;
      case 'M08': return ArrowRight;
      case 'M09': return Layers;
      case 'M10': return FlaskConical;
      case 'M11': return Shield;
      case 'M12': return AlertTriangle;
      case 'M13': return ClipboardCheck;
      case 'M14': return Users;
      default: return Compass;
    }
  };

  return (
    <aside className="w-64 lg:w-72 bg-slate-950 border-r border-slate-800/80 flex flex-col h-screen sticky top-0 shrink-0 select-none overflow-y-auto">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80 flex items-center gap-3 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-500 p-0.5 shadow-lg shadow-indigo-500/25 flex items-center justify-center shrink-0">
          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
            <span className="font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-400 text-lg">
              M
            </span>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold tracking-tight text-white text-base">MITRA</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 bg-blue-500/15 text-blue-400 border border-blue-500/30 rounded">
              2026
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            Youth Transition Bridge
          </p>
        </div>
      </div>

      {/* Navigation Modules */}
      <div className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        {/* Group 1: Graduate Journey */}
        <div>
          <div className="px-3 mb-2 flex items-center justify-between text-[11px] font-mono tracking-wider uppercase text-slate-400">
            <span>Graduate Journey</span>
            <span className="text-[10px] text-slate-500 font-sans">P1 – P4</span>
          </div>
          <div className="space-y-1">
            {graduateJourneyMods.map((mod) => {
              const Icon = getModuleIcon(mod.code);
              const isActive = activeModule === mod.code;
              const notifCount = mod.notificationKey ? notifications[mod.notificationKey] || 0 : 0;

              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveModule(mod.code)}
                  className={`w-full group flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600/30 to-violet-600/30 border border-blue-500/40 text-white font-medium shadow-md shadow-blue-900/20'
                      : 'hover:bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'
                      }`}
                    />
                    <div className="truncate">
                      <div className="truncate flex items-center gap-1.5">
                        <span className="font-mono text-[10px] font-bold text-slate-400">
                          {mod.code}
                        </span>
                        <span className="truncate">{mod.title}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 ml-1">
                    {notifCount > 0 && (
                      <span className="px-1.5 py-0.2 rounded-full font-mono text-[9px] font-bold bg-rose-500 text-white">
                        {notifCount}
                      </span>
                    )}
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${mod.badgeColor}`}>
                      {mod.pillar}
                    </span>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-blue-400" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Group 2: Governance and Shared Engine */}
        {governanceMods.length > 0 && (
          <div>
            <div className="px-3 mb-2 flex items-center justify-between text-[11px] font-mono tracking-wider uppercase text-slate-400">
              <span>Governance & Engine</span>
              <span className="text-[10px] text-slate-500 font-sans">M09 – M14</span>
            </div>
            <div className="space-y-1">
              {governanceMods.map((mod) => {
                const Icon = getModuleIcon(mod.code);
                const isActive = activeModule === mod.code;
                const notifCount = mod.notificationKey ? notifications[mod.notificationKey] || 0 : 0;

                return (
                  <button
                    key={mod.id}
                    onClick={() => setActiveModule(mod.code)}
                    className={`w-full group flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600/30 to-violet-600/30 border border-blue-500/40 text-white font-medium shadow-md shadow-blue-900/20'
                        : 'hover:bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'
                        }`}
                      />
                      <div className="truncate">
                        <div className="truncate flex items-center gap-1.5">
                          <span className="font-mono text-[10px] font-bold text-slate-400">
                            {mod.code}
                          </span>
                          <span className="truncate">{mod.title}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 ml-1">
                      {notifCount > 0 && (
                        <span className="px-1.5 py-0.2 rounded-full font-mono text-[9px] font-bold bg-rose-500 text-white">
                          {notifCount}
                        </span>
                      )}
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${mod.badgeColor}`}>
                        GOV
                      </span>
                      {isActive && <ChevronRight className="w-3.5 h-3.5 text-blue-400" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Active Role Switcher at Bottom */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-900/50 space-y-3">
        <div className="px-1">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
            Active Role Simulation
          </div>
          <div className="grid grid-cols-5 gap-1">
            {DEMO_ROLES.map((r) => {
              const isSelected = r.id === currentRole;
              const shortLabel = r.id === 'central' ? 'GOV' : r.id === 'provincial' ? 'PROV' : r.id === 'school' ? 'BKK' : r.id === 'employer' ? 'IND' : 'GRAD';
              return (
                <button
                  key={r.id}
                  onClick={() => setCurrentRole(r.id)}
                  title={`${r.name} (${r.badge})`}
                  className={`py-1 rounded text-[10px] font-mono transition text-center ${
                    isSelected
                      ? 'bg-blue-600 text-white font-bold border border-blue-400'
                      : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {shortLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Current User Card */}
        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-2.5">
          <img
            src={currentRoleInfo.avatar}
            alt={currentRoleInfo.name}
            className="w-8 h-8 rounded-lg object-cover shrink-0 border border-slate-700"
          />
          <div className="overflow-hidden min-w-0">
            <div className="text-xs font-semibold text-slate-200 truncate">
              {currentRoleInfo.name}
            </div>
            <div className="text-[10px] text-blue-400 font-mono truncate">
              {currentRoleInfo.badge}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
