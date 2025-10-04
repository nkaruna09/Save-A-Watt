// components/AnalysisResults.tsx

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { 
  DollarSign, 
  Lightbulb, 
  TrendingDown, 
  Gift, 
  ExternalLink, 
  CheckCircle,
  Zap,
  Home,
  Users
} from "lucide-react";

interface AnalysisResultsProps {
  data: any;
}

export function AnalysisResults({ data }: AnalysisResultsProps) {
  // Mock analysis results based on input data
  const results = {
    currentUsage: parseInt(data.data.monthlyUsage || "850"),
    currentBill: parseFloat(data.data.monthlyBill || "125"),
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
        payback: "2 months"
      },
      {
        title: "Adjust Thermostat Settings",
        savings: "$12/month", 
        effort: "Easy",
        description: "Set your thermostat 7-10°F lower when you're away. Use a programmable thermostat if possible.",
        cost: "Free",
        payback: "Immediate"
      },
      {
        title: "Seal Air Leaks",
        savings: "$8/month",
        effort: "Medium", 
        description: "Use weatherstripping around doors and windows. Caulk gaps and cracks to prevent air leaks.",
        cost: "$15",
        payback: "2 months"
      }
    ],
    subsidies: [
      {
        name: "New York State EmPower+ Program",
        amount: "Up to $8,000",
        description: "Free energy efficiency upgrades for income-qualified households including insulation, air sealing, and heating system improvements.",
        eligibility: "Household income at or below 80% of Area Median Income",
        howToApply: "Call 1-800-263-0960 or apply online at nyserda.ny.gov/empower",
        status: "Available"
      },
      {
        name: "Low Income Home Energy Assistance Program (LIHEAP)",
        amount: "Up to $400/year",
        description: "Federal program that helps pay heating and cooling bills for low-income households.",
        eligibility: "Household income at or below 60% of state median income",
        howToApply: "Contact your local Department of Social Services office",
        status: "Available"
      },
      {
        name: "ConEd Energy Affordability Program",
        amount: "10-20% bill discount",
        description: "Monthly discount on electric bills for qualifying low-income customers.",
        eligibility: "Household income at or below 200% of Federal Poverty Level",
        howToApply: "Call ConEd at 1-800-752-6633 or apply online",
        status: "Available"
      }
    ]
  };

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Your Personalized Energy Analysis
          </h2>
          <p className="text-xl text-gray-600">
            Here's how you can start saving money on your energy bills
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Current Monthly Bill</p>
                  <p className="text-2xl font-bold text-gray-900">${results.currentBill}</p>
                </div>
                <DollarSign className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Potential Savings</p>
                  <p className="text-2xl font-bold text-green-600">${results.estimatedSavings}/mo</p>
                </div>
                <TrendingDown className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Annual Savings</p>
                  <p className="text-2xl font-bold text-blue-600">${results.estimatedSavings * 12}</p>
                </div>
                <Zap className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Efficiency Score</p>
                  <p className="text-2xl font-bold text-purple-600">{results.efficiencyScore}/100</p>
                </div>
                <Home className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Efficiency Progress */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center text-green-600 gap-2">
              <TrendingDown className="w-5 h-5 text-green-600" />
              Your Energy Efficiency
            </CardTitle>
            <CardDescription>
              Your home scores {results.efficiencyScore}/100. Here's how you compare to similar homes:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Your Score</span>
                  <span>{results.efficiencyScore}/100</span>
                </div>
                <Progress value={results.efficiencyScore} className="h-3" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="font-semibold text-red-700">Below Average</div>
                  <div className="text-red-600">0-40</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="font-semibold text-yellow-700">Average</div>
                  <div className="text-yellow-600">41-75</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="font-semibold text-green-700">Excellent</div>
                  <div className="text-green-600">76-100</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Energy Saving Tips */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
            Personalized Energy-Saving Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {results.tips.map((tip, index) => (
              <Card key={index} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{tip.title}</CardTitle>
                    <Badge variant={tip.effort === "Easy" ? "default" : "secondary"}>
                      {tip.effort}
                    </Badge>
                  </div>
                  <CardDescription className="text-green-600 font-semibold">
                    Save {tip.savings}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-700">{tip.description}</p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-semibold">Upfront cost:</span>
                      <div className="text-gray-600">{tip.cost}</div>
                    </div>
                    <div>
                      <span className="font-semibold">Payback:</span>
                      <div className="text-gray-600">{tip.payback}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Recommended for your home</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Available Subsidies */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Gift className="w-6 h-6 text-purple-500" />
            Available Subsidies & Programs
          </h3>
          <div className="space-y-6">
            {results.subsidies.map((subsidy, index) => (
              <Card key={index} className="border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{subsidy.name}</CardTitle>
                      <CardDescription className="text-green-600 font-semibold text-lg">
                        {subsidy.amount}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {subsidy.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">{subsidy.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Eligibility Requirements:</h5>
                      <p className="text-gray-600 text-sm">{subsidy.eligibility}</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">How to Apply:</h5>
                      <p className="text-gray-600 text-sm">{subsidy.howToApply}</p>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full md:w-auto">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Learn More & Apply
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-blue-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start Saving?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Implementing these tips could save you ${results.estimatedSavings} per month. 
            Start with the easy wins and work your way up to bigger savings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Download Full Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}