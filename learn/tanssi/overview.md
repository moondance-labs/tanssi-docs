---
title: Overview
description: Tanssi is an Appchain protocol that eases the process of deploying Appchains so that developers can focus on their custom logic.
---

# What is Tanssi? {: #what-is-tanssi } 

Tanssi is a protocol that makes deploying blockchains with custom logic specific to certain types of applications a breeze. These customized blockchains are normally referred to as Appchains, but in Tanssi terms, they are also known as Container Chains.

Appchains provides the ultimate control over the logic that powers the runtime the blockchain is using. Consequently, they offer an excellent way for projects to scale and build optimized solutions for their product, resulting in a superior user experience.

## The Problem {: #the-problem}

Appchains typically have to deal with the following problems:

- **Complex Infrastructure Management** - Appchain deployments typically demand handling numerous infrastructural components like block producers, validators, wallets, block explorers, indexers, RPC endpoints, and more. This is both time and resource consuming

- **Weak & Inefficient Security** - Appchains commonly suffer from having small or weak validator sets. Early-stage Appchains don't have enough economic guarantees to power a robust consensus mechanism. Moreover, paying for full blockchain capacity is inefficient when only a fraction of it is needed

- **Cross-Chain and Interoperability** - Appchains inherently don't have cross-chain capabilities to connect to other blockchain ecosystems. Furthermore, developing interoperability solutions requires specialized expertise and meticulous implementation

- **Slow Time to Market** - Appchain's infrastructure complexities diver developer focus from application logic, which is the key driver for intuitive interfaces and seamless user experience, which is critical for adoption

## What Tanssi Provides {: #what-tanssi-provides}

Tanssi addresses the most common Appchain problems by:

- **Block Production as a Service** - Appchains built with Tanssi will get their block produced by Tanssi incentivized workers (block-producers). Tanssi guarantees Appchain's liveliness and a decentralized set of block-producers

- **Consensus on Demand** - Appchains will inherent block finality (consensus) from Polkadot, either on a continuous basis ([Parachain](XXX)), or on a pay-as-you-go model ([Parathread](XXX)). Consequently, Appchains built with Tanssi will have access to a robust consensus mechanism from the genesis block

- **Modular Blockchain Framework** - Appchains built with Tanssi can use a modular blockchain framework (called [Substrate](https://substrate.io/){target=_blank}) that enables developers to quickly and easily build optimized blockchains for any use case. Tanssi will handle most infrastructural complexities so that developers can focus on their Appchain custom logic

- **Key Integrations** - Appchains built with Tanssi can access key infrastructural components alongside block production. Because these Appchains are built with [Substrate](https://substrate.io/){target=_blank}, crucial features like wallets, block explorers, indexers, RPC providers, and others are supported out of the box. Furthermore, Appchains can leverage multiple interoperability protocols to connect to other blockchain ecosystems like Ethereum, Avalanche, Binance Smart Chain, and more