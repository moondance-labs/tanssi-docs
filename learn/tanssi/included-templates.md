---
title: Appchain Templates Included in Tanssi
description: Tanssi protocol provides useful templates to start building your appchain, including a ready-to-use EVM template for Ethereum compatibility.
---

# Appchain Templates Included in Tanssi {: #appchain-templates-included-in-tanssi }

## Introduction {: #introduction }

Building a new appchain from scratch can be a daunting prospect. Fortunately, thanks to the [Appchain development framework](/learn/framework/overview){target=\_blank} used by Tanssi and its modular-oriented architecture, developers can leverage some pre-bundled appchain templates that help them jumpstart the process and benefit in some aspects, such as:

- **Head Start** - Tanssi appchain templates provide a starting point for your project, saving significant time and effort by providing a basic structure and a set of tested and ready-to-use functionalities. It allows developers to accelerate the construction of prototypes or minimum viable products (MVPs) and reduce the time to market

- **Consistency** - included Tanssi appchain templates follow established design patterns, coding standards, and best practices widely accepted among the Substrate developer community. They also provide a default set of architecture definitions to streamline blockchain development

- **UX** - Tanssi appchain templates cover the most demanded use cases, such as the EVM support for an Ethereum-compatible appchain

- **Customizability** - Tanssi appchain templates are a great starting point and are completely customizable. The functionalities and default configurations they include can be modified, replaced, or extended to meet the specific requirements of the use case

- **Upgrades and Compatibility** - Substrate is an evolving framework, with new features, enhancements, and bug fixes being regularly introduced. The provided Tanssi appchain templates are kept up-to-date with these upgrades

## Start Building an Appchain {: #start-building }

To start building an appchain to deploy in Tanssi, some useful Tanssi appchain templates to kick-start the development process are provided in the [official repository](https://github.com/moondance-labs/tanssi){target=\_blank}.

The process is as simple as:

1. Select one of the templates
2. Add the specific logic to adapt the runtime to the requirements of the use case
3. Deploy in Tanssi

![Using Templates to Speed Up the Developmet Process](/images/learn/tanssi/templates/templates-1.webp)

The two included templates are *Baseline Appchain Template* and *Baseline EVM Template*, which are presented in the following sections.

### Baseline Appchain Template {: #baseline-appchain-template }

As presented in the [Overview](/learn/tanssi/overview){target=\_blank} article, appchains deployed through Tanssi are fully sovereign, customizable Layer 1 solutions that leverage the benefits of becoming part of the wider Polkadot ecosystem.

As a sibling chain of the other members of the ecosystem (like the Tanssi network itself), they must include the necessary behavior to implement their consensus mechanism and be able to interact and synchronize with Polkadot's relay chain.

The Baseline Tanssi Appchain Template is based on the [Substrate Parachain Template](https://github.com/substrate-developer-hub/substrate-parachain-template){target=\_blank} featuring [Cumulus](https://github.com/paritytech/polkadot-sdk/tree/master/cumulus){target=\_blank} SDK, which includes all the required functionality for the block producers logic, p2p, database, and synchronization layers between the appchain and the relay chain, making the integration of a new appchain into the Polkadot ecosystem a breeze.

This template also includes Tanssi's [Author Noting](https://github.com/moondance-labs/tanssi/blob/master/pallets/author-noting/src/lib.rs){target=\_blank} pallet, which implements the logic for retrieving and validating the set of block producers assigned to provide block production services to the appchain. It also includes logic that allows a block producer to sign the block when the consensus mechanism determines that it is the block producer's turn to produce the block (and thus be rewarded accordingly).

### Baseline EVM (Ethereum Virtual Machine) Template {: #baseline-evm-template }

Extending the *Baseline Tanssi Appchain template*, this template provides not only Tanssi protocol support but also an EVM and full Ethereum compatibility.

Leveraging the [Frontier project](https://github.com/paritytech/frontier){target=\_blank}, this template includes an Ethereum compatibility layer for appchains to allow running unmodified Ethereum DApps.

Using this template, appchains support the deployment and running of any existing Smart Contract written in Solidity or Vyper with no changes. By emulating Ethereum block production and exposing the expected RPC interface, developers can also continue using the same tools like [Metamask](https://metamask.io){target=\_blank}, [Hardhat](https://hardhat.org){target=\_blank}, [Remix](https://remix.ethereum.org){target=\_blank}, [Foundry](https://github.com/foundry-rs/foundry){target=\_blank}, [Truffle](https://trufflesuite.com){target=\_blank}, and many more out of the box, with no extra adapters.

With this EVM template, developers can have a [Moonbeam](https://moonbeam.network){target=\_blank}-like appchain in no time and add their custom logic and features specific to their use case.
