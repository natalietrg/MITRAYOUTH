import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ModuleHeader } from '../../components/common/ModuleHeader';
import { Graduate, GraduateContactSchedule } from '../../types';
import {
  Users,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Briefcase,
  Award,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Send,
  X,
  PhoneCall,
  Search,
  Filter
} from 'lucide-react';

export const M07CaseManagementBKK: React.FC = () => {
  const {
    graduates,
    updateContactSchedule,
    referGraduateToDisnaker,
    certificates,
    placements,
    showToast,
  } = useApp();

  const [selectedGraduate, setSelectedGraduate] = useState<Graduate | null>(graduates[0] || null);
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  // Drawer / referral modal states
  const [isReferModalOpen, setIsReferModalOpen] = useState(false);
  const [targetDisnaker, setTargetDisnaker] = useState('Dinas Tenaga Kerja Kota Cimahi');
  const [referralRationale, setReferralRationale] = useState(
    'Graduate completed initial BKK search period without securing formal placement; requires regional manpower job fair matching and vocational upskilling voucher.'
  );

  // Quick contact update modal state
  const [contactModalTarget, setContactModalTarget] = useState<{
    grad: Graduate;
    key: 'month1' | 'month3' | 'month6' | 'month12';
  } | null>(null);
  const [contactNotes, setContactNotes] = useState('');

  const operatingGuideSteps = [
    {
      title: 'Pre-Graduation Individual Transition Plan',
      detail: 'Every vocational senior creates a transition roadmap (target sector, geography, technical focus) 2 months before diploma issuance.',
    },
    {
      title: 'Quarterly Checkpoint Cadence (1, 3, 6, 12)',
      detail: 'School placement officers (BKK) contact graduates at 1, 3, 6, and 12 months. Contacts overdue past 30 days trigger warning flags.',
    },
    {
      title: 'Active Case Status Re-evaluation',
      detail: 'Update whether the graduate is in a P1 apprenticeship, job seeking, in formal employment, or continuing higher education.',
    },
    {
      title: 'Disnaker Referral Threshold',
      detail: 'If a graduate remains unplaced at the Month 3 or Month 6 checkpoint, BKK transfers case custody to the local Municipal Manpower Office (Disnaker).',
    },
  ];

  const filteredGraduates = graduates.filter((g) => {
    if (filterStatus !== 'All' && g.currentStatus !== filterStatus) return false;
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

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactModalTarget) return;

    updateContactSchedule(
      contactModalTarget.grad.id,
      contactModalTarget.key,
      contactNotes || 'Transition contact completed via phone/in-person session.'
    );

    // Refresh selected graduate in drawer
    const updated = graduates.find((g) => g.id === contactModalTarget.grad.id);
    if (updated) setSelectedGraduate(updated);

    setContactModalTarget(null);
    setContactNotes('');
  };

  const handleConfirmReferral = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGraduate) return;

    referGraduateToDisnaker(selectedGraduate.id, targetDisnaker, referralRationale);
    setIsReferModalOpen(false);

    const updated = graduates.find((g) => g.id === selectedGraduate.id);
    if (updated) setSelectedGraduate(updated);
  };

  const renderContactChip = (grad: Graduate, key: 'month1' | 'month3' | 'month6' | 'month12', label: string) => {
    const cs = grad.contactSchedule[key];
    let chipClass = 'bg-slate-800 text-slate-400 border-slate-700';
    let Icon = Clock;

    if (cs.status === 'Done') {
      chipClass = 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300';
      Icon = CheckCircle2;
    } else if (cs.status === 'Overdue') {
      chipClass = 'bg-rose-500/20 border-rose-500/40 text-rose-300 font-bold animate-pulse';
      Icon = AlertCircle;
    } else if (cs.status === 'Due') {
      chipClass = 'bg-amber-500/15 border-amber-500/30 text-amber-300';
    }

    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          setContactModalTarget({ grad, key });
          setContactNotes(cs.notes || '');
        }}
        className={`px-2 py-0.5 rounded text-[10px] font-mono border flex items-center gap-1 transition hover:scale-105 ${chipClass}`}
        title={`${label}: ${cs.status} (${cs.scheduledDate}) - Click to update`}
      >
        <Icon className="w-3 h-3" />
        <span>{label}: {cs.status}</span>
      </button>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <ModuleHeader
        moduleCode="M07"
        moduleTitle="BKK 12-Month Case Management Board"
        pillarBadge="P4: Referral & Assistance"
        badgeColorClass="border-purple-500/40 text-purple-400 bg-purple-500/10"
        bridgeSentence="School placement units (BKK) manage active case files across Months 1, 3, 6, and 12, ensuring no graduate drifts into NEET obscurity."
        operatingGuideSteps={operatingGuideSteps}
      />

      {/* Toolbar & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search graduate or NISN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
            >
              <option value="All">All Cohort Statuses</option>
              <option value="Apprentice (P1 Active)">Apprentice (P1 Active)</option>
              <option value="Job Seeking (BKK Assisted)">Job Seeking (BKK Assisted)</option>
              <option value="Employed (Formal Sector)">Employed (Formal Sector)</option>
              <option value="Referred to Disnaker">Referred to Disnaker</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex rounded-lg bg-slate-950 border border-slate-800 p-0.5 text-xs font-mono">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 rounded-md transition ${
                viewMode === 'table' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Table View
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1 rounded-md transition ${
                viewMode === 'kanban' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Kanban Board
            </button>
          </div>

          <span className="text-xs font-mono text-slate-400">
            {filteredGraduates.length} Tracked
          </span>
        </div>
      </div>

      {/* Main Content: Table or Kanban + Selected Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Graduates List/Board */}
        <div className="lg:col-span-7 space-y-4">
          {viewMode === 'table' ? (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950/70 text-slate-400 font-mono">
                      <th className="p-3.5 font-medium">GRADUATE</th>
                      <th className="p-3.5 font-medium">PROGRAMME</th>
                      <th className="p-3.5 font-medium">STATUS</th>
                      <th className="p-3.5 font-medium">CONTACT SCHEDULE (M1/3/6/12)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-sans">
                    {filteredGraduates.map((grad) => {
                      const isSelected = selectedGraduate?.id === grad.id;
                      return (
                        <tr
                          key={grad.id}
                          onClick={() => setSelectedGraduate(grad)}
                          className={`cursor-pointer transition ${
                            isSelected
                              ? 'bg-purple-950/30 border-l-4 border-l-purple-500'
                              : 'hover:bg-slate-800/40'
                          }`}
                        >
                          <td className="p-3.5">
                            <div className="font-semibold text-white">{grad.name}</div>
                            <div className="text-[11px] text-slate-400 font-mono">
                              NISN {grad.nisn} · {grad.schoolName}
                            </div>
                          </td>

                          <td className="p-3.5">
                            <div className="text-slate-200">{grad.programme}</div>
                            <div className="text-[10px] text-slate-400 font-mono">
                              Case: {grad.bkkCaseManager}
                            </div>
                          </td>

                          <td className="p-3.5">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                              {grad.currentStatus}
                            </span>
                          </td>

                          <td className="p-3.5">
                            <div className="flex flex-wrap items-center gap-1">
                              {renderContactChip(grad, 'month1', 'M1')}
                              {renderContactChip(grad, 'month3', 'M3')}
                              {renderContactChip(grad, 'month6', 'M6')}
                              {renderContactChip(grad, 'month12', 'M12')}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Kanban Board by Current Status */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Apprentice (P1 Active)', 'Job Seeking (BKK Assisted)', 'Employed (Formal Sector)', 'Referred to Disnaker'].map((colStatus) => {
                const columnGrads = filteredGraduates.filter((g) => g.currentStatus === colStatus);
                return (
                  <div key={colStatus} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="font-mono text-xs font-bold text-slate-300">{colStatus}</span>
                      <span className="px-2 py-0.2 rounded font-mono text-[10px] bg-slate-800 text-slate-400">
                        {columnGrads.length}
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {columnGrads.map((g) => (
                        <div
                          key={g.id}
                          onClick={() => setSelectedGraduate(g)}
                          className={`p-3 rounded-xl border cursor-pointer transition ${
                            selectedGraduate?.id === g.id
                              ? 'bg-purple-950/40 border-purple-500/50'
                              : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
                          }`}
                        >
                          <div className="font-semibold text-white text-xs">{g.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                            {g.schoolName} · {g.programme}
                          </div>
                          <div className="flex items-center gap-1 mt-2">
                            {renderContactChip(g, 'month1', 'M1')}
                            {renderContactChip(g, 'month3', 'M3')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Rich Graduate Profile Drawer */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl sticky top-24 space-y-5">
          {selectedGraduate ? (
            <>
              {/* Graduate Header */}
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                      Case File
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      NISN {selectedGraduate.nisn}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white mt-1">
                    {selectedGraduate.name}
                  </h3>
                  <div className="text-xs text-slate-300">
                    {selectedGraduate.schoolName} — {selectedGraduate.programme}
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-purple-500/15 border border-purple-500/30 text-purple-300">
                    {selectedGraduate.currentStatus}
                  </span>
                </div>
              </div>

              {/* Individual Transition Plan (Drafted Pre-Graduation) */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-slate-400 uppercase">
                    Individual Transition Plan (Pre-Grad)
                  </span>
                  <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded">
                    {selectedGraduate.individualPlan.planStatus}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-slate-300">
                  <div>
                    <span className="text-slate-500 text-[10px]">Target Sector:</span>
                    <div>{selectedGraduate.individualPlan.targetSector}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px]">Target Role:</span>
                    <div>{selectedGraduate.individualPlan.targetRole}</div>
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 text-[10px]">Location Preference:</span>
                  <div className="text-slate-300">{selectedGraduate.individualPlan.preferredLocation}</div>
                </div>

                <div>
                  <span className="text-slate-500 text-[10px]">Target Competencies:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedGraduate.individualPlan.skillsFocus.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 border border-slate-800 text-blue-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 12-Month Contact Schedule Log */}
              <div className="space-y-2 text-xs">
                <div className="font-mono text-[11px] font-bold text-slate-400 uppercase">
                  12-Month Case Contact Log
                </div>

                <div className="border border-slate-800 rounded-xl divide-y divide-slate-800/80 overflow-hidden bg-slate-950/60">
                  {(['month1', 'month3', 'month6', 'month12'] as const).map((key, i) => {
                    const cs = selectedGraduate.contactSchedule[key];
                    const label = `Month ${[1, 3, 6, 12][i]}`;

                    return (
                      <div key={key} className="p-3 flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white font-mono">{label}</span>
                            <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                              cs.status === 'Done' ? 'text-emerald-400' : cs.status === 'Overdue' ? 'text-rose-400' : 'text-amber-400'
                            }`}>
                              ({cs.status})
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            Scheduled: {cs.scheduledDate} {cs.completedDate && `· Done: ${cs.completedDate}`}
                          </div>
                          {cs.notes && (
                            <div className="text-slate-300 text-[11px] mt-1 bg-slate-900/60 p-2 rounded border border-slate-800/80">
                              "{cs.notes}"
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => {
                            setContactModalTarget({ grad: selectedGraduate, key });
                            setContactNotes(cs.notes || '');
                          }}
                          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-mono shrink-0"
                        >
                          Update Log
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Button: Refer to Disnaker */}
              <div className="pt-2">
                <button
                  onClick={() => setIsReferModalOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30"
                >
                  <Send className="w-4 h-4" />
                  <span>Refer Unplaced Graduate to Local Manpower Office (Disnaker)</span>
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs">
              Select a graduate from the board to inspect their transition file.
            </div>
          )}
        </div>
      </div>

      {/* Referral Modal */}
      {isReferModalOpen && selectedGraduate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg overflow-hidden flex flex-col shadow-2xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5 text-purple-400" />
                <h3 className="font-bold text-white text-sm">
                  Disnaker Transition Handoff
                </h3>
              </div>
              <button
                onClick={() => setIsReferModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmReferral} className="p-5 space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="font-bold text-white text-sm">{selectedGraduate.name}</div>
                <div className="text-slate-400 font-mono">
                  NISN {selectedGraduate.nisn} · {selectedGraduate.schoolName} ({selectedGraduate.programme})
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Target Municipal/Regional Manpower Office (Disnaker)
                </label>
                <select
                  value={targetDisnaker}
                  onChange={(e) => setTargetDisnaker(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="Dinas Tenaga Kerja Kota Cimahi">Dinas Tenaga Kerja Kota Cimahi</option>
                  <option value="Dinas Tenaga Kerja Kota Bandung">Dinas Tenaga Kerja Kota Bandung</option>
                  <option value="Dinas Tenaga Kerja Kab. Bekasi">Dinas Tenaga Kerja Kab. Bekasi</option>
                  <option value="Dinas Tenaga Kerja Kota Semarang">Dinas Tenaga Kerja Kota Semarang</option>
                  <option value="Dinas Tenaga Kerja Kota Surabaya">Dinas Tenaga Kerja Kota Surabaya</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  BKK Case Manager Rationale & Support Needs
                </label>
                <textarea
                  rows={3}
                  required
                  value={referralRationale}
                  onChange={(e) => setReferralRationale(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 text-xs"
                />
              </div>

              <div className="text-[11px] text-slate-400">
                Transfers case file to Disnaker vocational matching roster. Record will appear immediately in M08 Referral Tracker.
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsReferModalOpen(false)}
                  className="px-4 py-1.5 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg shadow"
                >
                  Confirm Disnaker Referral
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Contact Schedule Update Modal */}
      {contactModalTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md overflow-hidden flex flex-col shadow-2xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-sm">
                  Record Transition Contact ({contactModalTarget.key.toUpperCase()})
                </h3>
              </div>
              <button
                onClick={() => setContactModalTarget(null)}
                className="text-slate-400 hover:text-white p-1"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveContact} className="p-5 space-y-4 text-xs">
              <div className="text-slate-300">
                Logging transition checkpoint for <strong>{contactModalTarget.grad.name}</strong> ({contactModalTarget.grad.schoolName}).
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Contact Notes & Employment Discussion Summary
                </label>
                <textarea
                  rows={3}
                  required
                  value={contactNotes}
                  onChange={(e) => setContactNotes(e.target.value)}
                  placeholder="e.g. Conducted WhatsApp check-in; student reported currently interviewing with SME cluster..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setContactModalTarget(null)}
                  className="px-4 py-1.5 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg shadow"
                >
                  Mark Contact as Concluded
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
