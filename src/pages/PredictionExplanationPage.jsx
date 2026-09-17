import React, { useState } from 'react';
import { dummyPrediction } from '../data/dummyPrediction';
import { CheckCircleIcon, AlertIcon, ArrowLeftIcon } from '../components/Icons';

export default function PredictionExplanationPage({ onBack, onViewSimulator }) {
  const [activeTab, setActiveTab] = useState('Top Risk Factors');
  const factors = dummyPrediction.riskFactors;

  // Max absolute value for scaling bar widths (0.28)
  const maxAbsImpact = 0.30;

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-financial-border pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded bg-warm-beige text-navy-secondary border border-financial-border">
              Simulated Explanation
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-dark tracking-tight">
            Why this prediction?
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-financial-secondary">
            Understand the key factors associated with the simulated credit risk prediction.
          </p>
        </div>

        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-financial-text bg-white hover:bg-warm-bg border border-financial-border transition-colors"
        >
          <ArrowLeftIcon className="w-3.5 h-3.5" />
          <span>Back to Result</span>
        </button>
      </div>

      {/* 3 Tabs */}
      <div className="flex border-b border-financial-border gap-2">
        {['Top Risk Factors', 'Individual Explanation', 'Feature Importance'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
              activeTab === tab
                ? 'border-gold-primary text-navy-dark'
                : 'border-transparent text-financial-secondary hover:text-financial-text'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Factor Impact Bars */}
        <div className="lg:col-span-7 bg-white border border-financial-border rounded-2xl p-6 shadow-enterprise">
          <div className="border-b border-financial-border pb-3 mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold text-navy-dark uppercase tracking-wider">
              {activeTab} Breakdown
            </h2>
            <span className="text-[10px] text-financial-secondary">
              Normalized Contribution Impact
            </span>
          </div>

          <p className="text-xs text-financial-secondary mb-6">
            Bars to the right (<span className="text-risk-red font-semibold">red/orange</span>) increase predicted default risk, while bars to the left (<span className="text-safe-green font-semibold">green</span>) indicate mitigating factors.
          </p>

          <div className="space-y-4">
            {factors.map((item, idx) => {
              const isPositive = item.impact > 0;
              const widthPct = Math.min((Math.abs(item.impact) / maxAbsImpact) * 100, 100);

              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-financial-text">
                      {item.feature} / {item.name}
                    </span>
                    <span className={`font-mono font-bold ${isPositive ? 'text-risk-red' : 'text-safe-green'}`}>
                      {isPositive ? `+${item.impact.toFixed(2)}` : `${item.impact.toFixed(2)}`}
                    </span>
                  </div>

                  {/* Dual polarity impact bar */}
                  <div className="w-full h-3 bg-warm-beige rounded-full overflow-hidden flex items-center border border-financial-border/70">
                    <div className="w-1/2 flex justify-end">
                      {!isPositive && (
                        <div 
                          className="h-full bg-safe-green rounded-l-full transition-all duration-700"
                          style={{ width: `${widthPct}%` }}
                        />
                      )}
                    </div>
                    <div className="w-0.5 h-full bg-financial-border z-10" />
                    <div className="w-1/2 flex justify-start">
                      {isPositive && (
                        <div 
                          className={`h-full rounded-r-full transition-all duration-700 ${
                            item.impact >= 0.20 ? 'bg-risk-red' : 'bg-risk-orange'
                          }`}
                          style={{ width: `${widthPct}%` }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-financial-border flex items-center justify-between text-[11px] text-financial-secondary">
            <span>Mitigating Risk (Negative)</span>
            <span>Zero Baseline</span>
            <span>Elevating Risk (Positive)</span>
          </div>
        </div>

        {/* Right: Key Insights Card */}
        <div className="lg:col-span-5 bg-white border border-financial-border rounded-2xl p-6 shadow-enterprise space-y-5">
          <div className="border-b border-financial-border pb-3">
            <h2 className="text-sm font-bold text-navy-dark uppercase tracking-wider">
              Key Insights
            </h2>
            <p className="text-xs text-financial-secondary mt-0.5">
              Automated behavioral risk observations
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-warm-bg/70 border border-financial-border">
              <div className="w-6 h-6 rounded-full bg-risk-red/10 text-risk-red flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                1
              </div>
              <p className="text-xs text-financial-text leading-relaxed">
                Recent payment delays significantly increase the displayed risk.
              </p>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-warm-bg/70 border border-financial-border">
              <div className="w-6 h-6 rounded-full bg-risk-red/10 text-risk-red flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                2
              </div>
              <p className="text-xs text-financial-text leading-relaxed">
                High credit utilization indicates potential financial stress.
              </p>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-warm-bg/70 border border-financial-border">
              <div className="w-6 h-6 rounded-full bg-risk-orange/10 text-risk-orange flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                3
              </div>
              <p className="text-xs text-financial-text leading-relaxed">
                Lower payment amounts increase the demonstrated risk level.
              </p>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-warm-bg/70 border border-financial-border">
              <div className="w-6 h-6 rounded-full bg-safe-green/10 text-safe-green flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                4
              </div>
              <p className="text-xs text-financial-text leading-relaxed">
                Stable marital status and education have a smaller positive effect.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onViewSimulator}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-navy-dark hover:bg-navy-secondary border border-gold-primary/40 transition-colors"
            >
              <span>Test What-If Behavior Changes →</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
