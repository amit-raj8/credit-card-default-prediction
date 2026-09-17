import React from 'react';
import MetricCard from '../components/MetricCard';
import DonutChart from '../components/DonutChart';
import RiskBadge from '../components/RiskBadge';
import { ArrowRightIcon, PredictIcon } from '../components/Icons';
import { dummyCustomers } from '../data/dummyCustomers';

export default function DashboardPage({ onStartPredict, onViewCustomer }) {
  const recentPredictions = dummyCustomers.slice(0, 6);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-financial-border pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-dark tracking-tight">
            Credit Risk Dashboard
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-financial-secondary">
            Monitor customer credit risk and recent prediction activity.
          </p>
        </div>

        <button
          onClick={onStartPredict}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-navy-dark hover:bg-navy-secondary border border-gold-primary/40 shadow-enterprise hover:shadow-card transition-all"
        >
          <PredictIcon className="w-4 h-4 text-gold-primary" />
          <span>New Prediction</span>
          <ArrowRightIcon className="w-3.5 h-3.5 text-gold-primary" />
        </button>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Customers"
          value="30,000"
          subtitle="Portfolio under management"
        />
        <MetricCard
          title="High Risk Customers"
          value="4,120"
          change="+13.7%"
          subtitle="Probability threshold ≥ 70%"
        />
        <MetricCard
          title="Average Risk Score"
          value="46.2"
          subtitle="Index scale 0–100"
        />
        <MetricCard
          title="Predictions Today"
          value="128"
          change="+18"
          subtitle="Active scoring sessions"
        />
      </div>

      {/* 2-Column Grid: Risk Distribution Donut & Recent Predictions Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Risk Distribution Card with SVG Donut */}
        <div className="lg:col-span-5 bg-white border border-financial-border rounded-2xl p-6 shadow-enterprise">
          <div className="border-b border-financial-border pb-3 mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-navy-dark uppercase tracking-wider">
                Risk Distribution
              </h3>
              <p className="text-[11px] text-financial-secondary mt-0.5">
                Current customer portfolio breakdown
              </p>
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-warm-beige text-navy-dark">
              Demo Data
            </span>
          </div>

          <div className="py-2 flex justify-center">
            <DonutChart
              segments={[
                { label: "Low Risk", percentage: 61, color: "#2A9D72" },
                { label: "Moderate Risk", percentage: 24, color: "#D5AD43" },
                { label: "High Risk", percentage: 11, color: "#E69B45" },
                { label: "Very High Risk", percentage: 4, color: "#D84C4C" }
              ]}
              size={170}
              strokeWidth={22}
              centerText="30,000"
              centerSubtext="Accounts"
            />
          </div>

          <div className="mt-6 pt-4 border-t border-financial-border text-center text-xs text-financial-secondary">
            <span>61% of portfolio accounts maintain healthy delinquency margins.</span>
          </div>
        </div>

        {/* Right: Recent Predictions Table */}
        <div className="lg:col-span-7 bg-white border border-financial-border rounded-2xl p-6 shadow-enterprise">
          <div className="border-b border-financial-border pb-3 mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-navy-dark uppercase tracking-wider">
                Recent Predictions
              </h3>
              <p className="text-[11px] text-financial-secondary mt-0.5">
                Latest simulated default scoring records
              </p>
            </div>
            <button
              onClick={() => onStartPredict()}
              className="text-xs font-semibold text-gold-primary hover:text-navy-dark transition-colors"
            >
              Assess New +
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-financial-border text-[11px] uppercase tracking-wider text-financial-secondary font-semibold">
                  <th className="py-2.5 px-3">Customer ID</th>
                  <th className="py-2.5 px-3">Default Probability</th>
                  <th className="py-2.5 px-3">Risk Level</th>
                  <th className="py-2.5 px-3 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-financial-border text-xs">
                {recentPredictions.map((cust) => (
                  <tr 
                    key={cust.id} 
                    className="hover:bg-warm-bg/70 transition-colors cursor-pointer"
                    onClick={() => onViewCustomer && onViewCustomer(cust)}
                  >
                    <td className="py-3 px-3 font-semibold text-navy-dark">
                      {cust.id}
                    </td>
                    <td className="py-3 px-3 font-bold text-financial-text">
                      {cust.defaultProbability}%
                    </td>
                    <td className="py-3 px-3">
                      <RiskBadge level={cust.riskLevel} size="small" />
                    </td>
                    <td className="py-3 px-3 text-right text-financial-secondary">
                      {cust.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 pt-3 border-t border-financial-border text-right">
            <button
              onClick={onStartPredict}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-dark hover:text-gold-primary transition-colors"
            >
              <span>View Full Assessment Flow</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
