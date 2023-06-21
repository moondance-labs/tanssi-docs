---
title: Overview
description: Tanssi is an AppChain protocol that eases the process of deploying AppChains so that developers can focus on their custom logic.
---

# What is Tanssi? {: #what-is-tanssi } 

Tanssi is a protocol that makes deploying blockchains with custom logic specific to certain types of applications a breeze. These customized blockchains are normally referred to as AppChains, but in Tanssi terms, they are also known as Container Chains.

AppChains provides the ultimate control over the logic that powers the runtime the blockchain is using. Consequently, they offer an excellent way for projects to scale and build optimized solutions for their product, resulting in a superior user experience.

## The Problem

AppChains typically have to deal with the following problems:

- **Complex Infrastructure Management** - AppChain deployments typically demand handling numerous infrastructural components like block producers, validators, wallets, block explorers, indexers, RPC endpoints, and more. This is both time and resource consuming

- **Weak & Inefficient Security** - AppChains commonly suffer from having small or weak validator sets. Early-stage AppChains don't have enough economic guarantees to power a robust consensus mechanism. Moreover, paying for full blockchain capacity is inefficient when only a fraction of it is needed

- **Cross-Chain and Interoperability** - AppChains inherently don't have cross-chain capabilities to connect to other blockchain ecosystems. Furthermore, developing interoperability solutions requires specialized expertise and meticulous implementation

- **Slow Time to Market** - AppChain's infrastructure complexities diver developer focus from application logic, which is the key driver for intuitive interfaces and seamless user experience, which is critical for adoption

## What Tanssi Provides

Tanssi addresses the most common AppChain problems by:

- **Block Production as a Service** - AppChains built with Tanssi will get their block produced by Tanssi incentivized workers (block-producers). Tanssi guarantees AppChain's liveliness and a decentralized set of block-producers

- **Consensus on Demand** - AppChains will inherent block finality (consensus) from Polkadot, either on a continuous basis ([Parachain](XXX)), or on a pay-as-you-go model ([Parathread](XXX)). Consequently, AppChains built with Tanssi will have access to a robust consensus mechanism from the genesis block

- **Modular Blockchain Framework** - AppChains built with Tanssi can use a modular blockchain framework (called [Substrate](https://substrate.io/){target=_blank}) that enables developers to quickly and easily build optimized blockchains for any use case. Tanssi will handle most infrastructural complexities so that developers can focus on their AppChain custom logic

- **Key Integrations** - AppChains built with Tanssi can access key infrastructural components alongside block production. Because these AppChains are built with [Substrate](https://substrate.io/){target=_blank}, crucial features like wallets, block explorers, indexers, RPC providers, and others are supported out of the box. Furthermore, AppChains can leverage multiple interoperability protocols to connect to other blockchain ecosystems like Ethereum, Avalance, Binance Smart Chain, and more