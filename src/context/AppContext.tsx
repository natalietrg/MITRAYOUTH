import React, { createContext, useContext, useState, useMemo } from 'react';
import {
  RoleType,
  RoleInfo,
  Placement,
  Graduate,
  SkillCertificate,
  SupervisorReference,
  ProgrammeOutcome,
  ReferralRecord,
  AuditLogEntry,
  WhistleblowerTicket,
  ApprovalItem,
  LearningPlanItem
} from '../types';
import {
  DEMO_ROLES,
  INITIAL_PLACEMENTS,
  INITIAL_GRADUATES,
  INITIAL_CERTIFICATES,
  INITIAL_PROGRAMME_OUTCOMES,
  INITIAL_REFERRALS,
  INITIAL_WHISTLEBLOWERS,
  INITIAL_APPROVALS,
  INITIAL_AUDIT_LOGS
} from '../data/mockData';

interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  currentView: 'landing' | 'dashboard';
  setCurrentView: (view: 'landing' | 'dashboard') => void;
  currentRole: RoleType;
  currentRoleInfo: RoleInfo;
  setCurrentRole: (role: RoleType) => void;
  activeModule: string;
  setActiveModule: (moduleId: string) => void;
  
  // State Collections
  placements: Placement[];
  graduates: Graduate[];
  certificates: SkillCertificate[];
  programmeOutcomes: ProgrammeOutcome[];
  referrals: ReferralRecord[];
  whistleblowers: WhistleblowerTicket[];
  approvals: ApprovalItem[];
  auditLogs: AuditLogEntry[];
  
  // Modals
  isAuditModalOpen: boolean;
  setIsAuditModalOpen: (open: boolean) => void;
  isRoadmapModalOpen: boolean;
  setIsRoadmapModalOpen: (open: boolean) => void;
  isIndicatorModalOpen: boolean;
  setIsIndicatorModalOpen: (open: boolean) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  verifyPortalCode: string;
  setVerifyPortalCode: (code: string) => void;

  // Actions
  runLotteryForPlacement: (placementId: string) => { seed: string; selectedCount: number };
  triggerRandomPlacementAudit: (placementId: string) => void;
  updateLearningPlan: (placementId: string, items: LearningPlanItem[], approved: boolean) => void;
  addSkillCertificate: (certData: {
    graduateId: string;
    externalAssessorName: string;
    externalAssessorCompany: string;
    assessorAccreditationId: string;
    assessmentDate: string;
    competencies: string[];
    score: number;
    grade: 'Competent with Distinction' | 'Competent';
  }) => SkillCertificate;
  addSupervisorReference: (refData: {
    placementId: string;
    graduateId: string;
    supervisorName: string;
    supervisorTitle: string;
    companyName: string;
    punctualityScore: number;
    technicalSkillsScore: number;
    teamworkScore: number;
    wouldHireAgain: boolean;
    comments: string;
  }) => void;
  toggleGraduateConsent: (graduateId: string, status: 'Granted' | 'Refused') => void;
  openProgrammeReview: (outcomeId: string, notes: string) => void;
  updateContactSchedule: (graduateId: string, monthKey: 'month1' | 'month3' | 'month6' | 'month12', notes?: string) => void;
  referGraduateToDisnaker: (graduateId: string, targetDisnaker: string, notes: string) => void;
  updateReferralStatus: (referralId: string, status: ReferralRecord['status'], serviceType?: string) => void;
  submitWhistleblowerTicket: (ticket: {
    companyName: string;
    placementId?: string;
    reporterType: WhistleblowerTicket['reporterType'];
    category: WhistleblowerTicket['category'];
    description: string;
    urgency: WhistleblowerTicket['urgency'];
  }) => void;
  updateApprovalStatus: (approvalId: string, status: 'Approved' | 'Rejected', reviewNotes?: string) => void;
  addAuditLog: (action: string, target: string, actorOverride?: string) => void;
  
  // Notification Counts
  notifications: Record<string, number>;
  toasts: ToastNotification[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Helper to generate simulated cryptographic SHA256 hex string
function generateShortHash(): string {
  const chars = '0123456789abcdef';
  let hash = '';
  for (let i = 0; i < 32; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');
  const [currentRole, setCurrentRoleState] = useState<RoleType>('central');
  const [activeModule, setActiveModule] = useState<string>('M01');

  // Modals
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isRoadmapModalOpen, setIsRoadmapModalOpen] = useState(false);
  const [isIndicatorModalOpen, setIsIndicatorModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [verifyPortalCode, setVerifyPortalCode] = useState('SK-2026-CMH-8921');

  // Data Collections
  const [placements, setPlacements] = useState<Placement[]>(INITIAL_PLACEMENTS);
  const [graduates, setGraduates] = useState<Graduate[]>(INITIAL_GRADUATES);
  const [certificates, setCertificates] = useState<SkillCertificate[]>(INITIAL_CERTIFICATES);
  const [programmeOutcomes, setProgrammeOutcomes] = useState<ProgrammeOutcome[]>(INITIAL_PROGRAMME_OUTCOMES);
  const [referrals, setReferrals] = useState<ReferralRecord[]>(INITIAL_REFERRALS);
  const [whistleblowers, setWhistleblowers] = useState<WhistleblowerTicket[]>(INITIAL_WHISTLEBLOWERS);
  const [approvals, setApprovals] = useState<ApprovalItem[]>(INITIAL_APPROVALS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);

  // Toasts
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const currentRoleInfo = useMemo(() => {
    return DEMO_ROLES.find((r) => r.id === currentRole) || DEMO_ROLES[0];
  }, [currentRole]);

  const setCurrentRole = (role: RoleType) => {
    setCurrentRoleState(role);
    const targetInfo = DEMO_ROLES.find((r) => r.id === role);
    if (targetInfo) {
      setActiveModule(targetInfo.defaultModule);
    }
    showToast(`Active role switched to: ${targetInfo?.name} (${targetInfo?.badge})`, 'info');
  };

  const addAuditLog = (action: string, target: string, actorOverride?: string) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;
    const logId = `LOG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newEntry: AuditLogEntry = {
      id: logId,
      action,
      actor: actorOverride || currentRoleInfo.name,
      actorRole: currentRoleInfo.badge,
      target,
      timestamp: formattedDate,
      hash: generateShortHash(),
      verified: true,
    };
    setAuditLogs((prev) => [newEntry, ...prev]);
  };

  // M01 Lottery execution
  const runLotteryForPlacement = (placementId: string) => {
    const targetPlacement = placements.find((p) => p.id === placementId);
    if (!targetPlacement) return { seed: '', selectedCount: 0 };

    const seed = `SHA256:${generateShortHash().substring(0, 20)}`;
    const places = targetPlacement.places;
    
    // Deterministic or pseudo-random selection among applicants
    const shuffled = [...targetPlacement.applicants].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, places).map((a) => a.id);

    setPlacements((prev) =>
      prev.map((p) => {
        if (p.id === placementId) {
          return {
            ...p,
            status: 'Lottery Completed',
            lotterySeed: seed,
            lotteryExecutedAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
            applicants: p.applicants.map((app) => ({
              ...app,
              selected: selected.includes(app.id),
            })),
          };
        }
        return p;
      })
    );

    addAuditLog(
      'LOTTERY_SELECTION_RUN',
      `${targetPlacement.companyName} (${placementId}) — ${places} places selected from ${targetPlacement.applicantsCount} applicants. Seed: ${seed}`
    );
    showToast(`Cryptographic lottery selection executed for ${targetPlacement.companyName}! Seed generated and logged.`, 'success');

    return { seed, selectedCount: places };
  };

  // M02 Quality audit sampler
  const triggerRandomPlacementAudit = (placementId: string) => {
    const target = placements.find((p) => p.id === placementId);
    if (!target) return;

    const nowFormatted = new Date().toISOString().split('T')[0];
    setPlacements((prev) =>
      prev.map((p) => {
        if (p.id === placementId) {
          return {
            ...p,
            lastAuditedAt: `${nowFormatted} (Passed Joint Disnaker-BKK Audit)`,
            cheapLabourRisk: false,
          };
        }
        return p;
      })
    );

    addAuditLog('PLACEMENT_QUALITY_AUDIT', `Quality audit sampler executed for ${target.companyName}. Verified mentor compliance.`);
    showToast(`Quality audit completed for ${target.companyName}: Mentor ratio verified & learning plan certified.`, 'success');
  };

  // M02 Update learning plan
  const updateLearningPlan = (placementId: string, items: LearningPlanItem[], approved: boolean) => {
    setPlacements((prev) =>
      prev.map((p) => {
        if (p.id === placementId) {
          return {
            ...p,
            learningPlan: {
              ...p.learningPlan,
              approved,
              items,
            },
            cheapLabourRisk: !approved,
          };
        }
        return p;
      })
    );

    addAuditLog('LEARNING_PLAN_UPDATED', `Learning plan for placement ${placementId} updated. Status: ${approved ? 'Approved' : 'Pending'}`);
    showToast(`Learning plan updated and certified for placement.`, 'success');
  };

  // M03 Add skill certificate
  const addSkillCertificate = (certData: {
    graduateId: string;
    externalAssessorName: string;
    externalAssessorCompany: string;
    assessorAccreditationId: string;
    assessmentDate: string;
    competencies: string[];
    score: number;
    grade: 'Competent with Distinction' | 'Competent';
  }) => {
    const student = graduates.find((g) => g.id === certData.graduateId);
    const certId = `CERT-2026-${Math.floor(100 + Math.random() * 900)}`;
    const siapKerjaCode = `SK-2026-${student?.schoolName.includes('Cimahi') ? 'CMH' : student?.schoolName.includes('Bandung') ? 'BDG' : 'SUB'}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newCert: SkillCertificate = {
      certificateId: certId,
      graduateId: certData.graduateId,
      graduateName: student?.name || 'Graduate',
      graduateNisn: student?.nisn || '0078129999',
      schoolName: student?.schoolName || 'SMK Partner',
      programme: student?.programme || 'Vocational Major',
      externalAssessorName: certData.externalAssessorName,
      externalAssessorCompany: certData.externalAssessorCompany,
      assessorAccreditationId: certData.assessorAccreditationId,
      assessmentDate: certData.assessmentDate,
      competencies: certData.competencies,
      score: certData.score,
      grade: certData.grade,
      siapKerjaCode,
      issuedAt: '2026-10-28',
      status: 'Verified',
    };

    setCertificates((prev) => [newCert, ...prev]);
    setGraduates((prev) =>
      prev.map((g) => (g.id === certData.graduateId ? { ...g, certificateId: certId } : g))
    );

    addAuditLog('DIGITAL_CERTIFICATE_ISSUED', `${newCert.graduateName} (${newCert.graduateNisn}) — SIAPkerja Code: ${siapKerjaCode}`);
    showToast(`Verified Skills Certificate issued for ${newCert.graduateName}! SIAPkerja code: ${siapKerjaCode}`, 'success');

    return newCert;
  };

  // M04 Add supervisor reference
  const addSupervisorReference = (refData: {
    placementId: string;
    graduateId: string;
    supervisorName: string;
    supervisorTitle: string;
    companyName: string;
    punctualityScore: number;
    technicalSkillsScore: number;
    teamworkScore: number;
    wouldHireAgain: boolean;
    comments: string;
  }) => {
    const refId = `REF-2026-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date();
    const formatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;

    const newRef: SupervisorReference = {
      id: refId,
      placementId: refData.placementId,
      graduateId: refData.graduateId,
      supervisorName: refData.supervisorName,
      supervisorTitle: refData.supervisorTitle,
      companyName: refData.companyName,
      punctualityScore: refData.punctualityScore,
      technicalSkillsScore: refData.technicalSkillsScore,
      teamworkScore: refData.teamworkScore,
      wouldHireAgain: refData.wouldHireAgain,
      comments: refData.comments,
      submittedAt: formatted,
    };

    setGraduates((prev) =>
      prev.map((g) => {
        if (g.id === refData.graduateId) {
          return {
            ...g,
            supervisorReference: newRef,
          };
        }
        return g;
      })
    );

    addAuditLog('SUPERVISOR_REFERENCE_FILED', `Reference submitted by ${refData.supervisorName} (${refData.companyName}) for Graduate ${refData.graduateId}`);
    showToast(`Structured supervisor reference appended to graduate skills identity!`, 'success');
  };

  // M05 Consent toggle
  const toggleGraduateConsent = (graduateId: string, status: 'Granted' | 'Refused') => {
    const student = graduates.find((g) => g.id === graduateId);
    setGraduates((prev) =>
      prev.map((g) => {
        if (g.id === graduateId) {
          return {
            ...g,
            consentStatus: status,
            consentRecordedAt: new Date().toLocaleDateString('id-ID') + ' WIB',
            linkageMonth6: status === 'Granted' ? { tracerStudy: true, siapKerja: true, socialSecurityBPJS: true } : { tracerStudy: false, siapKerja: false, socialSecurityBPJS: false },
            linkageMonth12: status === 'Granted' ? { tracerStudy: false, siapKerja: false, socialSecurityBPJS: false } : { tracerStudy: false, siapKerja: false, socialSecurityBPJS: false },
          };
        }
        return g;
      })
    );

    addAuditLog('CONSENT_STATUS_RECORDED', `${student?.name} (${graduateId}) set consent to ${status}. Protection under Law 27/2022 enforced.`);
    showToast(`Consent updated to "${status}". Reminder: Consent status does not affect apprenticeship participation.`, 'info');
  };

  // M06 Open programme review
  const openProgrammeReview = (outcomeId: string, notes: string) => {
    const item = programmeOutcomes.find((p) => p.id === outcomeId);
    if (!item) return;

    const reviewId = `REV-2026-QA-${Math.floor(100 + Math.random() * 900)}`;

    setProgrammeOutcomes((prev) =>
      prev.map((p) => {
        if (p.id === outcomeId) {
          return {
            ...p,
            reviewStatus: 'Review in Progress',
            reviewId,
          };
        }
        return p;
      })
    );

    // Also add to Approval Queue
    const newApproval: ApprovalItem = {
      id: `APP-2026-${Math.floor(100 + Math.random() * 900)}`,
      type: 'Programme Review Case',
      title: `Mandated Review: ${item.schoolName} — ${item.programme}`,
      submittedBy: currentRoleInfo.name,
      submissionDate: new Date().toISOString().split('T')[0],
      details: `12M Employment Rate: ${item.employmentRate12M}% (persisted below 50%). Note: ${notes}`,
      status: 'Pending Approval',
      actionableBy: 'provincial',
    };

    setApprovals((prev) => [newApproval, ...prev]);

    addAuditLog('PROGRAMME_REVIEW_CASE_OPENED', `Mandated review opened for ${item.schoolName} (${item.programme}) - Review ID: ${reviewId}`);
    showToast(`Mandated review case initiated! Sent to Provincial Education Office approval queue.`, 'warning');
  };

  // M07 Update contact schedule
  const updateContactSchedule = (graduateId: string, monthKey: 'month1' | 'month3' | 'month6' | 'month12', notes?: string) => {
    const student = graduates.find((g) => g.id === graduateId);
    const nowStr = new Date().toISOString().split('T')[0];

    setGraduates((prev) =>
      prev.map((g) => {
        if (g.id === graduateId) {
          return {
            ...g,
            contactSchedule: {
              ...g.contactSchedule,
              [monthKey]: {
                ...g.contactSchedule[monthKey],
                status: 'Done',
                completedDate: nowStr,
                notes: notes || g.contactSchedule[monthKey].notes || 'Contact session concluded successfully',
                recordedBy: currentRoleInfo.name,
              },
            },
          };
        }
        return g;
      })
    );

    addAuditLog('BKK_CONTACT_RECORDED', `BKK ${monthKey.toUpperCase()} check-in logged for ${student?.name} by ${currentRoleInfo.name}`);
    showToast(`${monthKey.toUpperCase()} transition contact recorded for ${student?.name}.`, 'success');
  };

  // M07 -> M08 Refer graduate to Disnaker
  const referGraduateToDisnaker = (graduateId: string, targetDisnaker: string, notes: string) => {
    const student = graduates.find((g) => g.id === graduateId);
    if (!student) return;

    const refId = `REF-2026-${Math.floor(100 + Math.random() * 900)}`;
    const nowStr = new Date().toISOString().split('T')[0];

    const newReferral: ReferralRecord = {
      id: refId,
      graduateId,
      graduateName: student.name,
      nisn: student.nisn,
      schoolName: student.schoolName,
      programme: student.programme,
      province: student.province,
      targetDisnakerOffice: targetDisnaker,
      referredDate: nowStr,
      status: 'Sent',
      serviceTypeOffered: 'Public Manpower Referral & Targeted Upskilling',
      notes,
      caseOfficer: currentRoleInfo.name,
      updatedAt: nowStr,
    };

    setReferrals((prev) => [newReferral, ...prev]);
    setGraduates((prev) =>
      prev.map((g) => (g.id === graduateId ? { ...g, currentStatus: 'Referred to Disnaker', referralId: refId } : g))
    );

    addAuditLog('DISNAKER_REFERRAL_DISPATCHED', `${student.name} (${student.nisn}) referred to ${targetDisnaker}`);
    showToast(`Graduate ${student.name} referred to ${targetDisnaker}. Record visible in M08 Referral Tracker.`, 'success');
  };

  // M08 Update referral status
  const updateReferralStatus = (referralId: string, status: ReferralRecord['status'], serviceType?: string) => {
    const target = referrals.find((r) => r.id === referralId);
    const nowStr = new Date().toISOString().split('T')[0];

    setReferrals((prev) =>
      prev.map((r) => {
        if (r.id === referralId) {
          return {
            ...r,
            status,
            serviceTypeOffered: serviceType || r.serviceTypeOffered,
            updatedAt: nowStr,
          };
        }
        return r;
      })
    );

    if (status === 'Placed' && target) {
      setGraduates((prev) =>
        prev.map((g) => (g.id === target.graduateId ? { ...g, currentStatus: 'Employed (Formal Sector)' } : g))
      );
    }

    addAuditLog('DISNAKER_REFERRAL_UPDATED', `Referral ${referralId} status updated to: ${status}`);
    showToast(`Referral status updated to "${status}".`, 'success');
  };

  // M12 Submit whistleblower
  const submitWhistleblowerTicket = (ticket: {
    companyName: string;
    placementId?: string;
    reporterType: WhistleblowerTicket['reporterType'];
    category: WhistleblowerTicket['category'];
    description: string;
    urgency: WhistleblowerTicket['urgency'];
  }) => {
    const id = `WBL-2026-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date();
    const formatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;

    const newTicket: WhistleblowerTicket = {
      id,
      companyName: ticket.companyName,
      placementId: ticket.placementId,
      reporterType: ticket.reporterType,
      category: ticket.category,
      description: ticket.description,
      status: 'Under Review',
      urgency: ticket.urgency,
      submittedAt: formatted,
    };

    setWhistleblowers((prev) => [newTicket, ...prev]);
    addAuditLog('WHISTLEBLOWING_REPORT_SUBMITTED', `Report filed against ${ticket.companyName}: ${ticket.category} [Ticket: ${id}]`);
    showToast(`Exploitation complaint logged successfully. Confidential ticket ID: ${id}`, 'warning');
  };

  // M13 Update approval status
  const updateApprovalStatus = (approvalId: string, status: 'Approved' | 'Rejected', reviewNotes?: string) => {
    setApprovals((prev) =>
      prev.map((a) => {
        if (a.id === approvalId) {
          return {
            ...a,
            status,
            reviewNotes: reviewNotes || (status === 'Approved' ? 'Formally recognized & signed off' : 'Rejected due to documentation deficit'),
          };
        }
        return a;
      })
    );

    addAuditLog('APPROVAL_QUEUE_DECISION', `Item ${approvalId} was marked as ${status} by ${currentRoleInfo.name}`);
    showToast(`Queue item marked as ${status}.`, 'info');
  };

  // Reactive notification indicators for sidebar badges
  const notifications = useMemo(() => {
    const overdueContacts = graduates.filter((g) => Object.values(g.contactSchedule).some((cs) => cs.status === 'Overdue')).length;
    const consentPending = graduates.filter((g) => g.consentStatus === 'Pending').length;
    const reviewCasesCount = programmeOutcomes.filter((p) => p.reviewStatus === 'Review Required').length;
    const lotteryPending = placements.filter((p) => p.status === 'Open' && p.applicantsCount > p.places).length;
    const cheapLabourRisk = placements.filter((p) => p.cheapLabourRisk || p.mentorRatioExceeded).length;
    const whistleblowerActive = whistleblowers.filter((w) => w.status === 'Under Review' || w.status === 'Investigation Active').length;
    const pendingApprovals = approvals.filter((a) => a.status === 'Pending Approval').length;

    return {
      overdueContacts,
      consentPending,
      reviewCasesCount,
      lotteryPending,
      cheapLabourRisk,
      whistleblowerActive,
      pendingApprovals,
      referencePending: 1,
    };
  }, [graduates, programmeOutcomes, placements, whistleblowers, approvals]);

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        currentRole,
        currentRoleInfo,
        setCurrentRole,
        activeModule,
        setActiveModule,
        placements,
        graduates,
        certificates,
        programmeOutcomes,
        referrals,
        whistleblowers,
        approvals,
        auditLogs,
        isAuditModalOpen,
        setIsAuditModalOpen,
        isRoadmapModalOpen,
        setIsRoadmapModalOpen,
        isIndicatorModalOpen,
        setIsIndicatorModalOpen,
        isSearchModalOpen,
        setIsSearchModalOpen,
        verifyPortalCode,
        setVerifyPortalCode,
        runLotteryForPlacement,
        triggerRandomPlacementAudit,
        updateLearningPlan,
        addSkillCertificate,
        addSupervisorReference,
        toggleGraduateConsent,
        openProgrammeReview,
        updateContactSchedule,
        referGraduateToDisnaker,
        updateReferralStatus,
        submitWhistleblowerTicket,
        updateApprovalStatus,
        addAuditLog,
        notifications,
        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
