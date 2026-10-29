import React from 'react';
import { useApp } from '../context/AppContext';
import { DEMO_ROLES } from '../data/mockData';
import { RoleType } from '../types';
import {
  Briefcase,
  Award,
  Users,
  Compass,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Cpu,
  Layers,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  AlertTriangle,
  Building2,
  Network,
  FileCheck,
  UserCheck,
  Lock,
  ArrowUpRight,
  BarChart3,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentView, setCurrentRole, setIsAuditModalOpen, setIsIndicatorModalOpen } = useApp();

  const handleLaunchDashboardAs = (roleId: RoleType) => {
    setCurrentRole(roleId);
    setCurrentView('dashboard');
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Disclaimer Top Banner */}
      <div className="bg-amber-950/70 border-b border-amber-500/30 px-4 py-2 text-center text-xs text-amber-300">
        <span className="font-semibold">Notice:</span> Concept prototype for the Meridian English Olympiad 2026. All figures other than cited national statistics are illustrative demo data for interface demonstration, not pilot results.
      </div>

      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-40 bg-[#070b14]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-500 p-0.5 shadow-lg shadow-indigo-500/25 flex items-center justify-center">
            <div className="w-full h-full bg-[#070b14] rounded-[10px] flex items-center justify-center">
              <span className="font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 text-lg">
                M
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white">MITRA</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-400 border border-blue-500/30">
                2026
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono hidden sm:block">
              Youth Transition Bridge
            </div>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-300">
          <button onClick={() => scrollToSection('features')} className="hover:text-white transition">
            Features & Pillars
          </button>
          <button onClick={() => scrollToSection('statistics')} className="hover:text-white transition">
            Aggregate Data
          </button>
          <button onClick={() => scrollToSection('workflow')} className="hover:text-white transition">
            Workflow
          </button>
          <button onClick={() => scrollToSection('architecture')} className="hover:text-white transition">
            System Architecture
          </button>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => handleLaunchDashboardAs('graduate')}
            className="px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg border border-slate-700/80 transition"
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setCurrentRole('central');
              setCurrentView('dashboard');
            }}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition flex items-center gap-1.5"
          >
            <span>Open Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          {/* Left Column: Headline and Rationale */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>National Essay Competition Concept • Meridian English Olympiad 2026</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Making Every Graduate's{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-400">
                First Step Count.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              <strong>MITRA</strong> (<em>Magang, Identitas, Tamatan, Rujukan dan Asistensi</em>) is not a new government programme. It is an integration layer connecting four existing Indonesian systems—<strong>MagangHub</strong>, <strong>BNSP/SIAPkerja</strong>, <strong>SMK Tracer Study</strong>, and <strong>School BKKs</strong>—around one shared twelve-month employment indicator.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setCurrentRole('central');
                  setCurrentView('dashboard');
                }}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-xl shadow-blue-900/30 transition flex items-center gap-2"
              >
                <span>Launch Interactive Prototype</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollToSection('architecture')}
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700/80 transition flex items-center gap-2"
              >
                <Cpu className="w-4 h-4 text-indigo-400" />
                <span>Architecture Diagram</span>
              </button>
            </div>

            {/* Tagline */}
            <div className="pt-2 text-xs font-mono text-slate-400 border-l-2 border-blue-500 pl-3">
              "Building a bridge from vocational school to first job."
            </div>
          </div>

          {/* Right Column: MITRA Command Centre Role Jump Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-6 shadow-2xl backdrop-blur-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    MITRA Command Centre
                  </div>
                  <div className="text-sm font-bold text-white">
                    4 Pillars Synchronised
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  Engine Active
                </span>
              </div>

              {/* 4 Pillars Status Chips */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-amber-500/20">
                  <span className="font-mono text-amber-400 font-semibold">P1 First-Step Apprenticeship</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-300">Active Now</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-blue-500/20">
                  <span className="font-mono text-blue-400 font-semibold">P2 Verified Skills Identity</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-300">Active Now</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-emerald-500/20">
                  <span className="font-mono text-emerald-400 font-semibold">P3 Traced Graduates & Review</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-300">Next Stage</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-purple-500/20">
                  <span className="font-mono text-purple-400 font-semibold">P4 Referral & Assistance</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/10 text-purple-300">Active Now</span>
                </div>
              </div>

              {/* Role Simulation Buttons */}
              <div className="pt-2">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Jump Straight Into Dashboard As:
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {DEMO_ROLES.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => handleLaunchDashboardAs(r.id)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-left transition group"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={r.avatar}
                          alt={r.name}
                          className="w-6 h-6 rounded-md object-cover"
                        />
                        <div>
                          <div className="text-xs font-semibold text-slate-200 group-hover:text-white">
                            {r.name}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {r.badge}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. The First-Step Gap Fact Cards */}
      <section id="statistics" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="text-xs font-mono font-bold uppercase text-blue-400 tracking-wider">
            Evidence Base
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            The First-Step Gap in Numbers
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Real baseline statistics highlighting why Indonesia’s vocational high school graduates face high unemployment despite national employment growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1 */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-slate-400 mb-1">National Open Unemployment</div>
              <div className="text-3xl font-extrabold text-emerald-400 font-mono tracking-tight mb-2">
                4.65%
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Recorded in May 2026 as the lowest national unemployment figure since 1994, reflecting broader macroeconomic recovery.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-500">
              Source: BPS 2026b
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-slate-400 mb-1">Youth (15–24) Unemployment Rate</div>
              <div className="text-3xl font-extrabold text-rose-400 font-mono tracking-tight mb-2">
                17.37%
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Youth unemployment remains more than 3x the national aggregate rate, concentrated sharply among first-time jobseekers.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-500">
              Source: BPS 2026a, 2026b
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-slate-400 mb-1">SMK Unemployment (Highest by Level)</div>
              <div className="text-3xl font-extrabold text-amber-400 font-mono tracking-tight mb-2">
                7.68%
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                SMK graduates register the highest unemployment of any education level in Indonesia, exceeding university graduates (6.09%).
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-500">
              Source: BPS 2026b
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-slate-400 mb-1">SMK Graduates Working (Tracer Study)</div>
              <div className="text-3xl font-extrabold text-blue-400 font-mono tracking-tight mb-2">
                48.9%
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Less than half of traced SMK graduates were working in the 2025 tracer study, with the remainder continuing studies, seeking work, or inactive.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-500">
              Source: Kemendikdasmen 2026
            </div>
          </div>

          {/* Card 5 */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-slate-400 mb-1">Youth NEET Share (15–24 Years)</div>
              <div className="text-3xl font-extrabold text-purple-400 font-mono tracking-tight mb-2">
                19.44%
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Nearly 1 in 5 Indonesian youths is Not in Employment, Education, or Training, vulnerable to long-term economic detachment.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-500">
              Source: BPS 2025
            </div>
          </div>

          {/* Card 6 */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-slate-400 mb-1">National Apprenticeship Program Target</div>
              <div className="text-3xl font-extrabold text-cyan-400 font-mono tracking-tight mb-2">
                150,000
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Magang Nasional funded 150,000 places, yet locked out vocational secondary graduates by restricting eligibility to diploma, bachelor's, and professional alumni.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-500">
              Source: Bisnis.com 2026
            </div>
          </div>
        </div>
      </section>

      {/* 3. Problem Tree Summary: Root Causes A1-A6 Mapped to P1-P4 */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="text-xs font-mono font-bold uppercase text-indigo-400 tracking-wider">
            Diagnostic Framework
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Problem Tree: 6 Root Causes & MITRA Remedies
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Mapping structural barriers (A1–A6) directly to the four MITRA pillars.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                A1 & A5 → P1
              </span>
              <span className="text-[10px] font-mono text-slate-500">ROOT CAUSE</span>
            </div>
            <h3 className="text-sm font-bold text-white">Unequal Access & Host Rules for Small Firms</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong>A1:</strong> Apprenticeship access is skewed toward well-connected students. <br />
              <strong>A5:</strong> Host-company compliance rules are prohibitively heavy for SMEs.
            </p>
            <div className="pt-2 border-t border-slate-800 text-xs text-amber-300 font-medium">
              → <strong>P1 Remedy:</strong> MagangHub opened to SMK within 12M, cryptographic lottery selection for oversubscription, and SME consortia with shared training units.
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                A2 → P2
              </span>
              <span className="text-[10px] font-mono text-slate-500">ROOT CAUSE</span>
            </div>
            <h3 className="text-sm font-bold text-white">Employers Cannot Trust Internal School Grades</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              School-based exams suffer from grade inflation and lack external industry benchmarking, creating credential skepticism among employers.
            </p>
            <div className="pt-2 border-t border-slate-800 text-xs text-blue-300 font-medium">
              → <strong>P2 Remedy:</strong> Every school assessment requires an external industry assessor; digital certificates verifiable on SIAPkerja; post-placement supervisor references.
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                A3 & A4 → P3
              </span>
              <span className="text-[10px] font-mono text-slate-500">ROOT CAUSE</span>
            </div>
            <h3 className="text-sm font-bold text-white">Unlinked Tracer Data & No Review Trigger</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tracer surveys rely solely on self-reporting with high attrition, and no statutory rule compels education offices to fix chronically failing programmes.
            </p>
            <div className="pt-2 border-t border-slate-800 text-xs text-emerald-300 font-medium">
              → <strong>P3 Remedy:</strong> Consent-based linkage to SIAPkerja and BPJS social security at months 6 & 12; mandated provincial review for cohorts below 50% placement.
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3 md:col-span-2 lg:col-span-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                A6 → P4 & Integration Engine
              </span>
              <span className="text-[10px] font-mono text-slate-500">ROOT CAUSE</span>
            </div>
            <h3 className="text-sm font-bold text-white">Split Responsibility Between Education & Manpower Authorities</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Schools consider their job done on graduation day, while manpower offices (Disnaker) only serve adults registered as unemployed. Unplaced 18-year-old vocational graduates fall through the institutional cracks.
            </p>
            <div className="pt-2 border-t border-slate-800 text-xs text-purple-300 font-medium">
              → <strong>P4 Remedy:</strong> School placement units (BKK) act as active 12-month case managers with contacts at M1, M3, M6, M12, systematically referring unplaced youth to local Disnaker offices.
            </div>
          </div>
        </div>
      </section>

      {/* 4. One Graduate, One Twelve-Month Pathway */}
      <section id="features" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="text-xs font-mono font-bold uppercase text-emerald-400 tracking-wider">
            Pathway Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            One Graduate, One Twelve-Month Pathway
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            A cohesive trajectory from pre-graduation preparation to verified formal placement.
          </p>
        </div>

        {/* Horizontal Tracker */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 mb-8 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[700px] gap-2">
            {[
              { step: '01', title: 'Prepare', sub: 'Month -2', color: 'text-slate-400', border: 'border-slate-700' },
              { step: '02', title: 'Apprentice', sub: 'Months 1–6 (P1)', color: 'text-amber-400', border: 'border-amber-500/40' },
              { step: '03', title: 'Verify', sub: 'SIAPkerja (P2)', color: 'text-blue-400', border: 'border-blue-500/40' },
              { step: '04', title: 'Trace', sub: 'Months 6 & 12 (P3)', color: 'text-emerald-400', border: 'border-emerald-500/40' },
              { step: '05', title: 'Refer', sub: 'BKK / Disnaker (P4)', color: 'text-purple-400', border: 'border-purple-500/40' },
              { step: '06', title: 'In Work', sub: '12M Shared Goal', color: 'text-white', border: 'border-indigo-500/60' },
            ].map((st, i, arr) => (
              <React.Fragment key={st.step}>
                <div className={`p-3 rounded-xl border bg-slate-950/80 flex-1 text-center ${st.border}`}>
                  <div className={`font-mono text-xs font-bold ${st.color}`}>{st.step}</div>
                  <div className="font-bold text-xs text-white mt-0.5">{st.title}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">{st.sub}</div>
                </div>
                {i < arr.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 4 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-amber-500/30 hover:border-amber-400/50 transition flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                  PILLAR 1
                </span>
                <Briefcase className="w-4 h-4 text-amber-400" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">First-Step Apprenticeship</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                MagangHub opened to SMK graduates within 12 months. Blended placements (4 days work + 1 day structured learning at an SMK, BLK, or polytechnic).
              </p>
              <div className="text-[11px] text-slate-400 space-y-1">
                <div>• Small-firm consortia with shared training units</div>
                <div>• Cryptographic lottery when applicants exceed places</div>
                <div>• Anti-cheap-labour mentor ratio caps</div>
              </div>
            </div>
            <button
              onClick={() => handleLaunchDashboardAs('employer')}
              className="mt-4 pt-3 border-t border-slate-800 text-xs font-medium text-amber-400 hover:text-amber-300 flex items-center justify-between"
            >
              <span>Explore Matching & Consortia</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-blue-500/30 hover:border-blue-400/50 transition flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/30">
                  PILLAR 2
                </span>
                <Award className="w-4 h-4 text-blue-400" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Verified Skills Identity</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                External industry assessor on every school assessment. Digital certificates verifiable on SIAPkerja with QR integrity.
              </p>
              <div className="text-[11px] text-slate-400 space-y-1">
                <div>• BNSP-certified industry assessors</div>
                <div>• Instant employer verification portal</div>
                <div>• Structured supervisor work reference</div>
              </div>
            </div>
            <button
              onClick={() => handleLaunchDashboardAs('graduate')}
              className="mt-4 pt-3 border-t border-slate-800 text-xs font-medium text-blue-400 hover:text-blue-300 flex items-center justify-between"
            >
              <span>Verify Digital Certificate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-emerald-500/30 hover:border-emerald-400/50 transition flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  PILLAR 3
                </span>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Traced Graduates & Review</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                Consent-based administrative data linkage to SIAPkerja and BPJS Ketenagakerjaan at months 6 and 12.
              </p>
              <div className="text-[11px] text-slate-400 space-y-1">
                <div>• Explicit consent under Law No. 27/2022</div>
                <div>• Refusal never blocks apprenticeship</div>
                <div>• Mandated provincial review for weak programs</div>
              </div>
            </div>
            <button
              onClick={() => handleLaunchDashboardAs('provincial')}
              className="mt-4 pt-3 border-t border-slate-800 text-xs font-medium text-emerald-400 hover:text-emerald-300 flex items-center justify-between"
            >
              <span>Inspect Programme Outcomes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-purple-500/30 hover:border-purple-400/50 transition flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/30">
                  PILLAR 4
                </span>
                <Users className="w-4 h-4 text-purple-400" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Referral & Assistance</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                Each school’s placement unit (BKK) acts as a 12-month transition case manager.
              </p>
              <div className="text-[11px] text-slate-400 space-y-1">
                <div>• Individual transition plan before graduation</div>
                <div>• Checkpoints at Months 1, 3, 6, 12</div>
                <div>• Disnaker public manpower referrals</div>
              </div>
            </div>
            <button
              onClick={() => handleLaunchDashboardAs('school')}
              className="mt-4 pt-3 border-t border-slate-800 text-xs font-medium text-purple-400 hover:text-purple-300 flex items-center justify-between"
            >
              <span>Open BKK Case Board</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. 4-Step Workflow */}
      <section id="workflow" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="text-xs font-mono font-bold uppercase text-blue-400 tracking-wider">
            Operational Protocol
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            The 4-Step MITRA Workflow
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Clear, accountable progression through the Indonesian transition architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3 relative">
            <span className="text-3xl font-black font-mono text-blue-500/30">01</span>
            <h3 className="text-base font-bold text-white">Profile and Plan</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              BKK profiles graduating students, issues individual plans, gathers PDP Law 27/2022 explicit consent, and logs baseline skill goals.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3 relative">
            <span className="text-3xl font-black font-mono text-amber-500/30">02</span>
            <h3 className="text-base font-bold text-white">Apprentice and Learn</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Graduates match into MagangHub blended placements. Small enterprises join via SME Consortia. Lotteries guarantee fair selection.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3 relative">
            <span className="text-3xl font-black font-mono text-blue-500/30">03</span>
            <h3 className="text-base font-bold text-white">Verify and Reference</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Assessments co-evaluated with external BNSP industry assessors. Enterprise supervisors file structured competency references on SIAPkerja.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3 relative">
            <span className="text-3xl font-black font-mono text-emerald-500/30">04</span>
            <h3 className="text-base font-bold text-white">Trace, Refer and Review</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Administrative data matches at months 6 & 12. Unplaced youth handed to Disnaker. Weak school programmes triggered for mandatory QA review.
            </p>
          </div>
        </div>
      </section>

      {/* 6. System Architecture Diagram */}
      <section id="architecture" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="text-xs font-mono font-bold uppercase text-indigo-400 tracking-wider">
            System Design
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            System Architecture: The Integration Layer
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            How existing Indonesian mechanisms stream into the Twelve-Month Indicator Engine to power four pillars and governance.
          </p>
        </div>

        {/* Clean Architectural SVG / CSS Layout */}
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl relative">
          {/* Top Layer: 6 Existing Indonesian Systems */}
          <div>
            <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              Existing Systems Feeders (No New Silos)
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { name: 'MagangHub', role: 'Kemnaker Placement API', color: 'border-amber-500/40 text-amber-300' },
                { name: 'SIAPkerja', role: 'Skills ID & Worker Registry', color: 'border-blue-500/40 text-blue-300' },
                { name: 'BNSP', role: 'Accredited Industry Assessors', color: 'border-blue-500/40 text-blue-300' },
                { name: 'SMK Tracer Study', role: 'Kemendikdasmen Surveys', color: 'border-emerald-500/40 text-emerald-300' },
                { name: 'School BKK', role: '12-Month Case Managers', color: 'border-purple-500/40 text-purple-300' },
                { name: 'Disnaker', role: 'Local Manpower Offices', color: 'border-purple-500/40 text-purple-300' },
              ].map((sys) => (
                <div key={sys.name} className={`p-3 rounded-xl bg-slate-900 border text-center ${sys.color}`}>
                  <div className="font-bold text-xs">{sys.name}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{sys.role}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Central Layer: Twelve-Month Indicator Engine */}
          <div className="relative">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/60 via-indigo-950/80 to-purple-950/60 border border-indigo-500/50 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-indigo-400 uppercase">
                    Central Core Engine
                  </div>
                  <div className="text-base sm:text-lg font-extrabold text-white">
                    MITRA Twelve-Month Employment Indicator Engine
                  </div>
                  <div className="text-xs text-slate-300 mt-1 max-w-xl">
                    Aggregates verified administrative records (social security, registered apprenticeships, assessor certifications) into one binding outcome metric.
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsIndicatorModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition shrink-0 flex items-center gap-1.5"
              >
                <span>Inspect Engine Logic</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Bottom Layer: Four Pillar Outputs & Governance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                Pillar Outputs (P1 – P4)
              </div>
              <ul className="text-xs text-slate-300 space-y-1">
                <li>• <strong>P1:</strong> Blended Work Placements & Fair Lottery Logs</li>
                <li>• <strong>P2:</strong> Tamper-Proof SIAPkerja QR Credentials</li>
                <li>• <strong>P3:</strong> Verified Administrative Tracing at M6 & M12</li>
                <li>• <strong>P4:</strong> Active Case Tracking & Public Disnaker Handoffs</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                Governance & Accountability Layer
              </div>
              <ul className="text-xs text-slate-300 space-y-1">
                <li>• <strong>PDP Compliance:</strong> Explicit consent under Indonesia Law 27/2022</li>
                <li>• <strong>Integrity Trail:</strong> Real-time SHA-256 hash audit trail</li>
                <li>• <strong>Corrective Trigger:</strong> Mandatory provincial review for weak programs</li>
                <li>• <strong>Protection:</strong> Whistleblowing & anti-cheap-labour safeguards</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Design Philosophy */}
      <section className="py-16 px-4 sm:px-8 max-w-4xl mx-auto text-center border-t border-slate-800/80 space-y-4">
        <div className="inline-flex p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-2">
          <Layers className="w-8 h-8" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          "MITRA adds no new programme. It makes four existing systems answer to one twelve-month employment indicator."
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
          By aligning incentives rather than proliferating bureaucracy, MITRA ensures that Indonesia’s investments in vocational schooling translate directly into sustainable, formal youth livelihoods.
        </p>
      </section>

      {/* 8. Footer */}
      <footer className="border-t border-slate-800 bg-[#05080f] py-10 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-white text-sm">MITRA</span>
              <span>— Youth Transition Bridge</span>
            </div>
            <p className="text-[11px] text-slate-500">
              National Essay Competition Entry • Meridian English Olympiad 2026.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <button
              onClick={() => setIsAuditModalOpen(true)}
              className="text-slate-400 hover:text-white transition flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Audit Trail</span>
            </button>
            <button
              onClick={() => {
                setCurrentRole('central');
                setCurrentView('dashboard');
              }}
              className="text-blue-400 hover:underline"
            >
              Launch Dashboard ↗
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-slate-900 text-[11px] text-slate-500 text-center leading-relaxed">
          Concept prototype. All figures other than the cited national statistics (BPS 2025, BPS 2026a, BPS 2026b, Kemendikdasmen 2026, Bisnis.com 2026) are illustrative demo data for interface demonstration, not pilot results.
        </div>
      </footer>
    </div>
  );
};
