---
title: Overview
description: Tanssi is an infrastructure protocol that simplifies the process of deploying decentralized appchains, allowing developers to focus on creating their product.
icon: octicons-home-24
categories: Basics
---

# What is Tanssi? {: #what-is-tanssi }

Tanssi is a decentralized appchain infrastructure protocol that allows developers to launch their appchain in minutes. In other words, Tanssi reduces the six-to-twelve-month setup process typically required for any team to go live with a new chain to minutes.

You can think of Tanssi as _AWS for appchains_. Instead of dealing with all the networking infrastructure yourself, Tanssi handles all the hurdles, allowing you to focus on building your application logic, growing your community, and other tasks essential to your product's success.

Security is another major pain point that developers have to deal with, taking on the responsibility of sourcing economic security and bootstrapping a validator set, which can be particularly challenging for projects in their early stages. All Tanssi-powered appchains benefit from Ethereum-grade security right from the start, and by leveraging Tanssi's decentralized design, appchains aren't exposed to single points of failure. 

Tanssi-powered appchains also benefit from a modular tech stack, providing ultimate control over the logic that powers the blockchain's runtime, offering an excellent way for projects to scale and build optimized solutions for their products. This complete control over the appchain's logic and governance mechanism suits perfectly a wide range of use cases, including DeFi Protocols, Real World Assets (RWA), Gaming Platforms, and others.

## The Problem with Appchains {: #the-problem-with-appchains }

Developers looking to build decentralized appchains typically have to deal with the following problems:

- **Complex Infrastructure Management**: Appchain deployments typically require handling numerous infrastructural components, including bootstrapping sequencers, operators (also known as validators), wallets, block explorers, oracles, indexers, RPC endpoints, and more. Properly managing these components are both time-consuming and resource-intensive.

- **Weak & Inefficient Security**: Appchains commonly suffer from having a small set of operators or weak economic security. Early-stage projects often lack sufficient economic backing to support a robust consensus mechanism. Moreover, developers often have to pay for full blockchain capacity validation even when they might not have achieved product-market fit, and blocks might be close to empty. This essentially means that operators are being overpaid, and there is a significant opportunity cost, as those resources could be used elsewhere to develop the protocol.

- **Cross-Chain and Interoperability**:  Appchains inherently lack cross-chain capabilities, which prevents them from connecting to other blockchain ecosystems. Furthermore, developing interoperability solutions requires specialized expertise and meticulous implementation.

- **Slow Time to Market**: The complexities of appchain infrastructure divert developers' focus from application logic, which is the key driver for intuitive interfaces and a seamless user experience, critical for adoption.

## What Tanssi Provides {: #what-tanssi-provides}

Tanssi addresses the most common appchain pain points by:

- **Sequencing as a Service**: Appchains built with Tanssi have their blocks produced by Tanssi's incentivized workers. Tanssi guarantees the appchain's liveness by orchestrating a decentralized set of sequencers.

- **Economic Security Through External Providers**: Appchains deployed through Tanssi leverage security from a provider of choice (for example, [Symbiotic](https://symbiotic.fi/){target=\_blank} for Ethereum). The protocol is designed to finalize transactions deterministically in seconds through a decentralized set of operators.

- **Tanssi/Ethereum Bridge**: Move liquidity to and from Ethereum using the [built-in bridge](/learn/tanssi/tanssi-ethereum-bridge/){target=\_blank} based on Snowbridge.

- **Key Integrations**: Appchains built with Tanssi can access key infrastructural components alongside block production in a fully automated and standardized way. Tanssi-powered appchains come with built-in support for essential tools, including wallets, block explorers, indexers, RPC providers, and more, saving developers the effort of integrating these components. 

- **Modular Blockchain Framework**: Appchains built with Tanssi can use a modular blockchain framework called [Substrate](https://docs.polkadot.com/develop/parachains/intro-polkadot-sdk/){target=\_blank}, which enables developers to quickly and easily build optimized and customizable blockchains for any use case. Tanssi handles most infrastructural complexities, allowing developers to focus on their appchain's custom logic.

In summary, appchains deployed through Tanssi are sovereign Layer 1 solutions designed to be highly modular and interconnected, with a focus on simplifying the deployment process and enabling customization of the appchain itself. This empowers developers to bring their blockchain applications to market faster, securely, and with greater potential for integration and interaction within the broader blockchain ecosystems.

### Key Aspects of Tanssi {: #tanssi-key-aspects }

The following table summarizes the main benefits Tanssi brings to your project:

| Aspect                   | The Tanssi Solution                                                                                                               |
|--------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| Deployment Time          | - Minutes to deploy<br/> - Faster time to market                                                                                          |
| Block production         | - Sequencing as a service<br/>- Decentralized set of sequencers by design                                                         |
| Security                 | - Ethereum-grade security from the start                                                                                          |
| Finality/Settlement      | - Deterministic<br/>- Finality in seconds                                                                                         |
| Cost                     | - Registration bond + Pay-as-you-go model                                                                                         |
| Customizability          | - Choose the governance mechanism that best suits your project<br/> - Modular framework<br/>- Full runtime customizability<br/> |
| Integrations and tooling | - Essential tools available from the start                                                                                        |

## General Architecture of Tanssi & Tanssi-powered Appchains {: #tanssi-architecture }

As previously discussed, appchains deployed through Tanssi are sovereign and customizable blockchains that, among other features, leverage sequencing as a service and inherit block finality from an external security provider.

A high-level overview of the architecture is presented below, featuring [Symbiotic](https://symbiotic.fi/){target=\_blank} as the security provider.

![High-level overview of an appchain & Tanssi](/images/learn/tanssi/overview/overview-1.webp)

The Tanssi protocol manages and orchestrates a decentralized set of sequencers assigned to provide block production services to Tanssi-powered appchains. The sequencers execute transactions and include them in blocks, which the security provider's operators then proceed to validate. Symbiotic's restaking protocol allows its operators to offer Ethereum-grade economic security. The mechanism of how this works is explained in two separate articles: [Block Production Services](/learn/tanssi/network-services/block-production/){target=\_blank} and [Ethereum with Symbiotic](/learn/tanssi/external-security-providers/symbiotic/){target=\_blank}.

While the sequencers providing block production services are rotated and reassigned to a different appchain upon every session change, each appchain will have its own set of Data Preservers running full archive nodes, ensuring data availability. These Data Preservers will provide the RPC infrastructure for apps and users interacting with Tanssi-powered appchains.

![Data Preservers of an appchain & Tanssi](/images/learn/tanssi/overview/overview-2.webp)

## What's Next? {: #whats-next }

- Head to the [Tanssi dApp](https://apps.tanssi.network){target=\_blank} and launch your appchain.
- Interact with a live Tanssi-powered appchain: the [Tanssi Demo EVM appchain](/builders/tanssi-network/testnet/demo-evm-network/){target=\_blank}.
