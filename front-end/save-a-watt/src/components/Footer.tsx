import { Zap, Mail, Phone, MapPin } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Footer() {
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
                <h3 className="font-bold text-xl">EnergyAssist AI</h3>
                <p className="text-gray-400 text-sm">Smart Energy Savings</p>
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
                <a href="mailto:help@energyassist.ai" className="hover:text-white">
                  help@energyassist.ai
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:1-800-ENERGY-1" className="hover:text-white">
                  1-800-ENERGY-1
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
              © 2025 EnergyAssist AI. All rights reserved. Built for social impact.
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