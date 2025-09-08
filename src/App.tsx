import React, { useState } from "react";
import { Wallet, Heart, Shield, ArrowDown, Hourglass, Github, Twitter, Linkedin, Globe, Menu, X } from "lucide-react";
import { Button } from "./components/ui/button";
import { Link } from 'react-router-dom';
import MobileMenu from "./components/Navbar/MobileMenu";

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-900 via-cyan-400 to-purple-950 text-white relative overflow-x-hidden">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-2">
          <Shield className="w-6 h-6" />
          <span className="text-xl font-bold">PulseVault</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4 text-sm font-medium items-center">
          <a href="#features" className="hover:text-gray-200 px-2 py-1">Features</a>
          <a href="#about" className="hover:text-gray-200 px-2 py-1">About</a>
          <a href="#docs" className="hover:text-gray-200 px-2 py-1">Docs</a>
          <Link to="/WalletConnect" className="bg-emerald-500 hover:bg-emerald-600 rounded-full text-sm px-4 py-2 ml-2">
            Connect Wallet
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white hover:text-gray-200 focus:outline-none p-2"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Hero Section */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-12 xl:px-20 py-8 sm:py-12 lg:py-0">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 mb-12 lg:mb-0 lg:pr-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4 sm:mb-6">
            Own your health data.{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Unlock AI-powered wellness.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8">
            Experience the future of healthcare with our decentralized health vault.
            Your data, your control, powered by cutting-edge AI insights.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button variant="outline" className="w-full sm:w-auto justify-center text-white border-white/50 hover:bg-white/10">
              Learn More
            </Button>
            <Link
              to="/WalletConnect"
              className="w-full sm:w-auto flex items-center justify-center bg-white text-gray-900 hover:bg-gray-100 transition-colors px-6 py-3 rounded-full font-semibold text-sm sm:text-base"
            >
              <Wallet className="w-4 h-4 mr-2" /> 
              Start Your Journey
            </Link>
          </div>
        </div>

        {/* Right Content - Placeholder for illustration */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 w-full max-w-md">
            <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-cyan-400/20 rounded-lg flex items-center justify-center">
              <div className="text-center p-6">
                <Shield className="w-12 h-12 mx-auto mb-4 text-white/50" />
                <p className="text-white/70">Your health data, secured</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {['AI Analysis', 'Secure Storage', 'Full Control'].map((item) => (
                <div key={item} className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Heart className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-xs sm:text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-12 xl:px-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <Shield className="w-6 h-6" />,
              title: 'Secure Storage',
              description: 'Your health data is encrypted and stored securely on the blockchain.'
            },
            {
              icon: <Heart className="w-6 h-6" />,
              title: 'AI-Powered Insights',
              description: 'Get personalized health recommendations powered by advanced AI.'
            },
            {
              icon: <Globe className="w-6 h-6" />,
              title: 'Global Access',
              description: 'Access your health data from anywhere in the world.'
            },
            {
              icon: <Hourglass className="w-6 h-6" />,
              title: '24/7 Availability',
              description: 'Your health data is always available when you need it.'
            },
            {
              icon: <ArrowDown className="w-6 h-6" />,
              title: 'Easy Export',
              description: 'Download your health records anytime, anywhere.'
            },
            {
              icon: <Shield className="w-6 h-6" />,
              title: 'Privacy First',
              description: 'You control who has access to your health information.'
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-lg py-8 px-4 sm:px-6 lg:px-12 xl:px-20 mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shield className="w-6 h-6" />
              <span className="text-xl font-bold">PulseVault</span>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/10 text-center text-sm text-white/60">
            <p> 2025 PulseVault. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
