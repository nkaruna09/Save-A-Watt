import { Button } from "./ui/button";
import { Zap, Menu } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onGetStarted: () => void;
}

export function Header({ onGetStarted }: HeaderProps) {
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
              <h1 className="font-bold text-gray-900">EnergyAssist AI</h1>
              <p className="text-xs text-gray-500">Smart Energy Savings</p>
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