// ... existing code ...
// In WalletConnect.tsx, update the imports
import { useEffect, useState, useCallback } from 'react';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect, useConnect } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import ErrorBoundary from '../common/ErrorBoundary';

const WalletConnect: React.FC = () => {
    const { isConnected, address, chain } = useAccount();
    const { disconnect } = useDisconnect();
    const { connect, connectors, error, isError } = useConnect();
    const navigate = useNavigate();


    const handleError = useCallback((error: Error) => {
        console.error('WalletConnect Error:', error);
        setConnectionError('Failed to connect to wallet. Please try again.');
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (isError && error) {
            handleError(error);
        }
    }, [isError, error, handleError]);

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

    const handleDisconnect = useCallback(() => {
        try {
            disconnect();
            setConnectionError(null);
        } catch (err) {
            setConnectionError('Failed to disconnect wallet');
            console.error('Disconnect error:', err);
        }
    }, [disconnect]);

    if (isConnected) {
        return (
            <ErrorBoundary>
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-cyan-400 to-purple-950 p-4 sm:p-6 lg:p-8">
                    {/* ... rest of your component ... */}
                </div>
            </ErrorBoundary>
        );
    }

    // ... rest of your component ...
};

export default WalletConnect;