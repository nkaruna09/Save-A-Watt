import { useState } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { HowItWorks } from "./components/HowItWorks";
import { Footer } from "./components/Footer";
import { BillUpload } from "./components/BillUpload";
import { AnalysisResults } from "./components/AnalysisResults";

export default function App() {
  const [analysisData, setAnalysisData] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleGetStarted = () => {
    const demoSection = document.getElementById("demo");
    if (demoSection) demoSection.scrollIntoView({ behavior: "smooth" });
  };

  const handleAnalyze = (data: any) => {
    setAnalysisData(data);
    setShowResults(true);
    setTimeout(() => {
      const resultsSection = document.getElementById("results");
      if (resultsSection) resultsSection.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleNewAnalysis = () => {
    setAnalysisData(null);
    setShowResults(false);
    handleGetStarted();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onGetStarted={handleGetStarted} />
      <main>
        <HeroSection onGetStarted={handleGetStarted} />
        <div id="how-it-works"><HowItWorks /></div>
        {!showResults && <BillUpload onAnalyze={handleAnalyze} />}
        {showResults && analysisData && (
          <div id="results">
            <AnalysisResults data={analysisData} />
            <div className="py-8 text-center bg-gray-50">
              <button onClick={handleNewAnalysis} className="text-blue-600 hover:text-blue-700 font-medium">
                ← Analyze Another Bill
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
