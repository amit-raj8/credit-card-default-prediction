import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Toast from './components/Toast';

// 11 Screens
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import CustomerInformationPage from './pages/CustomerInformationPage';
import PaymentHistoryPage from './pages/PaymentHistoryPage';
import ReviewPage from './pages/ReviewPage';
import PredictionResultPage from './pages/PredictionResultPage';
import PredictionExplanationPage from './pages/PredictionExplanationPage';
import WhatIfSimulatorPage from './pages/WhatIfSimulatorPage';
import AnalyticsPage from './pages/AnalyticsPage';
import CustomersPage from './pages/CustomersPage';
import RiskReportPage from './pages/RiskReportPage';

const INITIAL_CUSTOMER = {
  age: '35',
  gender: 'Female',
  maritalStatus: 'Married',
  education: 'Graduate',
  creditLimit: '50000',
  nationality: 'Indian',
  creditUtilization: '82'
};

const INITIAL_PAYMENTS = [
  { month: 'Month 1 (Latest)', billAmount: '42300', paymentAmount: '18400', delay: '0' },
  { month: 'Month 2', billAmount: '38100', paymentAmount: '20000', delay: '1' },
  { month: 'Month 3', billAmount: '39500', paymentAmount: '15000', delay: '2' },
  { month: 'Month 4', billAmount: '36700', paymentAmount: '12000', delay: '2' },
  { month: 'Month 5', billAmount: '28900', paymentAmount: '10000', delay: '1' },
  { month: 'Month 6', billAmount: '31000', paymentAmount: '15000', delay: '0' }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [customerData, setCustomerData] = useState(INITIAL_CUSTOMER);
  const [paymentHistory, setPaymentHistory] = useState(INITIAL_PAYMENTS);
  const [predictionResult, setPredictionResult] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
  };

  const handlePredictionComplete = (result) => {
    setPredictionResult(result);
    setCurrentPage('prediction-result');
  };

  const handleSelectCustomer = (customer) => {
    setCustomerData({
      age: String(customer.age),
      gender: 'Female',
      maritalStatus: 'Married',
      education: 'Graduate',
      creditLimit: String(customer.creditLimit),
      nationality: 'Indian',
      creditUtilization: String(customer.creditUtilization)
    });
    showToast(`Loaded customer profile ${customer.id}`);
    setCurrentPage('customer-info');
  };

  // If user is on the public landing page:
  if (currentPage === 'landing') {
    return (
      <>
        <LandingPage 
          onGetStarted={() => setCurrentPage('customer-info')}
          onShowToast={showToast}
        />
        <Toast message={toastMessage} onClose={() => setToastMessage('')} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-warm-bg text-financial-text flex flex-col antialiased">
      {/* Fixed Sidebar for desktop, drawer for mobile */}
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Content Area offset by sidebar width (56 = 14rem = 224px) */}
      <div className="lg:pl-56 flex-1 flex flex-col min-w-0">
        <Topbar 
          currentPage={currentPage}
          onMenuClick={() => setSidebarOpen(true)}
          onShowToast={showToast}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentPage === 'dashboard' && (
            <DashboardPage 
              onStartPredict={() => setCurrentPage('customer-info')}
              onViewCustomer={(cust) => handleSelectCustomer(cust)}
            />
          )}

          {currentPage === 'customer-info' && (
            <CustomerInformationPage 
              customerData={customerData}
              setCustomerData={setCustomerData}
              onNext={() => setCurrentPage('payment-history')}
              onStepClick={(page) => setCurrentPage(page)}
            />
          )}

          {currentPage === 'payment-history' && (
            <PaymentHistoryPage 
              paymentHistory={paymentHistory}
              setPaymentHistory={setPaymentHistory}
              onBack={() => setCurrentPage('customer-info')}
              onNext={() => setCurrentPage('review')}
              onStepClick={(page) => setCurrentPage(page)}
            />
          )}

          {currentPage === 'review' && (
            <ReviewPage 
              customerData={customerData}
              paymentHistory={paymentHistory}
              onBack={() => setCurrentPage('payment-history')}
              onPredictionComplete={handlePredictionComplete}
              onStepClick={(page) => setCurrentPage(page)}
            />
          )}

          {currentPage === 'prediction-result' && (
            <PredictionResultPage 
              result={predictionResult || { defaultProbability: 78.4, riskLevel: 'High Risk', creditRiskScore: 82 }}
              customerData={customerData}
              onViewExplanation={() => setCurrentPage('explanation')}
              onViewSimulator={() => setCurrentPage('simulator')}
              onViewReport={() => setCurrentPage('reports')}
            />
          )}

          {currentPage === 'explanation' && (
            <PredictionExplanationPage 
              onBack={() => setCurrentPage('prediction-result')}
              onViewSimulator={() => setCurrentPage('simulator')}
            />
          )}

          {currentPage === 'simulator' && (
            <WhatIfSimulatorPage />
          )}

          {currentPage === 'analytics' && (
            <AnalyticsPage />
          )}

          {currentPage === 'customers' && (
            <CustomersPage onSelectCustomer={handleSelectCustomer} />
          )}

          {currentPage === 'reports' && (
            <RiskReportPage 
              customerData={customerData}
              paymentHistory={paymentHistory}
              onDownloadPDF={() => showToast('PDF export will be connected later.')}
            />
          )}
        </main>

        <footer className="border-t border-financial-border bg-white py-4 px-6 text-xs text-financial-secondary">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>JATAYU Intelligence Platform — Enterprise Delinquency Scoring</span>
            <span>Frontend Demonstration Environment</span>
          </div>
        </footer>
      </div>

      <Toast message={toastMessage} onClose={() => setToastMessage('')} />
    </div>
  );
}
