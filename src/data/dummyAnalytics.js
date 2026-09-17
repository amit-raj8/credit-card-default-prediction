/**
 * Portfolio Analytics dummy metrics and breakdown data.
 */
export const dummyAnalytics = {
  timeframeOptions: [
    "Last 30 Days",
    "Last 3 Months",
    "Last 6 Months",
    "Last 12 Months"
  ],

  kpis: {
    totalCustomers: {
      value: "30,000",
      change: "+4.2%",
      subtitle: "Active credit card portfolios"
    },
    potentialDefaults: {
      value: "2,850",
      change: "+9.6%",
      subtitle: "Next payment period estimated"
    },
    highRiskCustomers: {
      value: "4,120",
      change: "+13.7%",
      subtitle: "Accounts exceeding 70% risk threshold"
    },
    modelAccuracy: {
      value: "0.92",
      change: "AUC-ROC: 0.94",
      subtitle: "Demo Metric (Illustrative only)"
    }
  },

  riskDistribution: [
    { label: "Low Risk", percentage: 61, color: "#2A9D72", hex: "safe-green" },
    { label: "Moderate Risk", percentage: 24, color: "#D5AD43", hex: "risk-yellow" },
    { label: "High Risk", percentage: 11, color: "#E69B45", hex: "risk-orange" },
    { label: "Very High Risk", percentage: 4, color: "#D84C4C", hex: "risk-red" }
  ],

  defaultRateBySegment: [
    { segment: "Low Risk", rate: 1.2, color: "#2A9D72" },
    { segment: "Moderate Risk", rate: 5.4, color: "#D5AD43" },
    { segment: "High Risk", rate: 18.6, color: "#E69B45" },
    { segment: "Very High Risk", rate: 42.3, color: "#D84C4C" }
  ]
};
