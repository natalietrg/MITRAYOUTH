import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ModuleHeader } from '../../components/common/ModuleHeader';
import {
  Shield,
  Lock,
  CheckCircle2,
  FileCheck,
  Scale,
  Users,
  Database,
  Eye,
  Sliders,
  ExternalLink
} from 'lucide-react';

export const M11PrivacyGovernance: React.FC = () => {
  const { showToast } = useApp();

  // Institution Data Sharing Agreements state
  const [agreements, setAgreements] = useState([
    {
      institution: 'Ministry of Manpower (Kemnaker) — MagangHub',
      scope: 'Apprenticeship placement records, blended attendance, and subsidy validation',
      status: 'Active & Ratified',
      enabled: true,
    },
    {
      institution: 'SIAPkerja National Skills Registry',
      scope: 'Digital competency certificates and external assessor accreditation hashes',
      status: 'Active & Ratified',
      enabled: true,
    },
    {
      institution: 'BPJS Ketenagakerjaan (Social Security)',
      scope: 'Binary formal employment contribution verification at Months 6 & 12 (No wage amounts exported)',
      status: 'Active & Ratified',
      enabled: true,
    },
    {
      institution: 'Kemendikdasmen — SMK Tracer Study Directorate',
      scope: 'Pre-graduation student profiling and curriculum tracking census feeds',
      status: 'Active & Ratified',
      enabled: true,
    },
    {
      institution: 'National Vocational School BKK Association',
      scope: '12-Month case management contact schedules and municipal Disnaker referral receipts',
      status: 'Active & Ratified',
      enabled: true,
    },
  ]);

  // Data Minimization Checklist state
  const [minimizationChecks, setMinimizationChecks] = useState([
    { id: 'MC-1', label: 'Only NISN and National ID (NIK) used as pseudonymous join keys', passed: true },
    { id: 'MC-2', label: 'Wage and monetary figures stripped prior to transmission (Binary employment flag only)', passed: true },
    { id: 'MC-3', label: 'No biometric, family financial, or banking credentials ingested or requested', passed: true },
    { id: 'MC-4', label: 'Automatic cryptographic purge of raw administrative logs after 24-month retention window', passed: true },
    { id: 'MC-5', label: 'All public disclosures enforced at school-by-programme minimum cohort aggregation (k ≥ 10)', passed: true },
  ]);

  const operatingGuideSteps = [
    {
      title: 'Law No. 27/2022 Legal Architecture',
      detail: 'Operates strictly within Indonesia’s Personal Data Protection Law (UU PDP), requiring explicit affirmative consent before any cross-agency data joins.',
    },
    {
      title: 'Data Minimization Principle',
      detail: 'Limits data ingestion to the bare minimum necessary to calculate the 12-month employment indicator. No sensitive financial or family records are ever processed.',
    },
    {
      title: 'Role-Based Access Control (RBAC)',
      detail: 'Restricts graduate record access strictly according to institutional mandates. Employers can only view verified certificates, never private contact logs.',
    },
    {
      title: 'Data Protection Impact Assessment (DPIA)',
      detail: 'Annual DPIA audited by external privacy regulators ensures technical and organizational safeguards remain robust.',
    },
  ];

  const handleToggleAgreement = (idx: number) => {
    const updated = [...agreements];
    updated[idx].enabled = !updated[idx].enabled;
    setAgreements(updated);
    showToast(
      `Data sharing connector for ${updated[idx].institution} set to ${updated[idx].enabled ? 'ENABLED' : 'PAUSED'}.`,
      'info'
    );
  };

  const handleToggleCheck = (id: string) => {
    setMinimizationChecks((prev) =>
      prev.map((c) => (c.id === id ? { ...c, passed: !c.passed } : c))
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <ModuleHeader
        moduleCode="M11"
        moduleTitle="Privacy & Consent Governance (UU No. 27/2022)"
        pillarBadge="Governance & Shared Indicator Engine"
        badgeColorClass="border-slate-500/40 text-slate-300 bg-slate-500/10"
        bridgeSentence="Enforcing statutory personal data protection across all four Indonesian systems with transparent inter-agency agreements and rigorous data minimization."
        operatingGuideSteps={operatingGuideSteps}
      />

      {/* Statutory Alignment Card */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-400 shrink-0 mt-0.5">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-blue-400 uppercase tracking-wider">
                Regulatory Compliance Status
              </span>
              <span className="px-2 py-0.2 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                Law No. 27/2022 Certified
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-white mt-1">
              Personal Data Protection (UU PDP) Governance Architecture
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              All cross-ministerial data flows are bound by bilateral Memoranda of Understanding (MoUs). Aggregate school indicators prevent reverse-identification of individual students.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 shrink-0">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span>DPIA Score: 98.4/100</span>
        </div>
      </div>

      {/* 2 Columns: Inter-Agency Agreements & Data Minimisation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Inter-Institutional Data Sharing Agreements */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Bilateral Protocols
              </div>
              <h3 className="text-base font-bold text-white mt-0.5">
                Active Inter-Agency Data Sharing Agreements
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              5 Agency Connectors
            </span>
          </div>

          <div className="space-y-3">
            {agreements.map((agr, idx) => (
              <div
                key={agr.institution}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start justify-between gap-4"
              >
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{agr.institution}</span>
                    <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {agr.status}
                    </span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">{agr.scope}</p>
                </div>

                <button
                  onClick={() => handleToggleAgreement(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition shrink-0 ${
                    agr.enabled
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {agr.enabled ? 'Connected' : 'Paused'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Data Minimisation Checklist */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-800 pb-3 mb-4">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Statutory Safeguards
              </div>
              <h3 className="text-base font-bold text-white mt-0.5">
                Data Minimization Checklist
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Strict adherence to data parsimony under Article 16 of UU PDP 2022.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              {minimizationChecks.map((check) => (
                <div
                  key={check.id}
                  onClick={() => handleToggleCheck(check.id)}
                  className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3 cursor-pointer hover:border-slate-700 transition"
                >
                  <input
                    type="checkbox"
                    checked={check.passed}
                    onChange={() => {}}
                    className="mt-0.5 w-4 h-4 rounded text-blue-600 border-slate-700 focus:ring-0 cursor-pointer"
                  />
                  <span className="text-slate-300 leading-relaxed font-medium">
                    {check.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] text-slate-400">
            Compliant with Law No. 27/2022 on Personal Data Protection. Secure standard TLS 1.3 protocol and SHA-256 integrity verification.
          </div>
        </div>
      </div>

      {/* Role-Based Access Control (RBAC) Matrix */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="border-b border-slate-800 pb-3">
          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            Permission Topology
          </div>
          <h3 className="text-base font-bold text-white mt-0.5">
            Role-Based Access Matrix (Principle of Least Privilege)
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/70 text-slate-400">
                <th className="p-3 font-medium">ROLE CATEGORY</th>
                <th className="p-3 font-medium text-center">ANONYMIZED STATS</th>
                <th className="p-3 font-medium text-center">INDIVIDUAL STUDENT NISN</th>
                <th className="p-3 font-medium text-center">VERIFY DIGITAL CERT</th>
                <th className="p-3 font-medium text-center">EXECUTE LOTTERY SEED</th>
                <th className="p-3 font-medium text-center">TRIGGER QA REVIEW</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-bold text-white font-mono">Central Ministry (Kemnaker)</td>
                <td className="p-3 text-center text-emerald-400 font-mono">✓ Full</td>
                <td className="p-3 text-center text-slate-500 font-mono">— (Hashed)</td>
                <td className="p-3 text-center text-emerald-400 font-mono">✓ Full</td>
                <td className="p-3 text-center text-emerald-400 font-mono">✓ Full</td>
                <td className="p-3 text-center text-emerald-400 font-mono">✓ Full</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-bold text-white font-mono">Provincial Education Office</td>
                <td className="p-3 text-center text-emerald-400 font-mono">✓ Full</td>
                <td className="p-3 text-center text-slate-500 font-mono">— (Cohort Only)</td>
                <td className="p-3 text-center text-emerald-400 font-mono">✓ Full</td>
                <td className="p-3 text-center text-slate-500 font-mono">— (Inspect Only)</td>
                <td className="p-3 text-center text-emerald-400 font-mono">✓ Full</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-bold text-white font-mono">School Placement Unit (BKK)</td>
                <td className="p-3 text-center text-emerald-400 font-mono">✓ School Only</td>
                <td className="p-3 text-center text-emerald-400 font-mono">✓ Own Students</td>
                <td className="p-3 text-center text-emerald-400 font-mono">✓ Full</td>
                <td className="p-3 text-center text-slate-500 font-mono">—</td>
                <td className="p-3 text-center text-slate-500 font-mono">—</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-bold text-white font-mono">Host Employer / Consortium</td>
                <td className="p-3 text-center text-slate-500 font-mono">—</td>
                <td className="p-3 text-center text-slate-500 font-mono">—</td>
                <td className="p-3 text-center text-emerald-400 font-mono">✓ Full via Code</td>
                <td className="p-3 text-center text-slate-500 font-mono">—</td>
                <td className="p-3 text-center text-slate-500 font-mono">—</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-bold text-white font-mono">SMK Graduate (Student)</td>
                <td className="p-3 text-center text-emerald-400 font-mono">✓ Public Dash</td>
                <td className="p-3 text-center text-emerald-400 font-mono">✓ Own Profile</td>
                <td className="p-3 text-center text-emerald-400 font-mono">✓ Own Record</td>
                <td className="p-3 text-center text-slate-500 font-mono">—</td>
                <td className="p-3 text-center text-slate-500 font-mono">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
