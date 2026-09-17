import React from 'react';
import { 
  LogoIcon, 
  DashboardIcon, 
  PredictIcon, 
  AnalyticsIcon, 
  CustomersIcon, 
  ReportsIcon, 
  SettingsIcon 
} from './Icons';

export default function Sidebar({ currentPage, setCurrentPage, isOpen, setIsOpen }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
    { id: 'customer-info', label: 'Predict', icon: PredictIcon, matchPrefixes: ['customer-info', 'payment-history', 'review', 'prediction-result', 'explanation', 'simulator'] },
    { id: 'analytics', label: 'Analytics', icon: AnalyticsIcon },
    { id: 'customers', label: 'Customers', icon: CustomersIcon },
    { id: 'reports', label: 'Reports', icon: ReportsIcon }
  ];

  const handleNavClick = (id) => {
    setCurrentPage(id);
    if (setIsOpen) setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`fixed top-0 left-0 bottom-0 z-50 w-56 bg-navy-sidebar text-slate-300 flex flex-col justify-between border-r border-navy-secondary transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Top Branding */}
        <div>
          <div 
            onClick={() => handleNavClick('dashboard')}
            className="h-16 px-5 flex items-center gap-3 border-b border-navy-secondary/60 cursor-pointer hover:bg-navy-dark/40 transition-colors"
          >
            <LogoIcon className="w-8 h-8 flex-shrink-0" goldColor="#C99A4A" navyColor="#0D2A38" />
            <div>
              <span className="font-extrabold tracking-wider text-white text-base font-sans">
                JATAYU
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Platform Menu
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id || (item.matchPrefixes && item.matchPrefixes.includes(currentPage));

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive 
                      ? 'bg-navy-dark text-gold-primary border-l-2 border-gold-primary shadow-sm' 
                      : 'text-slate-400 hover:text-white hover:bg-navy-dark/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-gold-primary' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Settings */}
        <div className="p-3 border-t border-navy-secondary/60">
          <button
            onClick={() => handleNavClick('simulator')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
              currentPage === 'simulator' 
                ? 'bg-navy-dark text-gold-primary border-l-2 border-gold-primary' 
                : 'text-slate-400 hover:text-white hover:bg-navy-dark/50'
            }`}
          >
            <SettingsIcon className="w-4 h-4 text-slate-400" />
            <span>Settings</span>
          </button>
        </div>
      </aside>
    </>
  );
}
