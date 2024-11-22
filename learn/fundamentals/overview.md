---
title: Overview
description: Tanssi is an appchain protocol that eases the process of deploying appchains so that developers can focus on their custom application logic.
---

# What is Tanssi? {: #what-is-tanssi }

Tanssi is an appchain infrastructure protocol that makes deploying blockchains with custom logic specific to certain types of applications significantly easier than what is available today.

Appchains provide the ultimate control over the logic that powers the runtime of the blockchain. Consequently, they offer an excellent way for projects to scale and build optimized solutions for their products, resulting in a superior user experience.

## The Problem with Appchains {: #the-problem-with-appchains}

Developers looking to build appchains typically have to deal with the following problems:

- **Complex Infrastructure Management** - appchain deployments typically demand handling numerous infrastructural components like bootstrapping block producers, validators, wallets, block explorers, oracles, indexers, RPC endpoints, and more. This is both time-consuming and resource-intensive

- **Weak & Inefficient Security** - appchains commonly suffer from having small or weak validator sets. Early-stage appchains don't have enough economic backing to power a robust consensus mechanism. Moreover, developers often have to pay for full blockchain capacity validation even when they might not have achieved product-market fit, and blocks might be close to empty. This essentially means validators are being overpaid, and there is a large opportunity cost since those resources could be used elsewhere to develop the protocol

- **Cross-Chain and Interoperability** - appchains inherently lack cross-chain capabilities to connect to other blockchain ecosystems. Furthermore, developing interoperability solutions requires specialized expertise and meticulous implementation

- **Slow Time to Market** - the complexities of appchain infrastructure divert developer's focus from application logic, which is the key driver for intuitive interfaces and a seamless user experience, critical for adoption

## What Tanssi Provides {: #what-tanssi-provides}

Tanssi addresses the most common appchain problems by:

- **Block Production as a Service** - appchains built with Tanssi have their blocks produced by Tanssi's incentivized workers (block-producers). Tanssi guarantees the liveness of the appchain and a decentralized set of block-producers

- **Consensus on Demand** -  appchains deployed through Tanssi are not Layer 2 solutions, as they inherit block finality (consensus) from Polkadot, either on a continuous basis ([Parachain](https://wiki.polkadot.network/docs/learn-parachains){target=\_blank}), or on a per block model ([on-demand Parachain](https://wiki.polkadot.network/docs/learn-parathreads){target=\_blank}). Consequently, appchains built with Tanssi, as Layer 1 solutions, will have access to a robust consensus mechanism from the genesis block

- **Modular Blockchain Framework** - appchains built with Tanssi can use a modular blockchain framework called [Substrate](https://substrate.io){target=\_blank}, which enables developers to quickly and easily build optimized and customizable blockchains for any use case. Tanssi handles most infrastructural complexities, allowing developers to focus on their appchain's custom logic

- **Key Integrations** - appchains built with Tanssi can access key infrastructural components alongside block production in a fully automated and standardized way. Because these appchains are built with [Substrate](https://substrate.io){target=\_blank}, crucial tools like wallets, block explorers, indexers, RPC providers, and others are supported out of the box, so developers don't have to spend time dealing with these integrations themselves. Furthermore, appchains deployed through Tanssi can leverage Cross-Consensus Messaging (XCM) as soon as they launch to get connectivity to other chains within the ecosystem like Moonbeam, which in turn will indirectly connect these chains to multiple interoperability protocols such as Axelar, LayerZero, Wormhole, and Hyperlane, allowing them to connect to other blockchain ecosystems like Ethereum, Avalanche, Arbitrum, BNB, and many more

In summary, appchains deployed through Tanssi are Layer 1 solutions designed to be highly modular and interconnected, with a focus on simplifying the deployment process and enabling customization of the appchain itself. This empowers developers to bring their blockchain applications to market faster, securely, and with greater potential for integration and interaction within the broader blockchain ecosystems.

## General Architecture of Tanssi & Appchains {: #tanssi-architecture}

As previously discussed, appchains deployed through Tanssi are customizable blockchains which, among other features, have block production as a service and inherit block finality (consensus) from Polkadot. Consequently, they act as Layer 1 blockchains like Moonbeam, not Layer 2 solutions on top of another Layer 1.

A high-level overview of what an appchain looks like in the ecosystem is presented below.

![High-level overview of an appchain & Tanssi](/images/learn/tanssi/overview/dark-overview-1.webp#only-dark)
![High-level overview of an appchain & Tanssi](/images/learn/tanssi/overview/light-overview-1.webp#only-light)

One of the core differences between a normal Parachain and a Tanssi-powered appchain is that its block producers (also known as collators) are a subset of Tanssi's. In short, this is possible due to Polkadot's unique architecture, as Tanssi and all of the appchains share a common consensus mechanism. Consequently, each chain can retrieve information from other chains in a trustless and decentralized manner, as it is part of the consensus. The mechanism of how this works is explained in a separate [technical overview of Tanssi](/learn/tanssi/technical-features/){target=\_blank}.

While a block producer simultaneously executes blocks from Tanssi and the appchain that was assigned to it, Tanssi and each appchain will have their own set of Data Preservers running full archive nodes for each chain. These Data Preservers will provide the RPC infrastructure for apps and users interacting with Tanssi and appchains.

![Data Preservers of an appchain & Tanssi](/images/learn/tanssi/overview/dark-overview-2.webp#only-dark)
![Data Preservers of an appchain & Tanssi](/images/learn/tanssi/overview/light-overview-2.webp#only-light)