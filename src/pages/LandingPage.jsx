import React, { useState } from 'react';
import { 
  LogoIcon, 
  ArrowRightIcon, 
  CheckCircleIcon, 
  PredictIcon, 
  AnalyticsIcon, 
  LockIcon 
} from '../components/Icons';

export default function LandingPage({ onGetStarted, onShowToast }) {
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <div className="min-h-screen bg-warm-bg text-financial-text flex flex-col justify-between selection:bg-gold-light selection:text-navy-dark">
      {/* Header */}
      <header className="border-b border-financial-border bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <LogoIcon className="w-8 h-8 flex-shrink-0" goldColor="#C99A4A" navyColor="#071E2B" />
            <div>
              <span className="font-extrabold tracking-wider text-navy-dark text-lg font-sans">
                JATAYU
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-financial-secondary">
            <a href="#home" className="text-navy-dark hover:text-gold-primary transition-colors">Home</a>
            <button onClick={() => onShowToast('About Credit Risk Intelligence: Enterprise default estimation platform.')} className="hover:text-navy-dark transition-colors">About</button>
            <button onClick={() => onShowToast('Solution: Machine learning credit risk and delinquency scoring simulation.')} className="hover:text-navy-dark transition-colors">Solution</button>
            <button onClick={() => onShowToast('Features: Multi-factor risk analysis, SHAP-style breakdown, What-if simulation.')} className="hover:text-navy-dark transition-colors">Features</button>
            <button onClick={() => onShowToast('Enterprise inquiries: risk-intelligence@creditrisk.internal')} className="hover:text-navy-dark transition-colors">Contact</button>
          </nav>

          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-navy-dark hover:bg-navy-secondary border border-gold-primary/40 shadow-sm hover:shadow-md transition-all"
          >
            <span>Get Started</span>
            <ArrowRightIcon className="w-3.5 h-3.5 text-gold-primary" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main id="home" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-financial-border text-[11px] font-semibold text-navy-secondary shadow-xs">
              <span className="w-2 h-2 rounded-full bg-gold-primary animate-pulse" />
              <span>Predict Risk. Explain Decisions. Enable Smarter Lending.</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-dark tracking-tight leading-[1.12]">
              Credit Risk Intelligence <br />
              <span className="text-gold-primary">for Smarter Lending</span>
            </h1>

            <p className="text-base sm:text-lg text-financial-secondary max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Use data-driven insights to identify credit card default risk, understand the factors influencing predictions, and support responsible financial decisions.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onGetStarted}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-navy-dark hover:bg-navy-secondary border border-gold-primary/50 shadow-elevated hover:shadow-lg transition-all group"
              >
                <span>Get Started</span>
                <ArrowRightIcon className="w-4 h-4 text-gold-primary group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setShowDemoModal(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-navy-dark bg-white hover:bg-warm-beige/60 border border-financial-border shadow-xs transition-colors"
              >
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Micro proof points */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-financial-secondary">
              <div className="flex items-center gap-1.5">
                <CheckCircleIcon className="w-4 h-4 text-safe-green" />
                <span>Simulation Ready</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircleIcon className="w-4 h-4 text-safe-green" />
                <span>Explainable Factors</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircleIcon className="w-4 h-4 text-safe-green" />
                <span>Enterprise API Architecture</span>
              </div>
            </div>
          </div>

          {/* Right Hero Abstract Financial Graphic (Pure SVG & CSS) */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-md p-6 bg-white border border-financial-border rounded-3xl shadow-elevated">
              {/* Abstract decorative SVG vector */}
              <svg className="w-full h-auto" viewBox="0 0 380 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background gridlines */}
                <line x1="20" y1="60" x2="360" y2="60" stroke="#EEE9DF" strokeDasharray="3 3" />
                <line x1="20" y1="120" x2="360" y2="120" stroke="#EEE9DF" strokeDasharray="3 3" />
                <line x1="20" y1="180" x2="360" y2="180" stroke="#EEE9DF" strokeDasharray="3 3" />
                <line x1="20" y1="240" x2="360" y2="240" stroke="#EEE9DF" strokeDasharray="3 3" />

                {/* Abstract Card Layer 1 (Navy) */}
                <rect x="30" y="40" width="300" height="170" rx="16" fill="#071E2B" />
                <circle cx="280" cy="80" r="28" fill="#C99A4A" fillOpacity="0.15" />
                <circle cx="295" cy="80" r="20" fill="#C99A4A" fillOpacity="0.25" />
                <rect x="55" y="70" width="40" height="28" rx="5" fill="#D9B875" />
                <rect x="55" y="125" width="130" height="8" rx="4" fill="#6F7478" />
                <rect x="55" y="145" width="90" height="8" rx="4" fill="#6F7478" />
                <rect x="55" y="170" width="180" height="12" rx="6" fill="#FFFFFF" fillOpacity="0.8" />

                {/* Trend line vector */}
                <path d="M 40 270 Q 110 250 160 210 T 260 170 T 350 90" stroke="#C99A4A" strokeWidth="3" fill="none" strokeLinecap="round" />
                
                {/* Overlaid Risk Card Preview */}
                <rect x="140" y="160" width="210" height="125" rx="14" fill="#FFFFFF" stroke="#E4E1DB" strokeWidth="1.5" filter="drop-shadow(0 8px 16px rgba(7,30,43,0.08))" />
                <circle cx="165" cy="188" r="10" fill="#FCEDED" />
                <path d="M165 183v6m0 2.5h.01" stroke="#D84C4C" strokeWidth="2" strokeLinecap="round" />
                <text x="185" y="190" fill="#071E2B" fontSize="12" fontWeight="700" fontFamily="Inter, sans-serif">High Risk Alert</text>
                <text x="185" y="204" fill="#6F7478" fontSize="10" fontFamily="Inter, sans-serif">Default Probability</text>
                <text x="165" y="240" fill="#182028" fontSize="26" fontWeight="800" fontFamily="Inter, sans-serif">78.4%</text>
                <rect x="255" y="222" width="80" height="20" rx="10" fill="#FCEDED" />
                <text x="267" y="236" fill="#D84C4C" fontSize="10" fontWeight="700" fontFamily="Inter, sans-serif">Critical Risk</text>
              </svg>

              <div className="mt-4 pt-3 border-t border-financial-border flex items-center justify-between text-xs text-financial-secondary">
                <span className="font-semibold text-navy-dark">Enterprise Risk Engine</span>
                <span className="text-safe-green font-semibold">92% Demo Accuracy</span>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Landing Bottom Feature Strip */}
      <section className="border-t border-financial-border bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-warm-bg border border-financial-border flex items-center justify-center text-navy-dark flex-shrink-0">
                <PredictIcon className="w-5 h-5 text-gold-primary" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-navy-dark">Smarter Credit Decisions</h4>
                <p className="text-[11px] text-financial-secondary mt-0.5">Data-driven underwriting metrics</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-warm-bg border border-financial-border flex items-center justify-center text-navy-dark flex-shrink-0">
                <AnalyticsIcon className="w-5 h-5 text-gold-primary" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-navy-dark">Explainable Risk</h4>
                <p className="text-[11px] text-financial-secondary mt-0.5">Factor breakdown on every score</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-warm-bg border border-financial-border flex items-center justify-center text-navy-dark flex-shrink-0">
                <svg className="w-5 h-5 text-gold-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs font-bold text-navy-dark">Early Risk Detection</h4>
                <p className="text-[11px] text-financial-secondary mt-0.5">Prevent delinquency proactively</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-warm-bg border border-financial-border flex items-center justify-center text-navy-dark flex-shrink-0">
                <LockIcon className="w-5 h-5 text-gold-primary" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-navy-dark">Responsible Lending</h4>
                <p className="text-[11px] text-financial-secondary mt-0.5">Auditable customer assessments</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Demo Modal (Pure UI) */}
      {showDemoModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white border border-financial-border rounded-2xl p-6 max-w-md w-full shadow-elevated">
            <div className="flex items-center justify-between border-b border-financial-border pb-3 mb-4">
              <h3 className="text-base font-bold text-navy-dark">Product Walkthrough Demo</h3>
              <button onClick={() => setShowDemoModal(false)} className="text-financial-secondary hover:text-navy-dark font-bold text-sm">✕</button>
            </div>
            <p className="text-xs text-financial-secondary leading-relaxed mb-6">
              This interactive platform allows underwriters to calculate credit card default probabilities, review contributing risk factors, and simulate behavior changes.
            </p>
            <div className="bg-warm-bg rounded-xl p-4 border border-financial-border text-xs space-y-2 mb-6 text-financial-text">
              <div className="flex justify-between font-semibold"><span>Flow:</span><span>11 Financial Analytics Screens</span></div>
              <div className="flex justify-between font-semibold"><span>Default Probability:</span><span className="text-risk-red">78.4% (High Risk)</span></div>
              <div className="flex justify-between font-semibold"><span>Credit Risk Score:</span><span>82 / 100</span></div>
            </div>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setShowDemoModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-financial-secondary hover:bg-warm-bg border border-financial-border"
              >
                Close
              </button>
              <button 
                onClick={() => { setShowDemoModal(false); onGetStarted(); }}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-navy-dark hover:bg-navy-secondary border border-gold-primary/40"
              >
                Launch Assessment Flow →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
