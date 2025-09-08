import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import App from './App';
import './index.css';
import Dashboard from './pages/Dashboard';
import WalletConnect from './components/Dashboard/WalletConnect';
import { config } from './wagmiConfig';
import { queryClient } from './queryClient';

// Error Boundary Component
class ErrorBoundary extends React.Component<{children: React.ReactNode}, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="p-8 bg-white rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
            <p className="text-gray-700 mb-4">We're working on fixing this issue. Please try again later.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider 
            theme={darkTheme({
              accentColor: '#7c3aed',
              accentColorForeground: 'white',
              borderRadius: 'medium',
              fontStack: 'system',
              overlayBlur: 'small',
            })}
            appInfo={{
              appName: 'PulseVault',
            }}
          >
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/WalletConnect" element={<WalletConnect />} />
              </Routes>
            </BrowserRouter>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
