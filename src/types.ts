export type RoleType = 
  | 'central' // Ministry of Manpower (MagangHub, SIAPkerja)
  | 'provincial' // Provincial Education Office (Dinas Pendidikan)
  | 'school' // School Placement Unit (BKK), Case Manager
  | 'employer' // Host Company or Consortium
  | 'graduate'; // SMK Graduate

export interface RoleInfo {
  id: RoleType;
  name: string;
  institution: string;
  avatar: string;
  badge: string;
  description: string;
  defaultModule: string;
}

export type PillarId = 'P1' | 'P2' | 'P3' | 'P4' | 'GOV';

export interface ModuleNavDef {
  id: string;
  code: string;
  title: string;
  pillar: PillarId;
  pillarName: string;
  rolesAllowed: RoleType[];
  badgeColor: string;
  notificationKey?: string;
}

export interface SmallFirmConsortium {
  consortiumName: string;
  leadCoordinator: string;
  sharedTrainingUnit: string; // Polytechnic, BLK, or SMK
  memberSMEsCount: number;
  approvedByMinistry: boolean;
}

export interface LearningPlanItem {
  id: string;
  task: string;
  skillOutcome: string;
  weeklyLearningDayVenue: string; // e.g. "SMKN 1 Cimahi Lab" or "BLK Bandung"
  completed: boolean;
}

export interface Placement {
  id: string;
  companyName: string;
  sector: string;
  province: string;
  companySize: 'Small-Firm Consortium (SME)' | 'Mid-size' | 'Large Enterprise';
  places: number;
  applicantsCount: number;
  status: 'Open' | 'Lottery Completed' | 'Active' | 'Filled';
  isConsortium: boolean;
  consortiumDetails?: SmallFirmConsortium;
  mentorRatio: string; // e.g. "1:3"
  mentorRatioExceeded: boolean;
  cheapLabourRisk: boolean;
  learningPlan: {
    weeklyLearningDay: string; // e.g. "Friday at Politeknik Manufaktur Bandung"
    curriculumAlignment: string;
    approved: boolean;
    items: LearningPlanItem[];
  };
  applicants: { id: string; name: string; school: string; nisn: string; selected?: boolean }[];
  lotterySeed?: string;
  lotteryExecutedAt?: string;
  lastAuditedAt?: string;
}

export interface SupervisorReference {
  id: string;
  placementId: string;
  graduateId: string;
  supervisorName: string;
  supervisorTitle: string;
  companyName: string;
  punctualityScore: number; // 1-5
  technicalSkillsScore: number; // 1-5
  teamworkScore: number; // 1-5
  wouldHireAgain: boolean;
  comments: string;
  submittedAt: string;
}

export interface SkillCertificate {
  certificateId: string;
  graduateId: string;
  graduateName: string;
  graduateNisn: string;
  schoolName: string;
  programme: string;
  externalAssessorName: string;
  externalAssessorCompany: string;
  assessorAccreditationId: string;
  assessmentDate: string;
  competencies: string[];
  score: number;
  grade: 'Competent with Distinction' | 'Competent';
  siapKerjaCode: string; // e.g. "SK-2026-CMH-8921"
  issuedAt: string;
  status: 'Verified' | 'Revoked' | 'Draft';
}

export interface GraduateContactSchedule {
  status: 'Done' | 'Due' | 'Overdue';
  scheduledDate: string;
  completedDate?: string;
  notes?: string;
  recordedBy?: string;
}

export interface Graduate {
  id: string;
  nisn: string;
  name: string;
  gender: 'M' | 'F';
  schoolName: string;
  programme: string;
  province: string;
  graduationDate: string; // 2026-05-15
  monthsSinceGraduation: number;
  consentStatus: 'Granted' | 'Refused' | 'Pending';
  consentRecordedAt?: string;
  // Months 6 & 12 linkages
  linkageMonth6: {
    tracerStudy: boolean;
    siapKerja: boolean;
    socialSecurityBPJS: boolean;
  };
  linkageMonth12: {
    tracerStudy: boolean;
    siapKerja: boolean;
    socialSecurityBPJS: boolean;
  };
  bkkCaseManager: string;
  individualPlan: {
    targetSector: string;
    preferredLocation: string;
    skillsFocus: string[];
    targetRole: string;
    planStatus: 'Active' | 'Review Due' | 'Under Review' | 'Placed';
  };
  contactSchedule: {
    month1: GraduateContactSchedule;
    month3: GraduateContactSchedule;
    month6: GraduateContactSchedule;
    month12: GraduateContactSchedule;
  };
  currentStatus: 
    | 'Apprentice (P1 Active)' 
    | 'Job Seeking (BKK Assisted)' 
    | 'Employed (Formal Sector)' 
    | 'Referred to Disnaker' 
    | 'Higher Education / Polytechnic';
  activePlacementId?: string;
  certificateId?: string;
  referralId?: string;
  supervisorReference?: SupervisorReference;
}

export interface ProgrammeOutcome {
  id: string;
  schoolName: string;
  programme: string;
  province: string;
  graduatesTracked: number;
  employmentRate12M: number; // percentage
  formalJobShare: number; // percentage
  continuingEduShare: number; // percentage
  neetShare: number; // percentage
  persistentlyWeak: boolean; // triggers review if below threshold
  reviewStatus: 'Normal' | 'Review Required' | 'Review in Progress' | 'Action Plan Approved';
  reviewId?: string;
  lastUpdated: string;
}

export interface ReferralRecord {
  id: string;
  graduateId: string;
  graduateName: string;
  nisn: string;
  schoolName: string;
  programme: string;
  province: string;
  targetDisnakerOffice: string; // e.g. "Dinas Tenaga Kerja Kota Cimahi"
  referredDate: string;
  status: 'Sent' | 'Received' | 'Service Offered' | 'Placed';
  serviceTypeOffered?: string; // e.g. "Public Job Fair Matching & BLK Up-skilling"
  notes: string;
  caseOfficer: string;
  updatedAt: string;
}

export interface AuditLogEntry {
  id: string;
  action: string;
  actor: string;
  actorRole: string;
  target: string;
  timestamp: string;
  hash: string;
  verified: boolean;
}

export interface WhistleblowerTicket {
  id: string;
  companyName: string;
  placementId?: string;
  reporterType: 'Apprentice' | 'School BKK Officer' | 'Training Consortium Mentor' | 'Anonymous';
  category: 
    | 'Excessive Unsupervised Labour (Cheap Labour)' 
    | 'Omission of Weekly Learning Day' 
    | 'Allowance Withholding' 
    | 'Safety Standard Violation';
  description: string;
  status: 'Under Review' | 'Investigation Active' | 'Sanction Issued' | 'Dismissed';
  urgency: 'Medium' | 'High' | 'Critical';
  submittedAt: string;
  responseNote?: string;
}

export interface ApprovalItem {
  id: string;
  type: 'Small-Firm Consortium Recognition' | 'Programme Review Case' | 'Placement Quality Audit';
  title: string;
  submittedBy: string;
  submissionDate: string;
  details: string;
  status: 'Pending Approval' | 'Approved' | 'Rejected';
  reviewNotes?: string;
  actionableBy: 'central' | 'provincial';
}
