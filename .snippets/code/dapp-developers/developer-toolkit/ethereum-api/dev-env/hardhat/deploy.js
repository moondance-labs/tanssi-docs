// scripts/deploy.js
async function main() {
  // 1. Get the contract to deploy
  const Box = await ethers.getContractFactory('Box');
  console.log('Deploying Box...');

  // 2. Define custom gas price and gas limit
  // This is a temporary stopgap solution to a bug
  const customGasPrice = 50000000000; // example for 50 gwei
  const customGasLimit = 1000000; // example gas limit

  // 3. Instantiating a new Box smart contract with custom gas settings
  const box = await Box.deploy({
    gasPrice: customGasPrice, 
    gasLimit: customGasLimit,
  });

  // 4. Waiting for the deployment to resolve
  await box.waitForDeployment();

  // 5. Use the contract instance to get the contract address
  console.log('Box deployed to:', box.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });