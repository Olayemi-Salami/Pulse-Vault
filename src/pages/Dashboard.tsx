import { useState, useEffect } from "react";
import { useAccount, useBalance, useWriteContract } from "wagmi";
import { useNavigate } from "react-router-dom";
import Chatbot from "../components/Bot/Chatbot";
import { Button } from "../components/ui/button";
import { MessageCircle, X, Wallet, Star, ArrowLeft } from "lucide-react";
import { pulseTokenContract } from "../contracts/pulseToken";
import CustomConnectButton from "../components/Dashboard/CustomConnectButton";
import LoginForm from "../components/Dashboard/LoginForm";

const Dashboard = () => {
    const { address, isConnected } = useAccount();
    const navigate = useNavigate();
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [mintAmount, setMintAmount] = useState("");
    const [showLoginForm, setShowLoginForm] = useState(false);

    // If user is not connected, redirect to home
    useEffect(() => {
        if (!isConnected) {
            navigate('/');
        } else {
            setShowLoginForm(true);
        }
    }, [isConnected, navigate]);

    const { data: balance, refetch: refetchBalance } = useBalance({
        address,
        token: pulseTokenContract.address,
    });

    const { writeContract, isPending: isMinting } = useWriteContract();

    const handleMint = async () => {
        if (!mintAmount) return;
        
        try {
            await writeContract({
                ...pulseTokenContract,
                functionName: 'mint',
                args: [BigInt(mintAmount) * BigInt(10) ** BigInt(18)],
            }, {
                onSuccess: () => {
                    refetchBalance();
                    // Reset the input field after successful mint
                    setMintAmount("");
                    // Optional: Add a success toast here
                },
                    onError: (error) => {
                    console.error("Minting failed:", error);
                    // Optional: Add an error toast here
                }
            });
        } catch (error) {
            console.error("Error in handleMint:", error);
            // Optional: Add an error toast here
        }
    };

    if (!isConnected) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-purple-900 p-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Please connect your wallet first</h2>
                    <CustomConnectButton onConnect={() => setShowLoginForm(true)} />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white relative">
            {/* Navigation */}
            <nav className="flex justify-between items-center p-4 border-b border-gray-800">
                <Button 
                    variant="ghost" 
                    onClick={() => navigate('/')}
                    className="text-white hover:bg-gray-800"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                </Button>
                <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-300">
                        Connected: {address?.substring(0, 6)}...{address?.substring(address.length - 4)}
                    </span>
                    <Button 
                        variant="outline" 
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                        onClick={() => setShowLoginForm(!showLoginForm)}
                    >
                        {showLoginForm ? 'Hide Form' : 'Show Health Form'}
                    </Button>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container mx-auto p-4">
                {showLoginForm ? (
                    <div className="max-w-2xl mx-auto">
                        <h1 className="text-3xl font-bold mb-6 text-center">Health Data Entry</h1>
                        <LoginForm />
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <h2 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h2>
                        <p className="text-gray-300 mb-8">Click the button above to enter your health data</p>
                        
                        {/* Token Balance and Minting Section */}
                        <div className="bg-gray-800/50 p-6 rounded-xl max-w-md mx-auto">
                            <h3 className="text-xl font-semibold mb-4">Your PULSE Tokens</h3>
                            <div className="bg-gray-900 p-4 rounded-lg mb-4">
                                <p className="text-gray-400">Balance</p>
                                <p className="text-2xl font-bold">
                                    {balance ? Number(balance.formatted).toLocaleString() : '0'} PULSE
                                </p>
                            </div>
                            
                            <div className="mt-4">
                                <label htmlFor="mintAmount" className="block text-sm font-medium text-gray-300 mb-2">
                                    Mint PULSE Tokens
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        id="mintAmount"
                                        value={mintAmount}
                                        onChange={(e) => setMintAmount(e.target.value)}
                                        placeholder="Amount to mint"
                                        className="flex-1 p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                    <Button 
                                        onClick={handleMint}
                                        disabled={isMinting || !mintAmount}
                                        className="bg-purple-600 hover:bg-purple-700 text-white font-medium"
                                    >
                                        {isMinting ? 'Minting...' : 'Mint'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Chatbot Toggle Button */}
            <button
                onClick={() => setIsChatbotOpen(!isChatbotOpen)}
                className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50"
            >
                {isChatbotOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </button>

            {/* Chatbot Component */}
            {isChatbotOpen && (
                <div className="fixed bottom-20 right-6 w-96 h-[500px] bg-white rounded-xl shadow-2xl overflow-hidden z-50">
                    <Chatbot onClose={() => setIsChatbotOpen(false)} />
                </div>
            )}
        </div>
    );
};

export default Dashboard;