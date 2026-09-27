import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { BillUpload } from "./components/BillUpload";
import { AnalysisResults } from "./components/AnalysisResults";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { HowItWorks } from "./components/HowItWorks";
import { Footer } from "./components/Footer";

function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const demoSection = document.getElementById("demo");
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAnalyze = (data: any) => {
    // Navigate to results route with state
    navigate("/results", { state: { data } });
  };

  return (
    <>
      <Header onGetStarted={handleGetStarted} />
      <main>
        <HeroSection onGetStarted={handleGetStarted} />
        <BillUpload onAnalyze={handleAnalyze} />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}

function ResultsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.data;

  const handleNewAnalysis = () => {
    navigate("/");
  };

  return (
    <div id="results">
      <AnalysisResults data={data} />
      <div className="py-12 text-center glass-strong">
        <button
          onClick={handleNewAnalysis}
          className="text-blue-400 hover:text-blue-300 font-medium text-lg transition-colors duration-300 hover:scale-105 transform inline-flex items-center gap-2"
        >
          ← Analyze Another Bill
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}
