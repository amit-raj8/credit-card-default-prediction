import React, { useState } from 'react';
import StepIndicator from '../components/StepIndicator';
import { ArrowLeftIcon, ArrowRightIcon, AlertIcon } from '../components/Icons';

export default function PaymentHistoryPage({ paymentHistory, setPaymentHistory, onNext, onBack, onStepClick }) {
  const [errorMsg, setErrorMsg] = useState('');

  const handleRowChange = (index, field, value) => {
    const updated = [...paymentHistory];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    setPaymentHistory(updated);
    if (errorMsg) setErrorMsg('');
  };

  const validate = () => {
    for (let i = 0; i < paymentHistory.length; i++) {
      const row = paymentHistory[i];
      const bill = Number(row.billAmount);
      const pay = Number(row.paymentAmount);
      const delay = Number(row.delay);

      if (isNaN(bill) || bill < 0) {
        setErrorMsg(`Row ${i + 1}: Bill amount must not be negative.`);
        return false;
      }
      if (isNaN(pay) || pay < 0) {
        setErrorMsg(`Row ${i + 1}: Payment amount must not be negative.`);
        return false;
      }
      if (isNaN(delay) || delay < 0 || delay > 6) {
        setErrorMsg(`Row ${i + 1}: Payment delay must be between 0 and 6 months.`);
        return false;
      }
    }
    return true;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-dark tracking-tight">
          Payment History
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-financial-secondary">
          Enter last 6 months billing and payment details.
        </p>
      </div>

      {/* Progress Indicator */}
      <StepIndicator currentStep={2} onStepClick={onStepClick} />

      {/* Editable Table Card */}
      <form onSubmit={handleNext} className="bg-white border border-financial-border rounded-2xl p-6 sm:p-8 shadow-enterprise">
        <div className="border-b border-financial-border pb-4 mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-navy-dark">6-Month Repayment Log</h2>
            <p className="text-xs text-financial-secondary mt-0.5">Prior billing statements, payments received, and repayment delay metrics</p>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded bg-warm-beige text-navy-secondary">
            Step 2 of 3
          </span>
        </div>

        {errorMsg && (
          <div className="mb-5 p-3 rounded-lg bg-risk-red/10 border border-risk-red/30 text-risk-red text-xs flex items-center gap-2">
            <AlertIcon className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-financial-border text-[11px] uppercase tracking-wider text-financial-secondary font-semibold">
                <th className="py-2.5 px-3">Month</th>
                <th className="py-2.5 px-3">Bill Amount (₹)</th>
                <th className="py-2.5 px-3">Payment Amount (₹)</th>
                <th className="py-2.5 px-3">Payment Delay (months)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-financial-border text-xs">
              {paymentHistory.map((row, idx) => (
                <tr key={idx} className="hover:bg-warm-bg/40 transition-colors">
                  <td className="py-3 px-3 font-semibold text-navy-dark whitespace-nowrap">
                    {row.month}
                  </td>
                  <td className="py-2.5 px-3">
                    <input
                      type="number"
                      min="0"
                      step="100"
                      value={row.billAmount}
                      onChange={(e) => handleRowChange(idx, 'billAmount', e.target.value)}
                      className="w-36 bg-white border border-financial-border rounded-lg px-2.5 py-1.5 text-xs text-financial-text focus:outline-none focus:border-navy-dark focus:ring-1 focus:ring-navy-dark"
                      required
                    />
                  </td>
                  <td className="py-2.5 px-3">
                    <input
                      type="number"
                      min="0"
                      step="100"
                      value={row.paymentAmount}
                      onChange={(e) => handleRowChange(idx, 'paymentAmount', e.target.value)}
                      className="w-36 bg-white border border-financial-border rounded-lg px-2.5 py-1.5 text-xs text-financial-text focus:outline-none focus:border-navy-dark focus:ring-1 focus:ring-navy-dark"
                      required
                    />
                  </td>
                  <td className="py-2.5 px-3">
                    <select
                      value={row.delay}
                      onChange={(e) => handleRowChange(idx, 'delay', e.target.value)}
                      className="w-36 bg-white border border-financial-border rounded-lg px-2.5 py-1.5 text-xs text-financial-text focus:outline-none focus:border-navy-dark focus:ring-1 focus:ring-navy-dark"
                    >
                      <option value="0">0 (On time / Paid)</option>
                      <option value="1">1 Month Delay</option>
                      <option value="2">2 Months Delay</option>
                      <option value="3">3 Months Delay</option>
                      <option value="4">4 Months Delay</option>
                      <option value="5">5 Months Delay</option>
                      <option value="6">6 Months Delay</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-5 border-t border-financial-border flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-financial-text bg-white hover:bg-warm-bg border border-financial-border transition-colors"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-navy-dark hover:bg-navy-secondary border border-gold-primary/40 shadow-enterprise hover:shadow-card transition-all"
          >
            <span>Next</span>
            <ArrowRightIcon className="w-3.5 h-3.5 text-gold-primary" />
          </button>
        </div>
      </form>
    </div>
  );
}
