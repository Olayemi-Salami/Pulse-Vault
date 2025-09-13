import { useState } from "react";
import { useAccount, useBalance, useWriteContract } from "wagmi";
import Login from "../components/Dashboard/Login";
import Chatbot from "../components/Bot/Chatbot";
import { Button } from "../components/ui/button";
import { MessageCircle, X, Wallet, Star } from "lucide-react";
import { pulseTokenContract } from "../contracts/pulseToken";

const Dashboard = () => {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const { address } = useAccount();
    const [mintAmount, setMintAmount] = useState("");

    const { data: balance, refetch: refetchBalance } = useBalance({
        address,
        token: pulseTokenContract.address,
    });

    const { writeContract, isPending: isMinting } = useWriteContract();

    const handleMint = async () => {
        if (!mintAmount) return;
        writeContract({
            ...pulseTokenContract,
            functionName: 'mint',
            args: [BigInt(mintAmount) * BigInt(10) ** BigInt(18)],
        }, {
            onSuccess: () => {
                refetchBalance();
            }
        });
    };

    return (
        <div>
            <Login />
            <div className="fixed top-5 right-5 z-50 flex items-center bg-gray-800 p-3 rounded-lg">
                <Wallet className="text-white mr-2" />
                <span className="text-white font-bold">{balance?.formatted}</span>
                <Star className="text-yellow-400 ml-2" />
            </div>
            <div className="fixed top-20 right-5 z-50 flex flex-col items-center bg-gray-800 p-3 rounded-lg">
                <input 
                    type="text" 
                    value={mintAmount}
                    onChange={(e) => setMintAmount(e.target.value)}
                    placeholder="Amount to Mint"
                    className="bg-gray-700 text-white p-2 rounded-lg mb-2"
                />
                <Button onClick={handleMint} disabled={isMinting}>
                    {isMinting ? 'Minting...' : 'Mint PLS'}
                </Button>
            </div>
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

export default Dashboard;