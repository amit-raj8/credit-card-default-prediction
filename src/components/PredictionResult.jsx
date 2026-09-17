import React from 'react';
import { AlertTriangle, CheckCircle2, AlertCircle, ShieldAlert, TrendingUp } from 'lucide-react';

/**
 * Visual styling and metadata configuration for risk tiers.
 */
const RISK_CONFIG = {
  'Low Risk': {
    badgeBg: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    barColor: 'bg-emerald-500',
    icon: CheckCircle2,
    desc: 'The customer shows healthy payment patterns with minimal likelihood of defaulting on the upcoming cycle.',
    statusColor: 'text-emerald-600'
  },
  'Medium Risk': {
    badgeBg: 'bg-amber-50 border-amber-200 text-amber-700',
    barColor: 'bg-amber-500',
    icon: AlertCircle,
    desc: 'The customer exhibits moderate repayment delays or higher credit utilization. Monitoring recommended.',
    statusColor: 'text-amber-600'
  },
  'High Risk': {
    badgeBg: 'bg-rose-50 border-rose-200 text-rose-700',
    barColor: 'bg-rose-600',
    icon: ShieldAlert,
    desc: 'Account metrics indicate critical risk factors strongly correlated with default on the upcoming payment.',
    statusColor: 'text-rose-600'
  }
};

export default function PredictionResult({ result }) {
  if (!result) return null;

  const { defaultProbability = 78.4, riskLevel = 'High Risk' } = result;
  const config = RISK_CONFIG[riskLevel] || RISK_CONFIG['High Risk'];
  const RiskIcon = config.icon;

  // Clamp probability between 0 and 100 for bar width
  const clampedProbability = Math.min(Math.max(defaultProbability, 0), 100);

  return (
    <div 
      id="prediction-result-card"
      className="mt-8 bg-white border border-slate-200/90 rounded-2xl shadow-card p-6 md:p-8 transition-all animate-fadeIn"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            Analysis Summary
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Default Risk Assessment
          </h3>
        </div>

        {/* Risk Level Badge */}
        <div 
          id="risk-level-badge"
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-semibold border ${config.badgeBg}`}
        >
          <RiskIcon className="w-4 h-4" />
          <span>{riskLevel}</span>
        </div>
      </div>

      {/* Main Probability Display */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-8">
        <div className="md:col-span-5 bg-slate-50/70 border border-slate-100 rounded-xl p-5 text-center sm:text-left">
          <span className="block text-sm font-medium text-slate-500 mb-1">
            Default Probability
          </span>
          <div className="flex items-baseline justify-center sm:justify-start gap-1">
            <span 
              id="probability-value"
              className="text-5xl font-extrabold tracking-tight text-slate-900"
            >
              {defaultProbability}%
            </span>
          </div>
          <span className="inline-block mt-2 text-xs font-medium text-slate-500">
            Estimated likelihood of next payment default
          </span>
        </div>

        <div className="md:col-span-7 flex flex-col justify-center">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-2">
            <span>Probability Spectrum</span>
            <span className={`font-semibold ${config.statusColor}`}>{riskLevel} ({defaultProbability}%)</span>
          </div>

          {/* Horizontal Progress Bar */}
          <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/80 p-0.5">
            <div
              id="probability-progress-bar"
              className={`h-full rounded-full transition-all duration-700 ease-out ${config.barColor}`}
              style={{ width: `${clampedProbability}%` }}
              role="progressbar"
              aria-valuenow={clampedProbability}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>

          {/* Scale Labels */}
          <div className="flex justify-between text-[11px] font-medium text-slate-400 mt-2 px-0.5">
            <span>0% (Low)</span>
            <span>50% (Moderate)</span>
            <span>100% (High)</span>
          </div>
        </div>
      </div>

      {/* Detailed Advisory Footer */}
      <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 flex items-start gap-3">
        <RiskIcon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${config.statusColor}`} />
        <p className="text-sm text-slate-600 leading-relaxed">
          <strong className="text-slate-800 font-semibold">{riskLevel}: </strong>
          {config.desc}
        </p>
      </div>
    </div>
  );
}
