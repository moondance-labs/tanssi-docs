---
title: Get Started with Tanssi MainNet
description: The Tanssi Network MainNet is live, allowing developers to leverage the decentralized protocol to launch appchains with Ethereum-grade security in minutes.
icon: octicons-star-24
---

# Get Started with the Tanssi Network MainNet

## Introduction

Tanssi Network MainNet is live, allowing developers to swiftly onboard and launch their appchains within minutes.

This quick reference page offers all the essentials you need to get started on the Tanssi Network.

## TANSSI Token {: #tanssi-token }

{{ networks.mainnet.token_symbol }} tokens serve as the native currency within the Tanssi Network. To initiate the deployment of a network on Tanssi, you'll need to obtain {{ networks.mainnet.token_symbol }} tokens.

## Network Endpoints {: #tanssi-network-endpoints }

Tanssi MainNet has two types of endpoints available for users to connect to: one for HTTPS and one for WSS.

=== "HTTPS"

    ```text
    https://{{ networks.mainnet.dns_name }}/
    ```

=== "WSS"

    ```text
    wss://{{ networks.mainnet.dns_name }}
    ```

## Block Explorers {: #tanssi-block-explorers }

For Tanssi MainNet, you can use the following block explorer:

- [Tanssi Network Subscan]({{ networks.mainnet.subscan_url }}){target=\_blank}
- [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss://{{ networks.mainnet.dns_name }}#/explorer){target=\_blank}

Support for additional block explorers is in the works and as more explorers support Tanssi MainNet, this section will be updated accordingly.
