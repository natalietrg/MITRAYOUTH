import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ModuleHeader } from '../../components/common/ModuleHeader';
import { SkillCertificate } from '../../types';
import {
  Award,
  CheckCircle2,
  QrCode,
  Search,
  ExternalLink,
  ShieldCheck,
  Building2,
  Calendar,
  Sparkles,
  FileText,
  UserCheck,
  AlertCircle
} from 'lucide-react';

export const M03SkillsCertificates: React.FC = () => {
  const {
    certificates,
    graduates,
    addSkillCertificate,
    verifyPortalCode,
    setVerifyPortalCode,
    showToast,
  } = useApp();

  // Form State for Issuing new certificate
  const [selectedGraduateId, setSelectedGraduateId] = useState<string>(graduates[1]?.id || graduates[0]?.id || '');
  const [assessorName, setAssessorName] = useState('Ir. H. Dedi Mulyadi (BNSP-Certified)');
  const [assessorCompany, setAssessorCompany] = useState('PT Astra Otoparts Tbk');
  const [assessorAccreditationId, setAssessorAccreditationId] = useState('BNSP-ASM-2026-9041');
  const [assessmentScore, setAssessmentScore] = useState<number>(92.5);
  const [grade, setGrade] = useState<'Competent with Distinction' | 'Competent'>('Competent with Distinction');
  const [competencyInput, setCompetencyInput] = useState('PLC Troubleshooting & Ladder Optimization, Hydraulic Proportional Valves, ISO 9001 Line Inspection');

  // SIAPkerja Verification Portal Test state
  const [inputCode, setInputCode] = useState(verifyPortalCode || 'SK-2026-CMH-8921');
  const [verificationResult, setVerificationResult] = useState<SkillCertificate | null>(
    certificates.find((c) => c.siapKerjaCode === (verifyPortalCode || 'SK-2026-CMH-8921')) || certificates[0] || null
  );
  const [verificationAttempted, setVerificationAttempted] = useState(true);

  const operatingGuideSteps = [
    {
      title: 'Mandatory External Assessor',
      detail: 'Every school-based competency exam must be co-certified by at least one independent industry assessor holding valid BNSP credentials.',
    },
    {
      title: 'Direct SIAPkerja Ledger Sync',
      detail: 'Graduation assessment scores are hashed and written to the SIAPkerja national worker database, generating a unique verification code.',
    },
    {
      title: 'QR Code Anti-Tamper Seal',
      detail: 'Digital diplomas embed a cryptographic QR code that allows recruiting employers to verify competencies in 1 second without physical seals.',
    },
    {
      title: 'Pre-Apprenticeship Baseline',
      detail: 'The certified competencies establish the baseline against which host employers evaluate progress during Pillar P1.',
    },
  ];

  const handleIssueCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGraduateId) {
      showToast('Please select a graduate.', 'error');
      return;
    }

    const comps = competencyInput.split(',').map((s) => s.trim()).filter(Boolean);

    const newCert = addSkillCertificate({
      graduateId: selectedGraduateId,
      externalAssessorName: assessorName,
      externalAssessorCompany: assessorCompany,
      assessorAccreditationId: assessorAccreditationId,
      assessmentDate: new Date().toISOString().split('T')[0],
      competencies: comps,
      score: assessmentScore,
      grade,
    });

    setInputCode(newCert.siapKerjaCode);
    setVerificationResult(newCert);
    setVerificationAttempted(true);
  };

  const handleVerifyOnSiapKerja = () => {
    const clean = inputCode.trim().toUpperCase();
    const found = certificates.find((c) => c.siapKerjaCode.toUpperCase() === clean);
    setVerificationResult(found || null);
    setVerificationAttempted(true);

    if (found) {
      showToast(`SIAPkerja Record Verified for ${found.graduateName}!`, 'success');
    } else {
      showToast(`Code "${clean}" not found on SIAPkerja registry.`, 'warning');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <ModuleHeader
        moduleCode="M03"
        moduleTitle="Skills Assessment & SIAPkerja Digital Certificates"
        pillarBadge="P2: Verified Skills Identity"
        badgeColorClass="border-blue-500/40 text-blue-400 bg-blue-500/10"
        bridgeSentence="By pairing school assessments with external industry assessors and instant SIAPkerja verification, MITRA restores employer trust in vocational diplomas."
        operatingGuideSteps={operatingGuideSteps}
      />

      {/* Top Banner: Verification Portal Simulator */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/70 via-slate-900 to-indigo-950/70 border border-blue-500/40 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/20 border border-blue-500/40 rounded-xl text-blue-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-blue-400 uppercase tracking-wider">
                  Employer Verification Portal
                </span>
                <span className="px-2 py-0.2 rounded text-[10px] font-mono bg-blue-500/20 text-blue-200 border border-blue-500/30">
                  SIAPkerja Live Gateway
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Instant SIAPkerja Digital Credential Lookup
              </h2>
            </div>
          </div>

          <div className="text-xs text-slate-400 font-mono">
            Directly testable by recruiting HR managers
          </div>
        </div>

        {/* Verification Input Strip */}
        <div className="flex flex-col sm:flex-row items-center gap-3 max-w-2xl">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="e.g. SK-2026-CMH-8921"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              className="w-full bg-slate-950/90 border border-slate-700 rounded-xl px-4 py-2.5 font-mono text-sm text-white placeholder-slate-500 uppercase tracking-wide focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            onClick={handleVerifyOnSiapKerja}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-blue-600/30"
          >
            <Search className="w-4 h-4" />
            <span>Verify on SIAPkerja</span>
          </button>
        </div>

        {/* Verification Result Display */}
        {verificationAttempted && (
          <div className="mt-5 pt-5 border-t border-slate-800">
            {verificationResult ? (
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  {/* QR Code Placeholder */}
                  <div className="p-2 bg-white rounded-lg shrink-0 shadow">
                    <QrCode className="w-12 h-12 text-slate-950" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        VERIFIED ON SIAPKERJA
                      </span>
                      <span className="font-mono text-xs text-slate-300">
                        Code: {verificationResult.siapKerjaCode}
                      </span>
                    </div>
                    <div className="text-base font-extrabold text-white mt-1">
                      {verificationResult.graduateName}{' '}
                      <span className="text-xs font-mono font-normal text-slate-400">
                        (NISN {verificationResult.graduateNisn})
                      </span>
                    </div>
                    <div className="text-xs text-slate-300">
                      {verificationResult.schoolName} — {verificationResult.programme}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 font-mono">
                      External Industry Assessor: <strong className="text-slate-200">{verificationResult.externalAssessorName}</strong> ({verificationResult.externalAssessorCompany})
                    </div>
                  </div>
                </div>

                <div className="text-right md:border-l md:border-slate-800 md:pl-5 shrink-0">
                  <div className="text-2xl font-black font-mono text-emerald-400">
                    {verificationResult.score}/100
                  </div>
                  <div className="text-xs font-semibold text-white">{verificationResult.grade}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-1">
                    Issued: {verificationResult.issuedAt}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/40 flex items-center gap-3 text-rose-300 text-xs">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                <div>
                  <strong>NOT FOUND ON SIAPKERJA REGISTRY:</strong> The code "{inputCode}" does not match any accredited SMK competency assessment. Suspected counterfeit or unindexed record.
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 2 Columns: Issue Certificate Form & Registry of Verified Certificates */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form: Add External Assessor & Issue Certificate */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <div className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
              P2 Assessor Desk
            </div>
            <h3 className="text-base font-bold text-white mt-0.5">
              Record External Industry Assessment
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Co-conducted by school department head and BNSP-certified industry partner.
            </p>
          </div>

          <form onSubmit={handleIssueCertificate} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Select Graduating Student
              </label>
              <select
                value={selectedGraduateId}
                onChange={(e) => setSelectedGraduateId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                {graduates.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name} ({g.programme} - {g.schoolName})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                External Industry Assessor Name (BNSP Accredited)
              </label>
              <input
                type="text"
                required
                value={assessorName}
                onChange={(e) => setAssessorName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Assessor Enterprise
                </label>
                <input
                  type="text"
                  required
                  value={assessorCompany}
                  onChange={(e) => setAssessorCompany(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  BNSP Accreditation No.
                </label>
                <input
                  type="text"
                  required
                  value={assessorAccreditationId}
                  onChange={(e) => setAssessorAccreditationId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500 font-mono text-[11px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Competency Score (0–100)
                </label>
                <input
                  type="number"
                  min="50"
                  max="100"
                  step="0.5"
                  value={assessmentScore}
                  onChange={(e) => setAssessmentScore(parseFloat(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Certified Grade
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Competent with Distinction">Competent with Distinction</option>
                  <option value="Competent">Competent</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Certified Competency Units (Comma Separated)
              </label>
              <textarea
                rows={2}
                value={competencyInput}
                onChange={(e) => setCompetencyInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
            >
              <Award className="w-4 h-4" />
              <span>Issue Verified Certificate to SIAPkerja</span>
            </button>
          </form>
        </div>

        {/* List of Verified Certificates */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                SIAPkerja National Repository
              </div>
              <h3 className="text-base font-bold text-white mt-0.5">
                Active Verified Credentials ({certificates.length})
              </h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Synchronized
            </span>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[500px]">
            {certificates.map((cert) => (
              <div
                key={cert.certificateId}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition space-y-2 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{cert.graduateName}</span>
                      <span className="font-mono text-[10px] text-slate-400">({cert.graduateNisn})</span>
                    </div>
                    <div className="text-xs text-slate-300">
                      {cert.schoolName} · <span className="text-blue-300">{cert.programme}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/15 border border-blue-500/30 text-blue-300">
                      {cert.siapKerjaCode}
                    </span>
                    <div className="font-mono font-bold text-emerald-400 text-xs mt-1">
                      {cert.score}/100
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400">
                  External Assessor: <strong className="text-slate-200">{cert.externalAssessorName}</strong> ({cert.externalAssessorCompany})
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  {cert.competencies.map((c, i) => (
                    <span key={i} className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                      {c}
                    </span>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>Issued: {cert.issuedAt}</span>
                  <button
                    onClick={() => {
                      setInputCode(cert.siapKerjaCode);
                      setVerificationResult(cert);
                      setVerificationAttempted(true);
                      showToast(`Loaded ${cert.siapKerjaCode} into verification simulator.`, 'info');
                    }}
                    className="text-blue-400 hover:underline flex items-center gap-1 font-sans"
                  >
                    <span>Test Verify</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
