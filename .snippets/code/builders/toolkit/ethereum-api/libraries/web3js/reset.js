// Import Web3 and the contract abi
const Web3 = require('web3');
const { abi } = require('./compile');

// Add the Web3 provider logic here:
const providerRPC = {
  evmNetwork: 'https://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network', // Insert your RPC URL here
};
const web3 = new Web3(providerRPC.evmNetwork);

// Create variables
const accountFrom = {
  privateKey: 'INSERT_YOUR_PRIVATE_KEY',
};
const contractAddress = 'INSERT_CONTRACT_ADDRESS';

// Create Contract Instance
const incrementer = new web3.eth.Contract(abi, contractAddress);

// Build reset tx
const resetTx = incrementer.methods.reset();

// Create reset function
const reset = async () => {
  console.log(
    `Calling the reset function in contract at address: ${contractAddress}`
  );

  // Sign tx with PK
  const createTransaction = await web3.eth.accounts.signTransaction(
    {
      to: contractAddress,
      data: resetTx.encodeABI(),
      gas: await resetTx.estimateGas(),
    },
    accountFrom.privateKey
  );

  // Send tx and wait for receipt
  const createReceipt = await web3.eth.sendSignedTransaction(
    createTransaction.rawTransaction
  );
  console.log(`Tx successful with hash: ${createReceipt.transactionHash}`);
};

// Call reset function
reset();
