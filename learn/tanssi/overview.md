---
title: Overview
description: Tanssi is an Appchain protocol that eases the process of deploying Appchains so that developers can focus on their custom application logic.
---

# What is Tanssi? {: #what-is-tanssi } 

Tanssi is an Appchain infrastructure protocol that makes deploying blockchains with custom logic specific to certain types of applications significantly easier than what is available today. These customized blockchains are normally referred to as Appchains, but in Tanssi terms, they are also known as ContainerChains.

Appchains provide the ultimate control over the logic that powers the runtime of the blockchain. Consequently, they offer an excellent way for projects to scale and build optimized solutions for their products, resulting in a superior user experience.

## The Problem {: #the-problem}

Developers looking to build Appchains typically have to deal with the following problems:

- **Complex Infrastructure Management** - Appchain deployments typically demand handling numerous infrastructural components like bootstrapping block producers, validators, wallets, block explorers, oracles, indexers, RPC endpoints, and more. This is both time-consuming and resource-intensive

- **Weak & Inefficient Security** - Appchains commonly suffer from having small or weak validator sets. Early-stage Appchains don't have enough economic backing to power a robust consensus mechanism. Moreover, developers often have to pay for full blockchain capacity validation even when they might not have achieved product-market fit, and blocks might be close to empty. This essentially means validators are being overpaid, and there is a large opportunity cost since those resources could be used elsewhere to develop the protocol

- **Cross-Chain and Interoperability** - Appchains inherently lack cross-chain capabilities to connect to other blockchain ecosystems. Furthermore, developing interoperability solutions requires specialized expertise and meticulous implementation

- **Slow Time to Market** - The complexities of Appchain infrastructure divert developer's focus from application logic, which is the key driver for intuitive interfaces and a seamless user experience, critical for adoption

## What Tanssi Provides {: #what-tanssi-provides}

Tanssi addresses the most common Appchain problems by:

- **Block Production as a Service** - Appchains built with Tanssi have their blocks produced by Tanssi's incentivized workers (block-producers). Tanssi guarantees the liveness of the Appchain and a decentralized set of block-producers

- **Consensus on Demand** -  Appchains deployed through Tanssi are not Layer 2 solutions, as they inherit block finality (consensus) from Polkadot, either on a continuous basis ([Parachain](XXX)), or on a per block model ([Pay as you go Parachain](XXX)). Consequently, Appchains built with Tanssi, as Layer 1 solutions, will have access to a robust consensus mechanism from the genesis block

- **Modular Blockchain Framework** - Appchains built with Tanssi can use a modular blockchain framework called [Substrate](https://substrate.io/){target=_blank}, which enables developers to quickly and easily build optimized and customizable blockchains for any use case. Tanssi handles most infrastructural complexities, allowing developers to focus on their Appchain's custom logic

- **Key Integrations** - Appchains built with Tanssi can access key infrastructural components alongside block production in a fully automated and standardized way. Because these Appchains are built with [Substrate](https://substrate.io/){target=_blank}, crucial tools like wallets, block explorers, indexers, RPC providers, and others are supported out of the box, so developers don't have to spend time dealing with these integrations themselves. Furthermore, Appchains deployed through Tanssi can leverage Cross-Consensus Messaging (XCM) as soon as they launch to get connectivity to other chains within the ecosystem like Moonbeam, which in turn will indirectly connect these chains to multiple interoperability protocols such as Axelar, LayerZero, Wormhole, and Hyperlane, allowing them to connect to other blockchain ecosystems like Ethereum, Avalanche, Arbitrum, BNB, and many more

In summary, Appchains deployed through Tanssi are Layer 1 solutions designed to be highly modular and interconnected, with a focus on simplifying the deployment process and enabling customization of the Appchain itself. This empowers developers to bring their blockchain applications to market faster, securely, and with greater potential for integration and interaction within the broader blockchain ecosystems.

## General Architechture of Appchains & Tanssi

As previously discussed, Appchains deployed through Tanssi (ContainerChains) are customizable blockchains which, among other features, have block production as a service and inherit block finality (consensus) from Polkadot. Consequently, they act as Layer 1 blockchains like Moonbeam, and not Layer 2 solutions on top of another Layer 1.

A high-level overview of what a ContainerChain looks like in the ecosystem is presented below.

![High-level overview of an Appchain & Tanssi](/images/learn/tanssi/overview/dark-overview-1.png#only-dark)
![High-level overview of an Appchain & Tanssi](/images/learn/tanssi/overview/light-overview-1.png#only-light)


One of the core differences between a normal Parachain and a Tansi-powered ContainerChain is that its block producers (also known as collators) are a subset of Tanssi's. The mechanism of how this works is explained in [XXX](){target=_blank}.

