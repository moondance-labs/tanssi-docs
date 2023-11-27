---
title: Using Subsquid to Index Your ContainerChain
description: Learn how to use Subsquid, a query node framework that can index both Substrate and EVM data, to process blockchain data for your Tanssi ContainerChain.
---

# Using Subsquid to Index Your ContainerChain

## Introduction {: #introduction }

[Subsquid](https://subsquid.io){target=_blank} is a data network that allows rapid and cost-efficient retrieval of blockchain data from 100+ chains using Subsquid’s decentralized data lake and open-source SDK. In very simple terms, Subsquid can be thought of as an ETL (extract, transform, and load) tool with a [GraphQL](https://graphql.org/){target=_blank} server included. It enables comprehensive filtering, pagination, and even full-text search capabilities.

Subsquid has native and full support for both EVM and Substrate data. Subsquid offers a Substrate Archive and Processor and an EVM Archive and Processor. The Substrate Archive and Processor can be used to index both Substrate and EVM data. This allows developers to extract on-chain data from any Tanssi ContainerChain and process EVM logs as well as Substrate entities (events, extrinsics, and storage items) in one single project and serve the resulting data with one single GraphQL endpoint. If you exclusively want to index EVM data, it is recommended to use the EVM Archive and Processor.

This tutorial is a step-by-step guide to building a Squid to index EVM data from start to finish. It's recommended that you follow along, taking each step described on your own, but you can also find a [complete version of the Squid built in this tutorial in the tanssiSquid GitHub repository](https://github.com/themacexpert/tanssiSquid){target=_blank}.

## Check Prerequisites {: #check-prerequisites }

To follow along with this tutorial, you'll need to have:

- [Docker installed](https://docs.docker.com/get-docker/){target=_blank}
- [Docker Compose installed](https://docs.docker.com/compose/install/){target=_blank}
- An empty Hardhat project. For step-by-step instructions, please refer to the [Creating a Hardhat Project](/builders/interact/ethereum-api/dev-env/hardhat/#creating-a-hardhat-project){target=_blank} section of our Hardhat documentation page
- An [ERC-20 token deployed](#deploy-an-erc20-with-hardhat) to your ContainerChain, unless you're using the ERC-20 token provided on the demo EVM ContainerChain

--8<-- 'text/common/general-js-tutorial-check.md'

## Deploy an ERC-20 with Hardhat {: #deploy-an-erc20-with-hardhat }

Before we can index anything with Subsquid we need to make sure we have something to index! This section will walk through deploying an ERC-20 token to your ContainerChain so you can get started indexing it. However, you can feel free to skip to [Create a Subsquid Project](#create-a-subsquid-project) if either of the two scenarios apply:

- You have already deployed an ERC-20 token to your ContainerChain (and made several transfers)
- You would prefer to use an existing ERC-20 token deployed to the demo EVM ContainerChain (of which there are already several transfer events)

If you'd like to use an existing ERC-20 token on the demo EVM ContainerChain, you can use the below `MyTok.sol` contract. The hashes of the token transfers are provided as well to assist with any debugging.

|       Variable        |                                                                                                                    Value                                                                                                                    |
| :-------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|   Contract Address    |                   [0x8303ee17cacdde416077677bac40d6cac2c452e6](https://tanssi-evmexplorer.netlify.app/address/0x8303ee17cacdde416077677bac40d6cac2c452e6/669145?network=Dancebox%20EVM%20ContainerChain){target=_blank}                    |
| Transfer to Baltathar | [0x6a60a35fb594777b355da1f3922a9fcd86d11b11aa32ed6d8f361a3ed22ed373](https://tanssi-evmexplorer.netlify.app/tx/0x6a60a35fb594777b355da1f3922a9fcd86d11b11aa32ed6d8f361a3ed22ed373?network=Dancebox%20EVM%20ContainerChain){target=_blank}  |
| Transfer to Charleth  | [0x51d95ffa57899a03016b6748c7a25a7e205a7cdc916123bcd09cd47432ceb623](https://tanssi-evmexplorer.netlify.app/tx/0x51d95ffa57899a03016b6748c7a25a7e205a7cdc916123bcd09cd47432ceb623?network=Dancebox%20EVM%20ContainerChain){target=_blank}  |
|  Transfer to Dorothy  | [ 0x0569c28797b3b5dae555d01a0354444050cad282db34550205ba6ba37592cab1](https://tanssi-evmexplorer.netlify.app/tx/0x0569c28797b3b5dae555d01a0354444050cad282db34550205ba6ba37592cab1?network=Dancebox%20EVM%20ContainerChain){target=_blank} |
|   Transfer to Ethan   | [ 0x1d01484f7306c9e2e5feb225e78096ee26081a1071709519902d46b5568314d2](https://tanssi-evmexplorer.netlify.app/tx/0x1d01484f7306c9e2e5feb225e78096ee26081a1071709519902d46b5568314d2?network=Dancebox%20EVM%20ContainerChain){target=_blank} |

In this section we'll show you how to deploy an ERC-20 to your EVM Container Chain and we'll write a quick script to fire off a series of transfers that will be picked up by our Subsquid indexer. Ensure that you have initialized an empty Hardhat project via the instructions in the [Creating a Hardhat Project](/builders/interact/ethereum-api/dev-env/hardhat/#creating-a-hardhat-project){target=_blank} section of our Hardhat documentation page.

Before we dive into creating our project, let's install a couple of dependencies that we'll need: the [Hardhat Ethers plugin](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-ethers){target=_blank} and [OpenZeppelin contracts](https://docs.openzeppelin.com/contracts/4.x/){target=_blank}. The Hardhat Ethers plugin provides a convenient way to use the [Ethers](/builders/build/eth-api/libraries/ethersjs){target=_blank} library to interact with the network. We'll use OpenZeppelin's base ERC-20 implementation to create an ERC-20. To install both of these dependencies, you can run:

=== "npm"

    ```bash
    npm install @nomicfoundation/hardhat-ethers ethers @openzeppelin/contracts
    ```

=== "yarn"

    ```bash
    yarn add @nomicfoundation/hardhat-ethers ethers @openzeppelin/contracts
    ```

Now we can edit `hardhat.config.js` to include the following network and account configurations for our ContainerChain. You can replace the demo EVM ContainerChain values with the respective parameters for your own EVM ContainerChain which can be found at [apps.tanssi.network](https://apps.tanssi.network/){target=_blank}.

???+ code "hardhat.config.js"

    ```js
    --8<-- 'code/tutorials/subsquid/hardhat-config.js'
    ```

!!! remember
    You should never store your private keys in a JavaScript or Python file. It is done in this tutorial for ease of demonstration only. You should always manage your private keys with a designated secret manager or similar service.

### Create an ERC-20 Contract {: #create-an-erc-20-contract }

For the purposes of this tutorial, we'll be creating a simple ERC-20 contract. We'll rely on OpenZeppelin's ERC-20 base implementation. We'll start by creating a file for the contract and naming it `MyTok.sol`:

```bash
mkdir -p contracts && touch contracts/MyTok.sol
```

Now we can edit the `MyTok.sol` file to include the following contract, which will mint an initial supply of MYTOKs and allow only the owner of the contract to mint additional tokens:

???+ code "MyTok.sol"

    ```solidity
    --8<-- 'code/tutorials/subsquid/MyTok.sol'
    ```

### Deploy an ERC-20 Contract {: #deploy-erc-20-contract }

Now that we have our contract set up, we can compile and deploy our contract.

To compile the contract, you can run:

```bash
npx hardhat compile
```

![Compile contracts using Hardhat](/images/builders/tutorials/subsquid/subsquid-1.png)

This command will compile our contract and generate an `artifacts` directory containing the ABI of the contract.

To deploy our contract, we'll need to create a deployment script that deploys our ERC-20 contract and mints an initial supply of MYTOKs. We'll use Alith's account to deploy the contract, and we'll specify the initial supply to be 1000 MYTOK. The initial supply will be minted and sent to the contract owner, which is Alith.

Let's take the following steps to deploy our contract:

1. Create a directory and file for our script:

    ```bash
    mkdir -p scripts && touch scripts/deploy.js
    ```

2. In the `deploy.js` file, go ahead and add the following script:

    ???+ code "deploy.js"

        ```ts
        --8<-- 'code/tutorials/subsquid/deploy.js'
        ```

3. Run the script using the `dev` network configurations we set up in the `hardhat.config.js` file:

    ```bash
    npx hardhat run scripts/deploy.js --network demo
    ```

The address of the deployed contract should be printed to the terminal. Save the address, as we'll need it to interact with the contract in the following section.

### Transfer ERC-20s {: #transfer-erc-20s }

Since we'll be indexing `Transfer` events for our ERC-20, we'll need to send a few transactions that transfer some tokens from Alith's account to our other test accounts. We'll do this by creating a simple script that transfers 10 MYTOKs to Baltathar, Charleth, Dorothy, and Ethan. We'll take the following steps:

Create a new file script to send transactions:

```bash
touch scripts/transactions.js
```

In the `transactions.js` file, add the following script and insert the contract address of your deployed MyTok contract (output in the console in the prior step):

???+ code "transactions.js"

    ```ts
    --8<-- 'code/tutorials/subsquid/transactions.js'
    ```

Run the script to send the transactions:

```bash
npx hardhat run scripts/transactions.js --network demo
```

As each transaction is sent, you'll see a log printed to the terminal.

![Send transactions using Hardhat](/images/builders/tutorials/subsquid/subsquid-2.png)

Now we can move on to creating our Squid to index the data on our local development node.

## Create a Subsquid Project {: #create-a-subsquid-project }

Now we're going to create our Subquid project. First, we'll need to install the [Subsquid CLI](https://docs.subsquid.io/squid-cli/){target=_blank}:

```bash
npm i -g @subsquid/cli@latest
```

To verify successful installation, you can run:

```bash
sqd --version
```

Now we'll be able to use the `sqd` command to interact with our Squid project. To create our project, we're going to use the `--template` (`-t`) flag, which will create a project from a template. We'll be using the EVM Squid template, which is a starter project for indexing EVM chains.

You can run the following command to create an EVM Squid named `tanssi-squid`:

```bash
sqd init tanssi-squid --template evm
```

This will create a Squid with all of the necessary dependencies. You can go ahead and install the dependencies:

```bash
cd tanssi-squid && npm ci
```

Now that we have a starting point for our project, we'll need to configure our project to index ERC-20 `Transfer` events taking place on our Tanssi ContainerChain.

##  Set Up the Indexer for ERC-20 Transfers {: #set-up-the-indexer-for-erc-20-transfers}

In order to index ERC-20 transfers, we'll need to take a series of actions:

1. Define the database schema and generate the entity classes
2. Use the `ERC20` contract's ABI to generate TypeScript interface classes
3. Configure the processor by specifying exactly what data to ingest
4. Transform the data and insert it into a TypeORM database in `main.ts`
5. Run the indexer and query the squid

As mentioned, we'll first need to define the database schema for the transfer data. To do so, we'll edit the `schema.graphql` file, which is located in the root directory, and create a `Transfer` entity and `Account` entity. You can copy and paste the below schema, ensuring that any existing schema is first removed.

???+ code "schema.graphql"

    ```graphql
    --8<-- 'code/tutorials/subsquid/schema.graphql'
    ```

Now we can generate the entity classes from the schema, which we'll use when we process the transfer data. This will create new classes for each entity in the `src/model/generated` directory.

```bash
sqd codegen
```

In the next step, we'll use the ERC-20 ABI to automatically generate TypeScript interface classes. Below is a generic ERC-20 standard ABI. Copy and paste it into a file named `erc20.json` in the `abi` folder at the root level of the project.

??? code "ERC-20 ABI"

    ```json
    --8<-- 'code/tutorials/subsquid/erc20.json'
    ```

Next, we can use our contract's ABI to generate TypeScript interface classes. We can do this by running:

```bash
sqd typegen
```

![Run Subsquid commands](/images/builders/tutorials/subsquid/subsquid-3.png)

This will generate the related TypeScript interface classes in the `src/abi/erc20.ts` file. For this tutorial, we'll be accessing the `events` specifically.

### Configure the Processor {: #configure-the-processor}

The `processor.ts` file tells Subsquid exactly what data you'd like to ingest. Transforming that data into the exact desired format will take place at a later step. In `processor.ts`, we'll need to indicate a data source, a contract address, the event(s) to index, and a block range.

Open up the `src` folder and head to the `processor.ts` file. First, we need to tell the Subsquid processor which contract we're interested in. Create a constant for the address in the following manner:

```ts
export const CONTRACT_ADDRESS = 'INSERT_CONTRACT_ADDRESS'.toLowerCase();
```

The `.toLowerCase()` is critical because the Subsquid processor is case-sensitive, and some block explorers format contract addresses with capitalization. Next, you'll see the line `export const processor = new EvmBatchProcessor()`, followed by `.setDataSource`. We'll need to make a few changes here. Subsquid has [available archives for many chains](https://docs.subsquid.io/evm-indexing/supported-networks/){target=_blank} that can speed up the data retrieval process, but it's unlikely your ContainerChain has a hosted archive already. But not to worry, Subsquid can easily get the data it needs via your ContainerChain's RPC URL. Go ahead and comment out or delete the archive line. Once done, your code should look similar to the below:

```ts
.setDataSource({
  chain: {
    url: assertNotNull(
      'https://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network'
    ),
    rateLimit: 300,
  },
})
```

The Squid template comes with a variable for your RPC URL defined in your `.env` file. You can replace that with the RPC URL for your ContainerChain. For demonstration purposes, the RPC URL for the demo EVM ContainerChain is hardcoded directly, as shown above. If you're setting the RPC URL in your `.env`, the respective line will look like this:

```text
RPC_ENDPOINT={{ networks.dancebox.rpc_url }}
```

Now, let's define the event that we want to index by adding the following:

```ts
.addLog({
  address: [contractAddress],
  topic0: [erc20.events.Transfer.topic],
  transaction: true,
})
```

The `Transfer` event is defined in `erc20.ts`, which was auto-generated when `sqd typegen` was run. The import `import * as erc20 from './abi/erc20'` is already included as part of the Squid EVM template.

Block range is an important value to modify to narrow the scope of the blocks you're indexing. For example, if you launched your ERC-20 at block `650000`, there is no need to query the chain before that block for transfer events. Setting an accurate block range will improve the performance of your indexer. You can set the earliest block to begin indexing in the following manner:

```ts
.setBlockRange({from: 632400,})
```

The chosen start block here corresponds to the relevant block to begin indexing on the demo EVM ContainerChain, but you should change it to one relevant to your ContainerChain and indexer project.

Change the `setFields` section to specify the following data for our processor to ingest:

```ts
.setFields({
  log: {
    topics: true,
    data: true,
  },
  transaction: {
    hash: true,
  },
})
```

We also need to add the following imports to our `processor.ts` file:

```ts
import { Store } from '@subsquid/typeorm-store';
import * as erc20 from './abi/erc20';
```

Once you've completed the prior steps, your `processor.ts` file should look similar to this:

???+ code "processor.ts"

    ```ts
    --8<-- 'code/tutorials/subsquid/processor.ts'
    ```

### Transform and Save the Data {: #transform-and-save-the-data}

While `processor.ts` determines the data being consumed, `main.ts` determines the bulk of actions related to processing and transforming that data. In the simplest terms, we are processing the data that was ingested via the Subsquid processor and inserting the desired pieces into a TypeORM database. For more detailed information on how Subsquid works, be sure to check out the [Subsquid docs on Developing a Squid](https://docs.subsquid.io/basics/squid-development/){target=_blank}.

Our `main.ts` file is going to scan through each processed block for the `Transfer` event and decode the transfer details, including the sender, receiver, and amount. The script also fetches account details for involved addresses and creates transfer objects with the extracted data. The script then inserts these records into a TypeORM database, enabling them to be easily queried. Let's break down the code that comprises `main.ts` in order:

1. The job of `main.ts` is to run the processor and refine the collected data. In `processor.run`, the processor will iterate through all selected blocks and look for `Transfer` event logs. Whenever it finds a `Transfer` event, it's going to store it in an array of transfer events where it awaits further processing

2. The `transferEvent` interface is the type of structure that stores the data extracted from the event logs

3. `getTransfer` is a helper function that extracts and decodes ERC-20 `Transfer` event data from a log entry. It constructs and returns a `TransferEvent` object, which includes details such as the transaction ID, block number, sender and receiver addresses, and the amount transferred. `getTransfer` is called at the time of storing the relevant transfer events into the array of transfers

4. `processTransfers` enriches the transfer data and then inserts these records into a TypeORM database using the `ctx.store` methods. The account model, while not strictly necessary, allows us to introduce another entity in the schema to demonstrate working with multiple entities in your Squid

5. `getAccount` is a helper function that manages the retrieval and creation of account objects. Given an account ID and a map of existing accounts, it returns the corresponding account object. If the account doesn't exist in the map, it creates a new one, adds it to the map, and then returns it

We'll demo a sample query in a later section. You can copy and paste the below code into your `main.ts` file:

???+ code "main.ts"

    ```ts
    --8<-- 'code/tutorials/subsquid/main.ts'
    ```

Now we've taken all of the steps necessary and are ready to run our indexer!

### Run the Indexer {: #run-the-indexer }

To run our indexer, we're going to run a series of `sqd` commands:


Build our project:

   ```bash
   sqd build
   ```

Launch the database:

   ```bash
   sqd up
   ```

Remove the database migration file that comes with the EVM template and generate a new one for our new database schema:

   ```bash
   sqd migration:generate
   ```

   ```bash
   sqd migration:apply
   ```
Launch the processor:

   ```bash
   sqd process
   ```

In your terminal, you should see your indexer starting to process blocks!

![Get Squid running](/images/builders/tutorials/subsquid/subsquid-4.png)

## Query Your Squid {: #query-your-squid }

To query your squid, open up a new terminal window within your project and run the following command:

```bash
sqd serve
```

And that's it! You can now run queries against your Squid on the GraphQL playground at [http://localhost:4350/graphql](http://localhost:4350/graphql){target=_blank}. Try crafting your own GraphQL query, or use the below one:

???+ code "Example query"

    ```ts
    --8<-- 'code/tutorials/subsquid/sample-query.graphql'
    ```

![Running queries in GraphQL playground](/images/builders/tutorials/subsquid/subsquid-5.png)

## Debug Your Squid {: #debug-your-squid }

It may seem tricky at first to debug errors when building your Squid, but fortunately, there are several techniques you can use to streamline this process. First and foremost, if you're facing errors with your Squid, you should enable debug mode in your `.env` file by uncommenting the debug mode line. This will trigger much more verbose logging and will help you locate the source of the error.

```text
# Uncommenting the below line enables debug mode
SQD_DEBUG=*
```

You can also add logging statements directly to your `main.ts` file to indicate specific parameters like block height and more. For example, see this version of `main.ts`, which has been enhanced with detailed logging:

??? code "main.ts"

    ```ts
    --8<-- 'code/tutorials/subsquid/main-with-logging.ts'
    ```

See the [Subsquid guide to logging](https://docs.subsquid.io/basics/logging/){target=_blank} for more information on debug mode.

### Common Errors {: #common-errors }

Below are some common errors you may face when building a project and how you can solve them.

```text
Error response from daemon: driver failed programming external connectivity on endpoint my-awesome-squid-db-1
(49df671a7b0531abbb5dc5d2a4a3f5dc7e7505af89bf0ad1e5480bd1cdc61052):
Bind for 0.0.0.0:23798 failed: port is already allocated
```

This error indicates that you have another instance of Subsquid running somewhere else. You can stop that gracefully with the command `sqd down` or by pressing the **Stop** button next to the container in Docker Desktop.

```text
Error: connect ECONNREFUSED 127.0.0.1:23798
     at createConnectionError (node:net:1634:14)
     at afterConnectMultiple (node:net:1664:40) {
     errno: -61,code: 'ECONNREFUSED',syscall: 'connect',
     address: '127.0.0.1',port: 23798}]}
```

To resolve this, run `sqd up` before you run `sqd migration:generate`

Is your Squid error-free, yet you aren't seeing any transfers detected? Make sure your log events are consistent and identical to the ones your processor is looking for. Your contract address also needs to be lowercase, which you can be assured of by defining it as follows:

```text
export const contractAddress = '0x37822de108AFFdd5cDCFDaAa2E32756Da284DB85'.toLowerCase();
```

--8<-- 'text/disclaimers/third-party-content.md'
