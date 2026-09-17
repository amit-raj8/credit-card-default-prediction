/**
 * Dummy prediction dataset simulating ML inference response.
 */
export const dummyPrediction = {
  defaultProbability: 78.4,
  riskLevel: "High Risk",
  creditRiskScore: 82,

  riskFactors: [
    {
      name: "Recent Payment Delay",
      impact: 0.28,
      feature: "PAY_0"
    },
    {
      name: "Credit Utilization",
      impact: 0.21,
      feature: "LIMIT_UTIL"
    },
    {
      name: "Average Payment Amount",
      impact: 0.17,
      feature: "AVG_PAY_AMT"
    },
    {
      name: "Outstanding Balance",
      impact: 0.12,
      feature: "BILL_AMT1"
    },
    {
      name: "Age",
      impact: 0.05,
      feature: "AGE"
    },
    {
      name: "Marital Status",
      impact: -0.04,
      feature: "MARRIAGE"
    },
    {
      name: "Education",
      impact: -0.06,
      feature: "EDUCATION"
    },
    {
      name: "Previous Default",
      impact: -0.08,
      feature: "HIST_DEFAULT"
    }
  ]
};

/**
 * Simulates an API call with ~700ms latency.
 * Replace with:
 *   const res = await fetch("/api/predict", { method: "POST", body: JSON.stringify(data) });
 *   return await res.json();
 */
export const simulatePrediction = (customerData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyPrediction);
    }, 700);
  });
};
