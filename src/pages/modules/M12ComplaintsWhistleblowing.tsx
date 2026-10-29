import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ModuleHeader } from '../../components/common/ModuleHeader';
import { WhistleblowerTicket } from '../../types';
import {
  AlertTriangle,
  ShieldAlert,
  Send,
  CheckCircle,
  Clock,
  Building2,
  Lock,
  ChevronRight,
  Filter
} from 'lucide-react';

export const M12ComplaintsWhistleblowing: React.FC = () => {
  const { whistleblowers, submitWhistleblowerTicket, showToast } = useApp();

  const [companyName, setCompanyName] = useState('');
  const [reporterType, setReporterType] = useState<WhistleblowerTicket['reporterType']>('Apprentice');
  const [category, setCategory] = useState<WhistleblowerTicket['category']>(
    'Excessive Unsupervised Labour (Cheap Labour)'
  );
  const [urgency, setUrgency] = useState<WhistleblowerTicket['urgency']>('High');
  const [description, setDescription] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const operatingGuideSteps = [
    {
      title: 'Confidentiality Shield',
      detail: 'Reporters (whether apprentices, BKK officers, or consortium trainers) are protected by cryptographic whistleblower anonymity.',
    },
    {
      title: 'Cheap-Labour Detection Priority',
      detail: 'Reports indicating excessive shifts, substitution of regular full-time workers, or absence of off-the-job training are fast-tracked.',
    },
    {
      title: 'Joint Provincial Inspection',
      detail: 'Provincial Education Quality teams coordinate with Municipal Manpower (Disnaker) inspectors for on-site audits within 5 working days.',
    },
    {
      title: 'Statutory Sanction Powers',
      detail: 'Offending enterprises face immediate MagangHub intake disqualification and forfeit of government apprenticeship subsidies.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !description) {
      showToast('Please provide both enterprise name and factual description.', 'error');
      return;
    }

    submitWhistleblowerTicket({
      companyName,
      reporterType,
      category,
      urgency,
      description,
    });

    setCompanyName('');
    setDescription('');
  };

  const filteredTickets = whistleblowers.filter((t) => {
    if (filterStatus !== 'All' && t.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      <ModuleHeader
        moduleCode="M12"
        moduleTitle="Anti-Exploitation & Whistleblowing Intake"
        pillarBadge="Governance & Shared Indicator Engine"
        badgeColorClass="border-rose-500/40 text-rose-300 bg-rose-500/10"
        bridgeSentence="Independent reporting channel safeguarding vocational high school apprentices against cheap-labour displacement and unsafe working conditions."
        operatingGuideSteps={operatingGuideSteps}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form: File Confidential Incident */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-rose-400 uppercase tracking-wider">
                Confidential Incident Intake
              </span>
              <span className="text-[10px] font-mono bg-rose-500/15 text-rose-300 border border-rose-500/30 px-2 py-0.2 rounded">
                Protected Channel
              </span>
            </div>
            <h2 className="text-base font-bold text-white mt-1">
              File Apprenticeship Misuse Report
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Reports are transmitted directly to the Joint Provincial Quality and Labour Inspection Taskforce.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Host Enterprise or Consortium Name
              </label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. CV Logam Maju Cikarang"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Reporter Role
                </label>
                <select
                  value={reporterType}
                  onChange={(e) => setReporterType(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                >
                  <option value="Apprentice">Enrolled Apprentice</option>
                  <option value="School BKK Officer">School BKK Case Officer</option>
                  <option value="Training Consortium Mentor">Consortium Training Mentor</option>
                  <option value="Anonymous">Anonymous Observer</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Urgency Level
                </label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                >
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High (Impacting Shifts)</option>
                  <option value="Critical">Critical (Immediate Hazard/Abuse)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Violation Classification
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500"
              >
                <option value="Excessive Unsupervised Labour (Cheap Labour)">Excessive Unsupervised Labour (Cheap Labour)</option>
                <option value="Omission of Weekly Learning Day">Omission of Weekly Learning Day (4+1 Violation)</option>
                <option value="Allowance Withholding">Stipend / Allowance Non-Payment</option>
                <option value="Safety Standard Violation">Occupational Safety / PPE Neglect</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Factual Narrative of Incident
              </label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe specific shifts, absence of mentors, or violation of learning plan tasks..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-rose-500 text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold transition flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30"
            >
              <Send className="w-4 h-4" />
              <span>Submit Whistleblower Complaint</span>
            </button>
          </form>
        </div>

        {/* Right Column: Active Whistleblower Docket */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Inspection Docket
              </div>
              <h3 className="text-base font-bold text-white mt-0.5">
                Active Whistleblower Tickets ({whistleblowers.length})
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">Filter:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white focus:outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Under Review">Under Review</option>
                <option value="Investigation Active">Investigation Active</option>
                <option value="Sanction Issued">Sanction Issued</option>
                <option value="Dismissed">Dismissed</option>
              </select>
            </div>
          </div>

          <div className="space-y-3.5 max-h-[500px] overflow-y-auto">
            {filteredTickets.map((ticket) => {
              let badgeStyle = 'bg-amber-500/10 border-amber-500/30 text-amber-300';
              if (ticket.status === 'Investigation Active') {
                badgeStyle = 'bg-rose-500/15 border-rose-500/40 text-rose-300 animate-pulse';
              } else if (ticket.status === 'Sanction Issued') {
                badgeStyle = 'bg-purple-500/15 border-purple-500/40 text-purple-300';
              }

              return (
                <div
                  key={ticket.id}
                  className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 hover:border-slate-700 transition"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-blue-400">{ticket.id}</span>
                        <span className="font-semibold text-white text-xs">{ticket.companyName}</span>
                      </div>
                      <div className="text-[11px] text-rose-300 font-medium mt-0.5">
                        {ticket.category}
                      </div>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${badgeStyle}`}>
                      {ticket.status}
                    </span>
                  </div>

                  <p className="text-slate-300 text-xs leading-relaxed bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/80">
                    "{ticket.description}"
                  </p>

                  {ticket.responseNote && (
                    <div className="text-[11px] text-amber-300 font-mono bg-amber-500/5 p-2 rounded border border-amber-500/20">
                      Inspector Action: {ticket.responseNote}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-900">
                    <span>Filed by: {ticket.reporterType}</span>
                    <span>{ticket.submittedAt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
