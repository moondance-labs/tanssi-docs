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

// Define accounts and wallet
const accountFrom = {
  privateKey: 'INSERT_YOUR_PRIVATE_KEY',
};
const addressTo = 'INSERT_ADDRESS_TO';
const wallet = new ethers.Wallet(accountFrom.privateKey, provider);

// Create send function
const send = async () => {
  console.log(
    `Attempting to send transaction from ${wallet.address} to ${addressTo}`
  );

  // Create transaction
  const tx = {
    to: addressTo,
    value: ethers.parseEther('1'),
  };

  // Send transaction and get hash
  const createReceipt = await wallet.sendTransaction(tx);
  await createReceipt.wait();
  console.log(`Transaction successful with hash: ${createReceipt.hash}`);
};

// Call the send function
send();
