import { Button } from "./ui/button";
import { ArrowRight, Zap, DollarSign } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
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

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Button 
                onClick={onGetStarted}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              >
                Start Saving Money
                <ArrowRight className="ml-2 w-5 h-5" />
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
                src="https://images.unsplash.com/photo-1704536345283-18e559576ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg"
                alt="Energy efficient home with LED lightbulb"
                className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
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