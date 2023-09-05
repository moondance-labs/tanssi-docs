// Import ethers
import { ethers } from 'ethers';

// Define network configurations
const providerRPC = {
  EvmContainer: {
    name: 'dancebox-evm-container',
    rpc: 'https://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network', // Insert your RPC URL here
    chainId: 5678, // 0x162E in hex,
  },
};
// Create ethers provider
const provider = new ethers.JsonRpcProvider(providerRPC.EvmContainer.rpc, {
  chainId: providerRPC.EvmContainer.chainId,
  name: providerRPC.EvmContainer.name,
});

// Define addresses
const addressFrom = 'ADDRESS_FROM_HERE';
const addressTo = 'ADDRESS_TO_HERE';

// Create balances function
const balances = async () => {
  // 6. Fetch balances
  const balanceFrom = ethers.formatEther(
    await provider.getBalance(addressFrom)
  );
  const balanceTo = ethers.formatEther(await provider.getBalance(addressTo));

  console.log(`The balance of ${addressFrom} is: ${balanceFrom} UNIT`);
  console.log(`The balance of ${addressTo} is: ${balanceTo} UNIT`);
};

// Call the balances function
balances();
