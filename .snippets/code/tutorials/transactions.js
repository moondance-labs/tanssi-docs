// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require('hardhat');

async function main() {
  // Get Contract ABI
  const MyTok = await hre.ethers.getContractFactory('MyTok');

  // Define custom gas price and gas limit
  // Gas price is typically specified in 'wei' and gas limit is just a number
  // You can use ethers.js utility functions to convert from gwei or ether if needed
  const customGasPrice = 50000000000; // example for 50 gwei
  const customGasLimit = 5000000; // example gas limit

  // Plug ABI to Address
  const myTok = await MyTok.attach('INSERT_CONTRACT_ADDRESS');

  const value = 100000000000000000n;

  let tx;
  // Transfer to Baltathar
  tx = await myTok.transfer(
    '0x3Cd0A705a2DC65e5b1E1205896BaA2be8A07c6e0',
    value, {
  gasPrice: customGasPrice,
  gasLimit: customGasLimit,
}
  );
  await tx.wait();
  console.log(`Transfer to Baltathar with TxHash ${tx.hash}`);

  // Transfer to Charleth
  tx = await myTok.transfer(
    '0x798d4Ba9baf0064Ec19eB4F0a1a45785ae9D6DFc',
    value, {
  gasPrice: customGasPrice,
  gasLimit: customGasLimit,
}
  );
  await tx.wait();
  console.log(`Transfer to Charleth with TxHash ${tx.hash}`);

  // Transfer to Dorothy
  tx = await myTok.transfer(
    '0x773539d4Ac0e786233D90A233654ccEE26a613D9',
    value, {
  gasPrice: customGasPrice,
  gasLimit: customGasLimit,
}
  );
  await tx.wait();
  console.log(`Transfer to Dorothy with TxHash ${tx.hash}`);

  // Transfer to Ethan
  tx = await myTok.transfer(
    '0xFf64d3F6efE2317EE2807d223a0Bdc4c0c49dfDB',
    value, {
  gasPrice: customGasPrice,
  gasLimit: customGasLimit,
}
  );
  await tx.wait();
  console.log(`Transfer to Ethan with TxHash ${tx.hash}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});