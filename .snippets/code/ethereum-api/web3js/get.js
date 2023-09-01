const Web3 = require('web3');
const { abi } = require('./compile');

const providerRPC = {
  development: 'http://localhost:9944',
  dancebox: 'https://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network',
};
const web3 = new Web3(providerRPC.development); // Change to correct network

const contractAddress = 'CONTRACT-ADDRESS-HERE';

const incrementer = new web3.eth.Contract(abi, contractAddress);

const get = async () => {
  console.log(`Making a call to contract at address: ${contractAddress}`);

  const data = await incrementer.methods.number().call();

  console.log(`The current number stored is: ${data}`);
};

get();