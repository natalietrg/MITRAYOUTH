import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ModuleHeader } from '../../components/common/ModuleHeader';
import { Placement } from '../../types';
import {
  Briefcase,
  Users,
  Building2,
  Dice5,
  CheckCircle2,
  AlertCircle,
  Filter,
  Sparkles,
  MapPin,
  Clock,
  Layers,
  ChevronRight,
  ShieldCheck,
  X
} from 'lucide-react';

export const M01ApprenticeshipMatching: React.FC = () => {
  const { placements, runLotteryForPlacement, currentRole, showToast } = useApp();
  const [selectedProvince, setSelectedProvince] = useState<string>('All');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [inspectPlacement, setInspectPlacement] = useState<Placement | null>(null);

  const operatingGuideSteps = [
    {
      title: 'Eligibility Verification',
      detail: 'Confirm the graduate obtained their SMK diploma within the last 12 months. All graduates within this window are automatically granted MagangHub level-4 access.',
    },
    {
      title: 'Small-Firm Consortium Grouping',
      detail: 'Micro and small enterprises pool places under an accredited coordinator, utilizing an SMK, BLK, or polytechnic as the shared Friday training institution.',
    },
    {
      title: 'Oversubscription Detection',
      detail: 'When eligible applicant volume exceeds authorized placement quota, cryptographic lottery protocol is triggered to eliminate patronage and favoritism.',
    },
    {
      title: 'Blended Agreement Execution',
      detail: 'Formalize the 4-day host enterprise / 1-day educational institution schedule with tripartite sign-off before floor onboarding.',
    },
  ];

  const filteredPlacements = placements.filter((p) => {
    if (selectedProvince !== 'All' && p.province !== selectedProvince) return false;
    if (selectedSector !== 'All' && p.sector !== selectedSector) return false;
    return true;
  });

  const handleRunLottery = (pId: string) => {
    const res = runLotteryForPlacement(pId);
    if (inspectPlacement && inspectPlacement.id === pId) {
      const updated = placements.find((p) => p.id === pId);
      if (updated) setInspectPlacement(updated);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <ModuleHeader
        moduleCode="M01"
        moduleTitle="Apprenticeship Matching & Fair Selection"
        pillarBadge="P1: First-Step Apprenticeship"
        badgeColorClass="border-amber-500/40 text-amber-400 bg-amber-500/10"
        bridgeSentence="Following pre-graduation planning, graduates enter the national MagangHub pipeline for blended placements protected by anti-patronage lotteries."
        operatingGuideSteps={operatingGuideSteps}
      />

      {/* Top Banner: Eligibility & Small-firm Consortium Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Eligibility Panel */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
          <div className="p-2.5 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-400 shrink-0 mt-0.5">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
              Statutory Eligibility Rule
            </div>
            <div className="text-sm font-bold text-white mt-0.5">
              SMK Graduates ≤ 12 Months Post-Graduation
            </div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Fully eligible for MagangHub level-4 vocational stipends. Pre-12-month window ensures timely bridge to first formal job.
            </p>
          </div>
        </div>

        {/* Small-Firm Consortium Card */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/30 lg:col-span-2 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400 shrink-0 mt-0.5">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                    P1 SME Architecture
                  </span>
                  <span className="px-2 py-0.2 rounded text-[10px] font-mono bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    Consortium Model
                  </span>
                </div>
                <div className="text-sm font-bold text-white mt-0.5">
                  Small-Firm Consortia with Shared Training Units
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Small workshops and precision tooling SMEs join through recognized clusters (e.g. <em>Bandung SME Machining Consortium</em>). A partner training institution (Politeknik Manufaktur / BLK) serves as their unified pedagogical training unit.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Enables 3–10 worker workshops to train apprentices legally</span>
            <span className="text-amber-400">4 days shop-floor + 1 day polytechnic</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <Filter className="w-3.5 h-3.5 text-blue-400" />
            <span>Filter Placements:</span>
          </div>

          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Provinces (3 Pilot Regions)</option>
            <option value="Jawa Barat">Jawa Barat</option>
            <option value="Jawa Tengah">Jawa Tengah</option>
            <option value="Jawa Timur">Jawa Timur</option>
          </select>

          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Sectors</option>
            <option value="High-Tech Manufacturing">High-Tech Manufacturing</option>
            <option value="Tool & Die Machining">Tool & Die Machining</option>
            <option value="Supply Chain & Cold Chain">Supply Chain & Cold Chain</option>
            <option value="Green Energy & Photovoltaics">Green Energy & Photovoltaics</option>
            <option value="Maritime Electronics & Shipbuilding">Maritime Electronics</option>
            <option value="Information & Digital Tech">Information & Digital Tech</option>
          </select>
        </div>

        <div className="text-xs font-mono text-slate-400">
          Showing {filteredPlacements.length} of {placements.length} registered placements
        </div>
      </div>

      {/* Placements Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/70 text-slate-400 font-mono">
                <th className="p-3.5 font-medium">COMPANY & HOST MODEL</th>
                <th className="p-3.5 font-medium">SECTOR & PROVINCE</th>
                <th className="p-3.5 font-medium text-center">PLACES</th>
                <th className="p-3.5 font-medium text-center">APPLICANTS</th>
                <th className="p-3.5 font-medium">SELECTION METHOD</th>
                <th className="p-3.5 font-medium">STATUS</th>
                <th className="p-3.5 font-medium text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredPlacements.map((plc) => {
                const isOversubscribed = plc.applicantsCount > plc.places;
                const isLotteryDone = plc.status === 'Lottery Completed';

                return (
                  <tr key={plc.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-3.5">
                      <div className="font-semibold text-white flex items-center gap-2">
                        <span>{plc.companyName}</span>
                        {plc.isConsortium && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30">
                            SME Consortium
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {plc.id} · {plc.companySize}
                      </div>
                    </td>

                    <td className="p-3.5">
                      <div className="text-slate-200">{plc.sector}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {plc.province}
                      </div>
                    </td>

                    <td className="p-3.5 text-center font-mono font-bold text-white text-sm">
                      {plc.places}
                    </td>

                    <td className="p-3.5 text-center font-mono text-slate-300">
                      <span className={`px-2 py-0.5 rounded ${isOversubscribed ? 'bg-amber-500/15 text-amber-300 font-semibold' : 'bg-slate-800'}`}>
                        {plc.applicantsCount}
                      </span>
                    </td>

                    <td className="p-3.5">
                      {isOversubscribed ? (
                        <div className="space-y-0.5">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/15 border border-purple-500/30 text-purple-300">
                            <Dice5 className="w-3 h-3" />
                            Lottery Mandated ({plc.applicantsCount}/{plc.places})
                          </span>
                          {plc.lotterySeed && (
                            <div className="text-[10px] font-mono text-emerald-400 truncate max-w-[150px]">
                              Seed: {plc.lotterySeed.substring(0, 15)}...
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-mono">
                          Direct Capacity Match
                        </span>
                      )}
                    </td>

                    <td className="p-3.5">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono border ${
                          isLotteryDone
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                            : isOversubscribed
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                            : 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                        }`}
                      >
                        {plc.status}
                      </span>
                    </td>

                    <td className="p-3.5 text-right space-x-2">
                      {isOversubscribed && !isLotteryDone && (
                        <button
                          onClick={() => handleRunLottery(plc.id)}
                          className="px-2.5 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold shadow transition inline-flex items-center gap-1"
                          title="Execute cryptographic lottery"
                        >
                          <Dice5 className="w-3.5 h-3.5" />
                          <span>Run Lottery</span>
                        </button>
                      )}

                      <button
                        onClick={() => setInspectPlacement(plc)}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 transition"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Placement Modal */}
      {inspectPlacement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div>
                <h3 className="font-bold text-white text-base">{inspectPlacement.companyName}</h3>
                <div className="text-xs text-slate-400 font-mono">
                  {inspectPlacement.id} · {inspectPlacement.sector} · {inspectPlacement.province}
                </div>
              </div>
              <button
                onClick={() => setInspectPlacement(null)}
                className="text-slate-400 hover:text-white p-1"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              {/* Learning Day & Shared Training Unit */}
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="text-[11px] font-mono text-slate-400 uppercase font-bold">
                  Blended Placement Schedule (4 + 1 Rule)
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>{inspectPlacement.learningPlan.weeklyLearningDay}</span>
                </div>
                <div className="text-slate-400">
                  Curriculum focus: <span className="text-slate-200">{inspectPlacement.learningPlan.curriculumAlignment}</span>
                </div>
              </div>

              {/* Small firm consortium detail if present */}
              {inspectPlacement.isConsortium && inspectPlacement.consortiumDetails && (
                <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-1.5">
                  <div className="text-[11px] font-mono text-amber-400 uppercase font-bold">
                    Consortium Specifications
                  </div>
                  <div className="text-slate-200">
                    Coordinator: <strong>{inspectPlacement.consortiumDetails.leadCoordinator}</strong>
                  </div>
                  <div className="text-slate-300">
                    Shared Training Unit: <strong>{inspectPlacement.consortiumDetails.sharedTrainingUnit}</strong>
                  </div>
                  <div className="text-slate-400">
                    Member SMEs: {inspectPlacement.consortiumDetails.memberSMEsCount} enterprise workshops pooling apprentices
                  </div>
                </div>
              )}

              {/* Applicants & Lottery result */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="font-bold text-white uppercase font-mono text-[11px]">
                    Registered Applicants ({inspectPlacement.applicants.length})
                  </div>
                  {inspectPlacement.lotterySeed && (
                    <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                      Seed: {inspectPlacement.lotterySeed}
                    </span>
                  )}
                </div>

                <div className="border border-slate-800 rounded-xl divide-y divide-slate-800/80 overflow-hidden">
                  {inspectPlacement.applicants.map((app) => (
                    <div
                      key={app.id}
                      className={`p-2.5 flex items-center justify-between ${
                        app.selected ? 'bg-emerald-500/10 text-emerald-200' : 'bg-slate-950/40 text-slate-300'
                      }`}
                    >
                      <div>
                        <div className="font-medium text-slate-200">
                          {app.name}{' '}
                          <span className="font-mono text-slate-400 text-[10px]">({app.nisn})</span>
                        </div>
                        <div className="text-[10px] text-slate-400">{app.school}</div>
                      </div>
                      {app.selected && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
                          Selected via Lottery
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-950/70 flex justify-between items-center">
              {inspectPlacement.applicantsCount > inspectPlacement.places && inspectPlacement.status !== 'Lottery Completed' ? (
                <button
                  onClick={() => handleRunLottery(inspectPlacement.id)}
                  className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
                >
                  <Dice5 className="w-4 h-4" />
                  <span>Execute Fair Lottery</span>
                </button>
              ) : (
                <div className="text-[11px] font-mono text-slate-500">
                  {inspectPlacement.status === 'Lottery Completed' ? 'Lottery finalized & recorded.' : 'Placement capacity open.'}
                </div>
              )}
              <button
                onClick={() => setInspectPlacement(null)}
                className="px-4 py-1.5 bg-slate-800 text-white rounded-lg text-xs hover:bg-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
