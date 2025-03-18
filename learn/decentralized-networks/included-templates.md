---
title: Network Templates Included in Tanssi
description: Tanssi protocol provides useful templates to start building your decentralized network, including a ready-to-use EVM template for Ethereum compatibility.
icon: octicons-copy-24
---

# Network Templates Included in Tanssi {: #network-templates-included-in-tanssi }

## Introduction {: #introduction }

Building a new network from scratch can be a daunting prospect. Fortunately, thanks to the [network development framework](/learn/framework/overview/){target=\_blank} used by Tanssi and its modular-oriented architecture, developers can leverage some pre-bundled network templates that help them jumpstart the process and benefit in some aspects, such as:

- **Head Start** - Tanssi network templates provide a starting point for your project, saving significant time and effort by providing a basic structure and a set of tested and ready-to-use functionalities. It allows developers to accelerate the construction of prototypes or minimum viable products (MVPs) and reduce the time to market

- **Consistency** - included Tanssi network templates follow established design patterns, coding standards, and best practices widely accepted among the developer community. They also provide a default set of architecture definitions to streamline blockchain development

- **UX** - Tanssi network templates cover the most demanded use cases, such as the EVM support for an Ethereum-compatible network

- **Customizability** - Tanssi network templates are a great starting point and are completely customizable. The functionalities and default configurations they include can be modified, replaced, or extended to meet the specific requirements of the use case

- **Upgrades and Compatibility** - Tanssi is built on top of an evolving framework, with new features, enhancements, and bug fixes being regularly introduced. The provided Tanssi network templates are kept up-to-date with these upgrades

## Start Building a Network {: #start-building }

To start building a decentralized network to deploy in Tanssi, some useful Tanssi network templates to kick-start the development process are provided in the [official repository](https://github.com/moondance-labs/tanssi){target=\_blank}.

The process is as simple as:

1. Select one of the templates
2. Add the specific logic to adapt the runtime to the requirements of the use case
3. Deploy in Tanssi

![Using Templates to Speed Up the Developmet Process](/images/learn/decentralized-networks/templates/templates-1.webp)

The two included templates are the *baseline network template* and the *baseline EVM template*, which are presented in the following sections.

### Baseline Network Template {: #baseline-network-template }

As presented in the [Overview](/learn/tanssi/overview/){target=\_blank} article, networks deployed through Tanssi are fully sovereign and customizable blockchains.

As part of the Tanssi ecosystem, networks must include the essential components to implement the consensus mechanism and be able to interact and synchronize with the security provider of their choice (for example, [Symbiotic](https://symbiotic.fi/){target=\_blank} on Ethereum). The baseline Tanssi network template includes all the necessary functionality for the block producers logic, p2p, database, and synchronization layers between the network and the security provider, allowing developers to focus solely on customizing their product.

This template also includes Tanssi's [Author Noting](https://github.com/moondance-labs/tanssi/blob/master/pallets/author-noting/src/lib.rs){target=\_blank} module, which implements the logic for retrieving and validating the set of sequencers assigned to provide block production services to the network. It also includes logic that allows a sequencer to sign the block when the consensus mechanism determines that it is the sequencer's turn to produce the block (and thus be rewarded accordingly).

The source code for this template is public and accessible on the [Tanssi GitHub repository](https://github.com/moondance-labs/tanssi/blob/master/chains/container-chains/runtime-templates/simple/src/lib.rs){target=\_blank}.

### Baseline EVM (Ethereum Virtual Machine) Template {: #baseline-evm-template }

Extending the [baseline Tanssi network template](#baseline-network-template), this template provides not only Tanssi protocol support but also an EVM and full Ethereum compatibility.

Leveraging a set [EVM-specific modules](https://github.com/paritytech/frontier){target=\_blank}, this template includes an Ethereum compatibility layer for networks to allow running unmodified Ethereum dApps.

Using this template, networks support the deployment and running of any existing smart contract written in Solidity or Vyper with no changes. By emulating Ethereum block production and exposing the expected RPC interface, developers can also continue using the same tools like [Metamask](https://metamask.io){target=\_blank}, [Hardhat](https://hardhat.org){target=\_blank}, [Remix](https://remix.ethereum.org){target=\_blank}, [Foundry](https://github.com/foundry-rs/foundry){target=\_blank}, and many more out of the box, with no extra adapters.

With this EVM template, developers can deploy a [Moonbeam](https://moonbeam.network){target=\_blank}-like network in no time and add their custom logic and features specific to their use case.

The source code for this template is public and accessible on the [Tanssi GitHub repository](https://github.com/moondance-labs/tanssi/blob/master/chains/container-chains/runtime-templates/frontier/src/lib.rs){target=\_blank}.