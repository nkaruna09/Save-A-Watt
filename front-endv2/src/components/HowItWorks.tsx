import { Upload, Brain, Lightbulb, Gift } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HowItWorks() {
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