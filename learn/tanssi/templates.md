---
title: Appchain Templates Included in Tanssi
description: Tanssi protocol provides useful templates to start building your Appchain, including a ready-to-use EVM template for Ethereum compatibility.
---

# Appchain Templates Included in Tanssi {: #appchain-templates-included-in-tanssi } 

## Introduction {: #introduction } 

Building a new ContainerChain from scratch can be a daunting prospect. Fortunately, thanks to the [Appchain development framework](/learn/framework/overview){target=_blank} used by Tanssi and its modular-oriented architecture, developers can leverage some pre-bundled Appchain templates that help them jumpstart the process and benefit in some aspects, such as:

- **Head Start** - Appchain templates provide a starting point for your project, saving significant time and effort by providing a basic structure and a set of tested and ready-to-use functionalities. It allows developers to accelerate the construction of prototypes or minimum viable products (MVPs) and reduce the time to market

- **Consistency** - included Appchain templates follow established design patterns, coding standards, and best practices widely accepted among the Substrate developer community. They also provide a default set of architecture definitions to streamline blockchain development

- **UX** - Appchain templates cover the most demanded use cases, such as the EVM support for an Ethereum-compatible ContainerChain

- **Customizability** - Appchain templates are a great starting point and are completely customizable. The functionalities and default configurations they include can be modified, replaced, or extended to meet the specific requirements of the use case

- **Upgrades and Compatibility** - Substrate is an evolving framework, with new features, enhancements, and bug fixes being regularly introduced. The provided Tanssi Appchain templates are kept up-to-date with these upgrades

## Start building a ContainerChain {: #start-building } 

To start building a ContainerChain to deploy in Tanssi, some useful Appchain templates to kick-start the development process are provided in the [official repository](https://github.com/moondance-labs/tanssi){target=blank}.

The process is as simple as:

1. Select one of the templates
2. Add the specific logic to adapt the runtime to the requirements of the use case
3. Deploy in Tanssi

![Using Templates to Speed Up the Developmet Process](/images/learn/tanssi/templates/templates-1.png)

The two included templates are *Simple* and *EVM*, which are presented in the following sections.

### Simple Template  {: #simple-template } 

As presented in the [Overview](/learn/tanssi/overview) article, Appchains deployed through Tanssi (ContainerChains) are fully sovereign customizable Layer 1 solutions that leverage the benefits of becoming part of the wider Polkadot ecosystem.

As a sibling chain of the other members of the ecosystem (like Tanssi network itself), they must include the necessary behavior to implement their consensus mechanism and be able to interact and synchronize with Polkadot's relay chain.

Simple Appchain template is based on the [parachain Substrate template](https://github.com/substrate-developer-hub/substrate-parachain-template){target=_blank} featuring [Cumulus](https://github.com/paritytech/cumulus/){target=blank} SDK, which includes all the required functionality for the collators logic, p2p, database, and synchronization layers between the ContainerChain and the relay chain, making the integration of a new ContainerChain into the Polkadot ecosystem a breeze.

This template also includes Tanssi's pallet [authorities_noting](https://github.com/moondance-labs/tanssi/blob/master/container-chains/pallets/authorities-noting/src/lib.rs){target=blank} to support the protocol, implementing the necessary logic to retrieve and validate the collators set assigned to provide block production services to the ContainerChain, and the logic for the collator to sign the block when the consensus mechanism determines that it is its turn to build it (and thus being rewarded accordingly).

### Ethereum Virtual Machine Template {: #evm-template } 

Extending the *Simple template*, this Appchain template provides not only Tanssi protocol support but an EVM and full Ethereum compatibility.

Leveraging the [Frontier project](https://github.com/paritytech/frontier){target=_blank}, this template includes an Ethereum compatibility layer for ContainerChains to allow running unmodified Ethereum DApps. 

Using this template, Containerchains support to deploy and run any existing Smart Contract written in Solidity or Vyper languages with no changes, and by emulating Ethereum block production and exposing the expected RPC interface, developers can also continue using the same tools like [Metamask](https://metamask.io){target=blank}, [Hardhat](https://hardhat.org){target=blank}, [Remix](https://remix.ethereum.org){target=blank}, [Foundry](https://github.com/foundry-rs/foundry){target=blank}, [Truffle](https://trufflesuite.com){target=blank}, and many more out of the box, with no extra adapters.

With this EVM template, developers can have a [Moonbeam](https://moonbeam.network){target=blank}-like ContainerChain in no time and add their custom logic and features specific to the use case.
