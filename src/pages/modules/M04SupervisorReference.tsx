import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ModuleHeader } from '../../components/common/ModuleHeader';
import {
  Award,
  Star,
  CheckCircle,
  ThumbsUp,
  ThumbsDown,
  Building2,
  Calendar,
  MessageSquare,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export const M04SupervisorReference: React.FC = () => {
  const { graduates, placements, addSupervisorReference, currentRoleInfo, showToast } = useApp();

  const [selectedGraduateId, setSelectedGraduateId] = useState<string>(graduates[1]?.id || graduates[0]?.id || '');
  const [supervisorName, setSupervisorName] = useState(currentRoleInfo.name || 'Ir. Bambang Triatmojo');
  const [supervisorTitle, setSupervisorTitle] = useState('Senior Production Engineering Manager');
  const [companyName, setCompanyName] = useState('PT Akebono Brake Astra Indonesia');
  const [punctualityScore, setPunctualityScore] = useState<number>(5);
  const [technicalSkillsScore, setTechnicalSkillsScore] = useState<number>(5);
  const [teamworkScore, setTeamworkScore] = useState<number>(4);
  const [wouldHireAgain, setWouldHireAgain] = useState<boolean>(true);
  const [comments, setComments] = useState(
    'Demonstrated high technical agility in sensor diagnostics and maintained flawless punctuality across all shift assignments. Highly recommended for full-time junior technician role.'
  );

  const operatingGuideSteps = [
    {
      title: 'Post-Placement Evaluation Window',
      detail: 'Enterprise supervisors file this standardized reference within 14 days of the apprentice concluding their 6-month MagangHub assignment.',
    },
    {
      title: 'Objective Behavioral Scoring',
      detail: 'Score punctuality, technical competence, and teamwork on a standardized 1–5 rubric to maintain inter-firm comparability.',
    },
    {
      title: 'Re-hire Affirmation',
      detail: 'The direct binary "Would hire again" indicator serves as the strongest predictive signal of graduate employability for future recruiters.',
    },
    {
      title: 'Immutable SIAPkerja Attachment',
      detail: 'Once signed off, the reference is digitally attached to the graduate’s national SIAPkerja profile without opportunity for retroactive alteration.',
    },
  ];

  const handleSubmitReference = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGraduateId) {
      showToast('Please select an apprentice.', 'error');
      return;
    }

    addSupervisorReference({
      placementId: 'PLC-2026-001',
      graduateId: selectedGraduateId,
      supervisorName,
      supervisorTitle,
      companyName,
      punctualityScore,
      technicalSkillsScore,
      teamworkScore,
      wouldHireAgain,
      comments,
    });
  };

  const graduatesWithReferences = graduates.filter((g) => g.supervisorReference);

  return (
    <div className="space-y-6 animate-in fade-in">
      <ModuleHeader
        moduleCode="M04"
        moduleTitle="Standardized Supervisor Work Reference"
        pillarBadge="P2: Verified Skills Identity"
        badgeColorClass="border-blue-500/40 text-blue-400 bg-blue-500/10"
        bridgeSentence="Upon finishing their apprenticeship, host employers submit an objective, structured reference that travels with the graduate to future employers."
        operatingGuideSteps={operatingGuideSteps}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form to file reference */}
        <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <div className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
              Host Enterprise Feedback
            </div>
            <h2 className="text-lg font-bold text-white mt-0.5">
              Submit Structured Performance Reference
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Standardized format eliminates vague subjective testimonials and provides verifiable work-ethic signals.
            </p>
          </div>

          <form onSubmit={handleSubmitReference} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Select Apprentice
              </label>
              <select
                value={selectedGraduateId}
                onChange={(e) => setSelectedGraduateId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                {graduates.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name} — {g.programme} ({g.schoolName})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Supervisor Full Name
                </label>
                <input
                  type="text"
                  required
                  value={supervisorName}
                  onChange={(e) => setSupervisorName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Supervisor Job Title
                </label>
                <input
                  type="text"
                  required
                  value={supervisorTitle}
                  onChange={(e) => setSupervisorTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Host Company / Consortium Name
              </label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Structured 3-Dimension Scoring */}
            <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800 space-y-3">
              <div className="text-[11px] font-mono text-slate-400 uppercase font-bold">
                Standardized Evaluation Rubric (1 = Poor, 5 = Excellent)
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-300">Punctuality & Shift Discipline</span>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setPunctualityScore(val)}
                      className={`w-7 h-7 rounded-lg font-mono font-bold text-xs transition ${
                        punctualityScore === val
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-300">Technical Execution & Tool Precision</span>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setTechnicalSkillsScore(val)}
                      className={`w-7 h-7 rounded-lg font-mono font-bold text-xs transition ${
                        technicalSkillsScore === val
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-300">Teamwork & Communication</span>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setTeamworkScore(val)}
                      className={`w-7 h-7 rounded-lg font-mono font-bold text-xs transition ${
                        teamworkScore === val
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Binary Rehire Question */}
            <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-semibold text-white">Would you hire this apprentice again?</div>
                <div className="text-[10px] text-slate-400">Core predictor for subsequent employer verification</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setWouldHireAgain(true)}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-semibold transition ${
                    wouldHireAgain
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" /> Yes
                </button>
                <button
                  type="button"
                  onClick={() => setWouldHireAgain(false)}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-semibold transition ${
                    !wouldHireAgain
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  <ThumbsDown className="w-3.5 h-3.5" /> No
                </button>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Free Qualitative Assessment
              </label>
              <textarea
                rows={3}
                required
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Attach Reference to Graduate Skills ID</span>
            </button>
          </form>
        </div>

        {/* Right Column: Active References on File */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Skills Identity Cards
                </div>
                <h3 className="text-base font-bold text-white mt-0.5">
                  Verified Supervisor References on File
                </h3>
              </div>
              <span className="font-mono text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                {graduatesWithReferences.length} Active Records
              </span>
            </div>

            <div className="space-y-4">
              {graduatesWithReferences.map((grad) => {
                const ref = grad.supervisorReference!;
                return (
                  <div
                    key={ref.id}
                    className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-base font-bold text-white">{grad.name}</div>
                        <div className="text-xs text-slate-400">
                          {grad.programme} · {grad.schoolName}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold border ${
                          ref.wouldHireAgain
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                            : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                        }`}>
                          {ref.wouldHireAgain ? '✓ RECOMMENDED FOR RE-HIRE' : 'NOT RECOMMENDED'}
                        </span>
                      </div>
                    </div>

                    {/* Scores Ribbon */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                        <div className="text-[10px] text-slate-400">Punctuality</div>
                        <div className="font-mono font-bold text-sm text-blue-400">
                          {ref.punctualityScore} / 5
                        </div>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                        <div className="text-[10px] text-slate-400">Technical Skill</div>
                        <div className="font-mono font-bold text-sm text-blue-400">
                          {ref.technicalSkillsScore} / 5
                        </div>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                        <div className="text-[10px] text-slate-400">Teamwork</div>
                        <div className="font-mono font-bold text-sm text-blue-400">
                          {ref.teamworkScore} / 5
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 italic bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                      "{ref.comments}"
                    </p>

                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-900">
                      <span>
                        Supervisor: <strong>{ref.supervisorName}</strong> ({ref.companyName})
                      </span>
                      <span>{ref.submittedAt}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
