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

// 5. Load contract information
const bytecode = contractFile.evm.bytecode.object;
const abi = contractFile.abi;
const _initialNumber = 5;

// 6. Create deploy function
const deploy = async () => {
  console.log(`Attempting to deploy from account: ${account.address}`);

  // 7. Send transaction (initial value set to 5)
  const contract = await walletClient.deployContract({
    abi,
    account,
    bytecode,
    args: [_initialNumber],
  });

  // 8. Get the transaction receipt for the deployment
  const transaction = await publicClient.waitForTransactionReceipt({
    hash: contract,
  });

  console.log(`Contract deployed at address: ${transaction.contractAddress}`);
};

// 9. Call the deploy function
deploy();
