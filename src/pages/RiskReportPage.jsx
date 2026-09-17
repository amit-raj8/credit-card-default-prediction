import React from 'react';
import { LogoIcon, DownloadIcon, AlertIcon } from '../components/Icons';
import RiskBadge from '../components/RiskBadge';
import { dummyPrediction } from '../data/dummyPrediction';

export default function RiskReportPage({ customerData, paymentHistory, onDownloadPDF }) {
  const currentDate = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Page Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-financial-border pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-dark tracking-tight">
            Risk Report
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-financial-secondary">
            Download detailed analysis for this customer.
          </p>
        </div>

        <button
          onClick={onDownloadPDF}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-navy-dark hover:bg-navy-secondary border border-gold-primary/40 shadow-enterprise transition-all"
        >
          <DownloadIcon className="w-4 h-4 text-gold-primary" />
          <span>Download PDF</span>
        </button>
      </div>

      {/* Printable Document-Style Card */}
      <article className="bg-white border border-financial-border rounded-2xl p-8 sm:p-12 shadow-elevated text-financial-text space-y-8">
        
        {/* Document Header */}
        <header className="text-center border-b border-financial-border pb-6 space-y-2">
          <div className="flex justify-center mb-3">
            <LogoIcon className="w-10 h-10" goldColor="#C99A4A" navyColor="#071E2B" />
          </div>
          <div className="text-xs uppercase font-extrabold tracking-widest text-gold-primary">
            JATAYU RISK INTELLIGENCE
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-navy-dark tracking-tight">
            Customer Credit Risk Report
          </h2>
          <p className="text-xs text-financial-secondary">
            Generated on {currentDate} • Reference: #CR-2026-C10283
          </p>
        </header>

        {/* Section 1: Customer Summary & Highlighted Risk Summary Panel */}
        <section aria-labelledby="report-summary-heading">
          <h3 id="report-summary-heading" className="sr-only">Customer Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            
            {/* Customer Summary Table */}
            <div className="md:col-span-7 bg-warm-bg/50 border border-financial-border rounded-xl p-5">
              <h4 className="text-xs font-bold text-navy-dark uppercase tracking-wider mb-3">
                Customer Profile
              </h4>
              <dl className="grid grid-cols-2 gap-y-2.5 text-xs">
                <div>
                  <dt className="text-financial-secondary">Customer ID:</dt>
                  <dd className="font-bold text-navy-dark">C10283</dd>
                </div>
                <div>
                  <dt className="text-financial-secondary">Age:</dt>
                  <dd className="font-bold text-navy-dark">{customerData?.age || 35} yrs</dd>
                </div>
                <div>
                  <dt className="text-financial-secondary">Gender:</dt>
                  <dd className="font-bold text-navy-dark">{customerData?.gender || 'Female'}</dd>
                </div>
                <div>
                  <dt className="text-financial-secondary">Marital Status:</dt>
                  <dd className="font-bold text-navy-dark">{customerData?.maritalStatus || 'Married'}</dd>
                </div>
                <div>
                  <dt className="text-financial-secondary">Education:</dt>
                  <dd className="font-bold text-navy-dark">{customerData?.education || 'Graduate'}</dd>
                </div>
                <div>
                  <dt className="text-financial-secondary">Nationality:</dt>
                  <dd className="font-bold text-navy-dark">{customerData?.nationality || 'Indian'}</dd>
                </div>
                <div>
                  <dt className="text-financial-secondary">Credit Limit:</dt>
                  <dd className="font-bold text-navy-dark">₹{Number(customerData?.creditLimit || 50000).toLocaleString()}</dd>
                </div>
                <div>
                  <dt className="text-financial-secondary">Credit Utilization:</dt>
                  <dd className="font-bold text-risk-red">{customerData?.creditUtilization || 82}%</dd>
                </div>
              </dl>
            </div>

            {/* Right Highlighted Risk Summary Panel */}
            <div className="md:col-span-5 bg-navy-dark text-white rounded-xl p-5 border border-gold-primary/40 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-muted block mb-1">
                  Risk Summary Panel
                </span>
                <div className="mt-2">
                  <span className="text-xs text-slate-300 block">Default Probability:</span>
                  <span className="text-3xl font-extrabold text-white tracking-tight">78.4%</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-slate-300">Risk Category:</span>
                  <RiskBadge level="High Risk" size="small" />
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-300">Credit Risk Score:</span>
                  <span className="font-bold text-gold-primary font-mono text-sm">82 / 100</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-700/60 text-[10px] text-slate-400">
                Evaluation: High delinquency likelihood within next 30-day payment cycle.
              </div>
            </div>

          </div>
        </section>

        {/* Section 2: Payment Summary */}
        <section className="space-y-3" aria-labelledby="payment-history-heading">
          <h4 id="payment-history-heading" className="text-xs font-bold text-navy-dark uppercase tracking-wider">
            6-Month Payment Summary
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-financial-border text-[11px] uppercase tracking-wider text-financial-secondary bg-warm-bg/50">
                  <th className="py-2 px-3">Month</th>
                  <th className="py-2 px-3">Billed (₹)</th>
                  <th className="py-2 px-3">Paid (₹)</th>
                  <th className="py-2 px-3 text-right">Repayment Delay</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-financial-border">
                {(paymentHistory || []).map((row, idx) => (
                  <tr key={idx}>
                    <td className="py-2 px-3 font-semibold text-navy-dark">{row.month}</td>
                    <td className="py-2 px-3 text-financial-text">₹{Number(row.billAmount).toLocaleString()}</td>
                    <td className="py-2 px-3 text-financial-text">₹{Number(row.paymentAmount).toLocaleString()}</td>
                    <td className="py-2 px-3 text-right font-medium">
                      {row.delay === '0' ? (
                        <span className="text-safe-green font-semibold">0 mo (On Time)</span>
                      ) : (
                        <span className="text-risk-red font-semibold">+{row.delay} months</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Risk Factors & Prediction Summary */}
        <section className="space-y-3" aria-labelledby="risk-factors-heading">
          <h4 id="risk-factors-heading" className="text-xs font-bold text-navy-dark uppercase tracking-wider">
            Key Contributing Risk Factors
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {dummyPrediction.riskFactors.slice(0, 4).map((f, i) => (
              <div key={i} className="p-3 rounded-lg border border-financial-border bg-warm-bg/30 flex justify-between items-center">
                <span className="text-financial-text font-medium">{f.name}</span>
                <span className="font-mono font-bold text-risk-red">+{f.impact}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Recommended Action */}
        <section className="p-4 rounded-xl border border-risk-orange/30 bg-risk-orange/5 space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-navy-dark">
            <AlertIcon className="w-4 h-4 text-risk-orange" />
            <span>Recommended Underwriting Action</span>
          </div>
          <p className="text-xs text-financial-text leading-relaxed">
            Prioritize proactive customer communication and review repayment behavior. Customer shows high utilization and increasing payment delays.
          </p>
        </section>

        {/* Mandatory Disclaimer */}
        <footer className="pt-6 border-t border-financial-border text-center text-[11px] text-financial-secondary leading-relaxed">
          <p>
            <strong>Disclaimer:</strong> This report currently uses demonstration data and frontend-only simulated prediction values. It is not a real credit decision.
          </p>
        </footer>

      </article>
    </div>
  );
}
