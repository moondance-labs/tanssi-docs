---
title: Deploy Contracts with Hardhat
description: Learn how to use Hardhat, an Ethereum development environment, to compile, deploy, and interact with Solidity smart contracts on your Tanssi EVM appchain.
---

# Using Hardhat to Deploy to Your EVM Appchain

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/1Kbs7dxkjJQ?si=n0ipTN2nbvqISLGu' frameborder='0' allowfullscreen></iframe></div>
<style>.caption { font-family: Open Sans, sans-serif; font-size: 0.9em; color: rgba(170, 170, 170, 1); font-style: italic; letter-spacing: 0px; position: relative;}</style>

## Introduction {: #introduction }

[Hardhat](https://hardhat.org/){target=\_blank} is an Ethereum development environment that helps developers manage and automate the recurring tasks inherent to building smart contracts and dApps. Hardhat can be used with any EVM appchain to build, compile, and deploy smart contracts, thanks to the seamless compatibility of Tanssi EVM appchains.

This guide will cover how to use Hardhat to compile, deploy, and interact with Ethereum smart contracts deployed to the demo Tanssi EVM appchain. This guide can be adapted for your own Tanssi EVM appchain by simply adding the RPC URL of your Tanssi appchain to your EVM Wallet and switching networks to it.

## Checking Prerequisites {: #checking-prerequisites }

For this guide, you'll need to have MetaMask installed and configured to work with your Tanssi EVM appchain. You can follow [this guide to configure MetaMask for Tanssi with the demo EVM appchain](/dapp-developers/developer-toolkit/ethereum-api/wallets/metamask/){target=\_blank}.

## Creating a Hardhat Project {: #creating-a-hardhat-project }

You will need to create a Hardhat project if you don't already have one. You can create one by completing the following steps:

1. Create a directory for your project

    ```sh
    mkdir hardhat && cd hardhat
    ```

2. Initialize the project which will create a `package.json` file

    ```sh
    npm init -y
    ```

3. Install Hardhat

    ```sh
    npm install hardhat
    ```

4. Create a project

    ```sh
    npx hardhat init
    ```

    !!! note
        `npx` is used to run executables installed locally in your project. Although Hardhat can be installed globally, it is recommended to install it locally in each project so that you can control the version on a project-by-project basis.

5. A menu will appear which will allow you to create a new project or use a sample project. For this example, you can choose **Create an empty hardhat.config.js**

![Hardhat Create Project](/images/dapp-developers/developer-toolkit/ethereum-api/dev-environments/hardhat/hardhat-1.webp)

This will create a Hardhat config file (`hardhat.config.js`) in your project directory.

Once you have your Hardhat project, you can also install the [Ethers plugin](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-ethers){target=\_blank}. This provides a convenient way to use the [Ethers.js](/dapp-developers/developer-toolkit/ethereum-api/libraries/ethersjs/){target=\_blank} library to interact with the network. To install it, run the following command:

```sh
npm install @nomicfoundation/hardhat-ethers ethers@6
```

Additionally, you'll need to install the `hardhat-ignition-ethers` plugin to enable deployment of smart contracts with Hardhat Ignition. You can install it with the following command:

```sh
npm install --save-dev @nomicfoundation/hardhat-ignition-ethers
```

## The Contract File {: #the-contract-file }

With your empty project created, next, you are going to create a `contracts` directory. You can do so by running the following command:

```sh
mkdir contracts && cd contracts
```

The smart contract that you'll deploy as an example will be called `Box`, it will let you store a value that can be retrieved later. In the `contracts` directory, you can create the `Box.sol` file:

```sh
touch Box.sol
```

Open the file and add the following contract to it:

```solidity
// contracts/Box.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract Box {
    uint256 private value;

    // Emitted when the stored value changes
    event ValueChanged(uint256 newValue);

    // Stores a new value in the contract
    function store(uint256 newValue) public {
        value = newValue;
        emit ValueChanged(newValue);
    }

    // Reads the last stored value
    function retrieve() public view returns (uint256) {
        return value;
    }
}
```

## The Hardhat Configuration File {: #hardhat-configuration-file }

Before you can deploy the contract to your Tanssi appchain, you'll need to modify the Hardhat configuration file and create a secure file to store your private key in.

You can modify the `hardhat.config.js` file to use either the Tanssi Dancebox demo EVM appchain or your own Tanssi appchain:

```js
// 1. Import the Ethers and Hardhat Ignition plugins required to interact with the contract
require('@nomicfoundation/hardhat-ethers');
require('@nomicfoundation/hardhat-ignition-ethers');

// 2. Add your private key that is funded with tokens of your Tanssi appchain
// This is for example purposes only - **never store your private keys in a JavaScript file**
const privateKey = 'INSERT_PRIVATE_KEY';

module.exports = {
  // 3. Specify the Solidity version
  solidity: '0.8.1',
  networks: {
    // 4. Add the network specification for your Tanssi EVM appchain
    dancebox: {
      url: '{{ networks.dancebox.rpc_url }}',
      chainId: {{ networks.dancebox.chain_id }}, // Fill in the EVM ChainID for your Tanssi appchain
      accounts: [privateKey]
    }
  }
};
```

Congratulations! You are now ready for deployment!

## Compiling Solidity {: #compiling-solidity }

To compile the contract you can simply run:

```sh
npx hardhat compile
```

--8<-- 'code/dapp-developers/developer-toolkit/ethereum-api/dev-env/hardhat/terminal/compile.md'

After compilation, an `artifacts` directory is created: it holds the bytecode and metadata of the contract, which are `.json` files. It’s a good idea to add this directory to your `.gitignore`.

## Deploying the Contract {: #deploying-the-contract }

To deploy the contract, you'll use Hardhat Ignition, a declarative framework for deploying smart contracts. Hardhat Ignition is designed to make it easy to manage recurring tasks surrounding smart contract  deployment and testing. For more information about Hardhat Ignition and its architecture, be sure to check out the [Hardhat Ignition docs](https://hardhat.org/ignition/docs/getting-started#overview){target=\_blank}. 

To set up the proper file structure for your Ignition module, create a folder named `ignition` and a subdirectory called `modules`.  Then add a new file to it called `Box.js`. You can take all three of these steps with the following command:

```sh
mkdir ignition && mkdir ignition/modules && touch ignition/modules/Box.js
```

Next, you can write your Hardhat Ignition module. To get started, take the following steps:

1. Import the `buildModule` function from the Hardhat Ignition module
2. Export a module using `buildModule`
3. Use the `getAccount` method to select the deployer account
4. Deploy the `Box` contract
5. Return an object from the module. This makes the `Box` contract accessible for interaction in Hardhat tests and scripts

```js
--8<-- 'code/dapp-developers/developer-toolkit/ethereum-api/dev-env/hardhat/Box.js'
```

To run the script and deploy the `Box.sol` contract, use the following command, which requires you to specify the network name as defined in your `hardhat.config.js`. If you don't specify a network, hardhat will deploy the contract to a local hardhat network by default. 

```sh
npx hardhat ignition deploy ./ignition/modules/Box.js --network dancebox
```

You'll be prompted to confirm the network you wish to deploy to. After a few seconds after you confirm, the contract is deployed, and you'll see the contract address in the terminal. If you're deploying to another Tanssi appchain, make sure that you specify the correct network. The network name needs to match how it's defined in `hardhat.config.js`.

After a few seconds, the contract is deployed, and you should see the address in the terminal.

--8<-- 'code/dapp-developers/developer-toolkit/ethereum-api/dev-env/hardhat/terminal/deploy.md'

Congratulations, your contract is live! Save the address, as you will use it to interact with this contract instance in the next step.

## Interacting with the Contract {: #interacting-with-the-contract }

To interact with your newly deployed contract on your Tanssi appchain, you can launch the Hardhat `console` by running:

```sh
npx hardhat console --network dancebox
```

Next, you can take the following steps, entering one line at a time:

1. Create a local instance of the `Box.sol` contract

    ```js
    const Box = await ethers.getContractFactory('Box');
    ```

2. Connect the local instance to the deployed contract, using the address of the contract

    ```js
    const box = await Box.attach('0xa84caB60db6541573a091e5C622fB79e175E17be');
    ```

3. Interact with the attached contract. For this example, you can call the `store` method and store a simple value

    ```js
    await box.store(5);
    ```

The transaction will be signed by your EVM account and be broadcast to the network. The output should look similar to:

--8<-- 'code/dapp-developers/developer-toolkit/ethereum-api/dev-env/hardhat/terminal/interact.md'

Notice your address labeled `from`, the address of the contract, and the `data` that is being passed. Now, you can retrieve the value by running:

```js
await box.retrieve();
```

You should see `5` or the value you initially stored.

!!! note
    If you run the retrieve command immediately after storing the value, you may see the old value. Running the retrieval command again after waiting a moment will return the correct value.

Congratulations, you have successfully deployed and interacted with a contract using Hardhat!

--8<-- 'text/_disclaimers/third-party-content.md'
