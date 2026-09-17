# JATAYU — Credit Card Default Prediction & Risk Intelligence

An enterprise-grade financial analytics and credit risk assessment platform for estimating default probability on upcoming credit card payments.

![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Vite%20%7C%20TailwindCSS-071E2B?style=flat-square)
![Status](https://img.shields.io/badge/Status-Frontend%20Active-2A9D72?style=flat-square)

---

## 📌 Project Overview

**JATAYU** is an AI-driven credit risk intelligence platform designed for banking and financial underwriting teams. It provides a multi-step credit assessment workflow, explainable risk factors, real-time what-if behavioral simulations, portfolio distribution analytics, and executive risk reporting.

---

## ✨ Features & Modules

- **Landing Page**: Public portal with product features and abstract financial visualization.
- **Credit Risk Dashboard**: High-level KPIs (Total Customers, High Risk volume, Average Score, Predictions Today), pure SVG Donut chart, and recent prediction logs.
- **Multi-Step Assessment Flow**:
  - **Step 1: Customer Demographics**: Age, Gender, Marital Status, Education, Limit (₹), Nationality, and Credit Utilization.
  - **Step 2: 6-Month Payment Log**: Prior billing statements, payments received, and repayment delay metrics.
  - **Step 3: Review & Simulation**: Summary confirmation with simulated risk calculation.
- **Prediction Result**: Default probability readout (e.g. `78.4%`), custom circular SVG gauge (`82 / 100`), and advisory underwriting protocols.
- **Explainable Risk**: SHAP-style breakdown of contributing positive/mitigating risk factors across three interactive tabs.
- **What-If Risk Simulator**: Interactive sliders for credit utilization, repayment delays, and average payment amount with real-time risk variance calculation.
- **Portfolio Analytics**: Cohort risk distributions, default rates by segment, and timeframe filtering.
- **Customer Directory**: Tabular customer portfolio with delinquency tiers and search/filter capabilities.
- **Executive Risk Report**: Printable credit risk document with summary metrics and PDF action toast.

---

## 🛠️ Technology Stack

- **Framework**: [React 18](https://react.dev/)
- **Bundler**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Icons & Graphics**: Pure inline SVG vectors and CSS (no external chart or icon libraries)
- **Language**: JavaScript (ES Modules)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<username>/credit-card-default-prediction.git
   cd credit-card-default-prediction
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. Build for production:
   ```bash
   npm run build
   ```

---

## 📄 License
MIT License
