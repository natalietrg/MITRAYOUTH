import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ModuleHeader } from '../../components/common/ModuleHeader';
import { ApprovalItem } from '../../types';
import {
  ClipboardCheck,
  CheckCircle,
  XCircle,
  Building2,
  Calendar,
  AlertCircle,
  Filter,
  FileText,
  UserCheck
} from 'lucide-react';

export const M13ApprovalQueue: React.FC = () => {
  const { approvals, updateApprovalStatus, currentRole } = useApp();
  const [filterType, setFilterType] = useState<string>('All');
  const [modalItem, setModalItem] = useState<{ item: ApprovalItem; action: 'Approved' | 'Rejected' } | null>(null);
  const [noteInput, setNoteInput] = useState('');

  const operatingGuideSteps = [
    {
      title: 'Jurisdictional Triage',
      detail: 'Consortium recognitions are vetted by the Central Ministry of Manpower (MagangHub team), while mandated school reviews are adjudicated by Provincial Education Offices.',
    },
    {
      title: 'Pedagogical & Legal Scrutiny',
      detail: 'Verify that consortium applications have secured a legally binding shared training unit (polytechnic/BLK) and compliant 4+1 rotation.',
    },
    {
      title: 'Binding Action Plan Endorsement',
      detail: 'Approving a programme review establishes a binding 60-day corrective milestone for the vocational high school.',
    },
    {
      title: 'Real-Time Audit Trail Logging',
      detail: 'Every decision appends an immutable record with the approving officer’s name to the national MITRA audit ledger.',
    },
  ];

  const filteredApprovals = approvals.filter((a) => {
    if (filterType !== 'All' && a.type !== filterType) return false;
    return true;
  });

  const handleConfirmDecision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalItem) return;

    updateApprovalStatus(modalItem.item.id, modalItem.action, noteInput);
    setModalItem(null);
    setNoteInput('');
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <ModuleHeader
        moduleCode="M13"
        moduleTitle="Inter-Agency Approvals: Consortia & QA Reviews"
        pillarBadge="Governance & Shared Indicator Engine"
        badgeColorClass="border-indigo-500/40 text-indigo-300 bg-indigo-500/10"
        bridgeSentence="Central and provincial administrative sign-offs validating SME consortium clusters, mandated QA reviews, and corrective action plans."
        operatingGuideSteps={operatingGuideSteps}
      />

      {/* Filter Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">Filter Docket:</span>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none"
          >
            <option value="All">All Approval Types ({approvals.length})</option>
            <option value="Small-Firm Consortium Recognition">Small-Firm Consortium Recognition</option>
            <option value="Programme Review Case">Programme Review Case</option>
            <option value="Placement Quality Audit">Placement Quality Audit</option>
          </select>
        </div>

        <div className="text-xs font-mono text-slate-400">
          Showing {filteredApprovals.length} pending items
        </div>
      </div>

      {/* Approvals Docket */}
      <div className="grid grid-cols-1 gap-4">
        {filteredApprovals.map((item) => {
          const isPending = item.status === 'Pending Approval';
          let statusBadge = 'bg-amber-500/15 border-amber-500/30 text-amber-300';
          if (item.status === 'Approved') statusBadge = 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300';
          else if (item.status === 'Rejected') statusBadge = 'bg-rose-500/15 border-rose-500/30 text-rose-300';

          return (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold text-blue-400 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
                    {item.id}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 uppercase">
                    {item.type}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    Action Authority: {item.actionableBy.toUpperCase()}
                  </span>
                </div>

                <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono border ${statusBadge}`}>
                  {item.status}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {item.details}
                </p>
              </div>

              {item.reviewNotes && (
                <div className="text-xs text-slate-300 bg-slate-950/80 p-3 rounded-xl border border-slate-800 font-mono">
                  Review Directive: "{item.reviewNotes}"
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800 text-xs text-slate-400">
                <div className="flex items-center gap-3 text-[11px] font-mono">
                  <span>Submitted by: <strong>{item.submittedBy}</strong></span>
                  <span>Date: {item.submissionDate}</span>
                </div>

                {isPending && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setModalItem({ item, action: 'Approved' })}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold text-xs transition flex items-center gap-1.5 shadow"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => setModalItem({ item, action: 'Rejected' })}
                      className="px-3 py-1 bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-rose-200 border border-slate-700 rounded-lg font-semibold text-xs transition flex items-center gap-1.5"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Decision Modal */}
      {modalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md overflow-hidden flex flex-col shadow-2xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <h3 className="font-bold text-white text-sm">
                Confirm Docket Decision: {modalItem.action.toUpperCase()}
              </h3>
              <button
                onClick={() => setModalItem(null)}
                className="text-slate-400 hover:text-white p-1"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmDecision} className="p-5 space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-white">{modalItem.item.title}</div>
                <div className="text-[10px] font-mono text-slate-400">
                  {modalItem.item.id} · {modalItem.item.type}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Official Statutory Directive / Sign-off Note
                </label>
                <textarea
                  rows={3}
                  required
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  placeholder="State legal approval rationale or deficiency requiring correction..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalItem(null)}
                  className="px-4 py-1.5 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-1.5 text-white font-semibold rounded-lg shadow ${
                    modalItem.action === 'Approved' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-rose-600 hover:bg-rose-500'
                  }`}
                >
                  Confirm {modalItem.action}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
