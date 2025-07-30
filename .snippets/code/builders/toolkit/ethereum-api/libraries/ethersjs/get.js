// Import ethers and compile
import { ethers } from 'ethers';
import contractFile from './compile.js';

// Define network configurations
const providerRPC = {
  evmNetwork: {
    name: 'dancelight-evm-network',
    rpc: 'https://services.tanssi-testnet.network/dancelight-2001', // Insert your RPC URL here
    chainId: 5678, // 0x162E in hex,
  },
};

// Create ethers provider
const provider = new ethers.JsonRpcProvider(providerRPC.evmNetwork.rpc, {
  chainId: providerRPC.evmNetwork.chainId,
  name: providerRPC.evmNetwork.name,
});

// Contract address variable
const contractAddress = 'INSERT_CONTRACT_ADDRESS';

// Create contract instance
const incrementer = new ethers.Contract(
  contractAddress,
  contractFile.abi,
  provider
);

// Create get function
const get = async () => {
  console.log(`Making a call to contract at address: ${contractAddress}`);

  // Call contract
  const data = await incrementer.number();

  console.log(`The current number stored is: ${data}`);
};

// Call get function
get();
