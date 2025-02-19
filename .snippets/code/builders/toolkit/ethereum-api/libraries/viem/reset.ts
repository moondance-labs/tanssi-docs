// 1. Update import
import {
  createPublicClient,
  createWalletClient,
  http,
  defineChain,
} from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import contractFile from './compile';

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

// 3. Create a wallet client for writing chain data
// The private key must be prepended with `0x` to avoid errors
const account = privateKeyToAccount('INSERT_PRIVATE_KEY');
const rpcUrl = 'https://dancebox-3001.tanssi-api.network';
const walletClient = createWalletClient({
  account,
  chain: demoEVM,
  transport: http(rpcUrl),
});

// 4. Create a public client for reading chain data
const publicClient = createPublicClient({
  chain: demoEVM,
  transport: http(rpcUrl),
});

// 5. Create contract variables
const contractAddress = 'INSERT_CONTRACT_ADDRESS';
const abi = contractFile.abi;

// 6. Create reset function
const reset = async () => {
  console.log(
    `Calling the reset function in contract at address: ${contractAddress}`
  );

  // 7. Call contract
  const hash = await walletClient.writeContract({
    abi,
    functionName: 'reset',
    address: contractAddress,
    args: [],
  });

  // 8. Wait for the transaction receipt
  await publicClient.waitForTransactionReceipt({
    hash,
  });

  console.log(`Transaction successful with hash: ${hash}`);
};

// 9. Call reset function
reset();
