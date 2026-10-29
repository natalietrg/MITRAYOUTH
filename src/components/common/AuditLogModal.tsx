import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Download, Search, X, CheckCircle, Hash } from 'lucide-react';

export const AuditLogModal: React.FC = () => {
  const { isAuditModalOpen, setIsAuditModalOpen, auditLogs, showToast } = useApp();
  const [filterQuery, setFilterQuery] = useState('');

  if (!isAuditModalOpen) return null;

  const filteredLogs = auditLogs.filter(
    (log) =>
      log.id.toLowerCase().includes(filterQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(filterQuery.toLowerCase()) ||
      log.actor.toLowerCase().includes(filterQuery.toLowerCase()) ||
      log.target.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const handleExport = () => {
    const jsonStr = JSON.stringify(auditLogs, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mitra-audit-log-2026.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Audit log export file generated successfully.', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-5xl max-h-[85vh] flex flex-col shadow-2xl shadow-black/80 overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">Audit Log and Data Protection Trail</h2>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                  <CheckCircle className="w-3.5 h-3.5" /> Hash integrity valid
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Immutable, real-time activity ledger for administrative data linkages, lottery outcomes, and case referrals under Law 27/2022.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAuditModalOpen(false)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="px-5 py-3 border-b border-slate-800/80 bg-slate-900/50 flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by Log ID, action, actor, or target..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full bg-slate-950/70 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">
              Showing {filteredLogs.length} of {auditLogs.length} events
            </span>
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 rounded-lg border border-slate-700 transition"
            >
              <Download className="w-3.5 h-3.5" /> Export JSON
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-y-auto p-5 flex-1 space-y-2">
          {filteredLogs.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              No audit records matched your filter criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono">
                    <th className="pb-2.5 font-medium">LOG ID</th>
                    <th className="pb-2.5 font-medium">TIMESTAMP (WIB)</th>
                    <th className="pb-2.5 font-medium">ACTION TYPE</th>
                    <th className="pb-2.5 font-medium">ACTOR & ROLE</th>
                    <th className="pb-2.5 font-medium">TARGET / OUTCOME</th>
                    <th className="pb-2.5 font-medium text-right">HASH (SHA-256)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-800/40 transition-colors group">
                      <td className="py-3 font-mono text-blue-400 font-semibold whitespace-nowrap">
                        {log.id}
                      </td>
                      <td className="py-3 text-slate-300 font-mono text-[11px] whitespace-nowrap">
                        {log.timestamp}
                      </td>
                      <td className="py-3 font-mono font-medium">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                          {log.action}
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="text-slate-200 font-medium">{log.actor}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{log.actorRole}</div>
                      </td>
                      <td className="py-3 text-slate-300 max-w-sm text-xs leading-snug">
                        {log.target}
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-1 font-mono text-[11px] text-slate-400 group-hover:text-emerald-400 transition">
                          <Hash className="w-3 h-3 text-emerald-500/60" />
                          <span>{log.hash.substring(0, 16)}...</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between text-xs text-slate-400">
          <span>Protected under Indonesian Law No. 27/2022 on Personal Data Protection.</span>
          <button
            onClick={() => setIsAuditModalOpen(false)}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition"
          >
            Close Log
          </button>
        </div>
      </div>
    </div>
  );
};
