// src/wagmiConfig.ts
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, arbitrum, optimism } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'PulseVault',
  projectId: '04726039ae0763114752c1726ee8064d',
  chains: [mainnet, polygon, optimism, arbitrum],
  ssr: false, // If your app uses SSR, you'll need to handle it properly
  // Add this to properly initialize WalletConnect
  walletConnectProjectId: '04726039ae0763114752c1726ee8064d',
});

export { mainnet, polygon, arbitrum, optimism as defaultChains };
