import React, { useState } from "react";
import { 
  Heart, 
  Shield, 
  ArrowDown, 
  Github, 
  Twitter, 
  Linkedin, 
  X,
  MessageCircle,
  BrainCircuit
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Link, useNavigate, Routes, Route, Outlet } from 'react-router-dom';
import CustomConnectButton from "./components/Dashboard/CustomConnectButton";
import Chatbot from "./components/Bot/Chatbot";
import { useAccount } from "wagmi";
import LoginForm from "./components/Dashboard/LoginForm";
import Dashboard from "./pages/Dashboard";

const App: React.FC = () => {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const { isConnected } = useAccount();
    const navigate = useNavigate();
    
    const handleWalletConnect = () => {
        if (isConnected) {
            navigate('/dashboard');
        }
    };

    // Layout component that wraps all pages
    const Layout = () => (
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
                    <CustomConnectButton onConnect={handleWalletConnect} />
                </div>
            </nav>

            {/* Main content area */}
            <main className="flex-1">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="py-6 px-8 border-t border-white/10">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-sm text-white/70 mb-4 md:mb-0">
                        2023 PulseVault. All rights reserved.
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
            </footer>

            {/* Chatbot Toggle Button */}
            <button
                onClick={() => setIsChatbotOpen(!isChatbotOpen)}
                className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg flex items-center justify-center text-white hover:scale-105 transition-transform"
                aria-label="Open chat"
            >
                {isChatbotOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <MessageCircle className="w-6 h-6" />
                )}
            </button>

            {/* Chatbot */}
            {isChatbotOpen && (
                <div className="fixed bottom-24 right-4 md:right-8 w-[calc(100%-2rem)] md:w-96 bg-white rounded-t-xl shadow-2xl overflow-hidden z-50">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 text-white flex justify-between items-center">
                        <h3 className="font-semibold">AI Health Assistant</h3>
                        <button
                            onClick={() => setIsChatbotOpen(false)}
                            className="text-white hover:text-gray-200"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <Chatbot />
                </div>
            )}
        </div>
    );

    // Home component for the root route
    const Home = () => (
        <div className="flex-1 flex items-center justify-between px-8 md:px-32 relative z-10">
            {/* Left Content */}
            <div className="max-w-lg self-center">
                <h1 className="text-4xl md:text-5xl font-extrabold leading-snug">
                    Own your health data.{" "}
                    <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                        Unlock AI-powered wellness.
                    </span>
                </h1>
                <p className="mt-6 text-lg text-white/90">
                    Experience the future of healthcare with our decentralized health vault.
                    Your data, your control, powered by cutting-edge AI insights.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-8 mb-20">
                    <Link to="/login">
                        <Button variant="outline" className="w-full sm:w-auto text-white border-white/50 hover:bg-white/10">
                            Launch App
                        </Button>
                    </Link>
                    <Button variant="outline" className="w-full sm:w-auto text-white border-white/50 hover:bg-white/10">
                        Learn More
                    </Button>
                </div>
            </div>

            {/* Right Orbit with Icons */}
            <div className="hidden md:flex items-center justify-center w-96 h-96">
                <div className="absolute w-[380px] h-[380px] rounded-full border border-white/30 animate-orbit-blink animate-spin-slow"></div>
                <div className="absolute w-72 h-72 rounded-full bg-cyan-300/20 blur-3xl"></div>
                <div className="absolute w-[380px] h-[380px] animate-spin-slow">
                    {/* Top */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2">
                        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                            <Heart className="w-6 h-6 text-pink-400" />
                        </div>
                    </div>
                    {/* Right */}
                    <div className="absolute top-1/2 right-0 -translate-y-1/2">
                        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                            <Shield className="w-6 h-6 text-cyan-400" />
                        </div>
                    </div>
                </div>
                <div className="relative z-10 w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-xl">
                    <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse"></div>
                    <div className="text-center">
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
                            PulseVault
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="app-container">
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="login" element={<LoginForm />} />
                </Route>
            </Routes>
        </div>
    );
};

export default App;