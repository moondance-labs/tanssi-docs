---
title: Overview
description: Tanssi is an infrastructure protocol that simplifies the process of deploying decentralized appchains, allowing developers to focus on creating their product.
icon: octicons-home-24
categories: Basics
---

# What is Tanssi? {: #what-is-tanssi }

Tanssi is a decentralized appchain infrastructure protocol that allows developers to launch their appchain in minutes. In other words, Tanssi reduces the six-to-twelve-month setup process typically required for any team to go live with a new chain to minutes.

You can think of Tanssi as _AWS for appchains_. Instead of dealing with all the networking infrastructure yourself, Tanssi handles all the hurdles, allowing you to focus on building your application logic, growing your community, and other tasks essential to your product's success.

Security is another major pain point developers have to deal with, including sourcing the economic security, and bootstrapping and incentivizing a validator set. This is particularly challenging for projects in their early stages. All Tanssi-powered appchains benefit from Ethereum-grade security right from the start, and, by leveraging Tanssi's decentralized design, appchains don't have any single point of failure. 

Tanssi-powered appchains also benefit from a modular tech stack, providing ultimate control over the logic that powers the blockchain's runtime, offering an excellent way for projects to scale and build optimized solutions for their products. This complete control over the appchain's logic and governance mechanism suits perfectly a wide range of use cases, including DeFi Protocols, Real World Assets (RWA), Gaming Platforms, and others.

## The Problem with Appchains {: #the-problem-with-appchains }

Developers looking to build decentralized appchains typically have to deal with the following problems:

- **Complex Infrastructure Management**: appchain deployments typically demand handling numerous infrastructural components like bootstrapping sequencers, operators (also called validators), wallets, block explorers, oracles, indexers, RPC endpoints, and more. This is both time-consuming and resource-intensive.

- **Weak & Inefficient Security**: appchains commonly suffer from having small set of operators or weak economic security. Early-stage projects don't have enough economic backing to power a robust consensus mechanism. Moreover, developers often have to pay for full blockchain capacity validation even when they might not have achieved product-market fit, and blocks might be close to empty. This essentially means operators are being overpaid, and there is a large opportunity cost since those resources could be used elsewhere to develop the protocol.

- **Cross-Chain and Interoperability**: appchains inherently lack cross-chain capabilities to connect to other blockchain ecosystems. Furthermore, developing interoperability solutions requires specialized expertise and meticulous implementation.

- **Slow Time to Market**: the complexities of appchain infrastructure divert developer's focus from application logic, which is the key driver for intuitive interfaces and a seamless user experience, critical for adoption.

## What Tanssi Provides {: #what-tanssi-provides}

Tanssi addresses the most common appchain pain points by:

- **Sequencing as a Service**: appchains built with Tanssi have their blocks produced by Tanssi's incentivized workers. Tanssi guarantees the appchain's liveness by orchestrating a decentralized set of sequencers.

- **External Security Providers**: appchains deployed through Tanssi leverage security from a provider of choice (for example, [Symbiotic](https://symbiotic.fi/){target=\_blank} for Ethereum). The protocol is designed to finalize transactions deterministically in seconds through a decentralized set of operators.

- **Modular Blockchain Framework**: appchains built with Tanssi can use a modular blockchain framework called [Substrate](https://docs.polkadot.com/develop/parachains/intro-polkadot-sdk/){target=\_blank}, which enables developers to quickly and easily build optimized and customizable blockchains for any use case. Tanssi handles most infrastructural complexities, allowing developers to focus on their appchain's custom logic.

- **Key Integrations**: appchains built with Tanssi can access key infrastructural components alongside block production in a fully automated and standardized way. Tanssi-powered appchains come with built-in support for crucial tools such as wallets, block explorers, indexers, RPC providers, and more, saving developers the effort of dealing with these integrations. Additionally, appchains deployed through Tanssi can immediately leverage Cross-Consensus Messaging (XCM) upon launch, enabling instant bridging capabilities.

In summary, appchains deployed through Tanssi are sovereign Layer 1 solutions designed to be highly modular and interconnected, with a focus on simplifying the deployment process and enabling customization of the appchain itself. This empowers developers to bring their blockchain applications to market faster, securely, and with greater potential for integration and interaction within the broader blockchain ecosystems.

### Key Aspects of Tanssi {: #tanssi-key-aspects }

The following table summarizes the main problems Tanssi addresses:

| Aspect                 | The Challenge       | The Tanssi Solution                          |
|-------------------------|-----------------------------------------|--------------------------------------|
| Deployment Time         | 6-12 months setup time                  | Minutes to deploy, faster time to market                    |
| Block production         | - Bootstrap a set of nodes/High up-front-cost<br/>- Centralization<br/> | - Decentralized set of sequencers<br/>- Decentralized by design                    |
| Security | - Bootstrap economic security<br/> - Weak security  | - Ethereum-grade security from the start     |
| Finality/Settlement | - Probabilistic<br/> - Takes minutes or days  | - Deterministic<br/>- Takes seconds     |
| Cost | - High up-front cost  | - Pay-as-you-go model     |
| Customizability | - Limited  | - Fully sovereign<br/> - Modular framework<br/>- Full runtime customizability<br/>- Freedom to choose the governance mechanism     |
| Integrations and tooling | - Time consuming  | - Essential tools available from the start     |

## General Architecture of Tanssi & Tanssi-powered Appchains {: #tanssi-architecture }

As previously discussed, appchains deployed through Tanssi are sovereign and customizable blockchains which, among other features, leverage sequencing as a service and inherit block finality from an external security provider.

A high-level overview of the architecture is presented below, featuring [Symbiotic](https://symbiotic.fi/){target=\_blank} as the security provider.

![High-level overview of an appchain & Tanssi](/images/learn/tanssi/overview/overview-1.webp)

The Tanssi protocol manages and orchestrates a decentralized set of sequencers assigned to provide block production services to Tanssi-powered appchains. The sequencers execute transactions and include them in blocks, which the security provider's operators then proceed to validate. Symbiotic operators offer Ethereum-grade economic security through its restaking protocol. The mechanism of how this works is explained in two separate articles: [Block Production Services](/learn/tanssi/network-services/block-production/){target=\_blank} and [Ethereum with Symbiotic](/learn/tanssi/external-security-providers/symbiotic/){target=\_blank}.

While the sequencers providing block production services are rotated and reassigned to a different appchain upon every session change, each appchain will have its own set of Data Preservers running full archive nodes, ensuring data availability. These Data Preservers will provide the RPC infrastructure for apps and users interacting with Tanssi-powered appchains.

![Data Preservers of an appchain & Tanssi](/images/learn/tanssi/overview/overview-2.webp)

## What's Next? {: #whats-next }

- Head to the [Tanssi dApp](https://apps.tanssi.network){target=\_blank} and launch your appchain
- Interact with a live Tanssi-powered appchain: the [Tanssi Demo EVM appchain](/builders/tanssi-network/testnet/demo-evm-network/){target=\_blank}
