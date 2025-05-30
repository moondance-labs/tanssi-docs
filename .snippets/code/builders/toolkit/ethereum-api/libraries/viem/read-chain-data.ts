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
      http: ['https://dancelight-2001.tanssi-api.network'],
      webSocket: ['wss://dancelight-2001.tanssi-api.network'],
    },
    public: {
      http: ['https://dancelight-2001.tanssi-api.network'],
      webSocket: ['wss://dancelight-2001.tanssi-api.network'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Explorer',
      url: 'https://dancelight-2001-blockscout.tanssi-chains.network/',
    },
  },
});

// 3. Create a public client for reading chain data
const rpcUrl = 'https://dancelight-2001.tanssi-api.network';
const publicClient = createPublicClient({
  chain: demoEVM,
  transport: http(rpcUrl),
});
