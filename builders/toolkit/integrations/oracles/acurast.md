---
title: Using Acurast for Price Feed Oracles
description: Learn how to use Acurast's decentralized serverless cloud to get reliable price feed token asset data on your Tanssi EVM-compatible network.
icon: octicons-eye-24
categories: EVM-Template
---

# Accessing Price Feeds with Acurast

## Introduction {: #introduction }

[Acurast](https://acurast.com){target=\_blank} gives developers complete permissionless access to compute that is trustless, affordable, and confidential for deploying their applications.

One of Acurast's use cases is to enable developers to deploy their own push/pull oracles, interacting with off-chain APIs to bring price feeds on-chain. Pricing data is confidentially processed through Acurast Processors, pushing data to smart contracts of EVM-compatible chains like Tanssi-powered EVM networks via a [standard Chainlink Aggregator Interface](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol){target=\_blank}.

This tutorial will walk through a demo of [interacting with price feeds](#fetch-price-data) enabled by Acurast on the [demo Tanssi EVM-compatible network](/builders/tanssi-network/testnet/demo-evm-network/){target=\_blank}. You can also deploy your own price feeds to your Tanssi EVM-compatible network. Please be advised that the steps shown in this tutorial are for demonstration purposes only - it's highly recommended that you contact the [Acurast](https://acurast.com){target=\_blank} team directly as they can assist you with launching price feeds on your network to ensure the integrity of the deployment process.

## What is Acurast? {: #what-is-acurast }

Acurast is a decentralized, serverless cloud where everyone can become part of the cloud with their new, used, or even mobile phones with a smashed screen by providing compute power to the cloud and earning rewards. These so-called Processors are scattered across the globe, creating a distributed network of compute across the globe.

Processors and developers can seamlessly interact through the [Acurast Console](https://console.acurast.com){target=\_blank}.

## Fetch Price Data {: #fetch-price-data }

You can design your Acurast price feed exactly as you wish. The demo price feed built for this tutorial inherits the same interface as the Chainlink price feeds. The data lives in a series of smart contracts (one per price feed) and can be fetched with the aggregator interface:

???+ code "AggregatorV3Interface.sol"

    ```solidity
    --8<-- 'code/builders/toolkit/integrations/oracles/acurast/AggregatorV3Interface.sol'
    ```

As seen above in the interface, there are five functions for fetching data: `decimals`, `description`, `version`, `getRoundData`, and `latestRoundData`. For more information about the `AggregatorV3Interface.sol`, see the [Chainlink API Reference](https://docs.chain.link/data-feeds/api-reference){target=\_blank}.

## Interacting with Price Feeds on the Tanssi Demo EVM Network {: #interacting-with-price-feeds-demo-evm-network }

This tutorial will showcase interacting with a sample BTC/USDT price feed contract on the demo EVM network, but you can interact any of the price feeds listed in [Supported Assets](#supported-assets). The BTC/USDT price feed is [deployed on the demo EVM network]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x02093b190D9462d964C11587f7DedD92718D7B56){target=\_blank}, so you can interact with it by accessing the aggregator contract at the below contract address:

```text
{{ networks.demo_evm.oracles.acurast.btc_usd }}
```

For a refresher on setting up Remix to interface with the demo EVM network, see the [Deploy Smart Contracts with Remix](/builders/toolkit/ethereum-api/dev-env/remix/){target=\_blank} guide. Secondly, make sure you have [connected MetaMask](/builders/toolkit/ethereum-api/wallets/metamask/){target=\_blank} to the demo EVM network.

Paste the [aggregator contract](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol){target=\_blank} into a new file in Remix and compile it.

![Compile aggregator contract](/images/builders/toolkit/integrations/oracles/acurast/acurast-1.webp)

Then, take the following steps:

1. Head to the **Deploy and Run Transactions** tab
2. Set the **ENVIRONMENT** to **Injected Provider -- MetaMask**
3. Select the **AggregatorV3Interface** contract from the **CONTRACT** dropdown
4. Enter the sample price feed contract address for `BTC to USD`, which is `{{ networks.demo_evm.oracles.acurast.btc_usd }}` on the demo EVM network in the **At Address** field and click the **At Address** button

![Access aggregator contract](/images/builders/toolkit/integrations/oracles/acurast/acurast-2.webp)

The aggregator contract should now be accessible. To interact with the aggregator contract, take the following steps:

1. Expand the **AggregatorV3Interface** contract to reveal the available functions
2. Click **decimals** to query how many digits after the decimal point are included in the returned price data
3. Click **description** to verify the asset pair of the price feed
4. Click **latestRoundData** to see the most recent price data for the asset pair. The price data for the pair is returned as the **int256 answer**

![Check price data](/images/builders/toolkit/integrations/oracles/acurast/acurast-3.webp)

Note that to obtain a readable price from the price feed, it's essential to adjust for the feed's decimal places, which can be determined using the `decimals()` method. For instance, if the price feed returns a value of `51933620000`, you'll need to move the decimal point six places to accurately reflect the price. In this example, it corresponds to a Bitcoin price of `$51,933.62` at the time of writing.

### Supported Assets {: #supported-assets }

By its design, Acurast can support the price feed of any arbitrary asset that is accessible by an API. The API request that powers the demo price feed is as follows:

```bash
curl "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
```

Upon running the above command in your terminal, you'll see a result that resembles the following:

--8<-- 'code/builders/toolkit/integrations/oracles/acurast/terminal/api.md'

!!! note
    This simple example of fetching a price feed relies on a single source of price feed data from one exchange. You can build a more complex job script that aggregates pricing data from multiple sources.

The Acurast team has deployed the below price feeds on the Tanssi demo EVM network:

| Asset & Base Pair |                                                                           Aggregator Contract                                                                           |
|:-----------------:|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|   AAVE to USDT    | [{{ networks.demo_evm.oracles.acurast.aave_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x6239Ff749De3a21DC219bcFeF9d27B0dfE171F42){target=\_blank} |
|    BTC to USDT    | [{{ networks.demo_evm.oracles.acurast.btc_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x02093b190D9462d964C11587f7DedD92718D7B56){target=\_blank}  |
|    CRV to USDT    | [{{ networks.demo_evm.oracles.acurast.crv_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x01F143dfd745861902dA396ad7dfca962e5C83cA){target=\_blank}  |
|    DAI to USDT    | [{{ networks.demo_evm.oracles.acurast.dai_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x73aF6b14b73059686a9B93Cd28b2dEABF76AeC92){target=\_blank}  |
|    ETH to USDT    | [{{ networks.demo_evm.oracles.acurast.eth_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0x007c3F3cc99302c19792F73b7434E3eCbbC3db25){target=\_blank}  |
|   USDC to USDT    | [{{ networks.demo_evm.oracles.acurast.usdc_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0xe4a46ef4cFbf87D026C3eB293b7672998d932F62){target=\_blank} |
|    USDT to USD    | [{{ networks.demo_evm.oracles.acurast.usdt_usd }}]({{ networks.dancelight.demo_evm_blockscout_url }}address/0xf9c885E3A5846CEA887a0D69655BC08e52afe569){target=\_blank} |

## Designing and Launching Your Own Price Feed {: #designing-and-launching-your-own-price-feed }

You can build and launch your own Acurast price feed on your Tanssi-powered EVM-compatible network. Please be advised that the steps shown in this tutorial are unaudited, unverified, and for demonstration purposes only - it's highly recommended that you [contact the Acurast team directly](https://acurast.com){target=\_blank} as they can assist you with launching price feeds on your network to ensure the integrity of the deployment process.

To launch an Acurast price feed, you need two key components: a smart contract and a script. In the prior example of [Interacting with the BTC/USD price feed](#interacting-with-price-feeds-demo-evm-network) on the demo EVM network, the generic Chainlink interface is used because it is a more straightforward example for demonstration purposes. The underlying smart contract that powers that price feed conforms to the [Chainlink Aggregator interface](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol){target=\_blank}, but the demo contract has additional components worthy of discussion. You can find both the demo contract and script at the [GitHub repo for the Acurast demo BTC/USD price feed](https://github.com/Acurast/acurast-evm-oracle-sample/tree/main){target=\_blank}.

The demo contract, `InsecureDummyPriceFeed.sol`, emits an event when the price is updated and when a new round begins. The `setPrice` method is insecure, as shown in this demo smart contract, but it is provided to show you where you might add logic like aggregation consensus, access control checks, and other parameters.

???+ code "InsecureDummyPriceFeed.sol"

    ```solidity
    --8<-- 'code/builders/toolkit/integrations/oracles/acurast/InsecureDummyPriceFeed.sol'
    ```

!!! warning
    This demo contract has some security vulnerabilities and lacks access control mechanisms, making it unsuitable for any real use. It was developed by the Acurast team for demonstration purposes only.

Before proceeding to the next steps, you must first deploy your price feed's smart contract on your Tanssi EVM network. Or, you can deploy it to the [demo EVM network](/builders/tanssi-network/testnet/demo-evm-network/), and you can obtain TestNet {{ networks.dancelight.demo_evm_token_symbol }} tokens from the [Tanssi faucet](https://apps.tanssi.network/demo){target=\_blank}. Once deployed, be sure to record the contract address, as you will need to enter this information into your Acurast price feed script.

### Building the Acurast Script

The Acurast oracle script plays a crucial role by updating your on-chain oracle with fresh data, acting as the vital connection between the Tanssi network's price feed and the Acurast network. Through the Acurast console, you will upload this script and specify all necessary parameters for your price feed's operation, including its frequency, schedule, and rewards for Acurast processors, among others. To facilitate this process, you will need cACU tokens, which are available from the [faucet](https://faucet.acurast.com){target=\_blank}, and serve as the native currency of the Acurast Canary network.

The [Acurast script for the demo BTC/USD price feed](https://github.com/Acurast/acurast-evm-oracle-sample/blob/main/acurast_scripts/oracle_job.js){target=\_blank} can be used as a basis for creating your own script. Remember to update the contract address and RPC URL fields.

???+ code "AcurastScript.js"

    ```js
    --8<-- 'code/builders/toolkit/integrations/oracles/acurast/AcurastScript.js'
    ```

To configure your job, head to the [Acurast console](https://console.acurast.com/create){target=\_blank}, then take the following steps:

1. Click **Create Jobs** on the left-hand sidebar underneath the **Consumer** heading
2. Select **Moonbeam** as the chain
3. Select **Moonbase** as the environment. Remember that Tanssi's EVM-compatibility is derived from Moonbeam
4. Select **Price Feeds**
5. Paste in the code of your job script. You can copy and paste directly from the [script of the sample BTC/USD price feed](https://github.com/Acurast/acurast-evm-oracle-sample/blob/main/acurast_scripts/oracle_job.js){target=\_blank}, just make sure to change the destination contract to one that you deployed on your network and the RPC node to your network's RPC URL, which can be found on the [Tanssi dApp](https://apps.tanssi.network){target=\_blank}
6. Optionally, you can test your code here. Any error messages will be readable in the browser's console

![Job setup on Acurast console](/images/builders/toolkit/integrations/oracles/acurast/acurast-4.webp)

Continuing down the same setup page, take the following steps:

1. Select **Use Public Processors**
2. Select **Interval**
3. Specify a **Start time** and **End time**
4. Specify the **Interval in minutes**
5. Specify a job duration and max start delay duration
6. Select **Number of processors to assign**. The more processors you choose, the proportionally higher amount of cACU you'll need, which you can get from the [faucet](https://faucet.acurast.com){target=\_blank}
7. Select **Max Reward** paid to each processor for each job execution. You don't need to specify exactly `0.01` cACU - this amount was chosen as an example
8. Review everything first, then Press **Publish Job**

![Job setup on Acurast console continued](/images/builders/toolkit/integrations/oracles/acurast/acurast-5.webp)

On the following screen, you'll be able to monitor the status of your job. For more information about using Acurast to build and access price feeds on your Tanssi EVM-compatible network, be sure to check out the [Acurast docs](https://docs.acurast.com){target=\_blank}.

--8<-- 'text/_disclaimers/third-party-content.md'
