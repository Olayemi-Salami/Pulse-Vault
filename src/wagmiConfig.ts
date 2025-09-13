// src/wagmiConfig.ts
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum, sepolia } from 'wagmi/chains';

// Get project ID from environment variables
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || '04726039ae0763114752c1726ee8064d';

if (!import.meta.env.VITE_WALLETCONNECT_PROJECT_ID) {
  console.warn('Using default project ID. For production, set VITE_WALLETCONNECT_PROJECT_ID in your .env file');
}

// Configure chains
const chains = [mainnet, polygon, optimism, arbitrum, sepolia] as const;

export const config = getDefaultConfig({
    appName: 'AI Health Coach',
    projectId,
    chains,
    ssr: true,
});

// Export the chains for use in other files
export { chains };