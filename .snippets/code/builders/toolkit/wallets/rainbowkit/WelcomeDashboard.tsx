import { useAccount } from 'wagmi';

const WelcomeDashboard = () => {
  const { address, isConnected } = useAccount();

  if (isConnected && address) {
    return <p>Welcome, your wallet is connected with address: {address}</p>;
  }

  return <p>Please connect your wallet to continue.</p>;
};

export default WelcomeDashboard;