import React, { useState } from 'react';
import { BellIcon } from './Icons';

export default function Topbar({ currentPage, onMenuClick, onShowToast }) {
  const [showNotifications, setShowNotifications] = useState(false);

  const PAGE_TITLES = {
    'dashboard': 'Credit Risk Dashboard',
    'customer-info': 'Predict Default Risk / Customer Details',
    'payment-history': 'Predict Default Risk / Payment History',
    'review': 'Predict Default Risk / Review & Predict',
    'prediction-result': 'Prediction Result & Risk Profile',
    'explanation': 'Why This Prediction? (Explanation)',
    'simulator': 'What-If Risk Simulator',
    'analytics': 'Portfolio Risk Analytics',
    'customers': 'Customer Portfolio & Risk Profiles',
    'reports': 'Customer Credit Risk Report'
  };

  const currentTitle = PAGE_TITLES[currentPage] || 'Credit Risk Intelligence';

  return (
    <header className="h-16 bg-white border-b border-financial-border px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-enterprise">
      {/* Left: Mobile menu toggle & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-1.5 rounded-lg border border-financial-border text-financial-text hover:bg-warm-bg"
          aria-label="Toggle navigation menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-financial-secondary hidden sm:inline-block">
            Platform /
          </span>
          <h1 className="text-sm sm:text-base font-bold text-navy-dark tracking-tight">
            {currentTitle}
          </h1>
        </div>
      </div>

      {/* Right: Notifications & User Profile */}
      <div className="flex items-center gap-3 sm:gap-4 relative">
        <button
          onClick={() => {
            setShowNotifications(!showNotifications);
            if (onShowToast) onShowToast('System operating normally. No critical alerts.');
          }}
          className="relative p-2 rounded-full text-financial-secondary hover:text-navy-dark hover:bg-warm-bg transition-colors"
          title="Notifications"
        >
          <BellIcon className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold-primary rounded-full ring-2 ring-white" />
        </button>

        <div className="h-5 w-px bg-financial-border hidden sm:block" />

        {/* User Avatar */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-navy-dark border border-gold-primary text-gold-primary font-bold text-xs flex items-center justify-center shadow-xs">
            SR
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-bold text-financial-text leading-none">
              Sunny
            </span>
            <span className="text-[10px] text-financial-secondary mt-0.5 leading-none">
              Risk Analyst
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
