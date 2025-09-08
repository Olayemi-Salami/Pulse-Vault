import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import './index.css';
import Dashboard from '../src/pages/Dashboard';
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import  {config}  from '../src/config/Config';





const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <WagmiProvider config={ config}>
     <RainbowKitProvider>   
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        
          
      </Routes>
      </RainbowKitProvider>  
      </WagmiProvider>
    </BrowserRouter>
  </React.StrictMode>
);
