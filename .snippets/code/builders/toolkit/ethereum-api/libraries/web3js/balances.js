// Import Web3
const Web3 = require('web3');

// Add the Web3 provider logic here:
const providerRPC = {
  evmNetwork: 'https://dancelight-2001.tanssi-api.network', // Insert your RPC URL here
};
const web3 = new Web3(providerRPC.evmNetwork);

// Create address variables
const addressFrom = 'INSERT_ADDRESS_FROM';
const addressTo = 'INSERT_ADDRESS_TO';

// Create balances function
const balances = async () => {
  // Fetch balance info
  const balanceFrom = web3.utils.fromWei(
    await web3.eth.getBalance(addressFrom),
    'ether'
  );
  const balanceTo = web3.utils.fromWei(
    await web3.eth.getBalance(addressTo),
    'ether'
  );

  console.log(`The balance of ${addressFrom} is: ${balanceFrom} TANGO`);
  console.log(`The balance of ${addressTo} is: ${balanceTo} TANGO`);
};

// Call balances function
balances();
