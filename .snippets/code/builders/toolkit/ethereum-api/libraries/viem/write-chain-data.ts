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
      http: ['https://services.tanssi-testnet.network/dancelight-2001'],
      webSocket: ['wss://services.tanssi-testnet.network/dancelight-2001'],
    },
    public: {
      http: ['https://services.tanssi-testnet.network/dancelight-2001'],
      webSocket: ['wss://services.tanssi-testnet.network/dancelight-2001'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Explorer',
      url: 'https://dancelight-2001-blockscout.tanssi-chains.network/',
    },
  },
});

// 3. Create your account using the privateKeyToAccount function
const account = privateKeyToAccount('INSERT_PRIVATE_KEY');
const rpcUrl = 'https://services.tanssi-testnet.network/dancelight-2001';

//4. Create a wallet client for writing chain data
const walletClient = createWalletClient({
  account,
  chain: demoEVM,
  transport: http(rpcUrl),
});
