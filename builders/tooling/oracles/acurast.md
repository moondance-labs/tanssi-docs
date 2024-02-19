---
title: Using Acurast for Price Feed Oracles
description: Learn how to use Acurast's decentralized serverless cloud to get reliable price feed token asset data on your Tanssi EVM Appchain.
---

# Accessing Price Feeds with Acurast

## Introduction {: #introduction }

[Acurast](https://acurast.com/){target=\_blank} is a trustless orchestration layer for decentralized computing capabilities. Among other features, Acurast enables you to interact with off-chain price feeds that can be accessed via API. Pricing data is processed through the Acurast network and accessible from EVM-compatible chains like Tanssi EVM Appchains via a [standard Chainlink Aggregator Interface](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol){target=\_blank}. 

This tutorial will walk through a demo of [interacting with price feeds](#fetch-price-data) enabled by Acurast on the [demo Tanssi EVM-compatible Appchain](/builders/tanssi-network/networks/dancebox/demo-evm-containerchain/){target=\_blank}. You can also deploy your own price feeds to your Tanssi EVM-compatible Appchain. Please be advised that the steps shown in this tutorial are for demonstration purposes only - it's highly recommended that you contact the [Acurast](https://acurast.com/){target=\_blank} team directly as they can assist you with launching price feeds on your Appchain to ensure the integrity of the deployment process.

## What is Acurast? {: #what-is-acurast }

The Acurast network has three main stakeholders: consumers, processors, and the orchestrator. 

[Consumers](https://docs.acurast.com/developers/get-started){target=\_blank} seek to delegate computational tasks in a manner that is secure, verifiable, and efficient. They can declare and submit these tasks to Acurast network, specifying the exact conditions under which the jobs should be run. 

[Processors](https://docs.acurast.com/acurast-processors){target=\_blank} provide their computing power to the Acurast network for the benefit of consumers. In return for executing tasks confidentially and verifiably, processors receive rewards from consumers. Anyone with a [modern Android device](https://docs.google.com/spreadsheets/d/1ZvzmMVey4CM2tuif_zJfWiIxH1qkgA-l7BNJMw4vh54/edit#gid=1844886586){target=\_blank} can participate in the Acurast network as a processor.

And finally, the [Acurast Orchestrator](https://docs.acurast.com/acurast-orchestrator){target=\_blank} is the heart of the consensus layer. It facilitates the orchestration, which includes scheduling jobs and ensuring the smooth matchmaking of computational resources between processors and consumers. This orchestrator is crucial in establishing, agreeing upon, and enforcing the exchange of value between processors and consumers.
 
## Fetch Price Data {: #fetch-price-data }

You can design your Acurast price feed exactly as you wish. The demo price feed built for this tutorial inherits the same interface as the Chainlink price feeds. The data lives in a series of smart contracts (one per price feed) and can be fetched with the aggregator interface:

???+ code "AggregatorV3Interface.sol"

    ```solidity
    --8<-- 'code/builders/tooling/oracles/acurast/AggregatorV3Interface.sol'
    ```

As seen above in the interface, there are five functions for fetching data: `decimals`, `description`, `version`, `getRoundData`, and `latestRoundData`. For more information about the `AggregatorV3Interface.sol`, see the [Chainlink API Reference](https://docs.chain.link/data-feeds/api-reference){target=\_blank}.

## Interacting with Price Feeds on the Tanssi Demo EVM Appchain {: #interacting-with-price-feeds-demo-evm-appchain }

This tutorial will showcase interacting with a sample BTC/USD price feed contract on the demo EVM Appchain. This contract is [already deployed](https://3001-blockscout.a.dancebox.tanssi.network/address/0xFbe0a22f16eB990BB428956237eDd8EA798BdFFE){target=\_blank} on the demo EVM Appchain, so you can interact with it by accessing the aggregator contract at the below contract address:

```
0xFbe0a22f16eB990BB428956237eDd8EA798BdFFE
```

For a refresher on setting up Remix to interface with your Appchain, see the [Deploy Smart Contracts with Remix](/builders/interact/ethereum-api/dev-env/remix/){target=\_blank} guide. Secondly, make sure you have [connected MetaMask](/builders/interact/ethereum-api/wallets/metamask/){target=\_blank} to the demo EVM Appchain. 

Paste the [aggregator contract](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol){target=\_blank} into a new file in Remix and compile it. 

![Compile aggregator contract](/images/builders/tooling/oracles/acurast/acurast-1.webp)

Then, take the following steps:

1. Head to the **Deploy and Run Transactions** tab
2. Set the **ENVIRONMENT** to **Injected Provider -- MetaMask**
3. Select the **AggregatorV3Interface** contract from the **CONTRACT** dropdown
4. Enter the sample price feed contract address for `BTC to USD`, which is `0xFbe0a22f16eB990BB428956237eDd8EA798BdFFE` on the demo EVM Appchain in the **At Address** field and click the **At Address** button

![Access aggregator contract](/images/builders/tooling/oracles/acurast/acurast-2.webp)

The aggregator contract should now be accessible. To interact with the aggregator contract, take the following steps:

1. Expand the **AggregatorV3Interface** contract to reveal the available functions
2. Click **decimals** to query how many digits after the decimal point are included in the returned price data
3. Click **description** to verify the asset pair of the price feed 
4. Click **latestRoundData** to see the most recent price data for the asset pair. The price data for the pair is returned as the **int256 answer**

![Check price data](/images/builders/tooling/oracles/acurast/acurast-3.webp)

Note that to obtain a readable price from the price feed, it's essential to adjust for the feed's decimal places, which can be determined using the `decimals()` method. For instance, if the price feed returns a value of `51933620000`, you'll need to move the decimal point six places to accurately reflect the price. In this example, it corresponds to a Bitcoin price of `$51,933.62` at the time of writing. 

### Supported Assets {: #supported-assets }

By its design, Acurast can support the price feed of any arbitrary asset that is accessible by an API. The API request that powers the demo price feed is as follows: 

```bash
curl "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
```

Upon running the above command in your terminal, you'll see a result that resembles the following:

--8<-- 'code/builders/tooling/oracles/acurast/terminal/api.md'


!!! note
    This simple example of fetching a price feed relies on a single source of price feed data from one exchange. You can build a more complex job script that aggregates pricing data from multiple sources. 


## Designing and Launching Your Own Price Feed {: #designing-and-launching-your-own-price-feed }

You can build and launch your own Acurast price feed on your Tanssi EVM-compatible Appchain. Please be advised that the steps shown in this tutorial are unaudited, unverified, and for demonstration purposes only - it's highly recommended that you [contact the Acurast team directly](https://acurast.com/){target=\_blank} as they can assist you with launching price feeds on your Appchain to ensure the integrity of the deployment process.

To launch an Acurast price feed, you need two key components: a smart contract and a script. In the prior example of [Interacting with the BTC/USD price feed](#interacting-with-price-feeds-demo-evm-appchain) on the Demo EVM Appchain, the generic Chainlink interface is used because it is a more straightforward example for demonstration purposes. The underlying smart contract that powers that price feed conforms to the [Chainlink Aggregator interface](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol){target=\_blank}, but the demo contract has additional components worthy of discussion. You can find both the demo contract and script at the [Github repo for the Acurast demo BTC/USD price feed](https://github.com/Acurast/acurast-evm-oracle-sample/tree/main){target=\_blank}.

The demo contract, `InsecureDummyPriceFeed.sol`, emits an event when the price is updated and when a new round begins. The `setPrice` method is insecure, as shown in this demo smart contract, but it is provided to show you where you might add logic like aggregation consensus, access control checks, and other parameters.

??? code "InsecureDummyPriceFeed.sol"

    ```solidity
    --8<-- 'code/builders/tooling/oracles/acurast/InsecureDummyPriceFeed.sol'
    ```


!!! warning
    This demo contract has a number of security vulnerabilities and lacks access control mechanisms, making it unsuitable for any real use. It was developed by the Acurast team for demonstration purposes only. 

Before proceeding to the next steps, you must first deploy your price feed's smart contract on your Tanssi EVM Appchain. Once deployed, be sure to record the contract address, as you will need to enter this information into your Acurast price feed script.

### Building the Acurast Script

The Acurast oracle script plays a crucial role by updating your on-chain oracle with fresh data, acting as the vital connection between the Tanssi Appchain's price feed and the Acurast network. Through the Acurast console, you will upload this script and specify all necessary parameters for your price feed's operation, including its frequency, schedule, and rewards for Acurast processors, among others. To facilitate this process, you will need cACU tokens, which are available from the [faucet](https://faucet.acurast.com/){target=\_blank}, and serve as the native currency of the Acurast Canary network.

The [Acurast script for the demo BTC/USD price feed](https://github.com/Acurast/acurast-evm-oracle-sample/blob/main/acurast_scripts/oracle_job.js){target=\_blank} can be used as a basis for creating your own script. Remember to update the contract address and RPC URL fields.

??? code "AcurastScript.js"

    ```js
    --8<-- 'code/builders/tooling/oracles/acurast/AcurastScript.js'
    ```


To configure your job, head to the [Acurast console](https://console.acurast.com/create){target=\_blank}, then take the following steps:

1. Click **Create Jobs** on the left-hand sidebar underneath the **Consumer** heading
2. Select **Moonbeam** as the chain 
3. Select **Moonbase** as the environment. Remember that Tanssi's EVM-compatibility is derived from Moonbeam
4. Select **Price Feeds**
5. Paste in the code of your job script. You can copy and paste directly from the [script of the sample BTC/USD price feed](https://github.com/Acurast/acurast-evm-oracle-sample/blob/main/acurast_scripts/oracle_job.js){target=\_blank}, just make sure to change the destination contract to one that you deployed on your Appchain and the RPC node to your [Appchain's RPC URL](https://apps.tanssi.network/)
6. Optionally, you can test your code here. Any error messages will be readable in the browser's console

![Job setup on Acurast console](/images/builders/tooling/oracles/acurast/acurast-4.webp)

Continuing down the same setup page, take the following steps: 

1. Select **Use Public Processors**
2. Select **Interval**
3. Specify a **Start time** and **End time**
4. Specify the **Interval in minutes**
5. Specify a job duration and max start delay duration
6. Select **Number of processors to assign**. The more processors you choose, the proportionally higher amount of cACU you'll need
7. Select **Max Reward** paid to each processor for each job execution. You don't need to specify exactly `0.01` cACU - this amount was chosen as an example
8. Review everything first, then Press **Publish Job**

![Job setup on Acurast console continued](/images/builders/tooling/oracles/acurast/acurast-5.webp)

On the following screen, you'll be able to monitor the status of your job. For more information about using Acurast to build and access price feeds on your Tanssi EVM-compatible Appchain, be sure to check out the [Acurast docs](https://docs.acurast.com/){target=\_blank}.

--8<-- 'text/_disclaimers/third-party-content.md'