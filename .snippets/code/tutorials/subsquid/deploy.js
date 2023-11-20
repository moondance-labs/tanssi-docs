// scripts/deploy.js
const hre = require('hardhat');
require('@nomicfoundation/hardhat-ethers');

async function main() {
  // Get ERC-20 Contract
  const MyTok = await hre.ethers.getContractFactory('MyTok');

  // Define custom gas price and gas limit
  // This is a temporary stopgap solution to a bug
  const customGasPrice = 50000000000; // example for 50 gwei
  const customGasLimit = 5000000; // example gas limit

  // Deploy the contract providing a gas price and gas limit
  const myTok = await MyTok.deploy({
  gasPrice: customGasPrice,
  gasLimit: customGasLimit,
} );

  // Wait for the deployment
  await myTok.waitForDeployment();

  console.log(`Contract deployed to ${myTok.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});