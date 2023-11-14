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
// 1. Import the Ethers plugin required to interact with the contract
require('@nomicfoundation/hardhat-ethers');

// 2. Add your private key that is funded with tokens of your ContainerChain
// This is for example purposes only - **never store your private keys in a JavaScript file**
const privateKey = 'INSERT_PRIVATE_KEY'; 

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  // 3. Specify the Solidity version
  solidity: '0.8.20',
  networks: {
    // 4. Add the network specification for your Tanssi EVM ContainerChain
    demo: {
      url: '{{ networks.dancebox.rpc_url }}',
      chainId: 5678, // Fill in the EVM ChainID for your ContainerChain
      accounts: [privateKey]
    },
  },
};
```  

### Create an ERC-20 Contract {: #create-an-erc-20-contract }

For the purposes of this tutorial, we'll be creating a simple ERC-20 contract. We'll rely on OpenZeppelin's ERC-20 base implementation. We'll start by creating a file for the contract and naming it `MyTok.sol`:

```bash
mkdir -p contracts && touch contracts/MyTok.sol
```

Now we can edit the `MyTok.sol` file to include the following contract, which will mint an initial supply of MYTOKs and allow only the owner of the contract to mint additional tokens:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyTok is ERC20, Ownable {
    constructor(address initialOwner)
        ERC20("MyToken", "MTK")
        Ownable(initialOwner)
    {
        _mint(msg.sender, 50000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
```

### Deploy an ERC-20 Contract {: #deploy-erc-20-contract }

Now that we have our contract set up, we can compile and deploy our contract.

To compile the contract, you can run:

```bash
npx hardhat compile
```

![Compile contracts using Hardhat](/images/tutorials/integrations/local-subsquid/local-squid-2.png)

This command will compile our contract and generate an `artifacts` directory containing the ABI of the contract.

To deploy our contract, we'll need to create a deployment script that deploys our ERC-20 contract and mints an initial supply of MYTOKs. We'll use Alith's account to deploy the contract, and we'll specify the initial supply to be 1000 MYTOK. The initial supply will be minted and sent to the contract owner, which is Alith.

Let's take the following steps to deploy our contract:

1. Create a directory and file for our script:

    ```bash
    mkdir -p scripts && touch scripts/deploy.js
    ```

2. In the `deploy.js` file, go ahead and add the following script:

```js
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require('hardhat');
require('@nomicfoundation/hardhat-ethers');

async function main() {
  // Get ERC-20 Contract
  const MyTok = await hre.ethers.getContractFactory('MyTok');

  // Define custom gas price and gas limit
  // Gas price is typically specified in 'wei' and gas limit is just a number
  // You can use ethers.js utility functions to convert from gwei or ether if needed
  const customGasPrice = 50000000000; // example for 50 gwei
  const customGasLimit = 5000000; // example gas limit

  // Deploy the contract providing the address of the owner as a param
  const myTok = await MyTok.deploy('0x3B939FeaD1557C741Ff06492FD0127bd287A421e', {
  gasPrice: customGasPrice,
  gasLimit: customGasLimit,
} );

  // Wait for the Deployment
  await myTok.waitForDeployment();

  console.log(`Contract deployed to ${myTok.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

```

3. Run the script using the `dev` network configurations we set up in the `hardhat.config.js` file:

    ```bash
    npx hardhat run scripts/deploy.js --network demo
    ```

The address of the deployed contract should be printed to the terminal. Save the address, as we'll need it to interact with the contract in the following section.

### Transfer ERC-20s {: #transfer-erc-20s }

Since we'll be indexing `Transfer` events for our ERC-20, we'll need to send a few transactions that transfer some tokens from Alith's account to our other test accounts. We'll do this by creating a simple script that transfers 10 MYTOKs to Baltathar, Charleth, Dorothy, and Ethan. We'll take the following steps:

1. Create a new file script to send transactions:

    ```bash
    touch scripts/transactions.js
    ```

2. In the `transactions.js` file, add the following script. You'll need to insert the contract address of your deployed MyTok contract that was output in the console in the prior step.

```js
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
```
3. Run the script to send the transactions:

```bash
npx hardhat run scripts/transactions.js --network demo
```

!!! remember
    The private keys for the demo accounts like Baltathar specified above are publicly known. We are sending valueluess MyTokens to these accounts, but if you send real funds to these accounts you'll lose them.

As each transaction is sent, you'll see a log printed to the terminal.

![Send transactions using Hardhat](/images/tutorials/integrations/local-subsquid/local-squid-4.png)

Now we can move on to creating our Squid to index the data on our local development node.

## Create a Subsquid Project {: #create-subsquid-project }

Now we're going to create our Subquid project. First, we'll need to install the [Subsquid CLI](https://docs.subsquid.io/squid-cli/){target=_blank}:

```bash
npm i -g @subsquid/cli@latest
```

To verify successful installation, you can run

```bash
sqd --version
```

Now we'll be able to use the `sqd` command to interact with our Squid project. To create our project, we're going to use the `-t` flag, which will create a project from a template. We'll be using the EVM Squid template, which is a starter project for indexing EVM chains.

You can run the following command to create an EVM Squid named `tanssi-squid`:

```bash
sqd init tanssi-squid --template evm
```

This will create a Squid with all of the necessary dependencies. You can go ahead and install the dependencies:

```bash
npm ci
```

Now that we have a starting point for our project, we'll need to configure our project to index ERC-20 `Transfer` events taking place on our Tanssi ContainerChain.

### Configure the Processor {: #configure-the-processor}  

The `processor.ts` file tells Subsquid exactly what data you'd like to ingest. Transforming that data into the exact desired format will take place at a later step. In `processor.ts`, we'll need to indicate a data source, contract address, the event(s) to index, and a block range. 

Open up the `src` folder and head to the `processor.ts` file. You'll see the line `export const processor = new EvmBatchProcessor()` followed by `.setDataSource`. We'll need to make a few changes here. Subsquid has [available archives for many chains](https://docs.subsquid.io/evm-indexing/supported-networks/){target=_blank} that can speed up the data retrieval process, but it's unlikely your containerchain has a hosted archive already. But not to worry, Subsquid can easily get the data it needs via your ContainerChain's RPC Url. Go ahead and comment out or delete the archive line. Once done, your code should look similar to the below:

```js
    .setDataSource({
        // Lookup archive by the network name in Subsquid registry
        // See https://docs.subsquid.io/evm-indexing/supported-networks/
        chain: {
            url: assertNotNull(process.env.RPC_ENDPOINT),
            rateLimit: 300
        }
    })
```

You'll need to provide the RPC URL for your ContainerChain in your `.env` file. Make sure that any existing RPC URLs are removed. If you're using the Demo EVM ContainerChain, the respective line in your .env file will look like this: 

```
RPC_ENDPOINT='{{ networks.dancebox.rpc_url }}'
```

Of course, we need to tell the Subsquid processor which contract we're interested in. Create a constant for the address in the following manner: 

```
export const CONTRACT_ADDRESS = 'INSERT_CONTRACT_ADDRESS'.toLowerCase();
```

The `.toLowerCase()` is critical because the Subsquid processor is case sensitive, and some block explorers format contract addresses with capitalization. Now, let's define the event that we want to index by adding the following 

```
    .addLog({
        address: [CONTRACT_ADDRESS],
        topic0: [erc20.events.Transfer.topic],
        transaction: true,
    })
```

Subsquid can fetch data about our the `Transfer` event from 


Block range is an important value to modify to narrow the scope of the blocks you're indexing. For example, if you launched your ERC-20 at block `650000`, there is no need to query the chain before that block for transfer events. Setting an accurate block range will improve the performance of your indexer. You can set the earliest block to begin indexing in the following manner: 

```
    .setBlockRange({from: 632400,})
```


### Index ERC-20 Transfers {: #index-erc-20-transfer events}

In order to index ERC-20 transfers, we'll need to take a series of actions:

1. Update the database schema and generate models for the data
2. Use the `MyTok` contract's ABI to generate TypeScript interface classes that will be used by our Squid to index `Transfer` events
3. Configure the processor to process `Transfer` events for the `MyTok` contract from our ContainerChain. Then we'll add logic to process the `Transfer` events and save the processed transfer data

As mentioned, we'll first need to define the database schema for the transfer data. To do so, we'll edit the `schema.graphql` file, which is located in the root directory, and create a `Transfer` entity and `Account` entity.

```graphql
type Account @entity {
  "Account address"
  id: ID!
  transfersFrom: [Transfer!] @derivedFrom(field: "from")
  transfersTo: [Transfer!] @derivedFrom(field: "to")
}

type Transfer @entity {
  id: ID!
  blockNumber: Int!
  timestamp: DateTime!
  txHash: String!
  from: Account!
  to: Account!
  amount: BigInt!
}

```

Now we can generate the entity classes from the schema, which we'll use when we process the transfer data:

```bash
sqd codegen
```

Next, we can tackle the second item on our list and use our contract's ABI to generate TypeScript interface classes. We can do this by running:

```bash
sqd typegen
```

![Run Subsquid commands](/images/tutorials/integrations/local-subsquid/local-squid-6.png)

This will generate the related TypeScript interface classes in the `src/abi/MyTok.ts` file. For this tutorial, we'll be accessing the `events` specifically.

For the third step, we'll start to update the processor. The processor fetches on-chain data from an Archive, transforms the data as specified, and saves the result. We'll tackle each of these items in the `src/processor.ts` file.



To configure our processor, we need to take the following steps:

1. Specify the contract address.
2. Set the data source `chain` to be our local development node and the `archive` to be our local Archive
3. Tell our processor to process EVM logs for our `MyTok` contract and filter the logs for `Transfer` events
4. Add logic to process the transfer data.  We'll iterate over each of the blocks and `Transfer` events associated with our `MyTok` contract, decode them, and save the transfer data to our database

You can replace all of the preexisting content in the `src/processor.ts` file with the following:

```js
import {assertNotNull} from '@subsquid/util-internal'
import {lookupArchive} from '@subsquid/archive-registry'
import {
    BlockHeader,
    DataHandlerContext,
    EvmBatchProcessor,
    EvmBatchProcessorFields,
    Log as _Log,
    Transaction as _Transaction,
} from '@subsquid/evm-processor'
import {Store} from '@subsquid/typeorm-store'
import * as erc20 from './abi/erc20'

// Here you'll need to import the contract 
export const CONTRACT_ADDRESS = 'INSERT-CONTRACT-ADDRESS'.toLowerCase();

export const processor = new EvmBatchProcessor()
        .setDataSource({
        chain: {
            url: assertNotNull(process.env.RPC_ENDPOINT),
            rateLimit: 300
        }
    })
    .setFinalityConfirmation(10)
    .setFields({
        log: {
            topics: true,
            data: true,
        },
        transaction: {
            hash: true,
        },
    })
    .addLog({
        address: [CONTRACT_ADDRESS],
        topic0: [erc20.events.Transfer.topic],
        transaction: true,
    })
    .setBlockRange({
        from: 632400,
    })

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>
```

Now we've taken all of the steps necessary and are ready to run our indexer!

### Run the Indexer {: #run-indexer }

To run our indexer, we're going to run a series of `sqd` commands:

1. Build our project

    ```bash
    sqd build
    ```

2. Launch the database:

    ```bash
    sqd up
    ```

3. Remove the database migration file that comes with the EVM template and generate a new one for our new database schema:

    ```bash
    sqd migration:clean
    sqd migration:generate
    ```

4. Launch the processor:

    ```bash
    sqd process
    ```

!!! note
    You can review the `commands.json` file to see what each `sqd` command does under the hood.

In your terminal, you should see your indexer starting to process blocks!

![Spin up a Subsquid indexer](/images/tutorials/integrations/local-subsquid/local-squid-7.png)


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