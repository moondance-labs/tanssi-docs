---
title: Overview
description: Tanssi is an infrastructure protocol that eases the process of deploying decentralized networks so that developers can focus on their custom application logic.
---

# What is Tanssi? {: #what-is-tanssi }

Tanssi is a network infrastructure protocol that makes deploying blockchains with custom logic specific to certain types of applications significantly easier than what is available today.

Networks provide the ultimate control over the logic that powers the runtime of the blockchain. Consequently, they offer an excellent way for projects to scale and build optimized solutions for their products, resulting in a superior user experience.

Securing a new network is a major feat, but Tanssi allows your network to connect with external security providers like [Symbiotic](https://symbiotic.fi/){target=\_blank}, ensuring Ethereum-grade security right from the start.

## The Problem with Networks {: #the-problem-with-networks}

Developers looking to build decentralized networks typically have to deal with the following problems:

- **Complex Infrastructure Management** - network deployments typically demand handling numerous infrastructural components like bootstrapping sequencers, validators, wallets, block explorers, oracles, indexers, RPC endpoints, and more. This is both time-consuming and resource-intensive

- **Weak & Inefficient Security** - networks commonly suffer from having small set of validators or weak economic security. Early-stage networks don't have enough economic backing to power a robust consensus mechanism. Moreover, developers often have to pay for full blockchain capacity validation even when they might not have achieved product-market fit, and blocks might be close to empty. This essentially means validators are being overpaid, and there is a large opportunity cost since those resources could be used elsewhere to develop the protocol

- **Cross-Chain and Interoperability** - networks inherently lack cross-chain capabilities to connect to other blockchain ecosystems. Furthermore, developing interoperability solutions requires specialized expertise and meticulous implementation

- **Slow Time to Market** - the complexities of network infrastructure divert developer's focus from application logic, which is the key driver for intuitive interfaces and a seamless user experience, critical for adoption

## What Tanssi Provides {: #what-tanssi-provides}

Tanssi addresses the most common network problems by:

- **Block Production as a Service** - networks built with Tanssi have their blocks produced by Tanssi's incentivized workers. Tanssi guarantees the liveness of the network and a decentralized set of sequencers

- **External Security Providers** -  networks deployed through Tanssi leverage security from a provider of choice (for example, [Symbiotic](https://symbiotic.fi/){target=\_blank} for Ethereum). The protocol is designed to finalize transactions deterministically in seconds through a decentralized set of validators

- **Modular Blockchain Framework** - networks built with Tanssi can use a modular blockchain framework called [Substrate](https://substrate.io){target=\_blank}, which enables developers to quickly and easily build optimized and customizable blockchains for any use case. Tanssi handles most infrastructural complexities, allowing developers to focus on their network's custom logic

- **Key Integrations** - networks built with Tanssi can access key infrastructural components alongside block production in a fully automated and standardized way. Tanssi-powered networks come with built-in support for crucial tools such as wallets, block explorers, indexers, RPC providers, and more, saving developers the effort of managing these integrations. Additionally, networks deployed through Tanssi can immediately leverage Cross-Consensus Messaging (XCM) upon launch, enabling instant bridging capabilities

In summary, networks deployed through Tanssi are Layer 1 solutions designed to be highly modular and interconnected, with a focus on simplifying the deployment process and enabling customization of the network itself. This empowers developers to bring their blockchain applications to market faster, securely, and with greater potential for integration and interaction within the broader blockchain ecosystems.

## General Architecture of Tanssi & Tanssi-powered Networks {: #tanssi-architecture}

As previously discussed, networks deployed through Tanssi are customizable blockchains which, among other features, have block production as a service and inherit block finality from the chosen security provider.

A high-level overview of what a network looks like in the ecosystem is presented below, featuring [Symbiotic](https://symbiotic.fi/){target=\_blank} as the security provider.

![High-level overview of a network & Tanssi](/images/learn/tanssi/overview/dark-overview-1.webp#only-dark)
![High-level overview of a network & Tanssi](/images/learn/tanssi/overview/light-overview-1.webp#only-light)

The Tanssi protocol manages and orchestrates a decentralized set of sequencers assigned to provide block production services to Tanssi-powered networks. The sequencers execute transactions and include them in blocks, which the security provider's operators then proceed to validate. Symbiotic operators offer Ethereum-grade economic security through its restaking protocol. The mechanism of how this works is explained in two separate articles: [Block Production Services](/learn/tanssi/network-services/block-production/){target=\_blank} and [Ethereum with Symbiotic](/learn/tanssi/external-security-providers/symbiotic/){target=\_blank}.

While the sequencers providing block production services are rotated and reassigned to a different network upon every session change, each network will have its own set of Data Preservers running full archive nodes, ensuring data availability. These Data Preservers will provide the RPC infrastructure for apps and users interacting with Tanssi networks.

![Data Preservers of a network & Tanssi](/images/learn/tanssi/overview/dark-overview-2.webp#only-dark)
![Data Preservers of a network & Tanssi](/images/learn/tanssi/overview/light-overview-2.webp#only-light)