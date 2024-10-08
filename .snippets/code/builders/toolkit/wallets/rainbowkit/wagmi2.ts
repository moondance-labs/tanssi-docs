import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { type Chain } from 'viem'

export const demoEVMChain = {
  id: 5678,
  name: "Tanssi demo EVM Appchain",
  nativeCurrency: { name: "TANGO", symbol: "TANGO", decimals: 18 },
  rpcUrls: {
    default: { http: ['https://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network'] }
  },
  blockExplorers: {
    default: { name: 'Demo EVM Explorer', url: 'https://fra-dancebox-3001-bs.a.dancebox.tanssi.network/' }
  },
} as const satisfies Chain


export const config = getDefaultConfig({
  appName: 'My Tanssi Appchain',
  projectId: 'process.env.NEXT_PUBLIC_PROJECT_ID',
  chains: [demoEVMChain ], 
  ssr: true,
});
