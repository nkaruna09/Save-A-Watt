import { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Progress } from "./components/ui/progress";
import { Badge } from "./components/ui/badge";  
import { BillUpload } from "./components/BillUpload";
import { AnalysisResults } from "./components/AnalysisResults";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
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
  MapPin 
} from "lucide-react";

// Header Component
function Header({ onGetStarted }: { onGetStarted: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900">Save-A-Watt</h1>
              <p className="text-xs text-gray-500">AI Energy Assistant</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900">How It Works</a>
            <a href="#demo" className="text-gray-600 hover:text-gray-900">Try Demo</a>
            <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
            <Button onClick={onGetStarted} size="sm">
              Get Started
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col gap-4">
              <a href="#how-it-works" className="text-gray-600">How It Works</a>
              <a href="#demo" className="text-gray-600">Try Demo</a>
              <a href="#about" className="text-gray-600">About</a>
              <Button onClick={onGetStarted} size="sm" className="w-fit">
                Get Started
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

// Hero Section Component
function HeroSection({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-green-50 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-blue-600">
                <Zap className="w-5 h-5" />
                <span className="font-medium">AI-Powered Energy Assistant</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Cut Your Energy Bills with Smart AI Guidance
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Get personalized energy-saving tips and find subsidies you qualify for. 
                Our AI analyzes your energy usage and helps you save money every month.
              </p>
            </div>
            
            <div className="flex flex-col gap-6 items-start">
              <Button 
                onClick={onGetStarted}
                className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 rounded-xl"
              >
                💰 Start Saving Money Now
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
              <div className="flex items-center gap-2 text-green-600">
                <DollarSign className="w-5 h-5" />
                <span>Average savings: $30-80/month</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">85%</div>
                <div className="text-sm text-gray-600">Find new subsidies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">$50</div>
                <div className="text-sm text-gray-600">Avg monthly savings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">5min</div>
                <div className="text-sm text-gray-600">Quick analysis</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1704536345283-18e559576ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmVyZ3klMjBlZmZpY2llbmN5JTIwaG9tZSUyMGxpZ2h0YnVsYnxlbnwxfHx8fDE3NTk1NDk4ODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Energy efficient home with LED lightbulb"
                className="w-full h-[280px] object-cover rounded-2xl shadow-lg"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-600 rounded-full opacity-20"></div>
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-green-600 rounded-full opacity-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// How It Works Component
function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: "Upload Your Bill",
      description: "Take a photo of your energy bill or enter your usage manually. We keep your data secure and private.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Brain,
      title: "AI Analysis",
      description: "Our AI analyzes your energy patterns and compares them to similar households in your area.",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Lightbulb,
      title: "Get Tips",
      description: "Receive personalized, low-cost energy-saving tips that fit your specific situation and budget.",
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      icon: Gift,
      title: "Find Subsidies",
      description: "Discover government and utility programs you qualify for, with step-by-step application guidance.",
      color: "bg-green-100 text-green-600"
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get personalized energy advice in just a few simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${step.color} mb-4`}>
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Designed for Everyone
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Plain Language</h4>
                  <p className="text-gray-600">No confusing jargon - just clear, actionable advice you can understand and follow.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Low-Cost Solutions</h4>
                  <p className="text-gray-600">Focus on changes you can make with little to no upfront cost, but big impact on your bills.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Local Support</h4>
                  <p className="text-gray-600">Find programs and subsidies available in your specific area and income bracket.</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1711344397160-b23d5deaa012?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBidWRnZXQlMjBjYWxjdWxhdG9yfGVufDF8fHx8MTc1OTU0OTkwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Family working on budget and calculations"
              className="w-full h-[400px] object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-xl">Save-A-Watt</h3>
                <p className="text-gray-400 text-sm">AI Energy Assistant</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Helping low-income households reduce energy costs through AI-powered analysis 
              and personalized recommendations. Making energy efficiency accessible to everyone.
            </p>
            <div className="relative w-full max-w-md">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1759143503081-e8b19c76af22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMGNvbW11bml0eSUyMGhvdXNpbmd8ZW58MXx8fHwxNzU5NTQ5OTEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Solar panels in community housing development"
                className="w-full h-32 object-cover rounded-lg opacity-60"
              />
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#how-it-works" className="hover:text-white">How It Works</a></li>
              <li><a href="#demo" className="hover:text-white">Try Demo</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Help Center</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:help@save-a-watt.ai" className="hover:text-white">
                  help@save-a-watt.ai
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:1-800-SAVE-WAT" className="hover:text-white">
                  1-800-SAVE-WAT
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Available in NY, CA, TX<br />More states coming soon</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 Save-A-Watt. All rights reserved. Built for social impact.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span>🌱 Carbon neutral platform</span>
              <span>🔒 Privacy protected</span>
              <span>💚 Made for good</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

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
    <div className="min-h-screen bg-gray-50">
      <Header onGetStarted={handleGetStarted} />
      
      <main>
        <HeroSection onGetStarted={handleGetStarted} />
        
        <div id="how-it-works">
          <HowItWorks />
        </div>
        
        {!showResults && (
          <BillUpload onAnalyze={handleAnalyze} />
        )}
        
        {showResults && analysisData && (
          <div id="results">
            <AnalysisResults data={analysisData} />
            <div className="py-8 text-center bg-gray-50">
              <button
                onClick={handleNewAnalysis}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
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