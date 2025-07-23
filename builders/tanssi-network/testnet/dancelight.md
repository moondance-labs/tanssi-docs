---
title: Get Started with Dancelight
description: Dancelight is the Tanssi TestNet, and it is the easiest way to get started with the Tanssi Network to deploy your Substrate or EVM-compatible appchain.
icon: octicons-star-24
categories: Basics
---

# Get Started with Dancelight

## Introduction

Dancelight is the first public Tanssi TestNet and is designed to streamline the deployment of decentralized networks. It allows teams to swiftly onboard and launch their appchains within minutes, providing a robust environment for testing and development.

This quick reference page offers all the essentials you need to get started on Dancelight.

## TestNet Tokens {: #testnet-tokens }

{{ networks.dancelight.token_symbol }} tokens serve as the native currency within the Dancelight Network. To initiate the deployment of a network on Dancelight, you'll need to obtain {{ networks.dancelight.token_symbol }} tokens. Follow these steps:

1. Visit the [Tanssi Network](https://www.tanssi.network/claim-dance-tokens){target=\_blank} website.
2. Complete the form by providing basic information and your Substrate-based address.
3. Within one business day of submitting the form, you'll receive {{ networks.dancelight.token_symbol }} tokens for testing.

!!! note
    {{ networks.dancelight.token_symbol }} tokens have no value. Please don't submit unnecessary requests.

## Network Endpoints {: #dancelight-network-endpoints }

Dancelight has two types of endpoints available for users to connect to: one for HTTPS and one for WSS.

=== "HTTPS"

    ```text
    https://{{ networks.dancelight.dns_name }}
    ```

=== "WSS"

    ```text
    wss://{{ networks.dancelight.dns_name }}
    ```

## Block Explorers {: #dancelight-block-explorers }

For Dancelight, you can use the following block explorer:

- [Dancelight Subscan]({{ networks.dancelight.subscan_url }}){target=\_blank}
- [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancelight.dns_name }}#/explorer){target=\_blank}

Support for additional block explorers is in the works and as more explorers support Dancelight, this section will be updated accordingly.
