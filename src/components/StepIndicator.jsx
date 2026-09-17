import React from 'react';
import { CheckCircleIcon } from './Icons';

export default function StepIndicator({ currentStep = 1, onStepClick }) {
  const steps = [
    { number: 1, title: 'Basic Details', page: 'customer-info' },
    { number: 2, title: 'Payment History', page: 'payment-history' },
    { number: 3, title: 'Review', page: 'review' }
  ];

  return (
    <div className="w-full bg-white border border-financial-border rounded-xl px-4 sm:px-6 py-3.5 mb-6 shadow-enterprise">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((step, idx) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;

          return (
            <React.Fragment key={step.number}>
              <div 
                className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none"
                onClick={() => onStepClick && onStepClick(step.page)}
              >
                <div 
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCompleted 
                      ? 'bg-safe-green text-white' 
                      : isCurrent 
                        ? 'bg-navy-dark text-gold-primary border-2 border-gold-primary shadow-sm' 
                        : 'bg-warm-beige text-financial-secondary'
                  }`}
                >
                  {isCompleted ? <CheckCircleIcon className="w-4 h-4" /> : step.number}
                </div>
                <div className="flex flex-col">
                  <span className={`text-xs font-semibold ${isCurrent ? 'text-navy-dark font-bold' : isCompleted ? 'text-financial-text' : 'text-financial-secondary'}`}>
                    {step.title}
                  </span>
                  <span className="text-[10px] text-financial-secondary hidden sm:block">
                    Step {step.number} of 3
                  </span>
                </div>
              </div>

              {idx < steps.length - 1 && (
                <div className={`flex-1 mx-3 sm:mx-4 h-0.5 transition-colors ${
                  step.number < currentStep ? 'bg-safe-green' : 'bg-financial-border'
                }`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
