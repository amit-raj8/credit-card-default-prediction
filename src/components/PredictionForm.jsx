import React, { useState } from 'react';
import { 
  CreditCard, 
  Calendar, 
  User, 
  GraduationCap, 
  Heart, 
  Clock, 
  Receipt, 
  CheckCircle, 
  Percent, 
  Loader2, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { fetchPrediction } from '../data/dummyPrediction';

const INITIAL_FORM_STATE = {
  creditLimit: '20000',
  age: '32',
  gender: 'Female',
  education: 'University',
  maritalStatus: 'Single',
  paymentStatus: '2 Months Delay',
  previousBillAmount: '4500',
  previousPaymentAmount: '600',
  creditUtilization: '85'
};

export default function PredictionForm({ onPredict, isLoading, setIsLoading }) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errorMessage) setErrorMessage('');
  };

  const handleReset = () => {
    setFormData({
      creditLimit: '',
      age: '',
      gender: '',
      education: '',
      maritalStatus: '',
      paymentStatus: '',
      previousBillAmount: '',
      previousPaymentAmount: '',
      creditUtilization: ''
    });
    if (errorMessage) setErrorMessage('');
  };

  const handleFillSample = () => {
    setFormData(INITIAL_FORM_STATE);
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation: ensure all 9 fields have values
    const requiredKeys = Object.keys(formData);
    const hasEmptyField = requiredKeys.some((key) => formData[key] === '' || formData[key] === undefined);

    if (hasEmptyField) {
      setErrorMessage('Please fill in all 9 fields before predicting default risk.');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    try {
      // In the future, this can simply call a real API:
      // const response = await fetch("/api/predict", { method: "POST", ... })
      const result = await fetchPrediction(formData);
      onPredict(result);
    } catch (err) {
      setErrorMessage('Failed to generate prediction. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form 
      id="prediction-form"
      onSubmit={handleSubmit}
      className="bg-white border border-slate-200/90 rounded-2xl shadow-card p-6 md:p-8 transition-all"
    >
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Customer Financial Profile</h2>
          <p className="text-xs text-slate-500 mt-0.5">Enter account parameters to evaluate delinquency probability</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleFillSample}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100/80 rounded-lg transition-colors"
            title="Load standard sample data"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Sample Data
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title="Clear all fields"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="mb-6 p-3.5 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2">
          <span className="font-medium">{errorMessage}</span>
        </div>
      )}

      {/* Responsive Grid: 1 col on mobile, 2 col on tablet, 3 col on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* 1. Credit Limit */}
        <div>
          <label htmlFor="creditLimit" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            1. Credit Limit ($)
          </label>
          <div className="relative rounded-xl shadow-subtle">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <CreditCard className="w-4 h-4" />
            </div>
            <input
              type="number"
              id="creditLimit"
              name="creditLimit"
              min="0"
              step="100"
              placeholder="e.g. 20000"
              value={formData.creditLimit}
              onChange={handleChange}
              required
              className="block w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all bg-slate-50/50 hover:bg-white focus:bg-white"
            />
          </div>
        </div>

        {/* 2. Age */}
        <div>
          <label htmlFor="age" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            2. Age
          </label>
          <div className="relative rounded-xl shadow-subtle">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <Calendar className="w-4 h-4" />
            </div>
            <input
              type="number"
              id="age"
              name="age"
              min="18"
              max="100"
              placeholder="e.g. 32"
              value={formData.age}
              onChange={handleChange}
              required
              className="block w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all bg-slate-50/50 hover:bg-white focus:bg-white"
            />
          </div>
        </div>

        {/* 3. Gender */}
        <div>
          <label htmlFor="gender" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            3. Gender
          </label>
          <div className="relative rounded-xl shadow-subtle">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="block w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-8 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all bg-slate-50/50 hover:bg-white focus:bg-white cursor-pointer appearance-none"
            >
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>

        {/* 4. Education */}
        <div>
          <label htmlFor="education" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            4. Education
          </label>
          <div className="relative rounded-xl shadow-subtle">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <GraduationCap className="w-4 h-4" />
            </div>
            <select
              id="education"
              name="education"
              value={formData.education}
              onChange={handleChange}
              required
              className="block w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-8 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all bg-slate-50/50 hover:bg-white focus:bg-white cursor-pointer appearance-none"
            >
              <option value="" disabled>Select Education Level</option>
              <option value="Graduate School">Graduate School</option>
              <option value="University">University</option>
              <option value="High School">High School</option>
              <option value="Others">Others</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>

        {/* 5. Marital Status */}
        <div>
          <label htmlFor="maritalStatus" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            5. Marital Status
          </label>
          <div className="relative rounded-xl shadow-subtle">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <Heart className="w-4 h-4" />
            </div>
            <select
              id="maritalStatus"
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              required
              className="block w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-8 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all bg-slate-50/50 hover:bg-white focus:bg-white cursor-pointer appearance-none"
            >
              <option value="" disabled>Select Marital Status</option>
              <option value="Married">Married</option>
              <option value="Single">Single</option>
              <option value="Others">Others</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>

        {/* 6. Payment Status */}
        <div>
          <label htmlFor="paymentStatus" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            6. Payment Status
          </label>
          <div className="relative rounded-xl shadow-subtle">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <Clock className="w-4 h-4" />
            </div>
            <select
              id="paymentStatus"
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleChange}
              required
              className="block w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-8 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all bg-slate-50/50 hover:bg-white focus:bg-white cursor-pointer appearance-none"
            >
              <option value="" disabled>Select Repayment Status</option>
              <option value="Paid on Time">Paid on Time / Current</option>
              <option value="1 Month Delay">1 Month Delay</option>
              <option value="2 Months Delay">2 Months Delay</option>
              <option value="3+ Months Delay">3+ Months Delay</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>

        {/* 7. Previous Bill Amount */}
        <div>
          <label htmlFor="previousBillAmount" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            7. Previous Bill Amount ($)
          </label>
          <div className="relative rounded-xl shadow-subtle">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <Receipt className="w-4 h-4" />
            </div>
            <input
              type="number"
              id="previousBillAmount"
              name="previousBillAmount"
              placeholder="e.g. 4500"
              value={formData.previousBillAmount}
              onChange={handleChange}
              required
              className="block w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all bg-slate-50/50 hover:bg-white focus:bg-white"
            />
          </div>
        </div>

        {/* 8. Previous Payment Amount */}
        <div>
          <label htmlFor="previousPaymentAmount" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            8. Previous Payment Amount ($)
          </label>
          <div className="relative rounded-xl shadow-subtle">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <CheckCircle className="w-4 h-4" />
            </div>
            <input
              type="number"
              id="previousPaymentAmount"
              name="previousPaymentAmount"
              placeholder="e.g. 600"
              value={formData.previousPaymentAmount}
              onChange={handleChange}
              required
              className="block w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all bg-slate-50/50 hover:bg-white focus:bg-white"
            />
          </div>
        </div>

        {/* 9. Credit Utilization (%) */}
        <div>
          <label htmlFor="creditUtilization" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            9. Credit Utilization (%)
          </label>
          <div className="relative rounded-xl shadow-subtle">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <Percent className="w-4 h-4" />
            </div>
            <input
              type="number"
              id="creditUtilization"
              name="creditUtilization"
              min="0"
              max="100"
              step="0.1"
              placeholder="e.g. 85"
              value={formData.creditUtilization}
              onChange={handleChange}
              required
              className="block w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all bg-slate-50/50 hover:bg-white focus:bg-white"
            />
          </div>
        </div>

      </div>

      {/* Form Submission Button */}
      <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-500">
          All 9 variables are evaluated against default probability classification benchmarks.
        </p>
        <button
          id="predict-submit-btn"
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-xl text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 active:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 disabled:opacity-75 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <CreditCard className="w-4 h-4 text-blue-400" />
              <span>Predict Default Risk</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
