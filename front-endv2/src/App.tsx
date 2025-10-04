

import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Progress } from "./components/ui/progress";
import { Badge } from "./components/ui/badge";
import { BillUpload } from "./components/BillUpload";
import { AnalysisResults } from "./components/AnalysisResults";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { HowItWorks } from "./components/HowItWorks";
import { Footer } from "./components/Footer";
import { 
  Zap, 
  Menu, 
  ArrowRight, 
  DollarSign, 
  Upload, 
  Brain, 
  Lightbulb, 
  Gift, 
  Mail, 
  Phone, 
  MapPin,
  TrendingUp,
  Users,
  Clock,
  Shield
} from "lucide-react";
    
// Main App Component
export default function App() {
  const [analysisData, setAnalysisData] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleGetStarted = () => {
    const demoSection = document.getElementById('demo');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAnalyze = (data: any) => {
    setAnalysisData(data);
    setShowResults(true);
    
    // Scroll to results after a short delay to allow state update
    setTimeout(() => {
      const resultsSection = document.getElementById('results');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleNewAnalysis = () => {
    setShowResults(false);
    setAnalysisData(null);
    handleGetStarted();
  };

  return (
    <div className="min-h-screen energy-bg">
      <Header onGetStarted={handleGetStarted} />
      
      <main>
        <HeroSection onGetStarted={handleGetStarted} />
        
        {/* Demo moved right after hero */}
        {!showResults && (
          <BillUpload onAnalyze={handleAnalyze} />
        )}
        
        {showResults && analysisData && (
          <div id="results">
            <AnalysisResults data={analysisData} />
            <div className="py-12 text-center glass-strong">
              <button
                onClick={handleNewAnalysis}
                className="text-blue-400 hover:text-blue-300 font-medium text-lg transition-colors duration-300 hover:scale-105 transform inline-flex items-center gap-2"
              >
                ← Analyze Another Bill
              </button>
            </div>
          </div>
        )}
        <HowItWorks />
      </main>

      <Footer />
    </div>
  );
}