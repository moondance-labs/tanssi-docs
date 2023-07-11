---
title: Templates Included in Tanssi
description: Tanssi protocol provides useful templates to start building your Appchain, including a ready-to-use EVM template for Ethereum compatibility.
---

# Templates Included in Tanssi {: #templates-included-in-tanssi } 

## Introduction {: #introduction } 

Initialize a new repository and start building a new ContainerChain from scratch can be a daunting prospect, but, fortunately, Tanssi includes templates that help developers to jumpstart the process and benefit in some aspects, such as:

- **Head start** - templates provide a starting point for your project, saving significant time and effort by providing a basic structure and a set of tested and ready-to-use functionalities. It allows developers to accelerate the construction of prototypes or minimum viable products (MVPs) and reduce the time to market

- **Consistency** - included templates follow established design patterns, coding standards, and best practices widely accepted among the Substrate developers community. They also provide a default set of architecture definitions to streamline the blockchain development

- **UX** - templates cover the most demanded use cases, such as the EVM support for an Ethereum-compatible ContainerChain

- **Customizability** - templates are a great starting point and are completely customizable. The functionalities and default configurations they include can be modified, replaced, or extended to meet the specific requirements of the use case

- **Upgrade and Compatibility** - Substrate is an evolving framework, with new features, enhancements, and bug fixes being regularly introduced, and the provided Tanssi templates are kept up to date with these upgrades

## Start building a ContainerChain {: #start-building } 

To start building a ContainerChain to deploy in Tanssi, some useful templates to kick-start the development process are provided in the [official repository](https://github.com/moondance-labs/tanssi){target=blank}:

- **Simple Template** - this node template is based on the [parachain Substrate template](https://github.com/substrate-developer-hub/substrate-parachain-template){target=_blank} featuring [Cumulus](https://github.com/paritytech/cumulus/){target=blank} to allow the ContainerChain to work properly in the Polkadot ecosystem. It also includes Tanssi's own pallets to support the protocol and some other basic pallets such as *pallet-balances* for currency operations

- **Ethereum Virtual Machine** - this node template is based on [Frontier](https://github.com/paritytech/frontier){target=_blank}, a project that adds an Ethereum compatibility layer for Substrate. This template provides not only Tanssi protocol support but an EVM and full Ethereum support (exposing the expected RPC endpoints and emulating Ethereum's block production mechanism) allowing existing DApps to be deployed and run smoothly on your Substrate Appchain and seamlessly integrate and use popular tools such as [MetaMask](https://metamask.io){target=blank}, [Truffle](https://trufflesuite.com){target=blank}, [Remix](https://remix.ethereum.org){target=blank}, block explorers and many other

With the EVM template, developers can have a [Moonbeam](https://moonbeam.network){target=blank}-like ContainerChain in no time and add their custom logic and features specific to the use case.
