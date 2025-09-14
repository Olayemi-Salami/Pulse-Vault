// src/wagmiConfig.ts
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum, sepolia } from 'wagmi/chains';
import { http, createConfig } from 'wagmi';
import { injected } from 'wagmi/connectors';

// Get project ID from environment variables
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || '04726039ae0763114752c1726ee8064d';

if (!import.meta.env.VITE_WALLETCONNECT_PROJECT_ID) {
  console.warn('Using default project ID. For production, set VITE_WALLETCONNECT_PROJECT_ID in your .env file');
}

// Configure chains with public RPC endpoints
const chains = [mainnet, polygon, optimism, arbitrum, sepolia] as const;

export const config = createConfig({
  appName: 'AI Health Coach',
  projectId,
  chains,
  ssr: false,
  transports: {
    [mainnet.id]: http('https://eth.llamarpc.com'),
    [polygon.id]: http('https://polygon.llamarpc.com'),
    [optimism.id]: http('https://mainnet.optimism.io'),
    [arbitrum.id]: http('https://arb1.arbitrum.io/rpc'),
    [sepolia.id]: http('https://rpc.sepolia.org'),
  },
  connectors: [
    injected(),
  ],
  enableWebSocketPublicClient: false, // Disable WebSocket if not needed
});

// Export the chains for use in other files
export { chains };