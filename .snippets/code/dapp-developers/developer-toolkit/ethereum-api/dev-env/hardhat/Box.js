// 1.  Import the `buildModule` function from the Hardhat Ignition module.
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

// 2. Export a module using `buildModule`.
module.exports = buildModule("BoxModule", (m) => {
  
  // 3. Use the `getAccount` method to select the deployer account.
  const deployer = m.getAccount(0);

  // 4. Specify custom gas price and gas limit settings for the deployment.
  const customGasPrice = 50000000000n;
  const customGasLimit = 1000000; 

  // 5. Deploy the `Box` contract using the selected deployer account and custom gas settings.
  const box = m.contract("Box", [], {
    from: deployer, 
    gasPrice: customGasPrice,
    gasLimit: customGasLimit,
  });

  // 6. Return an object from the module including references to deployed contracts. This makes the deployed `Box` contract accessible for interaction in tests and scripts.
  return { box };
});