import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ModuleHeader } from '../../components/common/ModuleHeader';
import { DEMO_ROLES } from '../../data/mockData';
import {
  Users,
  UserPlus,
  KeyRound,
  Shield,
  Building2,
  Mail,
  CheckCircle,
  X,
  Search,
  Lock
} from 'lucide-react';

export const M14UserManagement: React.FC = () => {
  const { showToast, addAuditLog } = useApp();

  const [users, setUsers] = useState([
    {
      id: 'USR-001',
      name: 'Bambang Soeprapto, M.P.A.',
      email: 'bambang.s@kemnaker.go.id',
      institution: 'Ministry of Manpower (Kemnaker) — MagangHub',
      role: 'Central Authority',
      status: 'Active',
      lastLogin: '2026-10-28 14:10 WIB',
    },
    {
      id: 'USR-002',
      name: 'Dr. Ratna Kartikasari, M.Ed.',
      email: 'ratna.k@disdik.jabarprov.go.id',
      institution: 'West Java Provincial Education Office',
      role: 'Provincial QA',
      status: 'Active',
      lastLogin: '2026-10-28 11:22 WIB',
    },
    {
      id: 'USR-003',
      name: 'Agus Hidayat, S.Pd.',
      email: 'bkk@smkn1cimahi.sch.id',
      institution: 'BKK SMKN 1 Cimahi',
      role: 'School Placement Unit (BKK)',
      status: 'Active',
      lastLogin: '2026-10-28 10:05 WIB',
    },
    {
      id: 'USR-004',
      name: 'Hendra Wibowo, S.T.',
      email: 'h.wibowo@akebono-astra.co.id',
      institution: 'PT Akebono Brake / SME Precision Consortium',
      role: 'Host Company / Consortium',
      status: 'Active',
      lastLogin: '2026-10-27 16:40 WIB',
    },
    {
      id: 'USR-005',
      name: 'Rian Pratama',
      email: 'rian.pratama2026@gmail.com',
      institution: 'SMKN 1 Cimahi Alumni (NISN 0078129341)',
      role: 'SMK Graduate',
      status: 'Active',
      lastLogin: '2026-10-28 09:15 WIB',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserInst, setNewUserInst] = useState('');
  const [newUserRole, setNewUserRole] = useState('School Placement Unit (BKK)');

  const operatingGuideSteps = [
    {
      title: 'Institutional Identity Provisioning',
      detail: 'Accounts are mapped directly to official educational master registries (NPSN) and corporate tax IDs (NPWP).',
    },
    {
      title: 'Graduating Student Automatic Account Provisioning',
      detail: 'Students are automatically provisioned using their national student number (NISN) at Month -2 before graduation.',
    },
    {
      title: 'Zero-Trust Credential Rotation',
      detail: 'Administrative passwords enforce multi-factor authentication and quarterly token refresh.',
    },
    {
      title: 'Audit Logging of Privilege Escalation',
      detail: 'Any permission assignment or password reset is permanently recorded in the SHA-256 audit ledger.',
    },
  ];

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `USR-00${users.length + 1}`;
    const newUser = {
      id,
      name: newUserName,
      email: newUserEmail,
      institution: newUserInst,
      role: newUserRole,
      status: 'Active',
      lastLogin: 'Just now',
    };

    setUsers([...users, newUser]);
    addAuditLog('USER_ACCOUNT_PROVISIONED', `Created user ${newUserName} (${newUserRole}) at ${newUserInst}`);
    showToast(`User ${newUserName} provisioned successfully!`, 'success');

    setIsAddUserOpen(false);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserInst('');
  };

  const handleResetPassword = (userName: string) => {
    addAuditLog('USER_PASSWORD_RESET', `Password reset token generated for ${userName}`);
    showToast(`Password reset link dispatched to ${userName}.`, 'info');
  };

  const filteredUsers = users.filter((u) => {
    if (
      searchQuery &&
      !u.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !u.email.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !u.institution.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      <ModuleHeader
        moduleCode="M14"
        moduleTitle="Role-Based Identity & User Governance"
        pillarBadge="Governance & Shared Indicator Engine"
        badgeColorClass="border-slate-500/40 text-slate-300 bg-slate-500/10"
        bridgeSentence="Central registry managing institutional credentials across ministries, education offices, vocational schools, and employers."
        operatingGuideSteps={operatingGuideSteps}
      />

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search accounts by name, email, or institution..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          onClick={() => setIsAddUserOpen(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Provision New Account</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/70 text-slate-400 font-mono">
                <th className="p-3.5 font-medium">NAME & USER ID</th>
                <th className="p-3.5 font-medium">INSTITUTION</th>
                <th className="p-3.5 font-medium">AUTHORITY ROLE</th>
                <th className="p-3.5 font-medium">STATUS</th>
                <th className="p-3.5 font-medium">LAST SESSION</th>
                <th className="p-3.5 font-medium text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-3.5">
                    <div className="font-semibold text-white">{u.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{u.email} · {u.id}</div>
                  </td>

                  <td className="p-3.5 text-slate-200">
                    {u.institution}
                  </td>

                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 border border-blue-500/30 text-blue-300">
                      {u.role}
                    </span>
                  </td>

                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                      {u.status}
                    </span>
                  </td>

                  <td className="p-3.5 font-mono text-[11px] text-slate-400">
                    {u.lastLogin}
                  </td>

                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => handleResetPassword(u.name)}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-mono transition flex items-center gap-1 ml-auto border border-slate-700"
                    >
                      <KeyRound className="w-3 h-3 text-amber-400" />
                      <span>Reset Token</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md overflow-hidden flex flex-col shadow-2xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <h3 className="font-bold text-white text-sm">Provision New Institutional User</h3>
              <button
                onClick={() => setIsAddUserOpen(false)}
                className="text-slate-400 hover:text-white p-1"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="e.g. Ir. Sukardi, M.T."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Official Email</label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="e.g. sukardi@disdik.jatengprov.go.id"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Institution / Entity</label>
                <input
                  type="text"
                  required
                  value={newUserInst}
                  onChange={(e) => setNewUserInst(e.target.value)}
                  placeholder="e.g. Dinas Pendidikan Provinsi Jawa Tengah"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Authority Role</label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Central Authority">Central Authority (Kemnaker)</option>
                  <option value="Provincial QA">Provincial QA (Dinas Pendidikan)</option>
                  <option value="School Placement Unit (BKK)">School Placement Unit (BKK)</option>
                  <option value="Host Company / Consortium">Host Company / Consortium</option>
                  <option value="SMK Graduate">SMK Graduate</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddUserOpen(false)}
                  className="px-4 py-1.5 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow"
                >
                  Provision User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
