import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ModuleHeader } from '../../components/common/ModuleHeader';
import {
  Lock,
  ShieldCheck,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Database,
  Search,
  Info,
  Scale
} from 'lucide-react';

export const M05ConsentTracerLinkage: React.FC = () => {
  const { graduates, toggleGraduateConsent } = useApp();
  const [filterConsent, setFilterConsent] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const operatingGuideSteps = [
    {
      title: 'Explicit Consent Collection',
      detail: 'Graduates provide affirmative, opt-in consent before graduation under Indonesia’s Personal Data Protection Law (Law No. 27/2022).',
    },
    {
      title: 'The Non-Coercion Guarantee',
      detail: 'Refusing administrative data linkage NEVER jeopardizes or withdraws a graduate from MagangHub apprenticeships or BKK support.',
    },
    {
      title: 'Tripartite Linkage at Months 6 & 12',
      detail: 'With consent, self-reported tracer records are cross-referenced against SIAPkerja employment status and BPJS Ketenagakerjaan contribution logs.',
    },
    {
      title: 'Anonymized Policy Publication',
      detail: 'Individual employment and wage data remain strictly confidential; only aggregate programme-level statistics are published.',
    },
  ];

  const filteredGraduates = graduates.filter((g) => {
    if (filterConsent !== 'All' && g.consentStatus !== filterConsent) return false;
    if (
      searchQuery &&
      !g.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !g.nisn.includes(searchQuery) &&
      !g.schoolName.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      <ModuleHeader
        moduleCode="M05"
        moduleTitle="PDP Consent & Tripartite Tracer Linkage"
        pillarBadge="P3: Traced Graduates"
        badgeColorClass="border-emerald-500/40 text-emerald-400 bg-emerald-500/10"
        bridgeSentence="Administrative data linkage bridges educational surveys with real social security records while upholding strict statutory privacy protections."
        operatingGuideSteps={operatingGuideSteps}
      />

      {/* Statutory Protection Banner */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 shrink-0 mt-0.5">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Statutory Non-Coercion Rule
              </span>
              <span className="px-2 py-0.2 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                Law No. 27/2022
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-white mt-1">
              Consent Refusal Never Blocks Apprenticeship or BKK Case Assistance
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              If a graduate exercises their legal right to decline administrative data matching, their placement in MagangHub and access to BKK case management continues without penalty. Only anonymized school cohort counts omit their record.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-slate-400 bg-slate-950/80 px-3 py-2 rounded-xl border border-slate-800 shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>PDP Compliant</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search graduate or NISN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">Consent:</span>
            <select
              value={filterConsent}
              onChange={(e) => setFilterConsent(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Granted">Granted</option>
              <option value="Pending">Pending</option>
              <option value="Refused">Refused</option>
            </select>
          </div>
        </div>

        <div className="text-xs font-mono text-slate-400">
          Showing {filteredGraduates.length} graduates
        </div>
      </div>

      {/* Graduates Consent and Linkages Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/70 text-slate-400 font-mono">
                <th className="p-3.5 font-medium">GRADUATE & SCHOOL</th>
                <th className="p-3.5 font-medium">PROGRAMME</th>
                <th className="p-3.5 font-medium text-center">CONSENT (LAW 27/2022)</th>
                <th className="p-3.5 font-medium">MONTH 6 LINKAGE FEEDS</th>
                <th className="p-3.5 font-medium">MONTH 12 LINKAGE FEEDS</th>
                <th className="p-3.5 font-medium text-right">CONSENT ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredGraduates.map((grad) => {
                const isGranted = grad.consentStatus === 'Granted';
                const isRefused = grad.consentStatus === 'Refused';

                return (
                  <tr key={grad.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-3.5">
                      <div className="font-semibold text-white">{grad.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        NISN {grad.nisn} · {grad.schoolName}
                      </div>
                    </td>

                    <td className="p-3.5">
                      <div className="text-slate-300">{grad.programme}</div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        Class of May 2026
                      </div>
                    </td>

                    <td className="p-3.5 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${
                          isGranted
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                            : isRefused
                            ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                            : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                        }`}
                      >
                        {isGranted && <CheckCircle className="w-3 h-3" />}
                        {isRefused && <XCircle className="w-3 h-3" />}
                        {!isGranted && !isRefused && <Clock className="w-3 h-3" />}
                        {grad.consentStatus}
                      </span>
                      {grad.consentRecordedAt && (
                        <div className="text-[9px] font-mono text-slate-400 mt-0.5">
                          {grad.consentRecordedAt}
                        </div>
                      )}
                    </td>

                    {/* Month 6 Feeds */}
                    <td className="p-3.5">
                      <div className="flex items-center gap-1.5 font-mono text-[10px]">
                        <span
                          className={`px-1.5 py-0.5 rounded border ${
                            grad.linkageMonth6.tracerStudy
                              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                              : 'bg-slate-800/80 border-slate-700 text-slate-400'
                          }`}
                        >
                          Tracer {grad.linkageMonth6.tracerStudy ? '✓' : '—'}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded border ${
                            grad.linkageMonth6.siapKerja
                              ? 'bg-blue-500/15 border-blue-500/30 text-blue-300'
                              : 'bg-slate-800/80 border-slate-700 text-slate-400'
                          }`}
                        >
                          SIAPkerja {grad.linkageMonth6.siapKerja ? '✓' : '—'}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded border ${
                            grad.linkageMonth6.socialSecurityBPJS
                              ? 'bg-purple-500/15 border-purple-500/30 text-purple-300'
                              : 'bg-slate-800/80 border-slate-700 text-slate-400'
                          }`}
                        >
                          BPJS {grad.linkageMonth6.socialSecurityBPJS ? '✓' : '—'}
                        </span>
                      </div>
                    </td>

                    {/* Month 12 Feeds */}
                    <td className="p-3.5">
                      <div className="flex items-center gap-1.5 font-mono text-[10px]">
                        <span
                          className={`px-1.5 py-0.5 rounded border ${
                            grad.linkageMonth12.tracerStudy
                              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                              : 'bg-slate-800/80 border-slate-700 text-slate-400'
                          }`}
                        >
                          Tracer {grad.linkageMonth12.tracerStudy ? '✓' : '—'}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded border ${
                            grad.linkageMonth12.siapKerja
                              ? 'bg-blue-500/15 border-blue-500/30 text-blue-300'
                              : 'bg-slate-800/80 border-slate-700 text-slate-400'
                          }`}
                        >
                          SIAPkerja {grad.linkageMonth12.siapKerja ? '✓' : '—'}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded border ${
                            grad.linkageMonth12.socialSecurityBPJS
                              ? 'bg-purple-500/15 border-purple-500/30 text-purple-300'
                              : 'bg-slate-800/80 border-slate-700 text-slate-400'
                          }`}
                        >
                          BPJS {grad.linkageMonth12.socialSecurityBPJS ? '✓' : '—'}
                        </span>
                      </div>
                    </td>

                    {/* Action buttons */}
                    <td className="p-3.5 text-right space-x-1.5">
                      {!isGranted && (
                        <button
                          onClick={() => toggleGraduateConsent(grad.id, 'Granted')}
                          className="px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-[11px] transition"
                        >
                          Grant Consent
                        </button>
                      )}
                      {!isRefused && (
                        <button
                          onClick={() => toggleGraduateConsent(grad.id, 'Refused')}
                          className="px-2 py-1 rounded bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-rose-200 border border-slate-700 text-[11px] transition"
                        >
                          Refuse
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
