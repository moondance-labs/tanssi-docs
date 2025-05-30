// Import ethers and compile
import { ethers } from 'ethers';
import contractFile from './compile.js';

// Define network configurations
const providerRPC = {
  evmNetwork: {
    name: 'dancebox-evm-network',
    rpc: 'https://dancelight-2001.tanssi-api.network', // Insert your RPC URL here
    chainId: 5678, // 0x162E in hex,
  },
};

// Create ethers provider
const provider = new ethers.JsonRpcProvider(providerRPC.evmNetwork.rpc, {
  chainId: providerRPC.evmNetwork.chainId,
  name: providerRPC.evmNetwork.name,
});

// Define accounts and wallet
const accountFrom = {
  privateKey: 'INSERT_YOUR_PRIVATE_KEY',
};
let wallet = new ethers.Wallet(accountFrom.privateKey, provider);

// Load contract info
const bytecode = contractFile.evm.bytecode.object;
const abi = contractFile.abi;

// Create contract instance with signer
const incrementer = new ethers.ContractFactory(abi, bytecode, wallet);

// Create deploy function
const deploy = async () => {
  console.log(`Attempting to deploy from account: ${wallet.address}`);

  // Send tx (initial value set to 5) and wait for receipt
  const contract = await incrementer.deploy(5);
  const txReceipt = await contract.deploymentTransaction().wait();

  console.log(`Contract deployed at address: ${txReceipt.contractAddress}`);
};

// Call the deploy function
deploy();
