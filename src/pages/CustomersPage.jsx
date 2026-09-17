import React, { useState } from 'react';
import RiskBadge from '../components/RiskBadge';
import { dummyCustomers } from '../data/dummyCustomers';
import { ArrowRightIcon } from '../components/Icons';

export default function CustomersPage({ onSelectCustomer }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState('All');

  const filtered = dummyCustomers.filter(cust => {
    const matchesSearch = cust.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          cust.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = filterRisk === 'All' || cust.riskLevel === filterRisk;
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-financial-border pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-dark tracking-tight">
            Customers
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-financial-secondary">
            View customer risk profiles and delinquency scores.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Search ID or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white border border-financial-border rounded-xl px-3 py-2 text-xs text-financial-text placeholder-financial-secondary focus:outline-none focus:border-navy-dark shadow-xs"
          />

          <select
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value)}
            className="bg-white border border-financial-border rounded-xl px-3 py-2 text-xs font-semibold text-navy-dark focus:outline-none focus:border-navy-dark shadow-xs"
          >
            <option value="All">All Risk Levels</option>
            <option value="Low Risk">Low Risk</option>
            <option value="Moderate Risk">Moderate Risk</option>
            <option value="High Risk">High Risk</option>
            <option value="Very High Risk">Very High Risk</option>
          </select>
        </div>
      </div>

      {/* Customer List Card */}
      <div className="bg-white border border-financial-border rounded-2xl shadow-enterprise overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-warm-bg/70 border-b border-financial-border text-[11px] uppercase tracking-wider text-financial-secondary font-semibold">
                <th className="py-3 px-4">Customer ID</th>
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Age</th>
                <th className="py-3 px-4">Credit Limit</th>
                <th className="py-3 px-4">Credit Utilization</th>
                <th className="py-3 px-4">Default Probability</th>
                <th className="py-3 px-4">Risk Level</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-financial-border text-xs">
              {filtered.map((cust) => (
                <tr key={cust.id} className="hover:bg-warm-bg/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-navy-dark">
                    {cust.id}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-financial-text">
                    {cust.name}
                  </td>
                  <td className="py-3.5 px-4 text-financial-secondary">
                    {cust.age}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-medium text-financial-text">
                    ₹{cust.creditLimit.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-financial-text">
                    {cust.creditUtilization}%
                  </td>
                  <td className="py-3.5 px-4 font-bold text-navy-dark">
                    {cust.defaultProbability}%
                  </td>
                  <td className="py-3.5 px-4">
                    <RiskBadge level={cust.riskLevel} size="small" />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onSelectCustomer && onSelectCustomer(cust)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-gold-primary hover:text-navy-dark transition-colors"
                    >
                      <span>Assess</span>
                      <ArrowRightIcon className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-xs text-financial-secondary">
                    No customer profiles matched the criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-financial-border bg-warm-bg/30 flex items-center justify-between text-xs text-financial-secondary">
          <span>Showing {filtered.length} of {dummyCustomers.length} demo accounts</span>
          <span>Sample Portfolio Segment</span>
        </div>
      </div>
    </div>
  );
}
