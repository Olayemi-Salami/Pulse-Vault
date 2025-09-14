// WalletConnect.tsx
import { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";
import { Wallet, Star } from "lucide-react";
import { Button } from "../ui/button";
import ErrorBoundary from "../common/ErrorBoundary";

const WalletConnect: React.FC = () => {
    const { isConnected, isConnecting, isDisconnected, isReconnecting, address } = useAccount();
    const navigate = useNavigate();
    const [connectionError, setConnectionError] = useState<string | null>(null);
    const [hasRedirected, setHasRedirected] = useState(false);
    const [mintAmount, setMintAmount] = useState("");

    const handleError = useCallback((error: Error) => {
        console.error('WalletConnect Error:', error);
        setConnectionError('Failed to connect to wallet. Please try again.');
    }, []);

    // Handle connection errors
    useEffect(() => {
        const handleConnectionError = (event: Event) => {
            const errorEvent = event as ErrorEvent;
            if (errorEvent.message.includes('WebSocket connection failed')) {
                handleError(new Error('Network error. Please check your internet connection.'));
            }
        };

        window.addEventListener('error', handleConnectionError);
        return () => window.removeEventListener('error', handleConnectionError);
    }, [handleError]);

    // Handle redirection when wallet is connected
    useEffect(() => {
        if (isConnected && !hasRedirected) {
            console.log('Wallet connected, navigating to data entry...');
            setHasRedirected(true);
            navigate('/dataentry', { replace: true });
        }
    }, [isConnected, navigate, hasRedirected]);

    // Handle initial load - if wallet is already connected, redirect immediately
    useEffect(() => {
        if (isConnected && !isReconnecting && !hasRedirected) {
            console.log('Wallet already connected on load, redirecting...');
            setHasRedirected(true);
            navigate('/dataentry', { replace: true });
        }
    }, [isConnected, isReconnecting, navigate, hasRedirected]);

    // Reset redirect flag when disconnected
    useEffect(() => {
        if (isDisconnected) {
            setHasRedirected(false);
        }
    }, [isDisconnected]);

    const handleMint = () => {
        // Add your minting logic here
        console.log(`Minting ${mintAmount} tokens`);
    };

    return (
        <ErrorBoundary>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-cyan-400 to-purple-950 p-6">
                <div className="text-center max-w-md">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Connect Your Wallet
                    </h1>
                    <p className="text-gray-200 mb-8">
                        Securely access your AI Health Coach & Data Vault
                    </p>

                    <div className="flex flex-col items-center space-y-4">
                        <ConnectButton />

                        {/* Loading states */}
                        {(isConnecting || isReconnecting) && !isConnected && (
                            <div className="flex items-center space-x-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                <p className="text-white">
                                    {isReconnecting ? 'Reconnecting...' : 'Connecting to your wallet...'}
                                </p>
                            </div>
                        )}

                        {/* Connection status messages */}
                        {isDisconnected && !isConnecting && !isReconnecting && (
                            <p className="text-yellow-300">
                                Please connect your wallet to continue
                            </p>
                        )}

                        {/* Error handling */}
                        {connectionError && (
                            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 max-w-sm">
                                <p className="text-red-300 text-sm">{connectionError}</p>
                                <button
                                    onClick={() => setConnectionError(null)}
                                    className="text-red-200 hover:text-white text-xs mt-1 underline"
                                >
                                    Dismiss
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    );
};

export default WalletConnect;