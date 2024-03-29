// 1. Update import
import {
  createPublicClient,
  createWalletClient,
  http,
  defineChain,
} from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import contractFile from './compile';

// 2. Specify the details of your EVM appchain
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

// 3. Create a wallet client for writing chain data
// The private key must be prepended with `0x` to avoid errors
const account = privateKeyToAccount('INSERT_PRIVATE_KEY');
const rpcUrl = 'https://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network';
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
