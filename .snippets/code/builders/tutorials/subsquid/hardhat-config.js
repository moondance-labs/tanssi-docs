// 1. Import the Ethers plugin required to interact with the contract
require('@nomicfoundation/hardhat-ethers');

// 2. Add your private key that is funded with tokens of your Appchain
// This is for example purposes only - **never store your private keys in a JavaScript file**
const privateKey = 'INSERT_PRIVATE_KEY';

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  // 3. Specify the Solidity version
  solidity: '0.8.20',
  networks: {
    // 4. Add the network specification for your Tanssi EVM Appchain
    demo: {
      url: 'https://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network/',
      chainId: 5678, // Fill in the EVM ChainID for your Appchain
      accounts: [privateKey],
    },
  },
};
