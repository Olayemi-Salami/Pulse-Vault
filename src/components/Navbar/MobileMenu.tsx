import React from 'react';
import { Link } from 'react-router-dom';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    if (targetId) {
      const element = document.querySelector(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    onClose();
  };

  return (
    <div 
      className="md:hidden bg-white/10 backdrop-blur-lg fixed top-16 left-0 right-0 z-50 animate-fadeIn"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="px-4 py-2 space-y-2">
        <a
          href="#features"
          className="block px-4 py-3 rounded-lg text-base font-medium text-white hover:bg-white/20 transition-colors"
          onClick={handleLinkClick}
        >
          Features
        </a>
        <a
          href="#about"
          className="block px-4 py-3 rounded-lg text-base font-medium text-white hover:bg-white/20 transition-colors"
          onClick={handleLinkClick}
        >
          About
        </a>
        <a
          href="#docs"
          className="block px-4 py-3 rounded-lg text-base font-medium text-white hover:bg-white/20 transition-colors"
          onClick={handleLinkClick}
        >
          Docs
        </a>
        <Link
          to="/WalletConnect"
          className="block w-full text-center bg-emerald-500 hover:bg-emerald-600 rounded-full text-sm font-medium px-4 py-3 mt-2 transition-colors"
          onClick={onClose}
        >
          Connect Wallet
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
