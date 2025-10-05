import { AdviceResults } from "../components/AnalysisResults";

export const demoAdvice: AdviceResults = {
  currentUsage: 850,
  currentBill: 125,
  estimatedSavings: 35,
  percentageSaving: 28,
  efficiencyScore: 65,
  tips: [
    {
      title: "Switch to LED Light Bulbs",
      savings: "$15/month",
      effort: "Easy",
      description: "Replace 10 incandescent bulbs with LED bulbs. They use 75% less energy and last 25 times longer.",
      cost: "$30 upfront",
      payback: "2 months",
    },
    {
      title: "Adjust Thermostat Settings",
      savings: "$12/month",
      effort: "Easy",
      description: "Set your thermostat 7-10°F lower when you're away. Use a programmable thermostat if possible.",
      cost: "Free",
      payback: "Immediate",
    },
    {
      title: "Seal Air Leaks",
      savings: "$8/month",
      effort: "Medium",
      description: "Use weatherstripping around doors and windows. Caulk gaps and cracks to prevent air leaks.",
      cost: "$15",
      payback: "2 months",
    },
  ],
  subsidies: [
    {
      name: "New York State EmPower+ Program",
      amount: "Up to $8,000",
      description: "Free energy efficiency upgrades for income-qualified households including insulation, air sealing, and heating system improvements.",
      eligibility: "Household income at or below 80% of Area Median Income",
      howToApply: "Call 1-800-263-0960 or apply online at nyserda.ny.gov/empower",
      status: "Available",
    },
    {
      name: "Low Income Home Energy Assistance Program (LIHEAP)",
      amount: "Up to $400/year",
      description: "Federal program that helps pay heating and cooling bills for low-income households.",
      eligibility: "Household income at or below 60% of state median income",
      howToApply: "Contact your local Department of Social Services office",
      status: "Available",
    },
    {
      name: "ConEd Energy Affordability Program",
      amount: "10-20% bill discount",
      description: "Monthly discount on electric bills for qualifying low-income customers.",
      eligibility: "Household income at or below 200% of Federal Poverty Level",
      howToApply: "Call ConEd at 1-800-752-6633 or apply online",
      status: "Available",
    },
  ],
};
