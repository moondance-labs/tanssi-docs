---
title: Using Band Protocol for Price Feed Oracles
description: Learn how to use the Band Protocol's descentralized oracle network to get reliable token prices enabling secure data access for your Tanssi EVM network.
icon: octicons-eye-24
---

# Accesing Price Feeds with the Band Protocol

## Introduction {: #introduction }

[Band Protocol](https://www.bandprotocol.com/){target=\_blank} is a decentralized oracle network that provides reliable, secure, real-time data to smart contracts on various blockchain networks.

The protocol is built on top of BandChain, a network designed to be compatible with most EVM-compatible chains, such as Tanssi-powered EVM networks, and blockchain development frameworks. The protocol aims to provide a solution that is:

- Decentralized, leveraging the computational power of a network of validators
- Flexible, supporting a wide range of data sources and formats, making integrations easy
- Scalable, designed to handle high volumes of data requests
- Affordable, allowing users to request data only when they need to and pay the associated fees

Band protocol is currently deployed on many blockchains ([Moonbeam](https://docs.moonbeam.network/builders/integrations/oracles/band-protocol/){target=\_blank}, for example) across different ecosystems. To deploy the oracle onto your network, reach out to the [Band Protocol](https://www.bandprotocol.com/){target=\_blank} team directly.

This tutorial will walk through the steps to interact with price feeds using the Band protocol's oracle on the [Tanssi demo EVM-compatible network](https://apps.tanssi.network/demo){target=\_blank}. 

## Setup on the Tanssi Demo EVM Network {: #setup-on-demo-evm-network }

The Band Protocol oracle is already deployed on the Tanssi demo EVM network and configured to provide prices for the `ETH` and `DOT` tokens.

The price feeds are pushed regularly to a smart contract that is accessible at the following address:

```text
{{ networks.demo_evm.oracles.band.smart_contract }}
```

The smart can be interacted with using the interface:

???+ code "IStdReference.sol"

    ```solidity
    --8<-- 'code/builders/toolkit/integrations/oracles/band/IStdReference.sol'
    ```

As seen above in the interface, there are two functions for fetching data:

???+ function "**getReferenceData**(_base, _quote) — fetches the price for a given base/quote pair"

    === "Parameters"

        - `_base` ++"string memory"++ - the token you want to get the price for
        - `_quote` ++"string memory"++ - the token (or `USD`) in which the price is expressed
        
    === "Example"

        - `_base` - ETH
        - `_quote` - USD
        
??? function "**getReferenceDataBulk**(_bases, _quotes) — fetches prices for the given base/quote pairs simultaneously"

    === "Parameters"

        - `_bases` ++"string[] memory"++ - the list of base tokens you want to get the prices for
        - `_quotes` ++"string[] memory"++ - the list of tokens (or `USD`) in which the prices are expressed

    === "Example"

        - `_bases` - ["ETH", "DOT"]
        - `_quotes` - ["USD", "USD"]

The response for both functions consists of the following data, grouped in one tuple in the case of `getReferenceData` and one list of tuples (one tuple per pair) in the case of `getReferenceDataBulk`:

- `rate` ++"uint256"++ - price for the given base/quote pair. Note that the result must be adjusted to consider eighteen decimal places
- `lastUpdatedBase` ++"uint256"++ - update timestamp for the `_base` parameter, expressed in UNIX epochs, which is the number of seconds that have passed since `01-01-1970 00:00:00 UT`
- `lastUpdatedQuote` ++"uint256"++ - update timestamp for the `_quote` parameter, expressed in UNIX epochs, which is the number of seconds that have passed since `01-01-1970 00:00:00 UT`

### Fetching Price Feeds Using Remix {: #fetching-price-feeds-remix }

In this section, we'll use remix to fetch the price of the pair `ETH/USD`. 

First, make sure you have an [EVM-compatible wallet](/builders/toolkit/ethereum-api/wallets/){target=\_blank} connected to the [demo EVM network](https://apps.tanssi.network/demo){target=\_blank}. [MetaMask](/builders/toolkit/ethereum-api/wallets/metamask/){target=\_blank} is used as an example in this guide. Now, head to [Remix](https://remix.ethereum.org/){target=\_blank}, paste the [`IStdReference`](#setup-on-demo-evm-network) interface into a new file, and compile it.

![Compile interface contract](/images/builders/toolkit/integrations/oracles/band/band-1.webp)

Then, take the following steps:

1. Head to the **Deploy & Run Transactions** tab
2. Set the **ENVIRONMENT** to **Injected Provider -- MetaMask**
3. Select the `IStdReference.sol` contract from the **CONTRACT** dropdown
4. Enter the data feed contract address, which is `{{ networks.demo_evm.oracles.band.smart_contract }}` on the demo EVM network in the **At Address** field and click the **At Address** button

![Access Interface contract](/images/builders/toolkit/integrations/oracles/band/band-2.webp)

The contract should now be accessible. To interact with it, take the following steps:

1. Expand the **IStdReference** contract to reveal the available functions
2. Expand **getReferenceData**, and set the `_base` and `_quote` input parameters to `ETH` and `USD`, respectively
3. Click **Call**
4. The result will show three values: the price, update time for the `_base` parameter, and update time for the `_quote` parameter

![Check price data](/images/builders/toolkit/integrations/oracles/band/band-3.webp)

Note that to obtain a readable price from the price feed, it's essential to adjust for the feed's decimal places, which are eighteen. For instance, the example above shows a value of `2361167929271984201806`, corresponding to an `ETH` price of `$2,361.167929271984201806` expressed in `USD`. Also, note that the update timestamp values are expressed in UNIX epoch time, expressed as the number of seconds that have passed since `01-01-1970 00:00:00 UT`. 

--8<-- 'text/_disclaimers/third-party-content.md'
