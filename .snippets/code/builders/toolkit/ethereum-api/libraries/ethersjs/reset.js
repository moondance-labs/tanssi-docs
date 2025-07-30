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

// Create variables
const accountFrom = {
  privateKey: 'INSERT_YOUR_PRIVATE_KEY',
};
const contractAddress = 'INSERT_CONTRACT_ADDRESS';

// Create wallet
let wallet = new ethers.Wallet(accountFrom.privateKey, provider);

// Create contract instance with signer
const incrementer = new ethers.Contract(
  contractAddress,
  contractFile.abi,
  wallet
);

// Create reset function
const reset = async () => {
  console.log(
    `Calling the reset function in contract at address: ${contractAddress}`
  );

  // Sign and send tx and wait for receipt
  const createReceipt = await incrementer.reset();
  await createReceipt.wait();

  console.log(`Tx successful with hash: ${createReceipt.hash}`);
};

// Call the reset function
reset();
