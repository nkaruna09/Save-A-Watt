// components/HowItWorks.tsx

import { Upload, Brain, Lightbulb, Gift } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Card, CardContent } from "./ui/card";
import { 
  Zap, 
  Menu, 
  ArrowRight, 
  DollarSign, 

  Mail, 
  Phone, 
  MapPin,
  TrendingUp,
  Users,
  Clock,
  Shield
} from "lucide-react";

// Floating Energy Orbs Component
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 w-4 h-4 bg-blue-500/30 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-green-500/40 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-40 left-20 w-5 h-5 bg-yellow-500/30 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
      <div className="absolute top-60 left-1/3 w-2 h-2 bg-purple-500/40 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 right-10 w-4 h-4 bg-pink-500/30 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
    </div>
  );
}

export function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: "Upload Your Bill",
      description: "Upload energy bill or enter your usage manually. We keep your data secure and private.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/10",
      delay: "0s"
    },
    {
      icon: Brain,
      title: "AI Analysis",
      description: "Our AI analyzes your energy patterns and compares them to similar households in your area.",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500/10",
      delay: "0.2s"
    },
    {
      icon: Lightbulb,
      title: "Get Tips",
      description: "Receive personalized, low-cost energy-saving tips that fit your specific situation and budget.",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-500/10",
      delay: "0.4s"
    },
    {
      icon: Gift,
      title: "Find Subsidies",
      description: "Discover government and utility programs you qualify for, with step-by-step application guidance.",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-500/10",
      delay: "0.6s"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Plain Language",
      description: "No confusing jargon - just clear, actionable advice you can understand and follow.",
      color: "text-green-400"
    },
    {
      icon: DollarSign,
      title: "Low-Cost Solutions",
      description: "Focus on changes you can make with little to no upfront cost, but big impact on your bills.",
      color: "text-blue-400"
    },
    {
      icon: Users,
      title: "Local Support",
      description: "Find programs and subsidies available in your specific area and income bracket.",
      color: "text-purple-400"
    }
  ];

  return (
    <div className="py-24 energy-bg relative overflow-hidden" id="how-it-works">
      <FloatingOrbs />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 animate-bounce-in">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get personalized energy advice in just a few simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative group interactive-card"
              style={{ animationDelay: step.delay }}
            >
              <Card className="glass-strong border-white/10 hover:border-white/20 transition-all duration-500 h-full">
                <CardContent className="p-8 text-center">
                  <div className={`relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-10 h-10 text-white" />
                    <div className={`absolute inset-0 rounded-2xl ${step.bgColor} opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                    {step.description}
                  </p>
                  
                  {/* Step number */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {index + 1}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-slide-up">
            <h3 className="text-4xl font-bold mb-8">
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Designed for Everyone
              </span>
            </h3>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4 group hover-lift">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl glass-strong border border-white/10 flex-shrink-0">
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative animate-float">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl hover-lift">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1711344397160-b23d5deaa012?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBidWRnZXQlMjBjYWxjdWxhdG9yfGVufDF8fHx8MTc1OTU0OTkwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Family working on budget and calculations"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}