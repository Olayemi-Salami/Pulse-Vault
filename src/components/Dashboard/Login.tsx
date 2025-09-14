import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Login: React.FC = () => {
    const { isConnected, isConnecting, isDisconnected, address } = useAccount();
    const navigate = useNavigate();
    const [isChecking, setIsChecking] = useState(true);
    const [isRedirecting, setIsRedirecting] = useState(false);

    // Handle connection status and redirection
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (isConnected && address) {
            // If connected, set a small delay before redirecting to ensure UI updates
            timeoutId = setTimeout(() => {
                setIsRedirecting(true);
                navigate('/dashboard', { replace: true });
            }, 500);
        } else if (!isConnected && !isConnecting) {
            // If not connected and not trying to connect, redirect to wallet connect
            timeoutId = setTimeout(() => {
                navigate('/wallet-connect', { replace: true });
            }, 0);
        } else {
            setIsChecking(false);
        }

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [isConnected, isConnecting, navigate, address]);

    // Show loading state while checking connection or redirecting
    if (isChecking || isRedirecting) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-cyan-400 to-purple-950">
                <div className="text-white text-xl">
                    {isRedirecting ? 'Redirecting...' : 'Loading...'}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-cyan-400 to-purple-950 p-6">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-white mb-2">
                    Welcome to PulseVault
                </h2>
                <p className="text-gray-200">
                    Your decentralized health coach & data vault
                </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-2xl w-full max-w-md">
                <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-white mb-2">
                        Wallet Connected
                    </h3>
                    <p className="text-gray-200 text-sm">
                        You're ready to access your health data securely.
                    </p>
                    <div className="mt-2 text-xs text-gray-400 break-all">
                        {address}
                    </div>
                </div>

                <div className="flex flex-col space-y-4">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                        disabled={isRedirecting}
                    >
                        {isRedirecting ? 'Redirecting...' : 'Go to Dashboard'}
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        className="w-full px-6 py-3 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                        disabled={isRedirecting}
                    >
                        Back to Home
                    </button>
                </div>
            </div>

            {/* Show connect button if disconnected */}
            {isDisconnected && (
                <div className="mt-8 text-center">
                    <p className="text-yellow-300 mb-4">Wallet disconnected. Please reconnect:</p>
                    <ConnectButton />
                </div>
            )}
        </div>
    );
};

export default Login;
