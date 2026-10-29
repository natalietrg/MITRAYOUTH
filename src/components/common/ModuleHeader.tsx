import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Compass } from 'lucide-react';

interface ModuleHeaderProps {
  moduleCode: string;
  moduleTitle: string;
  pillarBadge: string;
  badgeColorClass: string;
  bridgeSentence: string;
  operatingGuideSteps: { title: string; detail: string }[];
}

export const ModuleHeader: React.FC<ModuleHeaderProps> = ({
  moduleCode,
  moduleTitle,
  pillarBadge,
  badgeColorClass,
  bridgeSentence,
  operatingGuideSteps,
}) => {
  const [guideOpen, setGuideOpen] = useState(false);

  return (
    <div className="mb-6 space-y-3">
      {/* Title & Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-base font-extrabold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-xl">
            {moduleCode}
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {moduleTitle}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 text-xs font-mono font-medium rounded-full border ${badgeColorClass}`}>
            {pillarBadge}
          </span>
          <button
            onClick={() => setGuideOpen(!guideOpen)}
            className="flex items-center gap-1.5 px-3 py-1 bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 text-slate-300 text-xs font-medium rounded-lg transition"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span>Operating Guide ({operatingGuideSteps.length} steps)</span>
            {guideOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* One-sentence bridge */}
      <div className="flex items-center gap-2 p-3 bg-slate-900/60 border border-slate-800/80 rounded-xl text-xs sm:text-sm text-slate-300 leading-relaxed">
        <Compass className="w-4 h-4 text-blue-400 shrink-0" />
        <span className="font-medium text-slate-200">{bridgeSentence}</span>
      </div>

      {/* Collapsible Operating Guide */}
      {guideOpen && (
        <div className="p-4 bg-slate-900/95 border border-slate-700 rounded-xl space-y-3 animate-in fade-in slide-in-from-top-1 text-xs shadow-xl">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2">
            Standard Operating Procedure & Policy Protocol
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {operatingGuideSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-2.5 bg-slate-950/60 rounded-lg border border-slate-800/80">
                <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  0{idx + 1}
                </span>
                <div>
                  <div className="font-semibold text-slate-200 mb-0.5">{step.title}</div>
                  <div className="text-slate-400 text-[11px] leading-relaxed">{step.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
