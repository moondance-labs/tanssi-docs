// 1. Imports the necessary components from viem
import { createPublicClient, http, formatEther, defineChain } from 'viem';

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
      url: 'https://tanssi-evmexplorer.netlify.app/',
    },
  },
});

// 3. Create a public client for reading chain data
const rpcUrl = 'https://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network';
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

  console.log(`The balance of ${addressFrom} is: ${balanceFrom} UNIT`);
  console.log(`The balance of ${addressTo} is: ${balanceTo} UNIT`);
};

// 7. Call the balances function
balances();
