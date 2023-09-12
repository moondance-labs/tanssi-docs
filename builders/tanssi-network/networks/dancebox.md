---
title: Get Started with Dancebox
description: The Tanssi TestNet, named Dancebox, is the easiest way to get started with the Tanssi Network. Follow this tutorial to connect to the TestNet.
---

# Get Started with Dancebox

## Dancebox

### Network Endpoints {: #dancebox-network-endpoints }

Dancebox has two types of endpoints available for users to connect to: one for HTTPS and one for WSS.

=== "HTTPS"

    ```text
    https://fraa-dancebox-rpc.a.dancebox.tanssi.network/
    ```

=== "WSS"

    ```text
    wss://fraa-dancebox-rpc.a.dancebox.tanssi.network
    ```

### Block Explorers {: #dancebox-block-explorers }

For Dancebox, you can use the following block explorer:

- [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss://fraa-dancebox-rpc.a.dancebox.tanssi.network#/explorer){target=_blank}

Support for additional block explorers is in the works and as more explorers support Dancebox, this section will be updated accordingly.

### Get TestNet Tokens {: #get-testnet-tokens }

You can request DANCE tokens by completing a [form on the Tanssi network website](https://www.tanssi.network/claim-dance-tokens){target=_blank} and providing basic information and your Substrate-based address. Within one business day, you'll receive DANCE tokens for testing.

!!! note
    DANCE tokens have no value. Please don't submit unnecessary requests.

## Demo EVM ContainerChain {: #demo-evm-containerchain }

## Network Endpoints {: #endpoints }

The demo EVM ContainerChain has two types of endpoints available for users to connect to: one for HTTPS and one for WSS.

=== "HTTPS"

    ```text
    https://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network/
    ```

=== "WSS"

    ```text
    wss://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network/
    ```

## Quick Start {: #quick-start }

You can interact with the EVM ContainerChain using standard Ethereum libraries, like [Ethers.js](/builders/interact/ethereum-api/libraries/ethersjs){target=_blank}, [Web3.js](/builders/interact/ethereum-api/libraries/web3js){target=_blank}, and [Web3.py](/builders/interact/ethereum-api/libraries/web3py){target=_blank}. To quickly get started, you'll need to create a provider connected to the EVM ContainerChain:

=== "Ethers.js"

    ```js
    import { ethers } from "ethers";

    const providerRPC = {
      EvmContainer: {
        name: 'dancebox-evm-container',
        // Insert your RPC URL here
        rpc: 'https://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network', 
        chainId: 5678, // 0x162E in hex,
      },
    };
    const provider = new ethers.JsonRpcProvider(
      providerRPC.EvmContainer.rpc, 
      {
        chainId: providerRPC.EvmContainer.chainId,
        name: providerRPC.EvmContainer.name,
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

### EVM Container Chain ID {: #chain-id }

The EVM ContainerChain has a [chain ID](https://chainlist.org/chain/5678){target=_blank} of: `5678`, which is `0x162E` in hex.

### Block Explorers {: #block-explorers }

For the EVM ContainerChain, you can use any of the following explorers:

- Ethereum API - on the [Moonbeam Expedition Explorer](https://moonbeam-explorer.netlify.app/){target=_blank} you can add a custom chain using the RPC endpoint for the EVM ContainerChain
- Substrate API - on [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss://fraa-dancebox-3001-rpc.a.dancebox.tanssi.network#/explorer){target=_blank}