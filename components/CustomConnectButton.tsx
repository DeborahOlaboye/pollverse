"use client"

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { CustomButton } from "./ui/CustomButton"
import { useRouter } from 'next/navigation';

export function CustomConnectButton() {
  const { isConnected, address, isConnecting } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const router = useRouter();

  const handleClick = () => {
    if (isConnected && address) {
      disconnect();
      router.refresh();
    } else {
      // Connect to the first available connector (e.g., MetaMask, WalletConnect)
      const connector = connectors[0];
      if (connector) {
        connect({ connector });
      }
    }
  };

  return (
    <CustomButton
      onClick={handleClick}
      variant={isConnected ? 'secondary' : 'primary'}
      disabled={isConnecting}
    >
      {isConnecting ? 'Connecting...' : 
       isConnected && address ? 
       `${address.slice(0, 6)}...${address.slice(-4)}` : 
       'Connect Wallet'}
    </CustomButton>
  );
}
