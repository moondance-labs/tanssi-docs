// Import ethers and compile
import { ethers } from 'ethers';
import contractFile from './compile.js';

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

// Create variables
const accountFrom = {
  privateKey: 'INSERT_YOUR_PRIVATE_KEY',
};
const contractAddress = 'INSERT_CONTRACT_ADDRESS';
const _value = 3;

// Create wallet
let wallet = new ethers.Wallet(accountFrom.privateKey, provider);

// Create contract instance with signer
const incrementer = new ethers.Contract(
  contractAddress,
  contractFile.abi,
  wallet
);

// Create increment function
const increment = async () => {
  console.log(
    `Calling the increment by ${_value} function in contract at address: ${contractAddress}`
  );

  // Sign and send tx and wait for receipt
  const createReceipt = await incrementer.increment(_value);
  await createReceipt.wait();

  console.log(`Tx successful with hash: ${createReceipt.hash}`);
};

// Call the increment function
increment();
