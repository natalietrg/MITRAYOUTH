import React from 'react';
import { useApp } from '../../context/AppContext';
import { Milestone, Cpu, ArrowRight, CheckCircle2, CircleDot, Clock } from 'lucide-react';
import { PillarId } from '../../types';

export const JourneyTracker: React.FC = () => {
  const {
    activeModule,
    setActiveModule,
    setIsRoadmapModalOpen,
    setIsIndicatorModalOpen,
  } = useApp();

  const pillars: {
    id: PillarId;
    targetModule: string;
    num: string;
    name: string;
    status: 'Done' | 'Active Now' | 'Next Stage';
    description: string;
    tags: string[];
    accentColor: string;
    borderColor: string;
    badgeBg: string;
  }[] = [
    {
      id: 'P1',
      targetModule: 'M01',
      num: 'P1',
      name: 'First-Step Apprenticeship',
      status: 'Active Now',
      description: 'Blended 4d work + 1d training unit, small-firm consortia, and cryptographic lottery.',
      tags: ['MagangHub', 'Lottery Selection', 'SME Consortia'],
      accentColor: 'text-amber-400',
      borderColor: 'border-amber-500/40 hover:border-amber-400',
      badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    },
    {
      id: 'P2',
      targetModule: 'M03',
      num: 'P2',
      name: 'Verified Skills Identity',
      status: 'Active Now',
      description: 'External industry assessor, digital certificates on SIAPkerja, and supervisor reference.',
      tags: ['BNSP Assessor', 'SIAPkerja QR', 'Work Reference'],
      accentColor: 'text-blue-400',
      borderColor: 'border-blue-500/40 hover:border-blue-400',
      badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    },
    {
      id: 'P3',
      targetModule: 'M05',
      num: 'P3',
      name: 'Traced Graduates & Review',
      status: 'Next Stage',
      description: 'Consent-based administrative data linkage (Months 6 & 12) triggering mandated QA review.',
      tags: ['Law 27/2022', 'BPJS Linkage', 'Mandatory Review'],
      accentColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/40 hover:border-emerald-400',
      badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    },
    {
      id: 'P4',
      targetModule: 'M07',
      num: 'P4',
      name: 'Referral & Case Assistance',
      status: 'Active Now',
      description: '12-Month BKK case manager contact cycle (M1, M3, M6, M12) and Disnaker public referrals.',
      tags: ['BKK Case Manager', 'Quarterly Contacts', 'Disnaker Handoff'],
      accentColor: 'text-purple-400',
      borderColor: 'border-purple-500/40 hover:border-purple-400',
      badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    },
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl backdrop-blur-md mb-6">
      {/* Top Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <h2 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
            Graduate Resilience Journey Tracker
          </h2>
          <span className="text-[11px] text-slate-500 font-sans hidden sm:inline">
            (P1 → P2 → P3 → P4 Synchronisation)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRoadmapModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium rounded-lg transition"
          >
            <Milestone className="w-3.5 h-3.5 text-blue-400" />
            <span>Roadmap Guide</span>
          </button>
          <button
            onClick={() => setIsIndicatorModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-xs font-medium rounded-lg transition"
          >
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            <span>Twelve-Month Indicator Engine</span>
          </button>
        </div>
      </div>

      {/* 4 Connected Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative">
        {pillars.map((pillar, idx) => {
          let StatusIcon = CircleDot;
          if (pillar.status === 'Done') StatusIcon = CheckCircle2;
          else if (pillar.status === 'Next Stage') StatusIcon = Clock;

          return (
            <div
              key={pillar.id}
              className={`p-3.5 rounded-xl border bg-slate-950/60 transition-all group flex flex-col justify-between ${pillar.borderColor}`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-white px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                      {pillar.num}
                    </span>
                    <span className="text-xs font-semibold text-slate-200 group-hover:text-white transition">
                      {pillar.name}
                    </span>
                  </div>
                  <span className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full border ${pillar.badgeBg}`}>
                    <StatusIcon className="w-3 h-3" />
                    {pillar.status}
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 line-clamp-2 mb-3 leading-relaxed">
                  {pillar.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {pillar.tags.map((t) => (
                    <span key={t} className="text-[9px] font-mono px-1.5 py-0.5 bg-slate-800/80 text-slate-300 rounded border border-slate-700/60">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setActiveModule(pillar.targetModule)}
                className={`flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] font-medium transition ${pillar.accentColor} hover:underline`}
              >
                <span>Open Pillar Console</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
