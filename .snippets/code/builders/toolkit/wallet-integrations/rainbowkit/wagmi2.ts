import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { type Chain } from 'viem'

export const demoEVMChain = {
  id: 5678,
  name: "Tanssi demo EVM Network",
  nativeCurrency: { name: "TANGO", symbol: "TANGO", decimals: 18 },
  rpcUrls: {
    default: { http: ['https://services.tanssi-testnet.network/dancelight-2001'] }
  },
  blockExplorers: {
    default: { name: 'Demo EVM Explorer', url: 'https://dancelight-2001-blockscout.tanssi-chains.network/' }
  },
} as const satisfies Chain


export const config = getDefaultConfig({
  appName: 'My Tanssi-powered Network',
  projectId: 'process.env.NEXT_PUBLIC_PROJECT_ID',
  chains: [demoEVMChain ], 
  ssr: true,
});
