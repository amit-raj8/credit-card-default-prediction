import React from 'react';

export default function MetricCard({ title, value, change, subtitle, tag, icon: Icon }) {
  return (
    <div className="bg-white border border-financial-border rounded-xl p-5 shadow-enterprise hover:shadow-card transition-all">
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-financial-secondary">
          {title}
        </span>
        {tag && (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-warm-beige text-navy-secondary">
            {tag}
          </span>
        )}
        {Icon && <Icon className="w-4 h-4 text-gold-primary" />}
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-extrabold text-financial-text tracking-tight">
          {value}
        </span>
        {change && (
          <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
            change.startsWith('+') ? 'text-[#D84C4C] bg-[#FCEDED]' : 'text-[#2A9D72] bg-[#EBF7F2]'
          }`}>
            {change}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1.5 text-xs text-financial-secondary">
          {subtitle}
        </p>
      )}
    </div>
  );
}
