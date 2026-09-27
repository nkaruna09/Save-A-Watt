// components/HeroSection.tsx

"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ArrowRight, Zap, DollarSign } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import heroImg from "../assets/hero.png";

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
}

// Floating Energy Orbs
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 w-4 h-4 bg-blue-500/30 rounded-full animate-float" style={{ animationDelay: "0s" }} />
      <div className="absolute top-40 right-20 w-3 h-3 bg-green-500/40 rounded-full animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-40 left-20 w-5 h-5 bg-yellow-500/30 rounded-full animate-float" style={{ animationDelay: "4s" }} />
      <div className="absolute top-60 left-1/3 w-2 h-2 bg-purple-500/40 rounded-full animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-20 right-10 w-4 h-4 bg-pink-500/30 rounded-full animate-float" style={{ animationDelay: "3s" }} />
    </div>
  );
}

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <div className="relative py-20 lg:py-28 energy-bg overflow-hidden">
      {/* Floating orbs background */}
      <FloatingOrbs />

      {/* Subtle background grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgo8cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9wYXR0ZXJuPgo8L2RlZnM+CjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz4KPHN2Zz4=')] opacity-30"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Text + Buttons */}
          <div className="space-y-8 animate-bounce-in">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-400/30">
                  <Zap className="w-5 h-5 text-blue-400 animate-pulse" />
                  <span className="text-blue-400 font-medium">AI-Powered Energy Assistant</span>
                </div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent animate-gradient">
                  Cut Your Energy Bills
                </span>
                <br />
                <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                  with Save-A-Watt
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl">
                Get personalized energy-saving tips and find subsidies you qualify for. 
                {/*Our AI analyzes your energy usage and helps you save money every month.*/}
              </p>
            </div>
            
            {/* CTA */}
            <div className="flex flex-col gap-6 items-start">
              <Button 
                onClick={onGetStarted}
                className="relative bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white px-12 py-6 text-xl font-bold shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-110 rounded-2xl group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                <span className="relative flex items-center gap-3">
                  Start Saving Money Now
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </Button>
          
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div className="text-center group hover-lift">
                <div className="text-3xl font-bold text-blue-400 mb-1 animate-counter">
                  <AnimatedCounter end={85} suffix="%" />
                </div>
                <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  Find new subsidies
                </div>
              </div>
              <div className="text-center group hover-lift">
                <div className="text-3xl font-bold text-green-400 mb-1 animate-counter">
                  $<AnimatedCounter end={30} />
                </div>
                <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  Avg monthly savings
                </div>
              </div>
              <div className="text-center group hover-lift">
                <div className="text-3xl font-bold text-purple-400 mb-1 animate-counter">
                  <AnimatedCounter end={5} /> min
                </div>
                <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  Quick analysis
                </div>
              </div>
            </div>
          </div>

          {/* Right: Image + floating glow */}
          <div className="relative animate-float lg:justify-self-center">
            <div className="relative z-10">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl hover-lift">
                <ImageWithFallback
                  src={heroImg}
              
            
                  alt="Energy efficient home with LED lightbulb"
                  className="w-[400px] lg:h-[450px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
              </div>
            </div>
            
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: "1s" }}></div>
            <div className="absolute top-1/2 -left-3 w-12 h-12 bg-gradient-to-br from-yellow-500/30 to-orange-500/30 rounded-full blur-lg animate-float"></div>
          </div>

        </div>
      </div>
    </div>
  );
}
