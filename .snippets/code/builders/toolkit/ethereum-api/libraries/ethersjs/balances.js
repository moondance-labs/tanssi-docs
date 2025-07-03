// Import ethers
import { ethers } from 'ethers';

// Define network configurations
const providerRPC = {
  evmNetwork: {
    name: 'dancelight-evm-network',
    rpc: 'https://dancelight-2001.tanssi-api.network', // Insert your RPC URL here
    chainId: 5678, // 0x162E in hex,
  },
};
// Create ethers provider
const provider = new ethers.JsonRpcProvider(providerRPC.evmNetwork.rpc, {
  chainId: providerRPC.evmNetwork.chainId,
  name: providerRPC.evmNetwork.name,
});

// Define addresses
const addressFrom = 'INSERT_ADDRESS_FROM';
const addressTo = 'INSERT_ADDRESS_TO';

// Create balances function
const balances = async () => {
  // Fetch balances
  const balanceFrom = ethers.formatEther(
    await provider.getBalance(addressFrom)
  );
  const balanceTo = ethers.formatEther(await provider.getBalance(addressTo));

  console.log(`The balance of ${addressFrom} is: ${balanceFrom} TANGO`);
  console.log(`The balance of ${addressTo} is: ${balanceTo} TANGO`);
};

// Call the balances function
balances();
