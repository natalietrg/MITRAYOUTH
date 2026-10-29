import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ModuleHeader } from '../../components/common/ModuleHeader';
import { ProgrammeOutcome } from '../../types';
import {
  TrendingUp,
  AlertTriangle,
  Building2,
  FileSpreadsheet,
  CheckCircle,
  Clock,
  Filter,
  BarChart2,
  ExternalLink,
  ShieldAlert,
  X
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from 'recharts';

export const M06ProgrammeOutcomes: React.FC = () => {
  const { programmeOutcomes, openProgrammeReview, currentRole } = useApp();

  const [selectedProvince, setSelectedProvince] = useState<string>('All');
  const [reviewModalTarget, setReviewModalTarget] = useState<ProgrammeOutcome | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');

  const operatingGuideSteps = [
    {
      title: 'Twelve-Month Administrative Census',
      detail: 'At Month 12, tracer study data merged with SIAPkerja and BPJS records computes the formal employment rate for every school programme.',
    },
    {
      title: 'Statutory 50% Threshold Check',
      detail: 'Programmes where formal employment falls below 50% are automatically flagged as "Persistently Weak" in the provincial quality register.',
    },
    {
      title: 'Mandated Provincial QA Review',
      detail: 'The Provincial Education Office is legally mandated to open an investigation to determine root causes (outdated curriculum, lack of local industrial base, or equipment gaps).',
    },
    {
      title: 'Corrective Action Plan Protocol',
      detail: 'The school must submit an audited reform plan within 60 days (e.g. revamping curriculum, signing SME consortia agreements, or reallocating student intake).',
    },
  ];

  const filteredOutcomes = programmeOutcomes.filter((item) => {
    if (selectedProvince !== 'All' && item.province !== selectedProvince) return false;
    return true;
  });

  const chartData = filteredOutcomes.map((item) => ({
    name: `${item.schoolName.replace('SMKN ', '').replace('SMK ', '')} - ${item.programme.substring(0, 15)}...`,
    fullName: `${item.schoolName} (${item.programme})`,
    employmentRate: item.employmentRate12M,
    formalShare: item.formalJobShare,
    neetShare: item.neetShare,
    persistentlyWeak: item.persistentlyWeak,
  }));

  const handleConfirmOpenReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewModalTarget) return;

    openProgrammeReview(reviewModalTarget.id, reviewNotes || 'Provincial QA review initiated due to sub-50% 12-month formal transition rate.');
    setReviewModalTarget(null);
    setReviewNotes('');
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <ModuleHeader
        moduleCode="M06"
        moduleTitle="Programme Outcome Dashboard & Mandated Reviews"
        pillarBadge="P3: Traced Graduates"
        badgeColorClass="border-emerald-500/40 text-emerald-400 bg-emerald-500/10"
        bridgeSentence="Transparent, verified twelve-month employment outcomes empower provincial authorities to intervene proactively when vocational tracks underperform."
        operatingGuideSteps={operatingGuideSteps}
      />

      {/* Top Banner Alert on Persistently Weak Programs */}
      <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400 shrink-0 mt-0.5">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              Statutory Intervention Trigger
            </div>
            <h2 className="text-sm sm:text-base font-bold text-white mt-0.5">
              Provincial Education Office Mandated Review Trigger (<span className="text-amber-400">{'< 50%'}</span> Formal Placement)
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Under MITRA Pillar 3 governance, vocational tracks with verified 12-month formal placement under 50% are prohibited from passive continuation. Provincial authorities must open formal quality reviews.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-2 rounded-xl border border-slate-800 text-xs font-mono shrink-0">
          <span className="text-amber-400 font-bold">2 Programmes Flagged</span>
        </div>
      </div>

      {/* Bar Chart Visualization */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Comparative Analysis
            </div>
            <h3 className="text-base font-bold text-white mt-0.5">
              Twelve-Month Employment Rate by School & Track (%)
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">Filter Region:</span>
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none"
            >
              <option value="All">All 3 Pilot Provinces</option>
              <option value="Jawa Barat">Jawa Barat</option>
              <option value="Jawa Tengah">Jawa Tengah</option>
              <option value="Jawa Timur">Jawa Timur</option>
            </select>
          </div>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                dataKey="name"
                stroke="#64748b"
                tick={{ fontSize: 10, fill: '#94a3b8' }}
                interval={0}
                angle={-25}
                textAnchor="end"
              />
              <YAxis
                stroke="#64748b"
                tick={{ fontSize: 10, fill: '#94a3b8' }}
                domain={[0, 100]}
                unit="%"
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-950 border border-slate-700 p-3 rounded-xl shadow-xl text-xs space-y-1">
                        <div className="font-bold text-white">{data.fullName}</div>
                        <div className="text-emerald-400 font-mono">
                          12M Employment: {data.employmentRate}%
                        </div>
                        <div className="text-blue-400 font-mono">
                          Formal Sector Share: {data.formalShare}%
                        </div>
                        <div className="text-rose-400 font-mono">
                          NEET Rate: {data.neetShare}%
                        </div>
                        {data.persistentlyWeak && (
                          <div className="text-amber-400 text-[10px] font-mono mt-1 font-bold">
                            ⚠️ PERSISTENTLY WEAK — REVIEW TRIGGERED
                          </div>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <ReferenceLine y={50} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: 'Mandated 50% Floor', fill: '#f59e0b', fontSize: 10, position: 'top' }} />
              <Bar dataKey="employmentRate" fill="#3b82f6" radius={[4, 4, 0, 0]} name="12M Employment %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Outcomes Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div>
            <div className="text-xs font-mono font-bold text-slate-400 uppercase">
              School x Programme Register
            </div>
            <div className="text-sm font-bold text-white">
              Cohort 12-Month Administrative Trace Results
            </div>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {filteredOutcomes.length} Tracks Monitored
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/40 text-slate-400 font-mono">
                <th className="p-3.5 font-medium">SCHOOL & PROVINCE</th>
                <th className="p-3.5 font-medium">PROGRAMME TRACK</th>
                <th className="p-3.5 font-medium text-center">TRACKED</th>
                <th className="p-3.5 font-medium text-center">12M EMPLOYED</th>
                <th className="p-3.5 font-medium text-center">FORMAL SHARE</th>
                <th className="p-3.5 font-medium text-center">NEET %</th>
                <th className="p-3.5 font-medium">STATUS</th>
                <th className="p-3.5 font-medium text-right">MANDATED ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredOutcomes.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-3.5">
                    <div className="font-semibold text-white">{item.schoolName}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{item.province}</div>
                  </td>

                  <td className="p-3.5 font-medium text-slate-200">
                    {item.programme}
                  </td>

                  <td className="p-3.5 text-center font-mono text-slate-300">
                    {item.graduatesTracked}
                  </td>

                  <td className="p-3.5 text-center font-mono font-bold">
                    <span className={item.employmentRate12M < 50 ? 'text-amber-400' : 'text-emerald-400'}>
                      {item.employmentRate12M}%
                    </span>
                  </td>

                  <td className="p-3.5 text-center font-mono text-slate-300">
                    {item.formalJobShare}%
                  </td>

                  <td className="p-3.5 text-center font-mono">
                    <span className={item.neetShare > 30 ? 'text-rose-400 font-semibold' : 'text-slate-400'}>
                      {item.neetShare}%
                    </span>
                  </td>

                  <td className="p-3.5">
                    {item.persistentlyWeak ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/15 border border-amber-500/30 text-amber-300">
                        <AlertTriangle className="w-3 h-3" /> Review Required
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                        <CheckCircle className="w-3 h-3" /> Performing
                      </span>
                    )}
                  </td>

                  <td className="p-3.5 text-right">
                    {item.persistentlyWeak ? (
                      item.reviewStatus === 'Review Required' ? (
                        <button
                          onClick={() => {
                            setReviewModalTarget(item);
                            setReviewNotes(`12-Month employment rate (${item.employmentRate12M}%) and NEET share (${item.neetShare}%) require curriculum realignment and seat intake reduction.`);
                          }}
                          className="px-2.5 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold shadow transition"
                        >
                          Open Review Case
                        </button>
                      ) : (
                        <span className="px-2 py-1 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                          {item.reviewStatus}
                        </span>
                      )
                    ) : (
                      <span className="text-[11px] font-mono text-slate-500">
                        No Action Required
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Case Initiation Modal */}
      {reviewModalTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg overflow-hidden flex flex-col shadow-2xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-sm">
                  Open Mandated Programme Review Case
                </h3>
              </div>
              <button
                onClick={() => setReviewModalTarget(null)}
                className="text-slate-400 hover:text-white p-1"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmOpenReview} className="p-5 space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="font-bold text-white text-sm">{reviewModalTarget.schoolName}</div>
                <div className="text-slate-400 font-mono">
                  Track: <strong className="text-slate-200">{reviewModalTarget.programme}</strong> ({reviewModalTarget.province})
                </div>
                <div className="text-amber-400 font-mono font-bold mt-1">
                  Verified 12M Formal Placement: {reviewModalTarget.employmentRate12M}% (Threshold: 50.0%)
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Provincial QA Directives & Instructions to School
                </label>
                <textarea
                  rows={4}
                  required
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500 text-xs"
                />
              </div>

              <div className="text-[11px] text-slate-400">
                Opening this case triggers an approval queue item for the Provincial Quality Assurance Committee and sets a 60-day corrective action deadline.
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setReviewModalTarget(null)}
                  className="px-4 py-1.5 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-lg shadow"
                >
                  Confirm Mandated Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
