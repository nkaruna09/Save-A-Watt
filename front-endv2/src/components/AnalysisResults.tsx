import React, { useEffect, useState } from "react"; 
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { 
  DollarSign, 
  Lightbulb, 
  TrendingDown, 
  Gift, 
  CheckCircle,
  Zap,
  Home,
} from "lucide-react";

import { demoAdvice } from "../data/demoAdvice";

type AnalysisResultsProps = {
  data: AdviceResults | null;
};

export interface AdviceResults {
  currentUsage: number;
  currentBill: number;
  estimatedSavings: number;
  percentageSaving: number; 
  efficiencyScore: number; 
  tips: {
    title: string; 
    savings: string;
    effort: string; 
    description: string; 
    cost: string; 
    payback: string;
  }[];
  subsidies: {
    name: string; 
    amount: string; 
    description: string; 
    eligibility: string;
    howToApply: string; 
    status: string; 
  }[];
}


export function AnalysisResults({ data }: AnalysisResultsProps) {
  const location = useLocation();
  const navigationData = (location.state?.data as AdviceResults) || data;

  const [results, setResults] = useState<AdviceResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAdvice() {
      try {
        const response = await fetch("http://localhost:5000/advice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(navigationData)
        });
        if (!response.ok) {
          throw new Error(`Advice API error: ${response.status}`);
        }
        const { advice } = await response.json();
        setResults({
          currentUsage: advice.tips.currentUsage ?? 0,
          currentBill: advice.tips.currentBill ?? 0,
          estimatedSavings: advice.tips.estimatedSavings ?? 0,
          percentageSaving: advice.tips.percentageSaving ?? 0,
          efficiencyScore: advice.tips.efficiencyScore ?? 0,
          tips: Array.isArray(advice.tips.tips) ? advice.tips.tips : [],
          subsidies: Array.isArray(advice.subsidies) ? advice.subsidies : []
        });
        setError(null);
        
      } catch (err) {
        console.error("Error fetching advice:", err);
        setError("Failed to fetch advice. Showing demo data.");
        setResults(demoAdvice);
      }
    }
    fetchAdvice();
  }, [navigationData]);

  if (!results) {
    return (
      <div className="py-16 text-center text-lg text-gray-500">
        Loading your personalized advice...
      </div>
    );
  }

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-8 text-red-600 text-center font-semibold">
            {error}
          </div>
        )}
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
          <Card className="border border-gray-300 rounded-xl shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl text-gray-600">Current Monthly Bill</p>
                  <p className="text-2xl font-bold text-gray-900">${results.currentBill}</p>
                </div>
                <DollarSign className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border border-gray-300 rounded-xl shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl text-gray-600">Potential Savings</p>
                  <p className="text-2xl font-bold text-green-600">${results.estimatedSavings}/mo</p>
                </div>
                <TrendingDown className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border border-gray-300 rounded-xl shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl text-gray-600">Annual Savings</p>
                  <p className="text-2xl font-bold text-blue-600">${results.estimatedSavings * 12}</p>
                </div>
                <Zap className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border border-gray-300 rounded-xl shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl text-gray-600">Efficiency Score</p>
                  <p className="text-2xl font-bold text-purple-600">{results.efficiencyScore}/100</p>
                </div>
                <Home className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Efficiency Progress */}
        <Card className="mb-12 border border-gray-300 rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-green-600 gap-2 font-bold">
              <TrendingDown className="w-5 h-5 text-green-600"/>
              Your Energy Efficiency
            </CardTitle>
            <CardDescription className="text-black text-xl">
              Your home scores {results.efficiencyScore}/100. Here's how you compare to similar homes:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="font-semibold text-xl text-red-700">Below Average</div>
                  <div className="text-red-600 text-xl">0-40</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="font-semibold text-xl text-yellow-700">Average</div>
                  <div className="text-yellow-600 text-xl">41-75</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="font-semibold text-xl text-green-700">Excellent</div>
                  <div className="text-green-600 text-xl">76-100</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Energy Saving Tips */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
            Personalized Energy-Saving Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(results.tips ?? []).map((tip, index) => (
              <Card key={index} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-2xl text-black font-bold">{tip.title}</CardTitle>
                  </div>
                  <CardDescription className="text-green-600 text-xl font-semibold">
                    Save {tip.savings}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-700 text-xl/6">{tip.description}</p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-semibold text-black">Upfront cost:</span>
                      <div className="text-gray-600">{tip.cost}</div>
                    </div>
                    <div>
                      <span className="font-semibold text-black">Payback:</span>
                      <div className="text-gray-600">{tip.payback}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-xl">Recommended for your home</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Available Subsidies */}
        <div>
          <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Gift className="w-6 h-6 text-purple-500" />
            Available Subsidies & Programs
          </h3>
          <div className="space-y-6">
            {(results.subsidies ?? []).map((subsidy, index) => (
              <Card key={index} className="border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl text-black font-bold">{subsidy.name}</CardTitle>
                      <CardDescription className="text-green-600 font-semibold text-xl">
                        {subsidy.amount}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {subsidy.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 text-xl/6">{subsidy.description}</p>
                  
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
                  
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-blue-50 rounded-2xl p-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Saving?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Implementing these tips could save you ${results.estimatedSavings} per month. 
            Start with the easy wins and work your way up to bigger savings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={() => window.print()}> 
              Download Full Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}