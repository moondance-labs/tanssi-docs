// Import web3 and the contract file
const Web3 = require('web3');
const { abi } = require('./compile');

// Add the Web3 provider logic here:
const providerRPC = {
  evmNetwork: 'https://services.tanssi-testnet.network/dancelight-2001', // Insert your RPC URL here
};
const web3 = new Web3(providerRPC.evmNetwork);

// Create address variables
const contractAddress = 'INSERT_CONTRACT_ADDRESS';

// Create contract instance
const incrementer = new web3.eth.Contract(abi, contractAddress);

// Create get function
const get = async () => {
  console.log(`Making a call to contract at address: ${contractAddress}`);

  // Call contract
  const data = await incrementer.methods.number().call();

  console.log(`The current number stored is: ${data}`);
};

// Call get function
get();
