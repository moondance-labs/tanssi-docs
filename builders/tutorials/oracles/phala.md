---
title: Using Phala for Price Feed Oracles
description: Learn how to use Phala, an off-chain compute network, to access reliable oracle token price feed data on your Tanssi EVM ContainerChain.
---

# Launching Price Feeds with Phala

## Introduction {: #introduction }

[Phala Network](https://phala.network/){target=\_blank} is an off-chain compute network powered by [Secure Enclaves](https://docs.phala.network/developers/advanced-topics/blockchain-infrastructure#the-architecture){target=\_blank} that enables developers to build powerful smart contracts that connect to off-chain components called Phat Contracts. Phat Contracts are designed to enable functionality that surpasses the limitations of traditional smart contracts, such as storage, cost, and compute limitations while retaining trustlessness, verifiability, and permissionlessness. For more information about Phala's architecture, be sure to check out the [Phala docs](https://docs.phala.network/introduction/readme){target=\_blank}.

Phala is not an Oracle network itself; rather, Phala enables a variety of off-chain compute capabilities, such as a decentralized Oracle network. Phala also provides a toolset called [Phala Bricks](https://bricks.phala.network/){target=\_blank} that makes it easy to quickly launch these types of features without having to build them from scratch. 

This tutorial will walk through a demo of [interacting with price feeds](#fetch-price-data) enabled by Phat contracts on the Demo EVM ContainerChain. Next, you'll learn how to [deploy price feeds to your own EVM ContainerChain](#launching-price-feeds-on-your-own-evm-containerchain). Please be advised that the steps shown in this tutorial are for demonstration purposes only - it's highly recommended that you [contact the Phala team directly](https://dashboard.phala.network/){target=\_blank} as they can assist you with launching price feeds on your ContainerChain to ensure the integrity of the deployment process.
 
## A Crash Course on Price Feeds {: #a-crash-course-on-price-feeds }

Before interacting hands-on with price feeds, it's important to understand how price feeds work and how price feed data is accessed by smart contracts. In a standard configuration, each price feed is updated by a decentralized oracle network. Each oracle node is rewarded for publishing the price data to the [aggregator contract](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol){target=\_blank}. 

The aggregator contract receives periodic data updates from the network of oracles and aggregates and stores the data on-chain so that consumers can easily fetch it. However, the information is only updated if a minimum number of responses from oracle nodes are received (during an aggregation round). The end-user can retrieve price feeds with read-only operations via an aggregator interface or via a Consumer interface through the Proxy.

![Price Feed Diagram](/images/builders/tutorials/oracles/phala/phala-1.webp)


## Fetch Price Data {: #fetch-price-data }

There are data feed contracts available for the Demo EVM Container Chain networks to demonstrate the functionality of price feed data powered by Phala phat contracts. Price feeds can be easily deployed to your own EVM ContainerChain by [asking the Phala Team](https://dashboard.phala.network/){target=\_blank}.

The price feeds enabled by Phat Contracts use the same interface as the Chainlink price feeds. The data lives in a series of smart contracts (one per price feed) and can be fetched with the aggregator interface:

???+ code "AggregatorV3Interface.sol"

    ```solidity
    --8<-- 'code/builders/tutorials/oracles/phala/AggregatorV3Interface.sol'
    ```

As seen above in the interface, there are five functions for fetching data: `decimals`, `description`, `version`, `getRoundData`, and `latestRoundData`. For more information about the `AggregatorV3Interface.sol`, see the [Chainlink API Reference](https://docs.chain.link/data-feeds/api-reference){target=\_blank}

### Supported Assets {: #supported-assets }

Currently, there are data feed contracts for [the Demo EVM ContainerChain](/builders/tanssi-network/networks/dancebox/demo-evm-containerchain/) for the following asset  pairs: 


   | Asset & Base Pair  |          Aggregator Contract          |
   |:-----------:|:-----------------------------------------------------:|
   | AAVE to USD | {{ networks.dancebox.oracles.phala.aave_usd }} |
   | BTC to USD  | {{ networks.dancebox.oracles.phala.btc_usd }}  |    
   | CRV to USD  | {{ networks.dancebox.oracles.phala.crv_usd }}  |
   | DAI to USD  | {{ networks.dancebox.oracles.phala.dai_usd }}  |
   | ETH to USD  | {{ networks.dancebox.oracles.phala.eth_usd }}  |
   | USDC to USD | {{ networks.dancebox.oracles.phala.usdc_usd }} |    
   | USDT to USD | {{ networks.dancebox.oracles.phala.usdt_usd }} |

### Interacting with Price Feeds on Dancebox Testnet {: #interacting-with-price feeds-on-dancebox-testnet }

Let's now demonstrate interacting with the price feed contracts on the Demo EVM ContainerChain. These contracts are already deployed on the Demo EVM ContainerChain, so you can interact with them by accessing the aggregator contract corresponding to your desired asset.

For a refresher on setting up Remix to interface with your ContainerChain, see the [Deploy Smart Contracts with Remix](/builders/interact/ethereum-api/dev-env/remix/) guide. Secondly, make sure you have [connected MetaMask](builders/interact/ethereum-api/wallets/metamask/) to the Demo EVM ContainerChain. 

Paste the [aggregator contract](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol){target=\_blank} into a new file in Remix and compile it. 

Then, take the following steps:

1. Head to the **Deploy and Run Transactions** tab
2. Set the **ENVIRONMENT** to **Injected Provider -- MetaMask**
3. Select the `AggregatorV3Interface` contract from the **CONTRACT** dropdown
4. Enter the Data Feed contract address corresponding to `BTC to USD`, which is `0x89BC5048d634859aef743fF2152363c0e83a6a49` on the Demo EVM ContainerChain in the **At Address** field and click the **At Address** button.

![Price Feed Diagram](/images/builders/tutorials/oracles/phala/phala-3.webp)

The aggregator contract should now be accessible. To interact with the aggregator contract, take the following steps:

1. Expand the `AggregatorV3Interface` contract to reveal the available functions
2. Click `decimals` to query how many digits after the decimal point are included in the returned price data
3. Click `description` to verify the asset pair of the price feed 
4. Click `latestRoundData` to see the most recent price data for the asset pair. The price data for the pair is returned as the `int256 answer`

![Price Feed Diagram](/images/builders/tutorials/oracles/phala/phala-4.webp)

Note that to obtain a readable price, you must account for the decimals of the price feed, which is available with the `decimals()` method. So in this example, where the price feed returned a value of `5230364122303`, the decimal point will need to moved eight places, which corresponds to a Bitcoin price of `$52,303.64` at the time of writing. 


## Launching Price Feeds on Your Own EVM ContainerChain {: #launching-price-feeds-on-your-own-evm-containerchain }

It's easy to launch price feeds on your Tanssi EVM ContainerChain! The following sections will walk through the process of launching a variety of price feeds on your Tanssi EVM ContainerChain. This process can be followed for SnapChains and dedicated AppChains on the Tanssi Dancebox TestNet. Please be advised that these instructions are for demonstration purposes only, and it's highly recommended that you [contact the Phala Team](https://dashboard.phala.network/){target=\_blank} for assistance in any production scenarios. 

### Setup {: #setup }

To get started, clone the [Phala Mirrored Price Feed repo](https://github.com/Phala-Network/mirrored-price-feed){target=\_blank} to a local directory. 

Run `cd mirrored-price-feed/ && yarn install`

Then, you'll need to configure your `.env` file. There's a convenient sample file in the repo that you can refer to. From the command line, run:  

```bash
cp env.example .env
```

Then edit your `.env` to insert the private key of an account funded on your ContainerChain, and the RPC URL of your ContainerChain. You can fund a dummy account from the Sudo account of your ContainerChain. Your ContainerChain's Sudo address and RPC URL are both accessible from your dashboard on [apps.tanssi.network](https://apps.tanssi.network/){target=\_blank}. You can leave the other fields in the `.env` blank. Your `.env` should resemble the below: 

```bash
--8<-- 'code/builders/tutorials/oracles/phala/env.txt'
```

### Configure Deployment Script {: #configure-deployment-script }

Next, you'll need to edit the `OffchainAggregator.s.sol` file located in the scripts directory. `OffchainAggregator.sol` takes two parameters upon deployment, a `decimals` value, and a description of the price feed. The decimal value can remain unchanged at `8`, and the description should be changed to the price feed that you'd like to add to your ContainerChain. In this case, `BTC / USD` is specified. Take care to copy the description exactly as shown, and remember that only specified assets shown in the [Fetch Price Feed Data](#supported-assets) are supported. If you specify an asset not supported by Phala, the price feed will not work correctly. Your `OffchainAggregator.s.sol` should resemble the following: 

???+ code "OffchainAggregator.s.sol"

    ```solidity
    --8<-- 'code/builders/tutorials/oracles/phala/OffchainAggregator.s.sol'
    ```

There's a few more changes that we need to make in `feeder.ts`, the file that maintains and updates our price feeds. You'll need to insert the details of your EVM ContainerChains as follows: 

```typescript
--8<-- 'code/builders/tutorials/oracles/phala/define-chain.ts'
```

You'll also see two arrays of contract addresses at the top of `feeder.ts`. The first array, named `mainnetFeedContracts` refers to Ethereum mainnet aggregator contract addresses, and you can leave that untouched. The second array, named `aggregatorContracts ` still contains the addresses of the aggregator contracts on the Demo EVM ContainerChain. You should erase this array such that it is empty. We'll return to it later and add the contract addresses of our aggregator contracts specific to our own EVM ContainerChain once they are deployed.  

Once you're finished editing, your `feeder.ts` file should resemble the below:

??? code "feeder.ts"

    ```solidity
    --8<-- 'code/builders/tutorials/oracles/phala/feeder.ts'
    ```


### Build and Test {: #build-and-test }

Run the following commands to build and test the project:

```bash
yarn build
```

```bash
yarn test
```

If everything was successful, you'll see output like the following:

![Run yarn build and yarn test](/images/builders/tutorials/oracles/phala/phala-5.webp)


### Deploy {: #deploy }

To deploy your aggregator contract for the specified asset / base pair to your EVM ContainerChain, use the following command:

```bash
yarn deploy
```

You'll get a transaction status as well as a contract address. Copy this contract address, as you'll need to refer to it in the next steps. 

![Get output of deployed aggregator contract](/images/builders/tutorials/oracles/phala/phala-6.webp)

### Access Aggregator Contract {: #access-aggregator-contract }

Let's demonstrate interacting with the newly deployed aggregator contract. Make sure that your MetaMask wallet is connected to your EVM ContainerChain. You add your ContainerChain to your MetaMask by pressing "Add to MetaMask" on your dashboard on [apps.tanssi.network](https://apps.tanssi.network/){target=\_blank}.

Paste the [aggregator contract](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol){target=\_blank} into a new file in Remix and compile it. 

Then, take the following steps:

1. Head to the **Deploy and Run Transactions** tab
2. Set the **ENVIRONMENT** to **Injected Provider -- MetaMask** and ensure that your MetaMask is on the network of your EVM ContainerChain. You can verify the EVM ChainID in Remix if you are unsure
3. Select the `AggregatorV3Interface` contract from the **CONTRACT** dropdown
4. Enter the Data Feed contract address corresponding to your desired asset pair that was returned on the command line in the prior section in the **At Address** field and click the **At Address** button

![Access aggregator contract](/images/builders/tutorials/oracles/phala/phala-7.webp)

Expand the `AggregatorV3Interface` contract to reveal the available functions and click `latestRoundData` to see the most recent price data for the asset pair. You should see `0` values for all. This is because our aggregator contract has been deployed, but it hasn't yet fetched price data. We can fix this with a quick price feed update. 

![Get output of deployed aggregator contract](/images/builders/tutorials/oracles/phala/phala-8.webp)

### Trigger Price Feed Update {: #Trigger Price Feed Update }

In a prior section, we cleared out the array of aggregator contracts, but since we've now deployed an aggregator contract, we should specify it in the `feeder.ts` file so that we can manually trigger a refresh of the price data. Edit the `aggregatorContracts` array as follows:

```typescript
const aggregatorContracts = {
  'BTC-USD': 'INSERT-AGGREGATOR-CONTRACT-ADDRESS',
}
```

Then, from the command line, run the following command:

```bash
npx tsx feeder.ts 
```

![Get output of deployed aggregator contract](/images/builders/tutorials/oracles/phala/phala-9.webp)

Upon returning to Remix, click `latestRoundData` once more, and after waiting a moment, you should see an accurate value returned. 

![Get output of deployed aggregator contract](/images/builders/tutorials/oracles/phala/phala-10.webp)

For more information about using Phala to access off-chain data, be sure to check out the [Phala docs site](https://docs.phala.network/introduction/readme){target=\_blank}.

--8<-- 'text/_disclaimers/third-party-content.md'