// 1. Update import
import { createPublicClient, http, defineChain } from 'viem';
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

// 3. Create a public client for reading chain data
const rpcUrl = 'https://services.tanssi-testnet.network/dancelight-2001';
const publicClient = createPublicClient({
  chain: demoEVM,
  transport: http(rpcUrl),
});
// 4. Create contract variables
const contractAddress = 'INSERT_CONTRACT_ADDRESS';
const abi = contractFile.abi;

// 5. Create get function
const get = async () => {
  console.log(`Making a call to contract at address: ${contractAddress}`);

  // 6. Call contract
  const data = await publicClient.readContract({
    abi,
    functionName: 'number',
    address: contractAddress,
    args: [],
  });

  console.log(`The current number stored is: ${data}`);
};

// 7. Call get function
get();
