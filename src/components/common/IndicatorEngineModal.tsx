import React from 'react';
import { useApp } from '../../context/AppContext';
import { Cpu, Database, CheckCircle, Network, Layers, X, ShieldAlert, Award } from 'lucide-react';

export const IndicatorEngineModal: React.FC = () => {
  const { isIndicatorModalOpen, setIsIndicatorModalOpen } = useApp();

  if (!isIndicatorModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-indigo-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">The Twelve-Month Indicator Engine</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                How MITRA transforms four fragmented Indonesian systems into a single authoritative transition metric.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsIndicatorModalOpen(false)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Close indicator modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6 text-slate-300 text-xs leading-relaxed">
          {/* Key Principle */}
          <div className="p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/5 text-slate-200">
            <h3 className="text-sm font-semibold text-indigo-300 mb-1 flex items-center gap-2">
              <Layers className="w-4 h-4" /> Core Structural Proposition
            </h3>
            <p>
              MITRA introduces no parallel programmes or bureaucratic agency. Instead, it defines an integration layer that aligns four existing national mechanisms—<strong>MagangHub</strong>, <strong>BNSP/SIAPkerja</strong>, <strong>Kemendikdasmen Tracer Study</strong>, and <strong>School Placement Units (BKK)</strong>—to optimize for one shared, verifiable outcome: <strong>formal employment status at 12 months post-graduation</strong>.
            </p>
          </div>

          {/* 4 Connected Data Streams */}
          <div>
            <h4 className="text-xs font-mono font-bold text-slate-400 tracking-wider uppercase mb-3">
              The Four Input Feeds
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="p-3.5 rounded-xl border border-amber-500/20 bg-slate-950/50">
                <div className="flex items-center gap-2 text-amber-400 font-semibold mb-1">
                  <Database className="w-4 h-4" /> MagangHub Integration
                </div>
                <p className="text-slate-400 text-[11px]">
                  Streams 6-month blended apprenticeship completion records, host enterprise attendance logs, and SME consortium shared training unit hours.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-blue-500/20 bg-slate-950/50">
                <div className="flex items-center gap-2 text-blue-400 font-semibold mb-1">
                  <Award className="w-4 h-4" /> BNSP & SIAPkerja Registry
                </div>
                <p className="text-slate-400 text-[11px]">
                  Validates external industry assessor scores, issues cryptographic QR certificates, and logs supervisor performance ratings without paper intermediaries.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-slate-950/50">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-1">
                  <Network className="w-4 h-4" /> Tracer Study + Social Security (BPJS)
                </div>
                <p className="text-slate-400 text-[11px]">
                  With student consent under Law 27/2022, merges self-reported graduate surveys with real monthly social security contributions to verify formal job placement at Months 6 & 12.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-purple-500/20 bg-slate-950/50">
                <div className="flex items-center gap-2 text-purple-400 font-semibold mb-1">
                  <CheckCircle className="w-4 h-4" /> BKK Case Management Feeds
                </div>
                <p className="text-slate-400 text-[11px]">
                  Supplies real-time graduate contact checkpoints at Months 1, 3, 6, and 12, triggering automated referrals to local manpower offices (Disnaker) for non-placed youth.
                </p>
              </div>
            </div>
          </div>

          {/* Indicator Equation & Governance Action */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-300 uppercase">
              Authoritative Computation & Trigger Mechanism
            </h4>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] text-emerald-300">
              Indicator_12M = (Verified_Formal_Employed + Enrolled_Polytechnic) / Total_Graduates_Consenting
            </div>
            <div className="flex items-start gap-2.5 text-[11px] text-slate-400">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Mandatory Review Rule:</strong> If a specific vocational programme falls below 50% formal employment across consecutive cohort cycles, the Provincial Education Office is legally triggered to initiate a curriculum modernization and seat quota review.
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/70 flex justify-end">
          <button
            onClick={() => setIsIndicatorModalOpen(false)}
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-lg transition"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
