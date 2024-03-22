// Import Web3 and the contract abi
const Web3 = require('web3');
const { abi } = require('./compile');

// Add the Web3 provider logic here:
const providerRPC = {
  evmAppchain: 'https://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network', // Insert your RPC URL here
};
const web3 = new Web3(providerRPC.evmAppchain);

// Create variables
const accountFrom = {
  privateKey: 'INSERT_YOUR_PRIVATE_KEY',
};
const contractAddress = 'INSERT_CONTRACT_ADDRESS';
const _value = 3;

// Create contract instance
const incrementer = new web3.eth.Contract(abi, contractAddress);

// Build increment tx
const incrementTx = incrementer.methods.increment(_value);

// Create increment function
const increment = async () => {
  console.log(
    `Calling the increment by ${_value} function in contract at address: ${contractAddress}`
  );

  // Sign Tx with PK
  const createTransaction = await web3.eth.accounts.signTransaction(
    {
      to: contractAddress,
      data: incrementTx.encodeABI(),
      gas: await incrementTx.estimateGas(),
    },
    accountFrom.privateKey
  );

  // Send Tx and Wait for Receipt
  const createReceipt = await web3.eth.sendSignedTransaction(
    createTransaction.rawTransaction
  );
  console.log(`Tx successful with hash: ${createReceipt.transactionHash}`);
};

// Call increment function
increment();
