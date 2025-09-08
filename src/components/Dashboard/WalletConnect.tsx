import React from 'react';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from 'wagmi';

const WalletConnect: React.FC = () => {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-cyan-400 to-purple-950 p-4 sm:p-6 lg:p-8">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 w-full max-w-md mx-auto shadow-2xl text-center">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">
            {isConnected ? 'Wallet Connected' : 'Connect Your Wallet'}
          </h1>
          <p className="text-sm sm:text-base text-white/80">
            {isConnected 
              ? 'You are now connected to your wallet.'
              : 'Connect your wallet to access your health data and AI insights'}
          </p>
        </div>
        
        <div className="bg-white/5 p-4 sm:p-6 rounded-xl mb-6">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="bg-white/10 p-3 sm:p-4 rounded-full">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-white w-8 h-8 sm:w-10 sm:h-10"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </div>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            <ConnectButton.Custom>
              {({ 
                account, 
                chain, 
                openAccountModal, 
                openChainModal, 
                openConnectModal, 
                authenticationStatus, 
                mounted 
              }) => {
                const ready = mounted && authenticationStatus !== 'loading';
                const connected = ready && account && chain;
                
                if (!connected) {
                  return (
                    <button
                      onClick={openConnectModal}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-4 rounded-full transition-colors"
                      type="button"
                    >
                      Connect Wallet
                    </button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button
                      onClick={openChainModal}
                      className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-full transition-colors"
                      type="button"
                    >
                      Wrong network
                    </button>
                  );
                }

                return (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-sm text-white/80">Connected to {chain.name}</span>
                    </div>
                    <button
                      onClick={openAccountModal}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-4 rounded-full transition-colors"
                      type="button"
                    >
                      {account.displayName}
                      {account.displayBalance ? ` (${account.displayBalance})` : ''}
                    </button>
                    <button
                      onClick={() => disconnect()}
                      className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-full transition-colors"
                      type="button"
                    >
                      Disconnect
                    </button>
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>
        </div>
        
        {!isConnected && (
          <p className="text-xs text-white/60 mt-4">
            By connecting, you agree to our Terms of Service and Privacy Policy
          </p>
        )}
      </div>
    </div>
  );
};

export default WalletConnect;
