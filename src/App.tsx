/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * MITRA - Youth Transition Bridge (Meridian English Olympiad 2026)
 * Magang, Identitas, Tamatan, Rujukan dan Asistensi
 * Integration Layer connecting MagangHub, SIAPkerja, SMK Tracer Study, and BKK
 * around one shared 12-month employment indicator.
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LandingPage } from './pages/LandingPage';
import { Sidebar } from './components/common/Sidebar';
import { TopBar } from './components/common/TopBar';
import { JourneyTracker } from './components/common/JourneyTracker';
import { ToastContainer } from './components/common/ToastContainer';
import { AuditLogModal } from './components/common/AuditLogModal';
import { RoadmapModal } from './components/common/RoadmapModal';
import { IndicatorEngineModal } from './components/common/IndicatorEngineModal';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';

// Module Components
import { M01ApprenticeshipMatching } from './pages/modules/M01ApprenticeshipMatching';
import { M02LearningPlanQuality } from './pages/modules/M02LearningPlanQuality';
import { M03SkillsCertificates } from './pages/modules/M03SkillsCertificates';
import { M04SupervisorReference } from './pages/modules/M04SupervisorReference';
import { M05ConsentTracerLinkage } from './pages/modules/M05ConsentTracerLinkage';
import { M06ProgrammeOutcomes } from './pages/modules/M06ProgrammeOutcomes';
import { M07CaseManagementBKK } from './pages/modules/M07CaseManagementBKK';
import { M08ReferralTracker } from './pages/modules/M08ReferralTracker';
import { M09MonitoringEvaluation } from './pages/modules/M09MonitoringEvaluation';
import { M10ImpactEvaluationLab } from './pages/modules/M10ImpactEvaluationLab';
import { M11PrivacyGovernance } from './pages/modules/M11PrivacyGovernance';
import { M12ComplaintsWhistleblowing } from './pages/modules/M12ComplaintsWhistleblowing';
import { M13ApprovalQueue } from './pages/modules/M13ApprovalQueue';
import { M14UserManagement } from './pages/modules/M14UserManagement';

const AppContent: React.FC = () => {
  const { currentView, activeModule } = useApp();

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'M01': return <M01ApprenticeshipMatching />;
      case 'M02': return <M02LearningPlanQuality />;
      case 'M03': return <M03SkillsCertificates />;
      case 'M04': return <M04SupervisorReference />;
      case 'M05': return <M05ConsentTracerLinkage />;
      case 'M06': return <M06ProgrammeOutcomes />;
      case 'M07': return <M07CaseManagementBKK />;
      case 'M08': return <M08ReferralTracker />;
      case 'M09': return <M09MonitoringEvaluation />;
      case 'M10': return <M10ImpactEvaluationLab />;
      case 'M11': return <M11PrivacyGovernance />;
      case 'M12': return <M12ComplaintsWhistleblowing />;
      case 'M13': return <M13ApprovalQueue />;
      case 'M14': return <M14UserManagement />;
      default: return <M01ApprenticeshipMatching />;
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans">
      {currentView === 'landing' ? (
        <LandingPage />
      ) : (
        <div className="flex h-screen overflow-hidden">
          {/* SIGAP-styled Sidebar */}
          <Sidebar />

          {/* Main Workspace */}
          <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#070b14]">
            <TopBar />

            <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
              {/* Connected Graduate Journey Tracker */}
              <JourneyTracker />

              {/* Dynamic Active Module Container */}
              {renderActiveModule()}
            </main>
          </div>
        </div>
      )}

      {/* Global Modals & Notifications */}
      <AuditLogModal />
      <RoadmapModal />
      <IndicatorEngineModal />
      <GlobalSearchModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
