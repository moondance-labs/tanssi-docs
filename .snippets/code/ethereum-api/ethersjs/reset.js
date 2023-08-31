// Import ethers and compile
import { ethers } from 'ethers';
import contractFile from './compile.js';

// Define network configurations
const providerRPC = {
  EvmContainer: {
    name: 'dancebox-evm-container',
    rpc: 'https://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network', // Insert your RPC URL here
    chainId: 5678, // 0x162E in hex,
  },
};

const provider = new ethers.JsonRpcProvider(providerRPC.EvmContainer.rpc, {
  chainId: providerRPC.EvmContainer.chainId,
  name: providerRPC.EvmContainer.name,
});

// Create variables
const account_from = {
  privateKey: 'YOUR_PRIVATE_KEY_HERE',
};
const contractAddress = 'CONTRACT_ADDRESS_HERE';

// Create wallet
let wallet = new ethers.Wallet(account_from.privateKey, provider);

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
