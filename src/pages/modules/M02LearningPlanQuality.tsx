import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ModuleHeader } from '../../components/common/ModuleHeader';
import {
  FileCheck,
  AlertTriangle,
  CheckCircle,
  Building2,
  Calendar,
  Layers,
  Sparkles,
  ShieldAlert,
  Compass,
  ArrowRight,
  ClipboardList
} from 'lucide-react';

export const M02LearningPlanQuality: React.FC = () => {
  const {
    placements,
    triggerRandomPlacementAudit,
    updateLearningPlan,
    showToast,
  } = useApp();

  const [selectedPlacementId, setSelectedPlacementId] = useState<string>(placements[0]?.id || '');

  const operatingGuideSteps = [
    {
      title: 'Mentor Ratio Enforcement',
      detail: 'Ensure the host enterprise does not exceed a 1:4 mentor-to-apprentice ratio. Ratios above 1:4 trigger automatic cheap-labour risk investigations.',
    },
    {
      title: 'Off-The-Job Learning Schedule',
      detail: 'Confirm that 1 full day per week (or 20% of total working hours) is formally allocated to an accredited educational partner (SMK/BLK/Polytechnic).',
    },
    {
      title: 'Pedagogical Task Verification',
      detail: 'Review tasks to guarantee they reflect progressive skills outcomes (e.g. PLC programming, CNC calibration) rather than repetitive unskilled maintenance.',
    },
    {
      title: 'Random Sampling Audits',
      detail: 'Provincial and BKK quality auditors trigger spot audits to verify shop-floor logbooks and student attendance without advance notice.',
    },
  ];

  const currentPlacement = placements.find((p) => p.id === selectedPlacementId) || placements[0];

  const handleToggleTask = (taskId: string) => {
    if (!currentPlacement) return;
    const updatedItems = currentPlacement.learningPlan.items.map((item) =>
      item.id === taskId ? { ...item, completed: !item.completed } : item
    );
    updateLearningPlan(currentPlacement.id, updatedItems, currentPlacement.learningPlan.approved);
  };

  const handleApprovePlan = () => {
    if (!currentPlacement) return;
    updateLearningPlan(currentPlacement.id, currentPlacement.learningPlan.items, true);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <ModuleHeader
        moduleCode="M02"
        moduleTitle="Learning Plan & Placement Quality Standards"
        pillarBadge="P1: First-Step Apprenticeship"
        badgeColorClass="border-amber-500/40 text-amber-400 bg-amber-500/10"
        bridgeSentence="Quality safeguards ensure MagangHub apprenticeships offer real technical development rather than substituting for full-time entry workers."
        operatingGuideSteps={operatingGuideSteps}
      />

      {/* Placement Selector Strip */}
      <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            Select Active Host Placement
          </div>
          <div className="text-sm font-bold text-white mt-0.5">
            Quality & Supervision Audit Console
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedPlacementId}
            onChange={(e) => setSelectedPlacementId(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
          >
            {placements.map((p) => (
              <option key={p.id} value={p.id}>
                {p.companyName} ({p.id}) — Ratio {p.mentorRatio}
              </option>
            ))}
          </select>

          <button
            onClick={() => triggerRandomPlacementAudit(currentPlacement.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/40 text-xs font-semibold rounded-xl transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Random Audit Sampler</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Quality Indicators & Learning Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Quality Risk Metrics & Audit Card */}
        <div className="space-y-4">
          {/* Mentor Ratio Indicator */}
          <div className={`p-5 rounded-2xl border ${
            currentPlacement.mentorRatioExceeded
              ? 'bg-rose-950/20 border-rose-500/50'
              : 'bg-slate-900/80 border-slate-800'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                Mentor-to-Apprentice Ratio
              </span>
              <span className="text-[10px] font-mono text-slate-400">Max Cap: 1:4.0</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className={`text-3xl font-extrabold font-mono ${
                currentPlacement.mentorRatioExceeded ? 'text-rose-400' : 'text-emerald-400'
              }`}>
                {currentPlacement.mentorRatio}
              </span>
              <span className="text-xs text-slate-400">
                {currentPlacement.mentorRatioExceeded ? 'Supervision Deficit' : 'Within Safety Cap'}
              </span>
            </div>

            {currentPlacement.mentorRatioExceeded ? (
              <div className="mt-3 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                <span>
                  <strong>Threshold Exceeded:</strong> One supervisor is assigned to 6 apprentices, increasing displacement and cheap-labour risk. Remediation required.
                </span>
              </div>
            ) : (
              <div className="mt-3 text-xs text-slate-400 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Complies with Indonesian Apprenticeship Ministerial Regulation No. 6/2020.</span>
              </div>
            )}
          </div>

          {/* Cheap Labour Risk Flag */}
          <div className={`p-5 rounded-2xl border ${
            currentPlacement.cheapLabourRisk
              ? 'bg-amber-950/20 border-amber-500/50'
              : 'bg-slate-900/80 border-slate-800'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                Cheap-Labour Vulnerability Flag
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                currentPlacement.cheapLabourRisk ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
              }`}>
                {currentPlacement.cheapLabourRisk ? 'FLAGGED' : 'CLEARED'}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {currentPlacement.cheapLabourRisk
                ? 'Flagged due to incomplete learning plan accreditation and/or exceeded mentorship ratio. Subsidies withheld until verified.'
                : 'No cheap-labour anomalies detected. Tasks are paired with weekly structured theoretical training.'}
            </p>

            {currentPlacement.lastAuditedAt && (
              <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] font-mono text-emerald-400">
                Last Sampler Audit: {currentPlacement.lastAuditedAt}
              </div>
            )}
          </div>

          {/* Weekly Learning Institution */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase">
              Weekly 1-Day Training Partner
            </div>
            <div className="text-sm font-semibold text-white">
              {currentPlacement.learningPlan.weeklyLearningDay}
            </div>
            <p className="text-xs text-slate-400">
              Structured off-the-job classroom & laboratory curriculum delivered by vocational instructors.
            </p>
          </div>
        </div>

        {/* Right 2 Columns: Learning Plan Checklist */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <div className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                Individualized Apprenticeship Syllabus
              </div>
              <h2 className="text-lg font-bold text-white">
                Technical Learning Plan & Milestone Checklist
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-full text-xs font-mono ${
                currentPlacement.learningPlan.approved
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                  : 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
              }`}>
                {currentPlacement.learningPlan.approved ? 'Plan Approved' : 'Approval Pending'}
              </span>

              {!currentPlacement.learningPlan.approved && (
                <button
                  onClick={handleApprovePlan}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition"
                >
                  Approve Plan
                </button>
              )}
            </div>
          </div>

          <div className="text-xs text-slate-400">
            Aligned Framework: <strong className="text-slate-200">{currentPlacement.learningPlan.curriculumAlignment}</strong>
          </div>

          {/* Tasks List */}
          <div className="space-y-3">
            {currentPlacement.learningPlan.items.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => handleToggleTask(item.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  item.completed
                    ? 'bg-slate-950/80 border-emerald-500/30 text-slate-200'
                    : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => {}}
                  className="mt-1 w-4 h-4 rounded border-slate-700 text-blue-600 focus:ring-0 shrink-0 cursor-pointer"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-white text-xs">
                      {idx + 1}. {item.task}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 shrink-0">
                      {item.completed ? 'COMPLETED' : 'IN PROGRESS'}
                    </span>
                  </div>
                  <div className="text-slate-400 text-xs mt-1">
                    Pedagogical Competency: <span className="text-blue-300">{item.skillOutcome}</span>
                  </div>
                  <div className="text-slate-400 text-[11px] mt-1 font-mono flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-amber-400" />
                    <span>Venue: {item.weeklyLearningDayVenue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
