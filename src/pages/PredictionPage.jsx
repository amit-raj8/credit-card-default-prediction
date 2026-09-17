import React, { useState, useRef } from 'react';
import PredictionForm from '../components/PredictionForm';
import PredictionResult from '../components/PredictionResult';
import { ShieldAlert, Info } from 'lucide-react';

export default function PredictionPage() {
  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const resultRef = useRef(null);

  const handlePredict = (result) => {
    setPredictionResult(result);
    // Smooth scroll to the result card if user is on mobile/smaller screen
    setTimeout(() => {
      if (resultRef.current) {
        resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <main className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Top Section Header */}
      <div className="mb-8 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/80 mb-3">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Credit Assessment Intelligence</span>
        </div>
        <h1 
          id="page-title"
          className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
        >
          Credit Card Default Prediction
        </h1>
        <p 
          id="page-subtitle"
          className="mt-2 text-base text-slate-600 max-w-2xl"
        >
          Estimate the probability of a customer defaulting on their next credit card payment.
        </p>
      </div>

      {/* Prediction Form Section */}
      <section aria-labelledby="form-heading">
        <h2 id="form-heading" className="sr-only">Customer Profile and Payment Parameters</h2>
        <PredictionForm 
          onPredict={handlePredict} 
          isLoading={isLoading} 
          setIsLoading={setIsLoading} 
        />
      </section>

      {/* Prediction Result Section */}
      <div ref={resultRef}>
        {predictionResult && (
          <section aria-labelledby="prediction-heading">
            <h2 id="prediction-heading" className="sr-only">Default Prediction Result</h2>
            <PredictionResult result={predictionResult} />
          </section>
        )}
      </div>

      {/* API Ready Integration Note */}
      <aside className="mt-8 bg-slate-100/70 border border-slate-200/80 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-slate-600 leading-relaxed">
          <strong>Architecture Notice:</strong> This interface is currently running in frontend simulation mode using dummy JSON output. When backend ML services are deployed, simply connect <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-800 font-mono text-[11px]">src/data/dummyPrediction.js</code> to your API endpoint without altering UI components.
        </p>
      </aside>
    </main>
  );
}
