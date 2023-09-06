// Import Web3
const Web3 = require('web3');

// 1. Add the Web3 provider logic here:
const providerRPC = {
  dancebox: 'https://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network',
};
const web3 = new Web3(providerRPC.dancebox); // Change to correct network

// 2. Create account variables
const accountFrom = {
  privateKey: 'INSERT_YOUR_PRIVATE_KEY',
  address: 'INSERT_PUBLIC_ADDRESS_OF_PK',
};
const addressTo = 'INSERT_ADDRESS_TO'; // Change to address

// 3. Create send function
const send = async () => {
  console.log(`Attempting to send transaction from ${accountFrom.address} to ${addressTo}`);

// 4. Sign tx with PK
  const createTransaction = await web3.eth.accounts.signTransaction(
    {
      gas: 21000,
      to: addressTo,
      value: web3.utils.toWei('1', 'ether'),
    },
    accountFrom.privateKey
  );

  // 5. Send tx and wait for receipt
  const createReceipt = await web3.eth.sendSignedTransaction(createTransaction.rawTransaction);
  console.log(`Transaction successful with hash: ${createReceipt.transactionHash}`);
};

// 6. Call send function
send();