import React, { useState } from 'react';
import StepIndicator from '../components/StepIndicator';
import { ArrowLeftIcon, ArrowRightIcon, SpinnerIcon, PredictIcon } from '../components/Icons';
import { simulatePrediction } from '../data/dummyPrediction';

export default function ReviewPage({ 
  customerData, 
  paymentHistory, 
  onBack, 
  onPredictionComplete,
  onStepClick 
}) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleGenerate = async () => {
    setIsAnalyzing(true);
    try {
      const result = await simulatePrediction({ customerData, paymentHistory });
      onPredictionComplete(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-dark tracking-tight">
          Review & Predict
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-financial-secondary">
          Please review the information before generating the prediction.
        </p>
      </div>

      {/* Progress Indicator */}
      <StepIndicator currentStep={3} onStepClick={onStepClick} />

      {/* Side-by-Side Review Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT CARD: Customer Summary */}
        <div className="lg:col-span-5 bg-white border border-financial-border rounded-2xl p-6 shadow-enterprise">
          <div className="border-b border-financial-border pb-3 mb-5 flex items-center justify-between">
            <h2 className="text-sm font-bold text-navy-dark uppercase tracking-wider">
              Customer Summary
            </h2>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-warm-beige text-navy-secondary">
              Demographics
            </span>
          </div>

          <dl className="divide-y divide-financial-border text-xs">
            <div className="py-2.5 flex justify-between">
              <dt className="text-financial-secondary">Age</dt>
              <dd className="font-bold text-navy-dark">{customerData.age}</dd>
            </div>
            <div className="py-2.5 flex justify-between">
              <dt className="text-financial-secondary">Gender</dt>
              <dd className="font-bold text-navy-dark">{customerData.gender}</dd>
            </div>
            <div className="py-2.5 flex justify-between">
              <dt className="text-financial-secondary">Marital Status</dt>
              <dd className="font-bold text-navy-dark">{customerData.maritalStatus}</dd>
            </div>
            <div className="py-2.5 flex justify-between">
              <dt className="text-financial-secondary">Education</dt>
              <dd className="font-bold text-navy-dark">{customerData.education}</dd>
            </div>
            <div className="py-2.5 flex justify-between">
              <dt className="text-financial-secondary">Credit Limit</dt>
              <dd className="font-bold text-navy-dark">₹{Number(customerData.creditLimit).toLocaleString()}</dd>
            </div>
            <div className="py-2.5 flex justify-between">
              <dt className="text-financial-secondary">Nationality</dt>
              <dd className="font-bold text-navy-dark">{customerData.nationality}</dd>
            </div>
            <div className="py-2.5 flex justify-between">
              <dt className="text-financial-secondary">Credit Utilization</dt>
              <dd className="font-bold text-risk-red">{customerData.creditUtilization}%</dd>
            </div>
          </dl>
        </div>

        {/* RIGHT CARD: Last 6 Months Payment History */}
        <div className="lg:col-span-7 bg-white border border-financial-border rounded-2xl p-6 shadow-enterprise">
          <div className="border-b border-financial-border pb-3 mb-5 flex items-center justify-between">
            <h2 className="text-sm font-bold text-navy-dark uppercase tracking-wider">
              Last 6 Months Payment History
            </h2>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-warm-beige text-navy-secondary">
              6 Billing Cycles
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-financial-border text-[11px] uppercase tracking-wider text-financial-secondary font-semibold">
                  <th className="py-2 px-2.5">Month</th>
                  <th className="py-2 px-2.5">Bill Amount</th>
                  <th className="py-2 px-2.5">Payment Amount</th>
                  <th className="py-2 px-2.5 text-right">Delay</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-financial-border">
                {paymentHistory.map((row, idx) => (
                  <tr key={idx} className="hover:bg-warm-bg/50">
                    <td className="py-2.5 px-2.5 font-semibold text-navy-dark">{row.month}</td>
                    <td className="py-2.5 px-2.5 text-financial-text">₹{Number(row.billAmount).toLocaleString()}</td>
                    <td className="py-2.5 px-2.5 text-financial-text">₹{Number(row.paymentAmount).toLocaleString()}</td>
                    <td className="py-2.5 px-2.5 text-right font-medium">
                      {row.delay === '0' ? (
                        <span className="text-safe-green font-semibold">0 (On Time)</span>
                      ) : (
                        <span className="text-risk-red font-semibold">+{row.delay} mo</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Action Footer */}
      <div className="bg-white border border-financial-border rounded-2xl p-5 shadow-enterprise flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={isAnalyzing}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-financial-text bg-white hover:bg-warm-bg border border-financial-border transition-colors disabled:opacity-50"
        >
          <ArrowLeftIcon className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <button
          id="generate-prediction-btn"
          type="button"
          onClick={handleGenerate}
          disabled={isAnalyzing}
          className="inline-flex items-center gap-2.5 px-7 py-3 rounded-xl text-xs font-bold text-white bg-navy-dark hover:bg-navy-secondary border border-gold-primary/50 shadow-elevated transition-all disabled:opacity-80"
        >
          {isAnalyzing ? (
            <>
              <SpinnerIcon className="w-4 h-4 animate-spin text-gold-primary" />
              <span>Analyzing Risk...</span>
            </>
          ) : (
            <>
              <PredictIcon className="w-4 h-4 text-gold-primary" />
              <span>Generate Prediction</span>
              <ArrowRightIcon className="w-3.5 h-3.5 text-gold-primary" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
