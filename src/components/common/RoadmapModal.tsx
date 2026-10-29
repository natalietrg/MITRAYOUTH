import React from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, CheckCircle2, ArrowRight, Milestone, X } from 'lucide-react';

export const RoadmapModal: React.FC = () => {
  const { isRoadmapModalOpen, setIsRoadmapModalOpen } = useApp();

  if (!isRoadmapModalOpen) return null;

  const phases = [
    {
      phase: 'Phase 01',
      title: 'Pre-Graduation Planning & Assessment (Months -2 to 0)',
      timeframe: 'March – May 2026',
      status: 'Completed',
      badgeClass: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
      bullets: [
        'School placement unit (BKK) profiles each graduating student and drafts an Individual Transition Plan.',
        'External industry assessors (BNSP certified) co-conduct final vocational competency evaluations.',
        'Explicit data consent collected under Indonesia Law No. 27/2022 for Month 6 and 12 administrative tracking.',
        'Initial skills certificates verified and registered into SIAPkerja repository.',
      ],
    },
    {
      phase: 'Phase 02',
      title: 'First-Step Blended Apprenticeship (Months 1 to 6)',
      timeframe: 'June – November 2026',
      status: 'Active Now',
      badgeClass: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
      bullets: [
        'MagangHub opened to SMK graduates within 12 months of diploma issuance.',
        'Enforce blended placement ratio: 4 days at host firm + 1 day at an SMK, BLK, or polytechnic.',
        'SME Consortia active: micro/small enterprises pool apprentice cohorts with shared public training centres.',
        'Cryptographic lottery selection executed when candidate applications exceed placement quotas.',
        'Random sampling audits and mentor ratio checks to mitigate cheap-labour displacement.',
      ],
    },
    {
      phase: 'Phase 03',
      title: 'Skills Referencing & Midterm Tracer Linkage (Months 6 to 9)',
      timeframe: 'December 2026 – February 2027',
      status: 'Next Stage',
      badgeClass: 'bg-blue-500/15 border-blue-500/30 text-blue-400',
      bullets: [
        'Host enterprise supervisors submit structured references (punctuality, technical skill, re-hire intent).',
        'Reference appended to graduate’s tamper-evident SIAPkerja digital credentials.',
        'Month 6 tracer census merged with SIAPkerja and BPJS Ketenagakerjaan social security wage records.',
        'BKK case managers complete Month 6 structured wellness and employment check-ins.',
      ],
    },
    {
      phase: 'Phase 04',
      title: 'Twelve-Month Indicator Evaluation & Mandated Review (Months 10 to 12)',
      timeframe: 'March – May 2027',
      status: 'Scheduled',
      badgeClass: 'bg-purple-500/15 border-purple-500/30 text-purple-400',
      bullets: [
        'Final 12-month employment indicator calculated across all pilot school and programme cohorts.',
        'Unplaced graduates automatically referred to local manpower offices (Disnaker) for targeted assistance.',
        'Provincial Education Offices mandate curriculum overhaul or quota adjustments for programmes below threshold (<50%).',
        'Impact evaluation lab synthesises lottery and CV audit evidence for national scale-up.',
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-400">
              <Milestone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">MITRA 12-Month Implementation Roadmap</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Staged progression synchronising vocational high school cohorts through the 4 MITRA pillars.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsRoadmapModalOpen(false)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Close roadmap modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {phases.map((p, idx) => (
              <div
                key={p.phase}
                className="p-5 rounded-xl border border-slate-800 bg-slate-950/50 hover:border-slate-700 transition"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-slate-400">{p.phase}</span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-mono border ${p.badgeClass}`}>
                      {p.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    <span>{p.timeframe}</span>
                  </div>
                </div>

                <h3 className="text-sm font-semibold text-white mb-2">{p.title}</h3>

                <ul className="space-y-1.5 text-xs text-slate-300">
                  {p.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-950/70 flex justify-end">
          <button
            onClick={() => setIsRoadmapModalOpen(false)}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs rounded-lg transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
