import { useState } from "react";
import { Button } from "./ui/button";
import { Zap, Menu } from "lucide-react";
import logo  from "../assets/wattLogoT.png";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HeaderProps {
  onGetStarted: () => void;
}

export function Header({ onGetStarted }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="glass-strong sticky top-0 z-50 border-b border-white/10" style={{ background: "#0f172a" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex items-center justify-center bg-gradient-to-br from-white/10 to-black rounded-xl animate-pulse-glow">
                <ImageWithFallback
                src={logo} className="w-16 h-16 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl opacity-20 animate-ping"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Save-A-Watt
              </h1>
              <p className="text-sm text-gray-400">Save-A-Watt, Save-A-Lot!</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#demo" className="text-gray-300 hover:text-white transition-colors duration-300 hover:scale-105 transform">
              Try Demo
            </a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors duration-300 hover:scale-105 transform">
              How It Works
            </a>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors duration-300 hover:scale-105 transform">
              About
            </a>
            <Button 
              onClick={onGetStarted} 
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Get Started
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg glass hover:glass-strong transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6 text-gray-300" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 glass-strong animate-slide-up">
            <nav className="flex flex-col gap-4">
              <a href="#demo" className="text-gray-300 hover:text-white transition-colors">Try Demo</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
              <Button onClick={onGetStarted} className="w-fit bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                Get Started
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
