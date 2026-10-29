import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ModuleHeader } from '../../components/common/ModuleHeader';
import {
  FlaskConical,
  Dice5,
  FileCheck2,
  GitBranch,
  Play,
  RotateCcw,
  Sparkles,
  Info,
  TrendingUp,
  Award,
  AlertTriangle
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export const M10ImpactEvaluationLab: React.FC = () => {
  const { showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'T1' | 'T2' | 'T3'>('T1');

  // T1 Simulator State: Oversubscribed Lottery
  const [lotterySampleSize, setLotterySampleSize] = useState(250);
  const [t1Simulated, setT1Simulated] = useState({
    treatmentRate: 74.5,
    controlRate: 46.2,
    lift: 28.3,
    pValue: 0.002,
  });

  // T2 Simulator State: CV Audit with vs without Verification Link
  const [cvApplicationsSent, setCvApplicationsSent] = useState(600);
  const [t2Simulated, setT2Simulated] = useState({
    verifiedCallback: 26.8,
    unverifiedCallback: 11.4,
    multiplier: '2.35x',
  });

  // T3 Simulator State: Staggered BKK Rollout
  const [staggerCohort, setStaggerCohort] = useState('All 7 Pilot Schools');

  const operatingGuideSteps = [
    {
      title: 'T1: Lottery Natural Experiment',
      detail: 'Exploits oversubscribed MagangHub placements as randomized trials. Because applicants are accepted via cryptographic lottery, winners vs non-winners form clean counterfactuals.',
    },
    {
      title: 'T2: Resume Correspondence Audit',
      detail: 'Sends paired identical fictitious graduate CVs to job portals, alternating only whether a verifiable SIAPkerja link & QR is included.',
    },
    {
      title: 'T3: Stepped-Wedge School Rollout',
      detail: 'Staggers BKK case management adoption across vocational schools in random waves to control for macroeconomic business-cycle confounders.',
    },
    {
      title: 'Simulated Evidence Only',
      detail: 'All values produced by this lab are simulated projections intended for evaluation design demonstration, not empirically verified pilot results.',
    },
  ];

  const runT1Simulation = () => {
    // Add random slight variation to simulate monte carlo draw
    const noise = (Math.random() - 0.5) * 4;
    const treat = parseFloat((74.5 + noise).toFixed(1));
    const ctrl = parseFloat((46.2 + noise * 0.5).toFixed(1));
    setT1Simulated({
      treatmentRate: treat,
      controlRate: ctrl,
      lift: parseFloat((treat - ctrl).toFixed(1)),
      pValue: 0.002,
    });
    showToast('T1 Randomized Lottery trial simulated across 250 applicant pairs.', 'success');
  };

  const runT2Simulation = () => {
    const noise = (Math.random() - 0.5) * 3;
    const ver = parseFloat((26.8 + noise).toFixed(1));
    const unver = parseFloat((11.4 + noise * 0.4).toFixed(1));
    setT2Simulated({
      verifiedCallback: ver,
      unverifiedCallback: unver,
      multiplier: `${(ver / unver).toFixed(2)}x`,
    });
    showToast('T2 CV Audit simulation rerun with 600 randomized job applications.', 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <ModuleHeader
        moduleCode="M10"
        moduleTitle="Impact Evaluation Lab: Quasi-Experimental Engine"
        pillarBadge="Governance & Shared Indicator Engine"
        badgeColorClass="border-indigo-500/40 text-indigo-300 bg-indigo-500/10"
        bridgeSentence="Using built-in lottery selection, verifiable digital links, and staggered rollouts to measure true causal impact without expensive retrospective surveys."
        operatingGuideSteps={operatingGuideSteps}
      />

      {/* Prominent Simulated Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/50 flex items-center justify-between text-xs text-amber-300">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="font-medium">
            <strong>Evaluation Warning:</strong> Simulated data, not an estimate of real impact. These simulators illustrate how MITRA embeds econometric evaluation into everyday administration.
          </span>
        </div>
        <span className="font-mono text-[10px] bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
          METHODOLOGY LAB
        </span>
      </div>

      {/* Test Tabs */}
      <div className="flex rounded-xl bg-slate-900 border border-slate-800 p-1 text-xs font-mono">
        <button
          onClick={() => setActiveTab('T1')}
          className={`flex-1 py-2 px-3 rounded-lg transition flex items-center justify-center gap-2 ${
            activeTab === 'T1'
              ? 'bg-blue-600 text-white font-bold shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Dice5 className="w-4 h-4" />
          <span>(T1) Oversubscription Lottery Trial</span>
        </button>

        <button
          onClick={() => setActiveTab('T2')}
          className={`flex-1 py-2 px-3 rounded-lg transition flex items-center justify-center gap-2 ${
            activeTab === 'T2'
              ? 'bg-blue-600 text-white font-bold shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>(T2) Resume (CV) Verification Audit</span>
        </button>

        <button
          onClick={() => setActiveTab('T3')}
          className={`flex-1 py-2 px-3 rounded-lg transition flex items-center justify-center gap-2 ${
            activeTab === 'T3'
              ? 'bg-blue-600 text-white font-bold shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <GitBranch className="w-4 h-4" />
          <span>(T3) Staggered BKK Rollout</span>
        </button>
      </div>

      {/* Tab 1: Oversubscription Lottery */}
      {activeTab === 'T1' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Control Panel */}
            <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <div className="text-xs font-mono font-bold text-blue-400 uppercase">
                  Experiment Design
                </div>
                <h3 className="text-base font-bold text-white mt-0.5">
                  T1: Randomized Placement Lottery
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Because oversubscribed placements assign seats via seed-based lotteries, non-selected applicants constitute a statistically identical control group.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Simulated Applicant Sample Pool
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    step="50"
                    value={lotterySampleSize}
                    onChange={(e) => setLotterySampleSize(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1">
                    <span>100 applicants</span>
                    <span className="text-blue-400 font-bold">{lotterySampleSize} pairs</span>
                    <span>1,000 applicants</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-slate-300">
                  <div className="font-semibold text-white">Identification Strategy:</div>
                  <div>• Treatment: Selected via MagangHub lottery for 6-month blended placement.</div>
                  <div>• Control: Qualified applicants who lost the lottery.</div>
                  <div>• Outcome: Verified formal employment at Month 12.</div>
                </div>

                <button
                  onClick={runT1Simulation}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
                >
                  <Play className="w-4 h-4" />
                  <span>Run Monte Carlo Trial Simulation</span>
                </button>
              </div>
            </div>

            {/* Results Display */}
            <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <div>
                    <div className="text-xs font-mono font-bold text-emerald-400 uppercase">
                      Simulated Causal Estimates
                    </div>
                    <h3 className="text-base font-bold text-white mt-0.5">
                      12-Month Formal Employment: Treatment vs Control
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                    p &lt; {t1Simulated.pValue}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center mb-6">
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                    <div className="text-[10px] text-slate-400">Lottery Winners (P1)</div>
                    <div className="font-mono font-bold text-2xl text-emerald-400 mt-1">
                      {t1Simulated.treatmentRate}%
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                    <div className="text-[10px] text-slate-400">Lottery Non-Winners</div>
                    <div className="font-mono font-bold text-2xl text-slate-400 mt-1">
                      {t1Simulated.controlRate}%
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/40">
                    <div className="text-[10px] text-indigo-300">Estimated Causal Lift</div>
                    <div className="font-mono font-bold text-2xl text-indigo-400 mt-1">
                      +{t1Simulated.lift}%
                    </div>
                  </div>
                </div>

                {/* Bar chart comparison */}
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { group: 'Lottery Winners (Treatment)', rate: t1Simulated.treatmentRate, fill: '#10b981' },
                        { group: 'Non-Selected (Control)', rate: t1Simulated.controlRate, fill: '#64748b' },
                      ]}
                      margin={{ top: 10, right: 20, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="group" stroke="#64748b" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                      <YAxis stroke="#64748b" tick={{ fontSize: 11, fill: '#94a3b8' }} unit="%" domain={[0, 100]} />
                      <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                      <Bar dataKey="rate" radius={[4, 4, 0, 0]} name="Formal Employment Rate %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 font-mono text-center pt-2 border-t border-slate-800">
                Simulated data for presentation purposes only. Real causal effects depend on local labour market conditions.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Resume Audit */}
      {activeTab === 'T2' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <div className="text-xs font-mono font-bold text-blue-400 uppercase">
                  Experiment Design
                </div>
                <h3 className="text-base font-bold text-white mt-0.5">
                  T2: Resume Correspondence Audit
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Tests whether Indonesian employers value verified skills credentials by submitting identical fictitious resumes with and without a SIAPkerja verification link.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Simulated Submissions Volume
                  </label>
                  <input
                    type="range"
                    min="200"
                    max="1200"
                    step="100"
                    value={cvApplicationsSent}
                    onChange={(e) => setCvApplicationsSent(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1">
                    <span>200 CVs</span>
                    <span className="text-blue-400 font-bold">{cvApplicationsSent} applications</span>
                    <span>1,200 CVs</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-slate-300">
                  <div className="font-semibold text-white">Audit Protocol:</div>
                  <div>• CV A: Standard vocational high school diploma without external proof.</div>
                  <div>• CV B: Identical grades + BNSP assessor QR code & SIAPkerja live link.</div>
                  <div>• Metric: Employer interview callback / inquiry rate.</div>
                </div>

                <button
                  onClick={runT2Simulation}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
                >
                  <Play className="w-4 h-4" />
                  <span>Run Audit Simulation</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <div>
                    <div className="text-xs font-mono font-bold text-blue-400 uppercase">
                      Audit Callback Multiplier
                    </div>
                    <h3 className="text-base font-bold text-white mt-0.5">
                      Interview Callback Rates by Credential Trust
                    </h3>
                  </div>
                  <span className="font-mono text-base font-extrabold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-xl border border-blue-500/30">
                    {t2Simulated.multiplier} Callback Ratio
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center mb-6">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                    <div className="text-xs text-slate-400">Unverified School Diploma</div>
                    <div className="font-mono font-bold text-3xl text-slate-400 mt-1">
                      {t2Simulated.unverifiedCallback}%
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">Skeptical employer triage</div>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/40">
                    <div className="text-xs text-blue-300">SIAPkerja Verified QR (P2)</div>
                    <div className="font-mono font-bold text-3xl text-blue-400 mt-1">
                      {t2Simulated.verifiedCallback}%
                    </div>
                    <div className="text-[10px] text-blue-300 mt-1">Verified industry assessor seal</div>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 font-mono text-center pt-2 border-t border-slate-800">
                Simulated data for presentation purposes only.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Staggered Rollout */}
      {activeTab === 'T3' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="border-b border-slate-800 pb-3">
            <div className="text-xs font-mono font-bold text-purple-400 uppercase">
              Econometric Identification
            </div>
            <h3 className="text-base font-bold text-white mt-0.5">
              T3: Stepped-Wedge School-by-School Rollout
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Rolls out BKK 12-month case management in 3 staggered cohorts to distinguish program impact from macroeconomic shocks in West, Central, and East Java.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="font-mono font-bold text-purple-400">WAVE 1 (Q2 2026)</div>
              <div className="text-white font-semibold">SMKN 1 Cimahi & SMKN 7 Semarang</div>
              <p className="text-slate-400">BKK case management activated Month 1 post-graduation.</p>
              <div className="font-mono text-emerald-400 font-bold">12M Formal: 77.8%</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="font-mono font-bold text-blue-400">WAVE 2 (Q3 2026)</div>
              <div className="text-white font-semibold">SMKN 2 Bandung & SMKN 1 Surabaya</div>
              <p className="text-slate-400">Activated Month 3; serves as control for Wave 1 during initial quarter.</p>
              <div className="font-mono text-emerald-400 font-bold">12M Formal: 68.4%</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="font-mono font-bold text-indigo-400">WAVE 3 (Q4 2026)</div>
              <div className="text-white font-semibold">SMK Mitra Industri MM2100 & SMKN 5 Surabaya</div>
              <p className="text-slate-400">Activated Month 6, allowing difference-in-differences econometric analysis.</p>
              <div className="font-mono text-emerald-400 font-bold">12M Formal: 64.9%</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
