// Import web3 and the contract file
const Web3 = require('web3');
const contractFile = require('./compile');

// Add the Web3 provider logic here
const providerRPC = {
  evmNetwork: 'https://dancebox-3001.tanssi-api.network', // Insert your RPC URL here
};
const web3 = new Web3(providerRPC.evmNetwork);

// Create address variables
const accountFrom = {
  privateKey: 'INSERT_PRIVATE_KEY',
  address: 'INSERT_PUBLIC_ADDRESS_OF_PK',
};

// Get the bytecode and API
const bytecode = contractFile.evm.bytecode.object;
const abi = contractFile.abi;

// Create deploy function
const deploy = async () => {
  console.log(`Attempting to deploy from account ${accountFrom.address}`);

  // Create contract instance
  const incrementer = new web3.eth.Contract(abi);

  // Create constructor tx with initial value of 5
  const incrementerTx = incrementer.deploy({
    data: bytecode,
    arguments: [5],
  });

  // Sign transacation and send
  const createTransaction = await web3.eth.accounts.signTransaction(
    {
      data: incrementerTx.encodeABI(),
      gas: await incrementerTx.estimateGas(),
    },
    accountFrom.privateKey
  );

  // Send tx and wait for receipt
  const createReceipt = await web3.eth.sendSignedTransaction(
    createTransaction.rawTransaction
  );
  console.log(`Contract deployed at address: ${createReceipt.contractAddress}`);
};

// Call deploy function
deploy();
