import React, { useState } from 'react';
import StepIndicator from '../components/StepIndicator';
import { LockIcon, ArrowRightIcon, AlertIcon } from '../components/Icons';

export default function CustomerInformationPage({ customerData, setCustomerData, onNext, onStepClick }) {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errs = {};
    const ageNum = Number(customerData.age);
    if (!customerData.age || isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
      errs.age = 'Age must be between 18 and 100.';
    }

    const limitNum = Number(customerData.creditLimit);
    if (!customerData.creditLimit || isNaN(limitNum) || limitNum <= 0) {
      errs.creditLimit = 'Credit limit must be a positive number.';
    }

    const utilNum = Number(customerData.creditUtilization);
    if (customerData.creditUtilization === '' || isNaN(utilNum) || utilNum < 0 || utilNum > 100) {
      errs.creditUtilization = 'Credit utilization must be between 0% and 100%.';
    }

    if (!customerData.nationality) {
      errs.nationality = 'Nationality is required.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
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
          Customer Information
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-financial-secondary">
          Enter the customer's credit card details to predict default risk.
        </p>
      </div>

      {/* 3-Step Wizard Indicator */}
      <StepIndicator currentStep={1} onStepClick={onStepClick} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Main Card: Basic Details */}
        <form 
          onSubmit={handleSubmit}
          className="lg:col-span-8 bg-white border border-financial-border rounded-2xl p-6 sm:p-8 shadow-enterprise"
        >
          <div className="border-b border-financial-border pb-4 mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-navy-dark">Basic Details</h2>
              <p className="text-xs text-financial-secondary mt-0.5">Primary borrower demographics and credit profile</p>
            </div>
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded bg-warm-beige text-navy-secondary">
              Step 1 of 3
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Age */}
            <div>
              <label htmlFor="age" className="block text-xs font-semibold text-financial-text mb-1.5">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                min="18"
                max="100"
                value={customerData.age}
                onChange={handleChange}
                className="w-full bg-white border border-financial-border rounded-lg px-3.5 py-2 text-sm text-financial-text focus:outline-none focus:border-navy-dark focus:ring-1 focus:ring-navy-dark shadow-xs"
                placeholder="e.g. 35"
                required
              />
              {errors.age && (
                <p className="text-[11px] text-risk-red mt-1 flex items-center gap-1">
                  <AlertIcon className="w-3 h-3" />
                  <span>{errors.age}</span>
                </p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-xs font-semibold text-financial-text mb-1.5">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={customerData.gender}
                onChange={handleChange}
                className="w-full bg-white border border-financial-border rounded-lg px-3.5 py-2 text-sm text-financial-text focus:outline-none focus:border-navy-dark focus:ring-1 focus:ring-navy-dark shadow-xs"
                required
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>

            {/* Marital Status */}
            <div>
              <label htmlFor="maritalStatus" className="block text-xs font-semibold text-financial-text mb-1.5">
                Marital Status
              </label>
              <select
                id="maritalStatus"
                name="maritalStatus"
                value={customerData.maritalStatus}
                onChange={handleChange}
                className="w-full bg-white border border-financial-border rounded-lg px-3.5 py-2 text-sm text-financial-text focus:outline-none focus:border-navy-dark focus:ring-1 focus:ring-navy-dark shadow-xs"
                required
              >
                <option value="Married">Married</option>
                <option value="Single">Single</option>
                <option value="Others">Others</option>
              </select>
            </div>

            {/* Education */}
            <div>
              <label htmlFor="education" className="block text-xs font-semibold text-financial-text mb-1.5">
                Education
              </label>
              <select
                id="education"
                name="education"
                value={customerData.education}
                onChange={handleChange}
                className="w-full bg-white border border-financial-border rounded-lg px-3.5 py-2 text-sm text-financial-text focus:outline-none focus:border-navy-dark focus:ring-1 focus:ring-navy-dark shadow-xs"
                required
              >
                <option value="Graduate">Graduate</option>
                <option value="Graduate School">Graduate School</option>
                <option value="University">University</option>
                <option value="High School">High School</option>
                <option value="Others">Others</option>
              </select>
            </div>

            {/* Credit Limit (₹) */}
            <div>
              <label htmlFor="creditLimit" className="block text-xs font-semibold text-financial-text mb-1.5">
                Credit Limit (₹)
              </label>
              <input
                type="number"
                id="creditLimit"
                name="creditLimit"
                min="1"
                step="1000"
                value={customerData.creditLimit}
                onChange={handleChange}
                className="w-full bg-white border border-financial-border rounded-lg px-3.5 py-2 text-sm text-financial-text focus:outline-none focus:border-navy-dark focus:ring-1 focus:ring-navy-dark shadow-xs"
                placeholder="e.g. 50000"
                required
              />
              {errors.creditLimit && (
                <p className="text-[11px] text-risk-red mt-1 flex items-center gap-1">
                  <AlertIcon className="w-3 h-3" />
                  <span>{errors.creditLimit}</span>
                </p>
              )}
            </div>

            {/* Nationality */}
            <div>
              <label htmlFor="nationality" className="block text-xs font-semibold text-financial-text mb-1.5">
                Nationality
              </label>
              <input
                type="text"
                id="nationality"
                name="nationality"
                value={customerData.nationality}
                onChange={handleChange}
                className="w-full bg-white border border-financial-border rounded-lg px-3.5 py-2 text-sm text-financial-text focus:outline-none focus:border-navy-dark focus:ring-1 focus:ring-navy-dark shadow-xs"
                placeholder="Indian"
                required
              />
              {errors.nationality && (
                <p className="text-[11px] text-risk-red mt-1 flex items-center gap-1">
                  <AlertIcon className="w-3 h-3" />
                  <span>{errors.nationality}</span>
                </p>
              )}
            </div>

            {/* Credit Utilization (%) */}
            <div className="sm:col-span-2">
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="creditUtilization" className="block text-xs font-semibold text-financial-text">
                  Credit Utilization (%)
                </label>
                <span className="text-xs font-bold text-navy-dark">{customerData.creditUtilization}%</span>
              </div>
              <input
                type="number"
                id="creditUtilization"
                name="creditUtilization"
                min="0"
                max="100"
                step="1"
                value={customerData.creditUtilization}
                onChange={handleChange}
                className="w-full bg-white border border-financial-border rounded-lg px-3.5 py-2 text-sm text-financial-text focus:outline-none focus:border-navy-dark focus:ring-1 focus:ring-navy-dark shadow-xs"
                placeholder="e.g. 82"
                required
              />
              {errors.creditUtilization && (
                <p className="text-[11px] text-risk-red mt-1 flex items-center gap-1">
                  <AlertIcon className="w-3 h-3" />
                  <span>{errors.creditUtilization}</span>
                </p>
              )}
              <span className="text-[11px] text-financial-secondary mt-1 block">
                Ratio of current balance to overall approved credit line.
              </span>
            </div>

          </div>

          {/* Form Actions */}
          <div className="mt-8 pt-5 border-t border-financial-border flex items-center justify-between">
            <span className="text-xs text-financial-secondary">
              All basic details are checked before risk scoring.
            </span>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-navy-dark hover:bg-navy-secondary border border-gold-primary/40 shadow-enterprise hover:shadow-card transition-all"
            >
              <span>Next</span>
              <ArrowRightIcon className="w-3.5 h-3.5 text-gold-primary" />
            </button>
          </div>
        </form>

        {/* Right Side Panel: Security Info */}
        <div className="lg:col-span-4 bg-white border border-financial-border rounded-2xl p-6 shadow-enterprise space-y-4">
          <div className="w-10 h-10 rounded-xl bg-warm-bg border border-financial-border flex items-center justify-center text-navy-dark">
            <LockIcon className="w-5 h-5 text-gold-primary" />
          </div>

          <div>
            <h3 className="text-sm font-bold text-navy-dark">
              Your data is secure
            </h3>
            <p className="mt-1.5 text-xs text-financial-secondary leading-relaxed">
              Customer information is used only for risk prediction and analysis.
            </p>
          </div>

          <div className="p-3 bg-warm-bg rounded-xl border border-financial-border text-[11px] text-financial-secondary space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-safe-green" />
              <span>Confidential Underwriting Protocol</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-safe-green" />
              <span>Non-Destructive Simulation</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
