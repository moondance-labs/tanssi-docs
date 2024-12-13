---
title: Demo EVM Tanssi Appchain
description: Test our demo EVM Tanssi appchain to discover the capabilities of a fully Ethereum-compatible appchain deployed through Tanssi in just a few minutes.
icon: material-ethereum
---

## Introduction

Explore the functionalities of a fully Ethereum-compatible appchain deployed through Tanssi by interacting with the demo EVM appchain on Dancebox.

This quick reference page offers all the essentials you need to interact with this demo appchain.

## Faucet for TestNet Tokens {: #faucet }

You can access TANGO tokens, the native currency of the EVM demo appchain, at the faucet on the [Tanssi dApp](https://apps.tanssi.network/demo){target=\_blank}. You can receive up to 100 TANGO tokens every 12 hours.

To request tokens from the faucet, head to the [Tanssi dApp](https://apps.tanssi.network/demo){target=\_blank} and press **Add to MetaMask**.

![Add to MetaMask](/images/builders/tanssi-network/testnet/demo-evm-appchain/demo-1.webp)

Then, take the following steps:

1. Press **Request Tokens**
2. Select the account you'd like to receive TANGO tokens and press **Next**
3. Press **Connect**

![Request tokens](/images/builders/tanssi-network/testnet/demo-evm-appchain/demo-2.webp)

!!! note
    TANGO tokens have no value. Please don't spam the faucet with unnecessary requests.

Your tokens will be disbursed shortly, and you can verify your TANGO token balance by looking up your address on the [explorer](https://fra-dancebox-3001-bs.a.dancebox.tanssi.network){target=\_blank}.

## Network Endpoints {: #network-endpoints }

The demo EVM appchain HTTPS and WSS endpoints are as follows:

=== "HTTPS"

    ```text
    https://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network/
    ```

=== "WSS"

    ```text
    wss://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network/
    ```

## Block Explorers {: #block-explorers }

For the demo EVM appchain, you can use any of the following explorers:

- [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network#/explorer){target=\_blank} (Substrate API)
- [Blockscout](https://fra-dancebox-3001-bs.a.dancebox.tanssi.network){target=\_blank} (Ethereum API)
- [Expedition](https://tanssi-evmexplorer.netlify.app){target=\_blank} (Ethereum API)

## Chain ID {: #chain-id }

The demo EVM appchain has a [chain ID](https://chainlist.org/chain/5678){target=\_blank} of: `5678`, which is `0x162E` in hex.

## Quick Start {: #quick-start }

You can interact with a Tanssi EVM appchain using standard Ethereum libraries, like [Ethers.js](/builders/toolkit/ethereum-api/libraries/ethersjs/){target=\_blank}, [Web3.js](/builders/toolkit/ethereum-api/libraries/web3js/){target=\_blank}, and [Web3.py](/builders/toolkit/ethereum-api/libraries/web3py/){target=\_blank}. To quickly get started, you'll need to create a provider connected to a Tanssi EVM appchain:

=== "Ethers.js"

    ```js
    import { ethers } from "ethers";

    const providerRPC = {
      evmAppchain: {
        name: 'dancebox-evm-appchain',
        // Insert your RPC URL here
        rpc: 'https://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network', 
        chainId: 5678, // 0x162E in hex,
      },
    };
    const provider = new ethers.JsonRpcProvider(
      providerRPC.evmAppchain.rpc, 
      {
        chainId: providerRPC.evmAppchain.chainId,
        name: providerRPC.evmAppchain.name,
      }
    );
    ```

=== "Web3.js"

    ```js
    const Web3 = require('web3');

    const web3 = new Web3(
      'https://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network'
    );
    ```

=== "Web3.py"

    ```python
    from web3 import Web3

    web3 = Web3(Web3.HTTPProvider('https://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network')) 
    ```
