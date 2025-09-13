import React, { useState, useEffect } from "react";
import { 
  Wallet, 
  Heart, 
  Shield, 
  ArrowDown, 
  Hourglass, 
  Github, 
  Twitter, 
  Linkedin, 
  Globe, 
  Menu,
  X,
  MessageCircle,
  BrainCircuit
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import MobileMenu from "./components/Navbar/MobileMenu";
import { CustomConnectButton } from "./components/CustomConnectButton";
import Chatbot from "./components/Bot/Chatbot";

const App: React.FC = () => {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white relative overflow-hidden">

            {/* Navbar */}
            <nav className="flex justify-between items-center px-8 py-4">
                <div className="flex items-center space-x-2">
                    <BrainCircuit className="w-6 h-6" />
                    <span className="text-xl font-bold">PulseVault</span>
                </div>
                <div className="flex space-x-6 text-sm font-medium items-center">
                    <a href="#features" className="hover:text-gray-200">Features</a>
                    <a href="#about" className="hover:text-gray-200">About</a>
                    <a href="#docs" className="hover:text-gray-200">Docs</a>
                    <CustomConnectButton />
                </div>
            </nav>

            {/* Hero Section */}
            <main className="flex flex-1 items-center justify-between px-32 relative z-10">
                {/* Left Content */}
                <div className="max-w-lg self-center">
                    <h1 className="text-5xl font-extrabold leading-snug">
                        Own your health data.{" "}
                        <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Unlock AI-powered wellness.
            </span>
                    </h1>
                    <p className="mt-6 text-lg text-white/90">
                        Experience the future of healthcare with our decentralized health vault.
                        Your data, your control, powered by cutting-edge AI insights.
                    </p>
                    <div className="flex space-x-4 mt-8 mb-20">
                        <Button variant="outline" className="text-white border-white/50 hover:bg-white/10">
                            Learn More
                        </Button>
                    </div>
                </div>

                {/* Right Orbit with Icons */}
                <div className="relative hidden md:flex items-center justify-center w-96 h-96">
                    {/* Blinking Rotating Orbit */}
                    <div className="absolute w-[380px] h-[380px] rounded-full border border-white/30 animate-orbit-blink animate-spin-slow"></div>

                    {/* Glowing background circle */}
                    <div className="absolute w-72 h-72 rounded-full bg-cyan-300/20 blur-3xl"></div>

                    {/* Orbiting Icons */}
                    <div className="absolute w-[380px] h-[380px] animate-spin-slow">
                        {/* Top */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2">
                            <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg">
                                <Hourglass className="w-6 h-6" />
                            </div>
                        </div>
                        {/* Right */}
                        <div className="absolute top-1/2 right-0 -translate-y-1/2">
                            <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg">
                                <Shield className="w-6 h-6" />
                            </div>
                        </div>
                        {/* Bottom */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                            <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg">
                                <ArrowDown className="w-6 h-6" />
                            </div>
                        </div>
                        {/* Left */}
                        <div className="absolute top-1/2 left-0 -translate-y-1/2">
                            <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg">
                                <Heart className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Features Section */}
            <section id="features" className="relative z-20 py-20 px-8 bg-gray-950 text-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Revolutionary Health Features</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Discover how our Web3 platform transforms healthcare through decentralization and AI
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {/* Decentralized Data */}
                        <div className="group text-center p-6 rounded-2xl shadow-lg bg-gray-900 hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 transition duration-300">
                            <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-white">Decentralized Data</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Your health records stored securely on blockchain. No central authority controls your personal data.
                            </p>
                        </div>

                        {/* AI Health Insights */}
                        <div className="group text-center p-6 rounded-2xl shadow-lg bg-gray-900 hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 transition duration-300">
                            <div className="w-16 h-16 bg-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                                <Heart className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-white">AI Health Insights</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Advanced AI analyzes your data to provide personalized health recommendations and predictions.
                            </p>
                        </div>

                        {/* Consent Management */}
                        <div className="group text-center p-6 rounded-2xl shadow-lg bg-gray-900 hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 transition duration-300">
                            <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                                <Wallet className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-white">Consent Management</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Granular control over who accesses your data and for what purpose. Revoke access anytime.
                            </p>
                        </div>

                        {/* Audit Logs */}
                        <div className="group text-center p-6 rounded-2xl shadow-lg bg-gray-900 hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 transition duration-300">
                            <div className="w-16 h-16 bg-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                                <Hourglass className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-white">Audit Logs</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Complete transparency with immutable audit trails. Track every access and modification.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-gray-800 via-purple-800 to-blue-800 py-16 px-8">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready to Transform Your Health Journey?
                    </h2>
                    <p className="text-lg md:text-xl mb-8 text-white/90">
                        Join thousands of users who have taken control of their health data
                        <br />
                        with our revolutionary platform.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black text-white py-12 px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8">
                        {/* Brand Column */}
                        <div className="col-span-1">
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                                    <BrainCircuit className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-bold">PulseVault</span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Your AI Health Coach, powered by Web3.
                            </p>
                        </div>

                        {/* Resources Column */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Resources</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Whitepaper</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                            </ul>
                        </div>

                        {/* Support Column */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Support</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Bug Reports</a></li>
                            </ul>
                        </div>

                        {/* Connect Column */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Connect</h3>
                            <div className="flex space-x-4">
                                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                                    <Github className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                                    <Twitter className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                                    <Globe className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
                        <p> 2024 PulseVault. All rights reserved. Built with <Heart className="w-4 h-4 inline text-red-500" /> for decentralized health.</p>
                    </div>
                </div>
            </footer>

            {/* Background Blobs */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

            {/* Animations */}
            <style>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes orbit-blink {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }
        .animate-spin-slow {
          animation: spin-slow 25s linear infinite;
        }
        .animate-orbit-blink {
          animation: orbit-blink 3s ease-in-out infinite;
        }
      `}</style>

            <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
                {isChatbotOpen && (
                    <div className="mb-2">
                        <Chatbot />
                    </div>
                )}
                <Button
                    onClick={() => setIsChatbotOpen(!isChatbotOpen)}
                    className="rounded-full w-16 h-16 flex items-center justify-center"
                >
                    {isChatbotOpen ? <X size={24} /> : <MessageCircle size={24} />}
                </Button>
            </div>
        </div>
    );
};

export default App;