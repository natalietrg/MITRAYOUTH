import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ModuleHeader } from '../../components/common/ModuleHeader';
import { ReferralRecord } from '../../types';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock,
  Send,
  UserCheck,
  Filter,
  Search,
  ExternalLink,
  Briefcase
} from 'lucide-react';

export const M08ReferralTracker: React.FC = () => {
  const { referrals, updateReferralStatus } = useApp();
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [activeUpdateTarget, setActiveUpdateTarget] = useState<ReferralRecord | null>(null);
  const [newStatus, setNewStatus] = useState<ReferralRecord['status']>('Service Offered');
  const [serviceTypeInput, setServiceTypeInput] = useState('');

  const operatingGuideSteps = [
    {
      title: 'Institutional Handoff (BKK → Disnaker)',
      detail: 'Unplaced graduates after Month 3 are transferred from the high school BKK into the municipal manpower employment services registry.',
    },
    {
      title: 'Active Reception by Disnaker Officer',
      detail: 'The municipal manpower office confirms receipt and assigns a dedicated public employment counselor.',
    },
    {
      title: 'Public Active Labour Market Programme Matching',
      detail: 'Disnaker enrolls the youth into subsidized regional job fairs, BLK advanced technical upskilling, or wage-subsidy schemes.',
    },
    {
      title: 'Final Outcome Verification',
      detail: 'When the referred graduate obtains a formal job, the case is marked "Placed" and reported back to the 12-month indicator engine.',
    },
  ];

  const filteredReferrals = referrals.filter((r) => {
    if (selectedStatus !== 'All' && r.status !== selectedStatus) return false;
    return true;
  });

  const statusCounts = {
    Sent: referrals.filter((r) => r.status === 'Sent').length,
    Received: referrals.filter((r) => r.status === 'Received').length,
    'Service Offered': referrals.filter((r) => r.status === 'Service Offered').length,
    Placed: referrals.filter((r) => r.status === 'Placed').length,
  };

  const handleSaveStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeUpdateTarget) return;

    updateReferralStatus(activeUpdateTarget.id, newStatus, serviceTypeInput || activeUpdateTarget.serviceTypeOffered);
    setActiveUpdateTarget(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <ModuleHeader
        moduleCode="M08"
        moduleTitle="Municipal Manpower (Disnaker) Referral Tracker"
        pillarBadge="P4: Referral & Assistance"
        badgeColorClass="border-purple-500/40 text-purple-400 bg-purple-500/10"
        bridgeSentence="Closing the institutional divide between schools and manpower offices by tracking unplaced vocational youth until formal employment."
        operatingGuideSteps={operatingGuideSteps}
      />

      {/* Pipeline Status Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Sent by School BKK', count: statusCounts.Sent, color: 'text-slate-300', border: 'border-slate-800' },
          { label: 'Received by Disnaker', count: statusCounts.Received, color: 'text-blue-400', border: 'border-blue-500/30' },
          { label: 'Service / Training Offered', count: statusCounts['Service Offered'], color: 'text-amber-400', border: 'border-amber-500/30' },
          { label: 'Placed into Formal Work', count: statusCounts.Placed, color: 'text-emerald-400', border: 'border-emerald-500/30' },
        ].map((item) => (
          <div key={item.label} className={`p-4 rounded-2xl bg-slate-900/80 border ${item.border}`}>
            <div className="text-[11px] font-mono text-slate-400">{item.label}</div>
            <div className={`text-2xl sm:text-3xl font-extrabold font-mono mt-1 ${item.color}`}>
              {item.count}
            </div>
          </div>
        ))}
      </div>

      {/* Referrals Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-400">FILTER STATUS:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none"
            >
              <option value="All">All Referral Stages ({referrals.length})</option>
              <option value="Sent">Sent</option>
              <option value="Received">Received</option>
              <option value="Service Offered">Service Offered</option>
              <option value="Placed">Placed</option>
            </select>
          </div>
          <div className="text-xs font-mono text-slate-400">
            Active Municipal Manpower Interventions
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/40 text-slate-400 font-mono">
                <th className="p-3.5 font-medium">REFERRAL ID & GRADUATE</th>
                <th className="p-3.5 font-medium">ORIGIN SCHOOL</th>
                <th className="p-3.5 font-medium">TARGET DISNAKER OFFICE</th>
                <th className="p-3.5 font-medium">OFFERED SERVICE TYPE</th>
                <th className="p-3.5 font-medium">STATUS</th>
                <th className="p-3.5 font-medium text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredReferrals.map((r) => {
                let badgeClass = 'bg-slate-800 text-slate-400 border-slate-700';
                if (r.status === 'Placed') badgeClass = 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300';
                else if (r.status === 'Service Offered') badgeClass = 'bg-amber-500/15 border-amber-500/30 text-amber-300';
                else if (r.status === 'Received') badgeClass = 'bg-blue-500/15 border-blue-500/30 text-blue-300';

                return (
                  <tr key={r.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-3.5">
                      <div className="font-semibold text-white">{r.graduateName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {r.id} · NISN {r.nisn}
                      </div>
                    </td>

                    <td className="p-3.5">
                      <div className="text-slate-200">{r.schoolName}</div>
                      <div className="text-[10px] text-slate-400">{r.programme}</div>
                    </td>

                    <td className="p-3.5">
                      <div className="text-slate-200 font-medium">{r.targetDisnakerOffice}</div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        Referred: {r.referredDate} · Case Officer: {r.caseOfficer}
                      </div>
                    </td>

                    <td className="p-3.5">
                      <div className="text-slate-300 max-w-xs">{r.serviceTypeOffered || 'Triage in progress'}</div>
                    </td>

                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${badgeClass}`}>
                        {r.status}
                      </span>
                    </td>

                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => {
                          setActiveUpdateTarget(r);
                          setNewStatus(r.status);
                          setServiceTypeInput(r.serviceTypeOffered || '');
                        }}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 transition"
                      >
                        Update Stage
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update Referral Status Modal */}
      {activeUpdateTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md overflow-hidden flex flex-col shadow-2xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <h3 className="font-bold text-white text-sm">
                Update Disnaker Referral Progression
              </h3>
              <button
                onClick={() => setActiveUpdateTarget(null)}
                className="text-slate-400 hover:text-white p-1"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveStatus} className="p-5 space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-white">{activeUpdateTarget.graduateName}</div>
                <div className="text-slate-400 font-mono">
                  {activeUpdateTarget.targetDisnakerOffice}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Updated Referral Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="Sent">Sent (Awaiting Disnaker Receipt)</option>
                  <option value="Received">Received (Assigned Case Officer)</option>
                  <option value="Service Offered">Service Offered (Enrolled in ALMP/BLK)</option>
                  <option value="Placed">Placed (Formal Employment Secured)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Active Service / Programme Details
                </label>
                <input
                  type="text"
                  value={serviceTypeInput}
                  onChange={(e) => setServiceTypeInput(e.target.value)}
                  placeholder="e.g. Greater Bandung Manufacturing Job Fair & BLK CNC Certification"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveUpdateTarget(null)}
                  className="px-4 py-1.5 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg shadow"
                >
                  Save Progression
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
