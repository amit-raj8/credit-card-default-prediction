import React from 'react';

/**
 * Pure SVG Donut Chart with customizable segments and legends.
 * Zero chart libraries used.
 */
export default function DonutChart({ 
  segments = [
    { label: "Low Risk", percentage: 61, color: "#2A9D72" },
    { label: "Moderate Risk", percentage: 24, color: "#D5AD43" },
    { label: "High Risk", percentage: 11, color: "#E69B45" },
    { label: "Very High Risk", percentage: 4, color: "#D84C4C" }
  ],
  size = 180,
  strokeWidth = 24,
  centerText = "30,000",
  centerSubtext = "Portfolio"
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate cumulative offsets
  let accumulatedPercent = 0;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
      {/* SVG Donut */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg 
          width={size} 
          height={size} 
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90"
        >
          {segments.map((segment, index) => {
            const strokeDash = (segment.percentage / 100) * circumference;
            const offset = (accumulatedPercent / 100) * circumference;
            accumulatedPercent += segment.percentage;

            return (
              <circle
                key={index}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${strokeDash} ${circumference}`}
                strokeDashoffset={-offset}
                className="transition-all duration-700 ease-in-out hover:opacity-90"
              />
            );
          })}
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
          <span className="text-xl font-bold text-financial-text leading-tight">{centerText}</span>
          <span className="text-[11px] font-medium text-financial-secondary uppercase tracking-wider">{centerSubtext}</span>
        </div>
      </div>

      {/* Segment Legend */}
      <div className="flex flex-col gap-2 min-w-[150px]">
        {segments.map((seg, idx) => (
          <div key={idx} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: seg.color }} />
              <span className="text-financial-secondary font-medium">{seg.label}</span>
            </div>
            <span className="font-bold text-financial-text ml-3">{seg.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
