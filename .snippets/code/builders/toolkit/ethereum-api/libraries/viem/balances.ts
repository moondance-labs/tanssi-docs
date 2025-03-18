// 1. Import the necessary components from viem
import { createPublicClient, http, formatEther, defineChain } from 'viem';

// 2. Specify the details of your EVM network
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

// 3. Create a public client for reading chain data
const rpcUrl = 'https://dancebox-3001.tanssi-api.network';
const publicClient = createPublicClient({
  chain: demoEVM,
  transport: http(rpcUrl),
});

// 4. Create address variables
const addressFrom = 'INSERT_ADDRESS_FROM';
const addressTo = 'INSERT_ADDRESS_TO';

// 5. Create balances function
const balances = async () => {
  // 6. Fetch balances
  const balanceFrom = formatEther(
    await publicClient.getBalance({ address: addressFrom })
  );
  const balanceTo = formatEther(
    await publicClient.getBalance({ address: addressTo })
  );

  console.log(`The balance of ${addressFrom} is: ${balanceFrom} TANGO`);
  console.log(`The balance of ${addressTo} is: ${balanceTo} TANGO`);
};

// 7. Call the balances function
balances();
