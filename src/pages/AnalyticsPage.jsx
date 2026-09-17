import React, { useState } from 'react';
import MetricCard from '../components/MetricCard';
import DonutChart from '../components/DonutChart';
import { dummyAnalytics } from '../data/dummyAnalytics';

export default function AnalyticsPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('Last 6 Months');
  const { kpis, riskDistribution, defaultRateBySegment, timeframeOptions } = dummyAnalytics;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-financial-border pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-dark tracking-tight">
            Portfolio Analytics
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-financial-secondary">
            Overall risk distribution and key portfolio insights.
          </p>
        </div>

        {/* Timeframe Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="timeframe" className="text-xs font-semibold text-financial-secondary">
            Timeframe:
          </label>
          <select
            id="timeframe"
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="bg-white border border-financial-border rounded-xl px-3 py-2 text-xs font-semibold text-navy-dark focus:outline-none focus:border-navy-dark shadow-xs"
          >
            {timeframeOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Top 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Customers"
          value={kpis.totalCustomers.value}
          subtitle={kpis.totalCustomers.subtitle}
        />
        <MetricCard
          title="Potential Defaults"
          value={kpis.potentialDefaults.value}
          change={kpis.potentialDefaults.change}
          subtitle={kpis.potentialDefaults.subtitle}
        />
        <MetricCard
          title="High Risk Customers"
          value={kpis.highRiskCustomers.value}
          change={kpis.highRiskCustomers.change}
          subtitle={kpis.highRiskCustomers.subtitle}
        />
        <MetricCard
          title="Model Accuracy"
          value={kpis.modelAccuracy.value}
          tag="Demo Metric"
          change={kpis.modelAccuracy.change}
          subtitle={kpis.modelAccuracy.subtitle}
        />
      </div>

      {/* 2-Column Analytics Breakdown: Donut Chart & Default Rate by Segment */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Risk Distribution Donut Chart */}
        <div className="lg:col-span-6 bg-white border border-financial-border rounded-2xl p-6 sm:p-8 shadow-enterprise">
          <div className="border-b border-financial-border pb-3 mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-navy-dark uppercase tracking-wider">
                Risk Distribution
              </h2>
              <p className="text-xs text-financial-secondary mt-0.5">
                Proportion of portfolio across delinquency risk tiers
              </p>
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-warm-beige text-navy-secondary">
              Donut View
            </span>
          </div>

          <div className="py-4 flex justify-center">
            <DonutChart
              segments={riskDistribution}
              size={180}
              strokeWidth={24}
              centerText="30K"
              centerSubtext="Borrowers"
            />
          </div>

          <div className="mt-6 pt-4 border-t border-financial-border text-center text-xs text-financial-secondary">
            <span>Portfolio health is stabilized by 85% low-to-moderate risk distribution.</span>
          </div>
        </div>

        {/* Default Rate by Segment */}
        <div className="lg:col-span-6 bg-white border border-financial-border rounded-2xl p-6 sm:p-8 shadow-enterprise">
          <div className="border-b border-financial-border pb-3 mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-navy-dark uppercase tracking-wider">
                Default Rate by Segment
              </h2>
              <p className="text-xs text-financial-secondary mt-0.5">
                Historical default incidence percentages per cohort
              </p>
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-warm-beige text-navy-secondary">
              Demo Analytics Data
            </span>
          </div>

          <div className="space-y-5 my-2">
            {defaultRateBySegment.map((item, idx) => {
              // Max scale 50%
              const barWidth = Math.min((item.rate / 50) * 100, 100);

              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-financial-text">{item.segment}</span>
                    <span className="font-bold font-mono text-navy-dark">{item.rate}%</span>
                  </div>
                  <div className="w-full h-3.5 bg-warm-beige rounded-full overflow-hidden p-0.5 border border-financial-border">
                    <div 
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${barWidth}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-4 border-t border-financial-border flex items-center justify-between text-[11px] text-financial-secondary">
            <span>Low Delinquency Tier (1.2%)</span>
            <span>Severe Delinquency Tier (42.3%)</span>
          </div>
        </div>

      </div>
    </div>
  );
}
