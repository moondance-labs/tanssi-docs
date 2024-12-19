// 1. Import the necessary components from viem
import { createPublicClient, http, defineChain } from 'viem';

// 2. Specify the details of your EVM network
export const demoEVM = defineChain({
  id: 5678,
  name: 'demo',
  network: 'demo',
  nativeCurrency: {
    decimals: 18,
    name: 'TANGO',
    symbol: 'TANGO',
  },
  rpcUrls: {
    default: {
      http: ['https://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network'],
      webSocket: ['wss://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network'],
    },
    public: {
      http: ['https://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network'],
      webSocket: ['wss://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Explorer',
      url: 'https://fra-dancebox-3001-bs.a.dancebox.tanssi.network/',
    },
  },
});

// 3. Create a public client for reading chain data
const rpcUrl = 'https://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network';
const publicClient = createPublicClient({
  chain: demoEVM,
  transport: http(rpcUrl),
});
