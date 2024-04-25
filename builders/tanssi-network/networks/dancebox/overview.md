---
title: Get Started with Dancebox
description: Dancebox is the Tanssi TestNet, and it is the easiest way to get started with the Tanssi Network to deploy your Substrate or EVM-compatible appchain.
---

# Get Started with Dancebox

## Introduction

Dancebox is the first public Tanssi TestNet, allowing teams to onboard and get their appchains up and running in minutes.

To get an appchain deployed through Tanssi, after [getting the required tokens](#get-testnet-tokens), just follow the [registration steps in the Dapp](/builders/deploy/dapp/){target=\_blank}.

## Get TestNet Tokens {: #get-testnet-tokens }

You can request DANCE tokens by completing a [form on the Tanssi network website](https://www.tanssi.network/claim-dance-tokens){target=\_blank} and providing basic information and your Substrate-based address. Within one business day, you'll receive DANCE tokens for testing.

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
- [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss://{{ networks.dancebox.dns_name }}#/explorer){target=\_blank}

Support for additional block explorers is in the works and as more explorers support Dancebox, this section will be updated accordingly.

