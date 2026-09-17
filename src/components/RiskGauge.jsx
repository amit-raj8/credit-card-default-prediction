import React from 'react';

/**
 * Circular SVG Gauge for Credit Risk Score.
 * Pure SVG, zero external dependencies.
 */
export default function RiskGauge({ score = 82, maxScore = 100, label = "Very High Risk" }) {
  const radius = 64;
  const strokeWidth = 10;
  // Use a 240-degree arc or full 360 circle. A clean 260-degree radial arc looks authentic for financial risk.
  const circumference = 2 * Math.PI * radius;
  // Semi/arc percentage:
  const normalizedScore = Math.min(Math.max(score, 0), maxScore);
  const strokeDashoffset = circumference - (normalizedScore / maxScore) * (circumference * 0.75);

  // Determine color based on 0-30, 31-60, 61-80, 81-100
  let strokeColor = '#D84C4C'; // default red
  if (score <= 30) strokeColor = '#2A9D72';
  else if (score <= 60) strokeColor = '#D5AD43';
  else if (score <= 80) strokeColor = '#E69B45';

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-44 h-44 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-135" viewBox="0 0 160 160">
          {/* Background track */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="#EEE9DF"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
            strokeLinecap="round"
          />
          {/* Active progress arc */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center score readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-extrabold text-financial-text tracking-tight">
            {score}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-financial-secondary">
            / {maxScore}
          </span>
          <span 
            className="mt-1 text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ color: strokeColor, backgroundColor: `${strokeColor}15` }}
          >
            {label}
          </span>
        </div>
      </div>

      {/* Legend below gauge */}
      <div className="w-full mt-4 pt-3 border-t border-financial-border grid grid-cols-2 gap-2 text-[11px] text-financial-secondary">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#2A9D72]" />
          <span>0–30 Low Risk</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#D5AD43]" />
          <span>31–60 Moderate</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#E69B45]" />
          <span>61–80 High Risk</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#D84C4C]" />
          <span>81–100 Very High</span>
        </div>
      </div>
    </div>
  );
}
