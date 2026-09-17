import React from 'react';
import RiskBadge from '../components/RiskBadge';
import RiskGauge from '../components/RiskGauge';
import { 
  DownloadIcon, 
  AlertIcon, 
  ArrowRightIcon, 
  SlidersIcon, 
  AnalyticsIcon, 
  CheckCircleIcon 
} from '../components/Icons';

export default function PredictionResultPage({ 
  result, 
  customerData, 
  onViewExplanation, 
  onViewSimulator, 
  onViewReport 
}) {
  const { defaultProbability = 78.4, riskLevel = 'High Risk', creditRiskScore = 82 } = result || {};

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-financial-border pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-dark tracking-tight">
            Prediction Result
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-financial-secondary">
            Here is the credit risk assessment for the customer.
          </p>
        </div>

        <button
          onClick={onViewReport}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-navy-dark bg-white hover:bg-warm-bg border border-financial-border shadow-xs transition-colors"
        >
          <DownloadIcon className="w-3.5 h-3.5 text-gold-primary" />
          <span>Download Report</span>
        </button>
      </div>

      {/* Two Large Result Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT CARD: Default Probability */}
        <div className="lg:col-span-6 bg-white border border-financial-border rounded-2xl p-6 sm:p-8 shadow-enterprise flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-financial-border pb-4 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-financial-secondary">
                Default Probability
              </span>
              <RiskBadge level={riskLevel} size="normal" />
            </div>

            <div className="my-6 text-center">
              <span 
                id="default-probability-readout"
                className="text-5xl sm:text-6xl font-extrabold text-financial-text tracking-tight block"
              >
                {defaultProbability}%
              </span>
              <span className="text-xs font-semibold text-risk-red uppercase tracking-wider mt-1 block">
                Elevated Delinquency Likelihood
              </span>
            </div>

            {/* Horizontal Probability Bar */}
            <div className="space-y-2 my-6">
              <div className="flex justify-between text-xs font-medium text-financial-secondary">
                <span>Risk Scale</span>
                <span className="font-bold text-risk-red">{defaultProbability}%</span>
              </div>
              <div className="w-full h-3.5 bg-warm-beige rounded-full overflow-hidden p-0.5 border border-financial-border">
                <div 
                  className="h-full bg-risk-red rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${Math.min(defaultProbability, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-financial-secondary font-medium">
                <span>0% Safe</span>
                <span>50% Threshold</span>
                <span>100% Critical</span>
              </div>
            </div>

            <div className="p-3.5 bg-risk-red/5 border border-risk-red/20 rounded-xl flex items-start gap-2.5">
              <AlertIcon className="w-4 h-4 text-risk-red flex-shrink-0 mt-0.5" />
              <p className="text-xs text-financial-text leading-relaxed">
                This customer has an elevated probability of default based on the provided financial behavior.
              </p>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-financial-border flex items-center justify-between text-xs text-financial-secondary">
            <span>Customer ID: C10283</span>
            <span>Age: {customerData?.age || 35} • {customerData?.maritalStatus || 'Married'}</span>
          </div>
        </div>

        {/* RIGHT CARD: Credit Risk Score */}
        <div className="lg:col-span-6 bg-white border border-financial-border rounded-2xl p-6 sm:p-8 shadow-enterprise flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-financial-border pb-4 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-financial-secondary">
                Credit Risk Score
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-warm-beige text-navy-secondary">
                Simulated Score
              </span>
            </div>

            {/* Circular Gauge */}
            <div className="py-2">
              <RiskGauge score={creditRiskScore} maxScore={100} label="Very High Risk" />
            </div>
          </div>

          <div className="pt-4 border-t border-financial-border text-center text-xs text-financial-secondary">
            <span>Standardized risk scale normalized across industry delinquency datasets.</span>
          </div>
        </div>

      </div>

      {/* RECOMMENDED ACTION WIDE CARD */}
      <div className="bg-white border border-financial-border rounded-2xl p-6 shadow-enterprise">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-risk-orange/10 border border-risk-orange/30 flex items-center justify-center text-risk-orange flex-shrink-0">
            <AlertIcon className="w-5 h-5" />
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-navy-dark uppercase tracking-wider">
                Recommended Action
              </h2>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-risk-orange/10 text-risk-orange">
                Advisory Protocol
              </span>
            </div>
            <p className="text-xs text-financial-text leading-relaxed">
              Prioritize proactive customer communication and review repayment behavior. Customer shows high utilization and increasing payment delays.
            </p>
            <p className="text-[11px] text-financial-secondary pt-1">
              Note: This is informational UI content only. Does not trigger automated approval or rejection workflows.
            </p>
          </div>
        </div>
      </div>

      {/* Deep-Dive Exploration Banners */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={onViewExplanation}
          className="p-4 bg-navy-dark text-white rounded-2xl border border-gold-primary/40 flex items-center justify-between hover:bg-navy-secondary transition-all shadow-enterprise group text-left"
        >
          <div className="flex items-center gap-3">
            <AnalyticsIcon className="w-5 h-5 text-gold-primary" />
            <div>
              <span className="text-xs font-bold block">Why This Prediction?</span>
              <span className="text-[11px] text-slate-300">View factor contributions & feature weights</span>
            </div>
          </div>
          <ArrowRightIcon className="w-4 h-4 text-gold-primary group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={onViewSimulator}
          className="p-4 bg-white text-navy-dark rounded-2xl border border-financial-border flex items-center justify-between hover:bg-warm-bg transition-all shadow-enterprise group text-left"
        >
          <div className="flex items-center gap-3">
            <SlidersIcon className="w-5 h-5 text-gold-primary" />
            <div>
              <span className="text-xs font-bold block">What-If Risk Simulator</span>
              <span className="text-[11px] text-financial-secondary">Simulate adjustments to utilization & delays</span>
            </div>
          </div>
          <ArrowRightIcon className="w-4 h-4 text-navy-dark group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
}
