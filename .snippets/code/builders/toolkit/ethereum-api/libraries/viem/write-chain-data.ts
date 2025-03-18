// 1. Import the necessary components from viem and viem/accounts
import { createWalletClient, http, defineChain } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

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
      http: ['https://dancebox-3001.tanssi-api.network'],
      webSocket: ['wss://dancebox-3001.tanssi-api.network'],
    },
    public: {
      http: ['https://dancebox-3001.tanssi-api.network'],
      webSocket: ['wss://dancebox-3001.tanssi-api.network'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Explorer',
      url: 'https://fra-dancebox-3001-bs.a.dancebox.tanssi.network/',
    },
  },
});

// 3. Create your account using the privateKeyToAccount function
const account = privateKeyToAccount('INSERT_PRIVATE_KEY');
const rpcUrl = 'https://dancebox-3001.tanssi-api.network';

//4. Create a wallet client for writing chain data
const walletClient = createWalletClient({
  account,
  chain: demoEVM,
  transport: http(rpcUrl),
});
