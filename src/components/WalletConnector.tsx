import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useNavigate } from 'react-router-dom';

const WalletConnector = () => {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected) {
      navigate('/login');
    } else {
      navigate('/');
    }
  }, [isConnected, navigate]);

  return null;
};

export default WalletConnector;