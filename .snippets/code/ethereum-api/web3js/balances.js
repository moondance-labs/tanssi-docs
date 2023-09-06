// Import Web3
const Web3 = require('web3');

// 1. Add the Web3 provider logic here:
const providerRPC = {
  dancebox: 'https://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network',
};
const web3 = new Web3(providerRPC.dancebox); // Change to correct network

// 2. Create address variables
const addressFrom = 'INSERT_ADDRESS_FROM';
const addressTo = 'INSERT_ADDRESS_TO';

// 3. Create balances function
const balances = async () => {
  // 4. Fetch balance info
  const balanceFrom = web3.utils.fromWei(await web3.eth.getBalance(addressFrom), 'ether');
  const balanceTo = web3.utils.fromWei(await web3.eth.getBalance(addressTo), 'ether');

  console.log(`The balance of ${addressFrom} is: ${balanceFrom} UNITS`);
  console.log(`The balance of ${addressTo} is: ${balanceTo} UNITS`);
};

// 5. Call balances function
balances();