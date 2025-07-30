// 1. Import the necessary components from viem and viem/accounts
import {
  createPublicClient,
  createWalletClient,
  http,
  parseEther,
  defineChain,
} from 'viem';
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

// 3. Create a wallet client for writing chain data
// The private key must be prepended with `0x` to avoid errors
const account = privateKeyToAccount('INSERT_PRIVATE_KEY');
const rpcUrl = 'https://services.tanssi-testnet.network/dancelight-2001';
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

// 5. Create to address variable
const addressTo = 'INSERT_ADDRESS_TO';

// 6. Create send function
const send = async () => {
  console.log(
    `Attempting to send transaction from ${account.address} to ${addressTo}`
  );

  // 7. Sign and send transaction
  const hash = await walletClient.sendTransaction({
    to: addressTo,
    value: parseEther('1'),
  });

  // 8. Wait for the transaction receipt
  await publicClient.waitForTransactionReceipt({
    hash,
  });

  console.log(`Transaction successful with hash: ${hash}`);
};

// 9. Call the send function
send();
