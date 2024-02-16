---
title: Using Phala for Price Feed Oracles
description: Learn how to use Phala's off-chain computing network to get reliable Ethereum Mainnet Chainlink Oracle token price feed data on your Tanssi EVM Appchain.
---

# Launching Price Feeds with Phala

## Introduction {: #introduction }

[Phala Network](https://phala.network/){target=\_blank} is an off-chain compute network powered by [Secure Enclaves](https://docs.phala.network/developers/advanced-topics/blockchain-infrastructure#the-architecture){target=\_blank} that enables developers to build powerful smart contracts that connect to off-chain components called Phat Contracts. Phat Contracts are designed to enable functionality that surpasses the limitations of traditional smart contracts, such as storage, cost, and compute limitations while remaining trustless, verifiable, and permissionless. For more information about Phala's architecture, be sure to check out the [Phala docs](https://docs.phala.network/introduction/readme){target=\_blank}.

Phala is not an oracle network itself; rather, Phala enables a variety of off-chain compute capabilities, such as a decentralized oracle network. Phala also provides a toolset called [Phala Bricks](https://bricks.phala.network/){target=\_blank} that makes it easy to quickly launch these types of features without having to build them from scratch. 

This tutorial will walk through a demo of [interacting with price feeds](#fetch-price-data) enabled by Phat contracts on the demo Tanssi EVM-compatible Appchain. Next, you'll learn how to [deploy price feeds to your Tanssi EVM-compatible Appchain](#launching-price-feeds-on-your-own-evm-appchain). Please be advised that the steps shown in this tutorial are for demonstration purposes only - it's highly recommended that you [contact the Phala team directly](https://dashboard.phala.network/){target=\_blank} as they can assist you with launching price feeds on your Appchain to ensure the integrity of the deployment process.
 
## How Phala Enables Price Feeds {: #how-phala-enables-price-feeds }

Phala mirrors [Chainlink Price Feeds](https://docs.chain.link/data-feeds/price-feeds){target=\_blank} from Ethereum MainNet. Chainlink Price Feeds have stood the test of time and have wide industry adoption. As a reminder, Chainlink Price Feeds don't rely on any single source of truth, rather, their pricing data is collected and aggregated from a variety of data sources gathered by a decentralized set of independent node operators. This helps to prevent manipulation & erratic pricing data. 

The core component of Phala's system design is the [Secure Enclave](https://docs.phala.network/developers/advanced-topics/blockchain-infrastructure#the-architecture){target=\_blank}, which processes the inputs it receives from the Phala blockchain, acting as an encrypted message queue, and guarantees secure and faithful execution, regardless of the presence of malicious workers. In this sense, the Phala blockchain makes a request for a price feed update, which the Phala off-chain workers fetch from Ethereum Mainnet, and return to the Phala blockchain. 

It's important to note that Phala isn't limited to replicating existing Oracles. You can create entirely new Oracles by sourcing off-chain data via Phat Contracts. In this [Phat-EVM Oracle example](https://github.com/Phala-Network/phat-offchain-rollup/blob/main/EvmRollup.md){target=\_blank}, pricing data is sourced from the CoinGecko API. Price quote updates can then be constantly streamed from the Phat contract (push design), or the EVM smart contract can ask for a refreshed quote from the Phat contract (pull design). 

## Fetch Price Data {: #fetch-price-data }

There are several price feeds available on the demo EVM Appchain that you can interact with. The price feeds enabled by Phat Contracts use the same interface as the Chainlink price feeds. The data lives in a series of smart contracts (one per price feed) and can be fetched with the aggregator interface:

???+ code "AggregatorV3Interface.sol"

    ```solidity
    --8<-- 'code/builders/tooling/oracles/phala/AggregatorV3Interface.sol'
    ```

As seen above in the interface, there are five functions for fetching data: `decimals`, `description`, `version`, `getRoundData`, and `latestRoundData`. For more information about the `AggregatorV3Interface.sol`, see the [Chainlink API Reference](https://docs.chain.link/data-feeds/api-reference){target=\_blank}.

### Supported Assets {: #supported-assets }

Phala sources its price feed data by mirroring Chainlink's price feeds from Ethereum mainnet. Currently, there are data feed contracts for [the demo EVM Appchain](/builders/tanssi-network/networks/dancebox/demo-evm-appchain/) for the following asset  pairs: 


=== "Tanssi Demo EVM Appchain"
    | Asset & Base Pair |                                                                          Aggregator Contract                                                                           |
    |:-----------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
    |    AAVE to USD    | [{{ networks.dancebox.oracles.phala.aave_usd }}](https://3001-blockscout.a.dancebox.tanssi.network/address/0x2E1640853bB2dD9f47831582665477865F9240DB){target=\_blank} |
    |    BTC to USD     | [{{ networks.dancebox.oracles.phala.btc_usd }}](https://3001-blockscout.a.dancebox.tanssi.network/address/0x89BC5048d634859aef743fF2152363c0e83a6a49){target=\_blank}  |
    |    CRV to USD     | [{{ networks.dancebox.oracles.phala.crv_usd }}](https://3001-blockscout.a.dancebox.tanssi.network/address/0xf38b25b79A72393Fca2Af88cf948D98c64726273){target=\_blank}  |
    |    DAI to USD     | [{{ networks.dancebox.oracles.phala.dai_usd }}](https://3001-blockscout.a.dancebox.tanssi.network/address/0x1f56d8c7D72CE2210Ef340E00119CDac2b05449B){target=\_blank}  |
    |    ETH to USD     | [{{ networks.dancebox.oracles.phala.eth_usd }}](https://3001-blockscout.a.dancebox.tanssi.network/address/0x739d71fC66397a28B3A3b7d40eeB865CA05f0185){target=\_blank}  |
    |    USDC to USD    | [{{ networks.dancebox.oracles.phala.usdc_usd }}](https://3001-blockscout.a.dancebox.tanssi.network/address/0x4b8331Ce5Ae6cd33bE669c10Ded9AeBA774Bf252){target=\_blank} |
    |    USDT to USD    | [{{ networks.dancebox.oracles.phala.usdt_usd }}](https://3001-blockscout.a.dancebox.tanssi.network/address/0x5018c16707500D2C89a0446C08f347A024f55AE3){target=\_blank} |

=== "Ethereum MainNet"
    | Asset & Base Pair |                                                      Aggregator Contract                                                      |
    |:-----------------:|:-------------------------------------------------------------------------------------------------------------------------------------:|
    |    AAVE to USD    | [0x547a514d5e3769680Ce22B2361c10Ea13619e8a9](https://etherscan.io/address/0x547a514d5e3769680Ce22B2361c10Ea13619e8a9){target=\_blank} |
    |    BTC to USD     | [0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c](https://etherscan.io/address/0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c){target=\_blank} |
    |    CRV to USD     | [0xCd627aA160A6fA45Eb793D19Ef54f5062F20f33f](https://etherscan.io/address/0xCd627aA160A6fA45Eb793D19Ef54f5062F20f33f){target=\_blank} |
    |    DAI to USD     | [0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9](https://etherscan.io/address/0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9){target=\_blank} |
    |    ETH to USD     | [0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419](https://etherscan.io/address/0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419){target=\_blank} |
    |    USDC to USD    | [0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6](https://etherscan.io/address/0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6){target=\_blank} |
    |    USDT to USD    | [0x3E7d1eAB13ad0104d2750B8863b489D65364e32D](https://etherscan.io/address/0x3E7d1eAB13ad0104d2750B8863b489D65364e32D){target=\_blank} |


### Interacting with Price Feeds on the Tanssi Demo EVM Appchain {: #interacting-with-price-feeds-demo-evm-appchain }

Next, this tutorial will showcase interacting with the price feed contracts on the demo EVM Appchain. These contracts are already deployed on the demo EVM Appchain, so you can interact with them by accessing the aggregator contract corresponding to your desired asset.

For a refresher on setting up Remix to interface with your Appchain, see the [Deploy Smart Contracts with Remix](/builders/interact/ethereum-api/dev-env/remix/){target=\_blank} guide. Secondly, make sure you have [connected MetaMask](/builders/interact/ethereum-api/wallets/metamask/){target=\_blank} to the demo EVM Appchain. 

Paste the [aggregator contract](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol){target=\_blank} into a new file in Remix and compile it. 

![Compile aggregator contract](/images/builders/tooling/oracles/phala/phala-1.webp)

Then, take the following steps:

1. Head to the **Deploy and Run Transactions** tab
2. Set the **ENVIRONMENT** to **Injected Provider -- MetaMask**
3. Select the **AggregatorV3Interface** contract from the **CONTRACT** dropdown
4. Enter the data feed contract address corresponding to `BTC to USD`, which is `0x89BC5048d634859aef743fF2152363c0e83a6a49` on the demo EVM Appchain in the **At Address** field and click the **At Address** button

![Access aggregator contract](/images/builders/tooling/oracles/phala/phala-2.webp)

The aggregator contract should now be accessible. To interact with the aggregator contract, take the following steps:

1. Expand the **AggregatorV3Interface** contract to reveal the available functions
2. Click **decimals** to query how many digits after the decimal point are included in the returned price data
3. Click **description** to verify the asset pair of the price feed 
4. Click **latestRoundData** to see the most recent price data for the asset pair. The price data for the pair is returned as the **int256 answer**

![Check price data](/images/builders/tooling/oracles/phala/phala-3.webp)

Note that to obtain a readable price, you must account for the decimals of the price feed, which is available with the `decimals()` method. So in this example, where the price feed returned a value of `5230364122303`, the decimal point will need to be moved eight places, which corresponds to a Bitcoin price of `$52,303.64` at the time of writing. 

## Launching Price Feeds on Your Own EVM Appchain {: #launching-price-feeds-on-your-own-evm-appchain }

It's easy to launch price feeds on your Tanssi EVM Appchain! The following sections will walk through the process of launching a variety of price feeds on your Tanssi EVM Appchain. This process can be followed for Snap Appchains and dedicated Appchains on the Tanssi Dancebox TestNet. Please be advised that these instructions are for demonstration purposes only, and it's highly recommended that you [contact the Phala Team](https://dashboard.phala.network/){target=\_blank} for assistance in any production scenarios. 

### Setup {: #setup }

To get started, clone the [Phala Mirrored Price Feed repo](https://github.com/Phala-Network/mirrored-price-feed){target=\_blank} to a local directory. Then, run the following command:

```bash
cd mirrored-price-feed/ && yarn install
```

Then, you'll need to configure your `.env` file. There's a convenient sample file in the repo that you can refer to. From the command line, run:  

```bash
cp env.example .env
```

Next, edit your `.env` to insert the private key of an account funded on your Appchain, and the RPC URL of your Appchain. You can fund a dummy account from the Sudo account of your Appchain. Your Appchain's Sudo address and RPC URL are both accessible from your dashboard on [apps.tanssi.network](https://apps.tanssi.network/){target=\_blank}. You can leave the other fields in the `.env` blank. Your `.env` should resemble the below: 

```bash
--8<-- 'code/builders/tooling/oracles/phala/env.txt'
```


!!! note
    You should never share your seed phrase (mnemonic) or private key with anyone. This gives them direct access to your funds. This guide is for educational purposes only.

### Configure Deployment Script {: #configure-deployment-script }

Next, you'll need to edit the `OffchainAggregator.s.sol` file located in the scripts directory. `OffchainAggregator.sol` takes two parameters upon deployment, a `decimals` value, and a description of the price feed. The decimal value can remain unchanged at `8`, and the description should be changed to the price feed that you'd like to add to your Appchain. In this case, `BTC / USD` is specified. Take care to copy the description exactly as shown, and remember that only specified assets shown in the [Fetch Price Feed Data](#supported-assets) section are supported. If you specify an asset not supported by Phala, the price feed will not work correctly. Your `OffchainAggregator.s.sol` should resemble the following: 

???+ code "OffchainAggregator.s.sol"

    ```solidity
    --8<-- 'code/builders/tooling/oracles/phala/OffchainAggregator.s.sol'
    ```

There's a few more changes that you need to make in `feeder.ts`, the file that maintains and updates your price feeds. You'll need to insert the details of your EVM Appchain as follows: 

```typescript
--8<-- 'code/builders/tooling/oracles/phala/define-chain.ts'
```

You'll also see two arrays of contract addresses at the top of `feeder.ts`. The first array, named `mainnetFeedContracts` refers to Ethereum MainNet aggregator contract addresses, and you can leave that untouched. The second array, named `aggregatorContracts ` still contains the addresses of the aggregator contracts on the demo EVM Appchain. You should erase this array such that it is empty. Later in this guide, you'll return to it and add the contract addresses of your aggregator contracts specific to your Tanssi EVM Appchain once they are deployed.

Once you're finished editing, your `feeder.ts` file should resemble the below:

???+ code "feeder.ts"

    ```solidity
    --8<-- 'code/builders/tooling/oracles/phala/feeder.ts'
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

--8<-- 'code/builders/tooling/oracles/phala/terminal/build.md'

### Deploy {: #deploy }

To deploy your aggregator contract for the specified asset/base pair to your EVM Appchain, use the following command:

```bash
yarn deploy
```

You'll get a transaction status as well as a contract address. Copy this contract address, as you'll need to refer to it in the following steps. 

--8<-- 'code/builders/tooling/oracles/phala/terminal/deploy.md'

### Access Aggregator Contract {: #access-aggregator-contract }

Next, this tutorial will demonstrate interacting with the newly deployed aggregator contract. Make sure that your MetaMask wallet is connected to your EVM Appchain. You can add your Appchain to your MetaMask by pressing **Add to MetaMask** on your dashboard on [apps.tanssi.network](https://apps.tanssi.network/){target=\_blank}.

Paste the [aggregator contract](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol){target=\_blank} into a new file in Remix and compile it. 

Then, take the following steps:

1. Head to the **Deploy and Run Transactions** tab
2. Set the **ENVIRONMENT** to **Injected Provider -- MetaMask** and ensure that your MetaMask is on the network of your EVM Appchain. You can verify the EVM chain ID in Remix if you are unsure
3. Select the **AggregatorV3Interface** contract from the **CONTRACT** dropdown
4. Enter the data feed contract address corresponding to your desired asset pair that was returned on the command line in the prior section in the **At Address** field and click the **At Address** button

![Access aggregator contract](/images/builders/tooling/oracles/phala/phala-4.webp)

Expand the **AggregatorV3Interface** contract to reveal the available functions and click **latestRoundData** to see the most recent price data for the asset pair. You should see `0` values for all. This is because your aggregator contract has been deployed, but it hasn't yet fetched price data. You can fix this with a quick price feed update. 

![Get output of deployed aggregator contract](/images/builders/tooling/oracles/phala/phala-5.webp)

### Trigger Price Feed Update {: #Trigger Price Feed Update }

In a prior section, you cleared out the array of aggregator contracts, but since you've now deployed an aggregator contract, you should specify it in the `feeder.ts` file so that you can manually trigger a refresh of the price data. Edit the `aggregatorContracts` array as follows:

```typescript
const aggregatorContracts = {
  'BTC-USD': 'INSERT_AGGREGATOR_CONTRACT_ADDRESS',
}
```

Then, from the command line, run the following command:

```bash
npx tsx feeder.ts 
```

--8<-- 'code/builders/tooling/oracles/phala/terminal/update.md'

Upon returning to Remix, click **latestRoundData** once more, and after waiting a moment, you should see an accurate value returned. 

![Check price data](/images/builders/tooling/oracles/phala/phala-6.webp)

For more information about using Phala to access off-chain data, be sure to check out the [Phala docs site](https://docs.phala.network/introduction/readme){target=\_blank}.

--8<-- 'text/_disclaimers/third-party-content.md'