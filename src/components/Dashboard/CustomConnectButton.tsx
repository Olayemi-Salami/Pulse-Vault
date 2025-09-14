import React, { useEffect } from 'react';
import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

interface CustomConnectButtonProps {
    onConnect?: () => void;
}

const CustomConnectButton: React.FC<CustomConnectButtonProps> = ({ onConnect }) => {
    const navigate = useNavigate();

    return (
        <RainbowConnectButton.Custom>
            {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  authenticationStatus,
                  mounted,
              }) => {
                const ready = mounted && authenticationStatus !== 'loading';
                const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');

                // Navigate to LoginForm when wallet is successfully connected
                useEffect(() => {
                    if (connected) {
                        navigate('/login'); // Adjust the path to match your route for LoginForm
                        if (onConnect) onConnect(); // Call onConnect if provided
                    }
                }, [connected, navigate, onConnect]);

                return (
                    <div
                        {...(!ready && {
                            'aria-hidden': true,
                            style: {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none',
                            },
                        })}
                    >
                        {(() => {
                            if (!connected) {
                                return (
                                    <Button
                                        onClick={() => {
                                            openConnectModal();
                                        }}
                                        type="button"
                                        className="bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg px-4 py-2"
                                    >
                                        Connect Wallet
                                    </Button>
                                );
                            }

                            if (chain.unsupported) {
                                return (
                                    <Button
                                        onClick={openChainModal}
                                        type="button"
                                        className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg px-4 py-2"
                                    >
                                        Wrong network
                                    </Button>
                                );
                            }

                            return (
                                <div style={{ display: 'flex', gap: 12 }}>
                                    <Button
                                        onClick={openChainModal}
                                        className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg px-4 py-2"
                                        type="button"
                                    >
                                        {chain.hasIcon && (
                                            <div
                                                style={{
                                                    background: chain.iconBackground,
                                                    width: 16,
                                                    height: 16,
                                                    borderRadius: 999,
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                {chain.iconUrl && (
                                                    <img
                                                        alt={chain.name ?? 'Chain icon'}
                                                        src={chain.iconUrl}
                                                        style={{ width: 16, height: 16 }}
                                                    />
                                                )}
                                            </div>
                                        )}
                                        {chain.name}
                                    </Button>

                                    <Button
                                        onClick={openAccountModal}
                                        className="bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg px-4 py-2"
                                        type="button"
                                    >
                                        {account.displayName}
                                        {account.displayBalance ? ` (${account.displayBalance})` : ''}
                                    </Button>
                                </div>
                            );
                        })()}
                    </div>
                );
            }}
        </RainbowConnectButton.Custom>
    );
};

export default CustomConnectButton;