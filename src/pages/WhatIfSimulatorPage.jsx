import React, { useState } from 'react';
import { ResetIcon, ArrowRightIcon, CheckCircleIcon, SlidersIcon } from '../components/Icons';

export default function WhatIfSimulatorPage() {
  const INITIAL_PARAMS = {
    creditUtilization: 82,
    recentDelay: 2,
    averagePayment: 18400
  };

  const [params, setParams] = useState(INITIAL_PARAMS);
  const baseProbability = 78.4;

  // Frontend deterministic simulated calculation:
  // Base 78.4%
  // Each 10% reduction in utilization drops risk by ~4%
  // Each month reduced in delay drops risk by ~12%
  // Each ₹10,000 increase in payment drops risk by ~2%
  const calculateSimulatedProb = () => {
    const utilDiff = params.creditUtilization - 82; // negative if reduced
    const delayDiff = params.recentDelay - 2; // negative if reduced
    const payDiff = (params.averagePayment - 18400) / 10000; // positive if increased

    let sim = baseProbability + (utilDiff * 0.35) + (delayDiff * 11.5) - (payDiff * 2.5);
    // Clamp between 5% and 95%
    return Math.min(Math.max(Number(sim.toFixed(1)), 5.0), 95.0);
  };

  const simulatedProbability = calculateSimulatedProb();
  const delta = (simulatedProbability - baseProbability).toFixed(1);
  const isReduced = Number(delta) < 0;

  const handleReset = () => {
    setParams(INITIAL_PARAMS);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-financial-border pb-5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-dark tracking-tight">
          What-If Simulator
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-financial-secondary">
          See how changes in customer financial behavior could impact the simulated risk.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT PANEL: Parameters & Sliders */}
        <div className="lg:col-span-6 bg-white border border-financial-border rounded-2xl p-6 sm:p-8 shadow-enterprise">
          <div className="flex items-center justify-between border-b border-financial-border pb-4 mb-6">
            <div className="flex items-center gap-2">
              <SlidersIcon className="w-4 h-4 text-gold-primary" />
              <h2 className="text-sm font-bold text-navy-dark uppercase tracking-wider">
                Adjust Customer Parameters
              </h2>
            </div>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-financial-secondary hover:text-navy-dark hover:bg-warm-bg rounded-lg border border-financial-border transition-colors"
            >
              <ResetIcon className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="space-y-6">
            {/* Control 1: Credit Utilization */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold mb-2">
                <label htmlFor="sim-util" className="text-financial-text">
                  Credit Utilization (%)
                </label>
                <span className="font-bold text-navy-dark px-2 py-0.5 rounded bg-warm-beige">
                  {params.creditUtilization}%
                </span>
              </div>
              <input
                type="range"
                id="sim-util"
                min="0"
                max="100"
                step="1"
                value={params.creditUtilization}
                onChange={(e) => setParams(prev => ({ ...prev, creditUtilization: Number(e.target.value) }))}
                className="w-full accent-navy-dark cursor-pointer h-2 bg-warm-beige rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-financial-secondary mt-1 font-medium">
                <span>0% Min</span>
                <span className="text-navy-secondary">Default: 82%</span>
                <span>100% Max</span>
              </div>
            </div>

            {/* Control 2: Recent Payment Delay */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold mb-2">
                <label htmlFor="sim-delay" className="text-financial-text">
                  Recent Payment Delay (months)
                </label>
                <span className="font-bold text-navy-dark px-2 py-0.5 rounded bg-warm-beige">
                  {params.recentDelay} mo
                </span>
              </div>
              <input
                type="range"
                id="sim-delay"
                min="0"
                max="6"
                step="1"
                value={params.recentDelay}
                onChange={(e) => setParams(prev => ({ ...prev, recentDelay: Number(e.target.value) }))}
                className="w-full accent-navy-dark cursor-pointer h-2 bg-warm-beige rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-financial-secondary mt-1 font-medium">
                <span>0 (On Time)</span>
                <span className="text-navy-secondary">Default: 2 mo</span>
                <span>6 Months</span>
              </div>
            </div>

            {/* Control 3: Average Payment Amount */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold mb-2">
                <label htmlFor="sim-pay" className="text-financial-text">
                  Average Payment Amount (₹)
                </label>
                <span className="font-bold text-navy-dark px-2 py-0.5 rounded bg-warm-beige">
                  ₹{params.averagePayment.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                id="sim-pay"
                min="0"
                max="100000"
                step="1000"
                value={params.averagePayment}
                onChange={(e) => setParams(prev => ({ ...prev, averagePayment: Number(e.target.value) }))}
                className="w-full accent-navy-dark cursor-pointer h-2 bg-warm-beige rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-financial-secondary mt-1 font-medium">
                <span>₹0</span>
                <span className="text-navy-secondary">Default: ₹18,400</span>
                <span>₹100,000</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-financial-border flex items-center justify-between">
            <span className="text-[11px] text-financial-secondary">
              Parameters recalculate simulated output dynamically.
            </span>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-navy-dark hover:bg-navy-secondary border border-gold-primary/40 shadow-enterprise transition-all"
            >
              <span>Simulate</span>
              <ArrowRightIcon className="w-3.5 h-3.5 text-gold-primary" />
            </button>
          </div>
        </div>

        {/* RIGHT PANEL: Simulation Result */}
        <div className="lg:col-span-6 bg-white border border-financial-border rounded-2xl p-6 sm:p-8 shadow-enterprise space-y-6">
          <div className="border-b border-financial-border pb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold text-navy-dark uppercase tracking-wider">
              Simulation Result
            </h2>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-warm-beige text-navy-secondary">
              Real-time Output
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-warm-bg/70 border border-financial-border rounded-xl">
              <span className="text-xs font-medium text-financial-secondary block mb-1">Current Probability</span>
              <span className="text-3xl font-extrabold text-navy-dark">{baseProbability}%</span>
            </div>

            <div className="p-4 bg-warm-bg/70 border border-financial-border rounded-xl">
              <span className="text-xs font-medium text-financial-secondary block mb-1">Simulated Probability</span>
              <span className={`text-3xl font-extrabold ${simulatedProbability < baseProbability ? 'text-safe-green' : 'text-risk-red'}`}>
                {simulatedProbability}%
              </span>
            </div>
          </div>

          {/* Change Delta */}
          <div className="p-4 rounded-xl border flex items-center justify-between bg-white border-financial-border">
            <span className="text-xs font-semibold text-financial-secondary">Net Variance / Change:</span>
            <span className={`text-sm font-extrabold px-2.5 py-1 rounded-full ${
              isReduced ? 'bg-safe-green/10 text-safe-green' : 'bg-risk-red/10 text-risk-red'
            }`}>
              {isReduced ? `↓ ${Math.abs(delta)}%` : `↑ ${delta}%`}
            </span>
          </div>

          {/* Positive Green Information Card */}
          <div className="p-4 rounded-xl bg-[#EBF7F2] border border-[#BBE5D4] flex items-start gap-3">
            <CheckCircleIcon className="w-5 h-5 text-safe-green flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[#1B6347] leading-relaxed font-medium">
              Reducing utilization and clearing recent delays can significantly lower the displayed simulated risk.
            </p>
          </div>

          <div className="pt-2 text-center">
            <span className="text-[11px] text-financial-secondary italic">
              Illustrative simulation only.
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
