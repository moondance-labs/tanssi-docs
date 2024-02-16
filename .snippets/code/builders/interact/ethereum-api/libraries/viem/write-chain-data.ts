// 1. Import the necessary components from viem and viem/accounts
import { createWalletClient, http, defineChain } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

// 2. Specify the details of your EVM ContainerChain
export const demoEVM = defineChain({
  id: 5678,
  name: 'demo',
  network: 'demo',
  nativeCurrency: {
    decimals: 18,
    name: 'UNIT',
    symbol: 'UNIT',
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
      url: 'https://3001-blockscout.a.dancebox.tanssi.network/',
    },
  },
});

// 3. Create your account using the privateKeyToAccount function
const account = privateKeyToAccount('INSERT_PRIVATE_KEY');
const rpcUrl = 'https://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network';

//4. Create a wallet client for writing chain data
const walletClient = createWalletClient({
  account,
  chain: demoEVM,
  transport: http(rpcUrl),
});
