import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ModuleHeader } from '../../components/common/ModuleHeader';
import {
  Layers,
  TrendingUp,
  Award,
  Users,
  CheckCircle,
  FileCheck,
  ShieldCheck,
  Filter,
  BarChart3,
  PieChart as PieIcon,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

export const M09MonitoringEvaluation: React.FC = () => {
  const { graduates, programmeOutcomes, certificates, placements } = useApp();
  const [selectedProvince, setSelectedProvince] = useState<string>('All');
  const [selectedCohortCycle, setSelectedCohortCycle] = useState<string>('Cohort 2026 (Pilot Year 1)');

  const operatingGuideSteps = [
    {
      title: 'Shared 12-Month Single Indicator',
      detail: 'Eliminates multiple conflicting departmental definitions of vocational success by concentrating all four systems on formal employment at Month 12.',
    },
    {
      title: 'No Arbitrary Pre-Set Targets',
      detail: 'Consistent with empirical governance principles, quantitative targets are deliberately NOT pre-set. Targets will be established after Year 1 baseline data collection.',
    },
    {
      title: 'Pillar Progression Rate Tracking',
      detail: 'Monitors the funnel from P1 apprenticeship completion to P2 certificate verification, P3 consent linkage, and P4 BKK contact completion.',
    },
    {
      title: 'Disaggregated Regional Insights',
      detail: 'Filter by pilot province (Jawa Barat, Jawa Tengah, Jawa Timur) to assess industrial absorption discrepancies.',
    },
  ];

  // Calculations
  const totalGrads = graduates.length;
  const consentingGrads = graduates.filter((g) => g.consentStatus === 'Granted').length;
  const consentRate = Math.round((consentingGrads / totalGrads) * 100);

  const verifiedCertsCount = certificates.length;
  const certVerificationRate = 88.4; // %
  const contactCompletionRate = 82.1; // %
  const formalJobShare = 68.4; // %

  // Shared 12-Month Indicator
  const shared12MEmploymentRate = 67.8; // %

  // Monthly trend data for recharts
  const monthlyFunnelData = [
    { month: 'May 2026', graduations: 100, p1Active: 88, certVerified: 92, formalEmployed: 22 },
    { month: 'Jun 2026', graduations: 100, p1Active: 82, certVerified: 92, formalEmployed: 31 },
    { month: 'Jul 2026', graduations: 100, p1Active: 79, certVerified: 94, formalEmployed: 42 },
    { month: 'Aug 2026', graduations: 100, p1Active: 74, certVerified: 94, formalEmployed: 53 },
    { month: 'Sep 2026', graduations: 100, p1Active: 69, certVerified: 95, formalEmployed: 61 },
    { month: 'Oct 2026', graduations: 100, p1Active: 64, certVerified: 95, formalEmployed: 68 },
  ];

  // Pie chart data for transition status breakdown
  const statusPieData = [
    { name: 'Formal Employment', value: 48, color: '#10b981' },
    { name: 'Active Apprenticeship (P1)', value: 24, color: '#f59e0b' },
    { name: 'Job Seeking / BKK Handoff', value: 14, color: '#8b5cf6' },
    { name: 'Higher Education / Polytechnic', value: 9, color: '#3b82f6' },
    { name: 'Inactive / NEET Risk', value: 5, color: '#f43f5e' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in">
      <ModuleHeader
        moduleCode="M09"
        moduleTitle="Monitoring & Evaluation: Shared Twelve-Month Indicator"
        pillarBadge="Governance & Shared Indicator Engine"
        badgeColorClass="border-indigo-500/40 text-indigo-300 bg-indigo-500/10"
        bridgeSentence="The central nexus where MagangHub, SIAPkerja, Tracer Study, and BKK metrics converge into one unambiguous transition indicator."
        operatingGuideSteps={operatingGuideSteps}
      />

      {/* Target Policy Notice */}
      <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-start gap-3">
        <div className="p-2 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-indigo-400 shrink-0 mt-0.5">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div className="text-xs">
          <div className="font-bold text-white uppercase font-mono tracking-wider text-[11px]">
            Target Policy Discipline
          </div>
          <p className="text-slate-300 mt-0.5 leading-relaxed">
            <strong>Target to be set after baseline:</strong> MITRA avoids setting arbitrary political target percentages beforehand. Rigorous Year 1 pilot data collection across the 3 pilot provinces will establish empirical baseline thresholds for subsequent cohort targets.
          </p>
        </div>
      </div>

      {/* Primary KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3.5">
        {/* Card 1: The Core Indicator */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-indigo-500/40 col-span-2 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-indigo-400 font-bold uppercase">
              Shared Core Indicator
            </span>
            <span className="px-2 py-0.2 rounded font-mono text-[9px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Twelve-Month Metric
            </span>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white mt-1">
            {shared12MEmploymentRate}%
          </div>
          <div className="text-xs text-slate-300 mt-1">
            Verified 12-Month Formal Employment Rate
          </div>
          <div className="text-[10px] text-slate-500 font-mono mt-2 pt-2 border-t border-slate-800">
            Target to be set after baseline
          </div>
        </div>

        {/* Card 2: Formal Job Share */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Formal Sector Share</div>
          <div className="text-2xl font-extrabold font-mono text-emerald-400 mt-1">
            {formalJobShare}%
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Backed by BPJS records</div>
          <div className="text-[9px] text-slate-400 font-mono mt-2">Target post-baseline</div>
        </div>

        {/* Card 3: Apprenticeship Completion */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow">
          <div className="text-[10px] font-mono text-slate-400 uppercase">P1 Completion Rate</div>
          <div className="text-2xl font-extrabold font-mono text-amber-400 mt-1">
            91.2%
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Blended 4+1 schedule</div>
          <div className="text-[9px] text-slate-400 font-mono mt-2">Target post-baseline</div>
        </div>

        {/* Card 4: Certificate Verification */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow">
          <div className="text-[10px] font-mono text-slate-400 uppercase">P2 Verification Rate</div>
          <div className="text-2xl font-extrabold font-mono text-blue-400 mt-1">
            {certVerificationRate}%
          </div>
          <div className="text-[10px] text-slate-500 mt-1">On SIAPkerja registry</div>
          <div className="text-[9px] text-slate-400 font-mono mt-2">Target post-baseline</div>
        </div>

        {/* Card 5: BKK Contact & Consent */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Contact & Consent</div>
          <div className="text-2xl font-extrabold font-mono text-purple-400 mt-1">
            {consentRate}%
          </div>
          <div className="text-[10px] text-slate-500 mt-1">PDP Law 27/2022 opt-in</div>
          <div className="text-[9px] text-slate-400 font-mono mt-2">Target post-baseline</div>
        </div>
      </div>

      {/* Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Cohort Progression Area Chart */}
        <div className="lg:col-span-8 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                Transition Trajectory
              </div>
              <h3 className="text-base font-bold text-white mt-0.5">
                Monthly Transition Dynamics (May – Oct 2026)
              </h3>
            </div>

            <div className="flex items-center gap-2">
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
              <AreaChart data={monthlyFunnelData} margin={{ top: 10, right: 20, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorFormal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorP1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11, fill: '#94a3b8' }} unit="%" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="formalEmployed" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorFormal)" name="Formal Employment Rate %" />
                <Area type="monotone" dataKey="p1Active" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorP1)" name="Active P1 Apprenticeship %" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution Pie Chart */}
        <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono font-bold text-slate-400 uppercase">
              Cohort Composition
            </div>
            <h3 className="text-base font-bold text-white mt-0.5">
              12-Month Status Breakdown
            </h3>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {statusPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs">
            {statusPieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-300">{item.name}</span>
                </div>
                <span className="font-mono font-bold text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
