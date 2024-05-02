---
title: Get Started with Dancebox
description: Dancebox is the Tanssi TestNet, and it is the easiest way to get started with the Tanssi Network to deploy your Substrate or EVM-compatible appchain.
---

# Get Started with Dancebox

## Introduction

Dancebox is the first public Tanssi TestNet and is designed to streamline the deployment of appchains. It allows teams to swiftly onboard and launch their appchains within minutes, providing a robust environment for testing and development.

This quick reference page offers all the essentials you need to get started on Dancebox.

## TestNet Tokens {: #testnet-tokens }

DANCE tokens serve as the native currency within the Dancebox Network. To initiate the deployment of an appchain on Dancebox, you'll need to obtain DANCE tokens. Follow these steps:

1. Visit the [Tanssi Network](https://www.tanssi.network/claim-dance-tokens/){target=\_blank} website
2. Complete the form by providing basic information and your Substrate-based address
3. Within one business day of submitting the form, you'll receive DANCE tokens for testing

!!! note
    DANCE tokens have no value. Please don't submit unnecessary requests.

## Network Endpoints {: #dancebox-network-endpoints }

Dancebox has two types of endpoints available for users to connect to: one for HTTPS and one for WSS.

=== "HTTPS"

    ```text
    https://{{ networks.dancebox.dns_name }}/
    ```

=== "WSS"

    ```text
    wss://{{ networks.dancebox.dns_name }}
    ```

## Block Explorers {: #dancebox-block-explorers }

For Dancebox, you can use the following block explorer:

- [Dancebox Subscan](https://dancebox.subscan.io/){target=\_blank}
- [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancebox.dns_name }}#/explorer/){target=\_blank}

Support for additional block explorers is in the works and as more explorers support Dancebox, this section will be updated accordingly.
