import React, { useEffect } from 'react';
import { InfoIcon } from './Icons';

export default function Toast({ message, onClose, duration = 3000 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-navy-dark text-white px-4 py-3 rounded-xl border border-gold-primary/40 shadow-elevated animate-bounce-short">
      <InfoIcon className="w-4 h-4 text-gold-primary flex-shrink-0" />
      <span className="text-xs font-medium text-slate-100">{message}</span>
      <button 
        onClick={onClose}
        className="ml-2 text-slate-400 hover:text-white text-xs font-bold"
      >
        ✕
      </button>
    </div>
  );
}
