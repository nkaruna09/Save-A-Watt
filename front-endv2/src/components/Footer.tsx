// components/Footer.tsx

import { Zap, Mail, Phone, MapPin } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Footer() {
  return (
    <footer className="glass-strong border-t border-white/10 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                  Save-A-Watt
                </h3>
                <p className="text-gray-400">AI Energy Assistant</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-8 max-w-md leading-relaxed">
              Helping low-income households reduce energy costs through AI-powered analysis 
              and personalized recommendations. Making energy efficiency accessible to everyone.
            </p>
            
            <div className="relative overflow-hidden rounded-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1759143503081-e8b19c76af22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMGNvbW11bml0eSUyMGhvdXNpbmd8ZW58MXx8fHwxNzU5NTQ5OTEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Solar panels in community housing development"
                className="w-full h-32 object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['How It Works', 'Try Demo', 'Privacy Policy', 'Terms of Service', 'Help Center'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group">
                <Mail className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                <a href="mailto:help@save-a-watt.ai">help@save-a-watt.ai</a>
              </li>
              <li className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group">
                <Phone className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
                <a href="tel:1-800-SAVE-WAT">1-800-SAVE-WAT</a>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <MapPin className="w-5 h-5 text-purple-400 mt-0.5" />
                <span>Available in NY, CA, TX<br />More states coming soon</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-400">
              © 2025 Save-A-Watt. All rights reserved. Built for social impact.
            </p>
            <div className="flex items-center gap-8 text-gray-400">
              <span className="flex items-center gap-2 hover:text-green-400 transition-colors">
                🌱 Carbon neutral platform
              </span>
              <span className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                🔒 Privacy protected
              </span>
              <span className="flex items-center gap-2 hover:text-purple-400 transition-colors">
                💚 Made for good
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}