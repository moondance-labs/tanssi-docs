---
title: Using Subsquid to Index Your ContainerChain
description: Learn how to use Subsquid, a query node framework that can index both Substrate and EVM data, to process blockchain data for your Tanssi ContainerChain. 
---

# Using Subsquid to Index Your ContainerChain

## Introduction {: #introduction }

[Subsquid](https://subsquid.io){target=_blank} is a data network that allows rapid and cost-efficient retrieval of blockchain data from 100+ chains using Subsquid’s decentralized data lake and open-source SDK. In very simple terms, Subsquid can be thought of as an ETL (extract, transform, and load) tool with a GraphQL server included. It enables comprehensive filtering, pagination, and even full-text search capabilities.

Subsquid has native and full support for both EVM and Substrate data. Subsquid offers a Substrate Archive and Processor and an EVM Archive and Processor. The Substrate Archive and Processor can be used to index both Substrate and EVM data. This allows developers to extract on-chain data from any of the Moonbeam networks and process EVM logs as well as Substrate entities (events, extrinsics, and storage items) in one single project and serve the resulting data with one single GraphQL endpoint. If you exclusively want to index EVM data, it is recommended to use the EVM Archive and Processor.

## Checking Prerequisites {: #checking-prerequisites }

To follow along with this tutorial, you'll need to have:

- [Docker installed](https://docs.docker.com/get-docker/){target=_blank}
- [Docker Compose installed](https://docs.docker.com/compose/install/){target=_blank}
- An empty Hardhat project. For step-by-step instructions, please refer to the [Creating a Hardhat Project](/builders/interact/ethereum-api/dev-env/hardhat/#creating-a-hardhat-project){target=_blank} section of our Hardhat documentation page

## Deploying an ERC-20 with Hardhat {: #deploying-an-erc20-with-hardhat }

Before we can index anything with Subsquid we need to make sure we have something to index! In this section we'll show you how to deploy an ERC-20 to your EVM Container Chain and we'll write a quick script to fire off a series of transfers that will be picked up by our Subsquid indexer. 

Ensure that you have initialized an empty hardhat project via the instructions in the [Creating a Hardhat Project](/builders/interact/ethereum-api/dev-env/hardhat/#creating-a-hardhat-project){target=_blank} section of our Hardhat documentation page.

In this section, we'll configure our Hardhat project for the Demo EVM ContainerChain, create an ERC-20 contract, and write scripts to deploy and interact with our contract.

Before we dive into creating our project, let's install a couple of dependencies that we'll need: the [Hardhat Ethers plugin](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-ethers){target=_blank} and [OpenZeppelin contracts](https://docs.openzeppelin.com/contracts/4.x/){target=_blank}. The Hardhat Ethers plugin provides a convenient way to use the [Ethers](/builders/build/eth-api/libraries/ethersjs){target=_blank} library to interact with the network. We'll use OpenZeppelin's base ERC-20 implementation to create an ERC-20. To install both of these dependencies, you can run:

=== "npm"

    ```bash
    npm install @nomicfoundation/hardhat-ethers ethers @openzeppelin/contracts
    ```

=== "yarn"

    ```bash
    yarn add @nomicfoundation/hardhat-ethers ethers @openzeppelin/contracts
    ```

!!! remember
    **You should never store your private keys in a JavaScript or Python file. It is done in this tutorial for ease of demonstration only. You should always manage your private keys with a designated secret manager or similar service.**

Now we can edit `hardhat.config.js` to include the following network and account configurations for our ContainerChain. You can replace the Demo EVM ContainerChain values with the respective parameters for your own EVM ContainerChain which can be found at [apps.tanssi.network](https://apps.tanssi.network/){target=_blank}

```js
require('@nomicfoundation/hardhat-ethers');

const privateKey = 

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  // 3. Specify the Solidity version
  solidity: '0.8.20',
  networks: {
    // 4. Add the network specification for your Tanssi EVM ContainerChain
    dancebox: {
      url: 'https://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network',
      chainId: 5678, // Fill in the EVM ChainID for your ContainerChain
      accounts: [privateKey]
    },
  },
};
```  


## Installing and Running Subsquid {: #installing-and-running-subsquid }

sqd init my-awesome-squid --template evm
npm ci

Open SRC /processor.ts
Comment out archive
Go to .env file and set endpoint for the network. 
sqd up
sqd process

npm install --save-dev hardhat @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers


Hardhat Stuff


set current block range in processor.ts to whatever block you deployed the myTok ERC-20 contract. If you're ensure you can find the current block height at the Tanssi EVM Explorer and work backwards to get an estimate. You're also free to index from 0, but be aware that this will take longer because each block will need to be checked from Genesis. 

Put ABI of ERC-20 in the ABI Folder
Write sqd typegen



## Solving Common Errors

Error response from daemon: driver failed programming external connectivity on endpoint my-awesome-squid-db-1 (49df671a7b0531abbb5dc5d2a4a3f5dc7e7505af89bf0ad1e5480bd1cdc61052): Bind for 0.0.0.0:23798 failed: port is already allocated

You have another instance of subsquid running somewhere else. You can stop that gracefull with the command sqd down or by pressing the Stop button next to the container in Docker Desktop. 


    Error: connect ECONNREFUSED 127.0.0.1:23798
        at createConnectionError (node:net:1634:14)
        at afterConnectMultiple (node:net:1664:40) {
      errno: -61,
      code: 'ECONNREFUSED',
      syscall: 'connect',
      address: '127.0.0.1',
      port: 23798
    }
  ]
}

You need to run sqd up before you run sqd migration:generate


no transfers detected at all?

Make sure your log events are consistent and identical to the ones your processor is looking for. 

Your contract address also needs to match the case: e.g.
export const CONTRACT_ADDRESS = '0x37822de108AFFdd5cDCFDaAa2E32756Da284DB85'.toLowerCase();


Mention how to enable Debug mode by going to .env file and uncommenting the debug mode line.



--8<-- 'text/common/general-js-tutorial-check.md'