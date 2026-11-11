import React from 'react';
import { ProceduralStatus, Language } from '../types';
import { translations } from '../data/translations';

interface StatusBadgeProps {
  status: ProceduralStatus | string;
  lang: Language;
  showExplanation?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  lang,
  showExplanation = false,
  size = 'md',
}) => {
  // Normalize backward-compatible legacy statuses if passed
  let normalizedStatus: ProceduralStatus = 'unknown';
  if (status === 'bail_order' || status === 'bail_granted') {
    normalizedStatus = 'bail_granted';
  } else if (status === 'pending' || status === 'pending_trial') {
    normalizedStatus = 'pending_trial';
  } else if (status === 'discharged' || status === 'dismissed') {
    normalizedStatus = 'dismissed';
  } else if (status in translations.statuses) {
    normalizedStatus = status as ProceduralStatus;
  }

  const statusInfo = translations.statuses[normalizedStatus] || translations.statuses.unknown;

  // Accessible semantic styles:
  // Bail Granted -> Amber (Interim release, explicitly NOT innocence)
  // Acquitted -> Emerald (Final judicial exoneration)
  // Convicted -> Rose/Red (Finding of guilt, subject to appeal)
  // Appealed -> Purple (Under appellate review)
  // Pending Trial -> Sky/Blue (Active sub judice)
  // Dismissed -> Violet (Procedural discharge/dismissal)
  // Reported / Under Investigation -> Orange
  // Disposed of -> Teal
  // Unknown -> Slate

  const styles: Record<ProceduralStatus, { dot: string; border: string; text: string; bg: string }> = {
    bail_granted: {
      dot: 'bg-amber-400',
      border: 'border-amber-500/40',
      text: 'text-amber-200',
      bg: 'bg-amber-950/40',
    },
    acquitted: {
      dot: 'bg-emerald-400',
      border: 'border-emerald-500/40',
      text: 'text-emerald-200',
      bg: 'bg-emerald-950/40',
    },
    convicted: {
      dot: 'bg-rose-400',
      border: 'border-rose-500/40',
      text: 'text-rose-200',
      bg: 'bg-rose-950/40',
    },
    appealed: {
      dot: 'bg-indigo-400',
      border: 'border-indigo-500/40',
      text: 'text-indigo-200',
      bg: 'bg-indigo-950/40',
    },
    pending_trial: {
      dot: 'bg-sky-400',
      border: 'border-sky-500/40',
      text: 'text-sky-200',
      bg: 'bg-sky-950/40',
    },
    dismissed: {
      dot: 'bg-violet-400',
      border: 'border-violet-500/40',
      text: 'text-violet-200',
      bg: 'bg-violet-950/40',
    },
    under_investigation: {
      dot: 'bg-orange-400',
      border: 'border-orange-500/40',
      text: 'text-orange-200',
      bg: 'bg-orange-950/40',
    },
    reported: {
      dot: 'bg-yellow-400',
      border: 'border-yellow-500/40',
      text: 'text-yellow-200',
      bg: 'bg-yellow-950/40',
    },
    disposed_of: {
      dot: 'bg-teal-400',
      border: 'border-teal-500/40',
      text: 'text-teal-200',
      bg: 'bg-teal-950/40',
    },
    unknown: {
      dot: 'bg-slate-400',
      border: 'border-slate-500/40',
      text: 'text-slate-300',
      bg: 'bg-slate-900/60',
    },
  };

  const currentStyle = styles[normalizedStatus] || styles.unknown;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  }[size];

  return (
    <div className="inline-flex flex-col gap-1 items-start">
      <div
        className={`inline-flex items-center gap-1.5 rounded border font-medium ${currentStyle.bg} ${currentStyle.border} ${currentStyle.text} ${sizeClasses}`}
        role="status"
        title={statusInfo.desc[lang]}
      >
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${currentStyle.dot}`} aria-hidden="true" />
        <span className="whitespace-nowrap font-urdu-ui tracking-wide">
          {statusInfo[lang]}
        </span>
      </div>

      {showExplanation && (
        <span className="text-xs text-slate-400 leading-relaxed max-w-md mt-0.5 font-urdu-ui">
          {statusInfo.desc[lang]}
        </span>
      )}
    </div>
  );
};
