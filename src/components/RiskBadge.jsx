import React from 'react';

const RISK_STYLES = {
  'Low Risk': {
    bg: 'bg-[#EBF7F2]',
    text: 'text-[#2A9D72]',
    border: 'border-[#BBE5D4]',
    dot: 'bg-[#2A9D72]'
  },
  'Moderate Risk': {
    bg: 'bg-[#FDF9ED]',
    text: 'text-[#B8871E]',
    border: 'border-[#F2DE9F]',
    dot: 'bg-[#D5AD43]'
  },
  'High Risk': {
    bg: 'bg-[#FCEDED]',
    text: 'text-[#D84C4C]',
    border: 'border-[#F4BDBD]',
    dot: 'bg-[#D84C4C]'
  },
  'Very High Risk': {
    bg: 'bg-[#FBEAEA]',
    text: 'text-[#B91C1C]',
    border: 'border-[#E89898]',
    dot: 'bg-[#B91C1C]'
  }
};

export default function RiskBadge({ level = 'High Risk', size = 'normal', showDot = true }) {
  const style = RISK_STYLES[level] || RISK_STYLES['High Risk'];
  const sizeClasses = size === 'large' 
    ? 'px-3 py-1.5 text-sm' 
    : size === 'small' 
      ? 'px-2 py-0.5 text-[11px]' 
      : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-semibold border ${style.bg} ${style.text} ${style.border} ${sizeClasses}`}>
      {showDot && <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />}
      <span>{level}</span>
    </span>
  );
}
